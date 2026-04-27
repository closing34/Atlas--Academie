/* ============================================================
   ATLAS ACADÉMIE — stripe-webhook.js (Netlify Function)
   Traite les événements Stripe après paiement confirmé

   ENDPOINT : POST /.netlify/functions/stripe-webhook
   (URL à enregistrer dans Stripe Dashboard → Developers → Webhooks)

   Événements gérés :
   - checkout.session.completed  → active l'abonnement / crédite les messages
   - customer.subscription.deleted → désactive l'abonnement Pro
   - invoice.payment_failed       → log l'échec

   Variables d'environnement requises :
     STRIPE_SECRET_KEY      = sk_test_... (ou sk_live_...)
     STRIPE_WEBHOOK_SECRET  = whsec_...  (depuis Stripe Dashboard)
     SUPABASE_URL            = https://xxxx.supabase.co
     SUPABASE_SERVICE_KEY    = eyJhbGc...
   ============================================================ */

const { createClient } = require('@supabase/supabase-js');

// ── Stripe raw body (OBLIGATOIRE pour vérifier la signature) ──
function getRawBody(event) {
  return event.body || '';
}

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

// ── Mapper produit Stripe → config Atlas ─────────────────────
// À mettre à jour avec tes vrais Price IDs depuis Stripe Dashboard
const STRIPE_PRODUCTS = {
  // Plan Pro mensuel Coach IA (19,90€/mois)
  'price_1TMa1yDwlJStC4YEqd69Z9Rn': { type: 'subscription', plan: 'pro', messages: 300, months: 1 },
  // Packs crédits Coach IA
  'price_1TMZerDwlJStC4YEleigPbU9': { type: 'credits', credits: 100 },
  'price_1TMZg7DwlJStC4YE4AJ7lgEG': { type: 'credits', credits: 250 },
  'price_1TMZnZDwlJStC4YE38Hr4qwl': { type: 'credits', credits: 500 },
  // Formations (990€ chacune — inclut 2 mois Coach IA)
  'price_FORMATION_ULTIMATE_TODO':   { type: 'formation', formation: 'ultimate-closing', coachMonths: 2, coachCredits: 300 },
  'price_FORMATION_DISC_TODO':       { type: 'formation', formation: 'disc-premium', coachMonths: 2, coachCredits: 300 },
  // Pack Bundle Complet (1490€ — Ultimate Closing + DISC Premium + 2 mois Coach IA)
  'price_BUNDLE_COMPLET_TODO':       { type: 'bundle', plan: 'bundle_complet', formations: ['ultimate-closing', 'disc-premium'], coachMonths: 2, coachCredits: 300 },
};

// Fallback : détection par metadata ou amount
function detectProduct(session) {
  const metadata = session.metadata || {};

  // Si le product est passé en metadata dans checkout.html
  if (metadata.product) {
    const map = {
      'pro':                   { type: 'subscription', plan: 'pro', messages: 300, months: 1 },
      'credits_100':           { type: 'credits', credits: 100 },
      'credits_250':           { type: 'credits', credits: 250 },
      'credits_500':           { type: 'credits', credits: 500 },
      'formation_ultimate':    { type: 'formation', formation: 'ultimate-closing', coachMonths: 2, coachCredits: 300 },
      'formation_disc':        { type: 'formation', formation: 'disc-premium', coachMonths: 2, coachCredits: 300 },
      'bundle_complet':        { type: 'bundle', plan: 'bundle_complet', formations: ['ultimate-closing', 'disc-premium'], coachMonths: 2, coachCredits: 300 },
    };
    return map[metadata.product] || null;
  }

  // Détection par amount_total (en centimes)
  const amount = session.amount_total;
  if (amount === 1990)   return { type: 'subscription', plan: 'pro', messages: 300, months: 1 };
  if (amount === 500)    return { type: 'credits', credits: 100 };
  if (amount === 1000)   return { type: 'credits', credits: 250 };
  if (amount === 1800)   return { type: 'credits', credits: 500 };
  if (amount === 99000)  return { type: 'formation', formation: 'ultimate-closing', coachMonths: 2, coachCredits: 300 };
  if (amount === 99000)  return { type: 'formation', formation: 'disc-premium', coachMonths: 2, coachCredits: 300 }; // TODO: distinguer par metadata
  if (amount === 149000) return { type: 'bundle', plan: 'bundle_complet', formations: ['ultimate-closing', 'disc-premium'], coachMonths: 2, coachCredits: 300 };

  return null;
}

// ── Activer l'abonnement Pro ──────────────────────────────────
async function activateSubscription(supabase, userId, product) {
  const now        = new Date();
  const periodEnd  = new Date(now.getTime() + product.months * 30 * 24 * 60 * 60 * 1000);

  // Upsert user_subscription
  const { error } = await supabase.from('user_subscription').upsert({
    user_id:             userId,
    plan:                product.plan,
    status:              'active',
    messages_per_month:  product.messages,
    messages_used:       0,
    current_period_start: now.toISOString(),
    current_period_end:  periodEnd.toISOString(),
    updated_at:          now.toISOString(),
  }, { onConflict: 'user_id' });

  if (error) console.error('[webhook] activateSubscription error:', error);
  else console.log(`[webhook] ✅ Plan ${product.plan} activé pour ${userId}`);
  return !error;
}

