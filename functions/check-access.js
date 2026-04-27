/* ============================================================
   ATLAS ACADÉMIE — check-access.js (Netlify Function)
   Vérification d'accès server-side

   Phase 2 : requête Supabase via RPC check_user_access()
   Fallback Phase 1 si Supabase non configuré (dev local)

   ENDPOINT : POST /.netlify/functions/check-access
   HEADERS  : Authorization: Bearer <jwt>   (ou X-Atlas-User-Id)
   BODY     : { userId, plan, messagesUsed, creditsRemaining }
   RETOUR   : { allowed, reason, remaining, access_type }
   ============================================================ */

const { createClient } = require('@supabase/supabase-js');

const HEADERS = {
  'Content-Type':                 'application/json',
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Atlas-User-Id',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

// ── Plans : limites fallback (Phase 1) ────────────────────────
const PLAN_LIMITS = {
  free:      5,
  pro:       300,
  test:      20,
  unlimited: -1,
  code:      999,
  credits:   0
};

function ok(statusCode, data) {
  return { statusCode, headers: HEADERS, body: JSON.stringify(data) };
}

// ── Supabase Admin ────────────────────────────────────────────
function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

exports.handler = async function (event) {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: HEADERS, body: '' };
  if (event.httpMethod !== 'POST') return ok(405, { error: 'Method not allowed' });

  let body;
  try { body = JSON.parse(event.body || '{}'); }
  catch { return ok(400, { error: 'Invalid JSON' }); }

  const { userId, plan = 'free', messagesUsed = 0, creditsRemaining = 0 } = body;

  // ── Phase 2 : Supabase RPC ────────────────────────────────────
  const supabase = getSupabase();

  if (supabase && userId && !userId.startsWith('local_') && !userId.startsWith('anon')) {
    try {
      // Vérifier le JWT si fourni dans le header
      const authHeader = event.headers['authorization'] || event.headers['Authorization'];
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.replace('Bearer ', '');
        const { data: { user }, error: authErr } = await supabase.auth.getUser(token);
        if (authErr || !user) {
          return ok(401, { allowed: false, reason: 'invalid_token', remaining: 0 });
        }
        // S'assurer que le userId correspond au token
        if (user.id !== userId) {
          return ok(403, { allowed: false, reason: 'user_mismatch', remaining: 0 });
        }
      }

      // Appel RPC check_user_access
      const { data: access, error: rpcErr } = await supabase.rpc('check_user_access', {
        p_user_id: userId,
      });

      if (rpcErr) {
        console.error('[check-access] RPC error:', rpcErr);
        // Tomber en fallback Phase 1
      } else if (access) {
        return ok(200, {
          allowed:      access.has_access,
          reason:       access.has_access ? 'ok' : 'limit_reached',
          remaining:    access.messages_remaining,
          access_type:  access.access_type,
          messages_used: access.messages_used,
        });
      }
    } catch (e) {
      console.error('[check-access] Supabase error:', e.message);
      // Fallback vers Phase 1
    }
  }

  // ── Fallback Phase 1 : validation locale ─────────────────────
  // (utilisé en dev local, ou si Supabase non configuré)
  if (plan === 'unlimited' || plan === 'code') {
    return ok(200, { allowed: true, reason: 'unlimited', remaining: -1, access_type: plan });
  }

  if (plan === 'credits') {
    if (creditsRemaining <= 0) {
      return ok(200, { allowed: false, reason: 'no_credits', remaining: 0, access_type: 'credits' });
    }
    return ok(200, { allowed: true, reason: 'credits_ok', remaining: creditsRemaining, access_type: 'credits' });
  }

  const limit = PLAN_LIMITS[plan] ?? PLAN_LIMITS.free;
  if (messagesUsed >= limit) {
    return ok(200, {
      allowed:     false,
      reason:      plan === 'free' ? 'free_limit' : 'monthly_limit',
      remaining:   0,
      access_type: plan
    });
  }

  return ok(200, {
    allowed:     true,
    reason:      'ok',
    remaining:   limit - messagesUsed,
    access_type: plan
  });
};
