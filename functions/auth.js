/* ============================================================
   ATLAS ACADÉMIE — auth.js (Netlify Function)
   Phase 2 — Supabase Auth : Magic Link

   Routes :
     POST /api/auth  { action: 'send_magic_link', email }
       → envoie un magic link par email via Supabase Auth
       → crée le profil utilisateur si nouveau

     POST /api/auth  { action: 'verify_session', access_token, refresh_token }
       → vérifie le token JWT et retourne l'utilisateur + son accès

     POST /api/auth  { action: 'get_user', access_token }
       → retourne les infos utilisateur + abonnement depuis Supabase

   Variables d'environnement requises (Netlify) :
     SUPABASE_URL          — https://xxxx.supabase.co
     SUPABASE_SERVICE_KEY  — clé service_role (secret, jamais côté client)
   ============================================================ */

const { createClient } = require('@supabase/supabase-js');

// ── Initialisation Supabase Admin ─────────────────────────────
function getAdminClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) throw new Error('Supabase env vars missing (SUPABASE_URL / SUPABASE_SERVICE_KEY)');
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
}

// ── CORS headers ──────────────────────────────────────────────
const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function ok(data, status = 200) {
  return { statusCode: status, headers: { ...CORS, 'Content-Type': 'application/json' }, body: JSON.stringify(data) };
}
function err(msg, status = 400) {
  return { statusCode: status, headers: { ...CORS, 'Content-Type': 'application/json' }, body: JSON.stringify({ error: msg }) };
}

// ── Handler principal ─────────────────────────────────────────
exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: CORS, body: '' };
  if (event.httpMethod !== 'POST') return err('Method not allowed', 405);

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch { return err('Invalid JSON'); }

  const { action } = body;

  try {
    // ── 1. Envoyer un magic link ────────────────────────────
    if (action === 'send_magic_link') {
      const { email } = body;
      if (!email || !email.includes('@')) return err('Email invalide');

      const supabase = getAdminClient();

      // Générer un OTP (magic link) via Admin API
      const { data, error } = await supabase.auth.admin.generateLink({
        type:       'magiclink',
        email:      email.trim().toLowerCase(),
        options: {
          redirectTo: `${process.env.SITE_URL || 'https://atlasacademie.netlify.app'}/auth.html?callback=1`,
        },
      });

      if (error) {
        console.error('[auth] generateLink error:', error);
        return err('Impossible d\'envoyer le lien. Réessaie.');
      }

      // S'assurer que l'utilisateur a un profil dans la table users
      const userId = data?.user?.id;
      if (userId) {
        // Upsert silencieux — ne crée pas si déjà existant
        await supabase.from('users').upsert({
          id:         userId,
          email:      email.trim().toLowerCase(),
          updated_at: new Date().toISOString(),
        }, { onConflict: 'id', ignoreDuplicates: true });
      }

      return ok({ sent: true, email: email.trim().toLowerCase() });
    }

    // ── 2. Vérifier une session (tokens depuis URL callback) ──
    if (action === 'verify_session') {
      const { access_token, refresh_token } = body;
      if (!access_token) return err('access_token manquant');

      const supabase = getAdminClient();

      // Vérifier le JWT
      const { data: { user }, error } = await supabase.auth.getUser(access_token);
      if (error || !user) return err('Token invalide ou expiré', 401);

      // Récupérer l'accès utilisateur via RPC
      const { data: access, error: rpcErr } = await supabase.rpc('check_user_access', {
        p_user_id: user.id,
      });

      if (rpcErr) {
        console.error('[auth] check_user_access error:', rpcErr);
        // Accès minimal par défaut
        return ok({
          user: { id: user.id, email: user.email },
          access: { has_access: false, access_type: 'free', messages_remaining: 5, messages_used: 0 },
        });
      }

      return ok({
        user:   { id: user.id, email: user.email },
        access: access,
      });
    }

    // ── 3. Récupérer infos utilisateur ────────────────────────
    if (action === 'get_user') {
      const { access_token } = body;
      if (!access_token) return err('access_token manquant');

      const supabase = getAdminClient();
      const { data: { user }, error } = await supabase.auth.getUser(access_token);
      if (error || !user) return err('Token invalide', 401);

      // Profil complet
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Abonnement
      const { data: sub } = await supabase
        .from('user_subscription')
        .select('plan, status, messages_per_month, messages_used, current_period_end')
        .eq('user_id', user.id)
        .single();

      // Crédits
      const { data: credits } = await supabase
        .from('user_credits')
        .select('credits_remaining')
        .eq('user_id', user.id)
        .single();

      return ok({
        user:    { id: user.id, email: user.email },
        profile: profile || null,
        sub:     sub    || null,
        credits: credits ? credits.credits_remaining : 0,
      });
    }

    return err('Action inconnue');

  } catch (e) {
    console.error('[auth] Unexpected error:', e);
    return err('Erreur serveur inattendue', 500);
  }
};