// ── Ajouter des crédits ───────────────────────────────────────
async function addCredits(supabase, userId, credits) {
  // Incrémenter les crédits existants
  const { data: existing } = await supabase
    .from('user_credits')
    .select('credits_remaining')
    .eq('user_id', userId)
    .single();

  const current   = existing ? existing.credits_remaining : 0;
  const newTotal  = current + credits;

  const { error } = await supabase.from('user_credits').upsert({
    user_id:           userId,
    credits_remaining: newTotal,
    updated_at:        new Date().toISOString(),
  }, { onConflict: 'user_id' });

  if (error) console.error('[webhook] addCredits error:', error);
  else console.log(`[webhook] ✅ +${credits} crédits pour ${userId} (total: ${newTotal})`);
  return !error;
}

// ── Désactiver l'abonnement ───────────────────────────────────
async function deactivateSubscription(supabase, stripeCustomerId) {
  // Trouver l'user via stripe_customer_id
  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('stripe_customer_id', stripeCustomerId)
    .single();

  if (!user) { console.warn('[webhook] User not found for customer:', stripeCustomerId); return; }

  await supabase.from('user_subscription').upsert({
    user_id:    user.id,
    plan:       'free',
    status:     'cancelled',
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id' });

  console.log(`[webhook] ℹ️ Abonnement désactivé pour ${user.id}`);
}

// ── Handler principal ─────────────────────────────────────────
exports.handler = async (event) => {
  const CORS = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: CORS, body: 'Method not allowed' };
  }

  const stripeSecretKey    = process.env.STRIPE_SECRET_KEY;
  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  // ── Mode dégradé : Stripe non configuré ──────────────────────
  if (!stripeSecretKey) {
    console.warn('[webhook] STRIPE_SECRET_KEY manquant — webhook ignoré');
    return { statusCode: 200, headers: CORS, body: JSON.stringify({ received: true, mode: 'no-stripe' }) };
  }

  // ── Vérification signature Stripe ────────────────────────────
  let stripeEvent;
  try {
    const stripe    = require('stripe')(stripeSecretKey);
    const signature = event.headers['stripe-signature'];
    stripeEvent     = stripe.webhooks.constructEvent(
      getRawBody(event),
      signature,
      stripeWebhookSecret
    );
  } catch (err) {
    console.error('[webhook] Signature invalide:', err.message);
    return { statusCode: 400, headers: CORS, body: `Webhook Error: ${err.message}` };
  }

  console.log(`[webhook] Événement reçu : ${stripeEvent.type}`);

  const supabase = getSupabase();
  if (!supabase) {
    console.warn('[webhook] Supabase non configuré — événement logué seulement');
    return { statusCode: 200, headers: CORS, body: JSON.stringify({ received: true, mode: 'no-supabase' }) };
  }

  try {
    // ── checkout.session.completed ────────────────────────────
    if (stripeEvent.type === 'checkout.session.completed') {
      const session  = stripeEvent.data.object;
      const metadata = session.metadata || {};
      const userId   = metadata.user_id || metadata.atlas_user_id;

      if (!userId) {
        console.warn('[webhook] Pas de user_id dans metadata — impossible d\'activer');
        // Log pour retrouver manuellement
        console.log('[webhook] Session:', JSON.stringify({ id: session.id, email: session.customer_details?.email, amount: session.amount_total }));
        return { statusCode: 200, headers: CORS, body: JSON.stringify({ received: true, warning: 'no_user_id' }) };
      }

      const product = detectProduct(session);
      if (!product) {
        console.warn('[webhook] Produit non reconnu pour session:', session.id);
        return { statusCode: 200, headers: CORS, body: JSON.stringify({ received: true, warning: 'unknown_product' }) };
      }

      // Sauvegarder stripe_customer_id pour le futur
      if (session.customer) {
        await supabase.from('users').update({
          stripe_customer_id: session.customer,
          updated_at: new Date().toISOString(),
        }).eq('id', userId);
      }

      if (product.type === 'subscription') {
        await activateSubscription(supabase, userId, product);
      } else if (product.type === 'credits') {
        await addCredits(supabase, userId, product.credits);
      } else if (product.type === 'formation') {
        // Débloquer la formation
        await supabase.from('user_formations').upsert({
          user_id:      userId,
          formation_id: product.formation,
          unlocked_at:  new Date().toISOString(),
          plan:         'formation',
        }).catch(err => console.warn('[webhook] formation upsert:', err.message));
        // Activer le Coach IA pour 2 mois (300 crédits/mois)
        if (product.coachMonths) {
          await activateSubscription(supabase, userId, {
            plan: 'formation_coach',
            messages: product.coachCredits || 300,
            months: product.coachMonths,
          });
        }
        console.log(`[webhook] ✅ Formation ${product.formation} débloquée pour ${userId} (Coach IA ${product.coachMonths} mois inc