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
  // Plan Pro mensuel — remplacer par ton Price ID Stripe
  'price_pro_mensuel':    { type: 'subscription', plan: 'pro', messages: 300, months: 1 },
  // Packs crédits
  'price_credits_100':    { type: 'credits', credits: 100 },
  'price_credits_250':    { type: 'credits', credits: 250 },
  'price_credits_500':    { type: 'credits', credits: 500 },
};

// Fallback : détection par metadata ou amount
function detectProduct(session) {
  const metadata = session.metadata || {};

  // Si le product est passé en metadata dans checkout.html
  if (metadata.product) {
    const map = {
      'pro':          { type: 'subscription', plan: 'pro', messages: 300, months: 1 },
      'credits_100':  { type: 'credits', credits: 100 },
      'credits_250':  { type: 'credits', credits: 250 },
      'credits_500':  { type: 'credits', credits: 500 },
    };
    return map[metadata.product] || null;
  }

  // Détection par amount_total (en centimes)
  const amount = session.amount_total;
  if (amount === 2999) return { type: 'subscription', plan: 'pro', messages: 300, months: 1 };
  if (amount === 500)  return { type: 'credits', credits: 100 };
  if (amount === 1000) return { type: 'credits', credits: 250 };
  if (amount === 1800) return { type: 'credits', credits: 500 };

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
      }

      // Log dans usage_logs pour analytics
      await supabase.from('usage_logs').insert({
        user_id:    userId,
        coach_type: 'payment',
        message_ref: `stripe_${stripeEvent.type}_${session.id}`,
        message_cost_estimate: -(session.amount_total / 100), // revenu (négatif = recette)
        created_at: new Date().toISOString(),
      }).catch(() => {});
    }

    // ── customer.subscription.deleted ────────────────────────
    if (stripeEvent.type === 'customer.subscription.deleted') {
      const sub = stripeEvent.data.object;
      await deactivateSubscription(supabase, sub.customer);
    }

    // ── invoice.payment_failed ────────────────────────────────
    if (stripeEvent.type === 'invoice.payment_failed') {
      const invoice = stripeEvent.data.object;
      console.warn(`[webhook] Paiement échoué pour customer ${invoice.customer}`);
      // Tu peux ici envoyer un email via Resend ou désactiver temporairement
    }

  } catch (e) {
    console.error('[webhook] Erreur traitement:', e.message);
    return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: e.message }) };
  }

  return { statusCode: 200, headers: CORS, body: JSON.stringify({ received: true }) };
};
