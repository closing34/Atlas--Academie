// ═══════════════════════════════════════════════════════════
//  ATLAS ACADÉMIE — Stripe Checkout Session
//  POST /.netlify/functions/create-checkout
//  Body: { priceId, email, successUrl, cancelUrl }
//  Env:  STRIPE_SECRET_KEY (sk_live_... ou sk_test_...)
// ═══════════════════════════════════════════════════════════

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const CORS_HEADERS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

exports.handler = async (event) => {

  // ── Pre-flight CORS (DOIT être en premier) ──────────────
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: CORS_HEADERS, body: '' };
  }

  // ── Méthode non autorisée ────────────────────────────────
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { priceId, email, successUrl, cancelUrl } = JSON.parse(event.body || '{}');

    if (!priceId) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'priceId manquant' }),
      };
    }

    // Récupérer le type du price (recurring ou one_time)
    const price = await stripe.prices.retrieve(priceId);
    const isRecurring = price.type === 'recurring';

    // Construire la session Stripe Checkout
    const sessionParams = {
      payment_method_types:    ['card'],
      line_items:              [{ price: priceId, quantity: 1 }],
      mode:                    isRecurring ? 'subscription' : 'payment',
      success_url:             successUrl || 'https://atlas-academie.netlify.app/success.html?session_id={CHECKOUT_SESSION_ID}',
      cancel_url:              cancelUrl  || 'https://atlas-academie.netlify.app/checkout.html',
      allow_promotion_codes:   true,
      billing_address_collection: 'auto',
      locale:                  'fr',
      metadata: {
        source:   'atlas_academie_checkout',
        price_id: priceId,
      },
    };

    // Pré-remplir l'email si valide
    if (email && email.includes('@')) {
      sessionParams.customer_email = email;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ url: session.url, sessionId: session.id }),
    };

  } catch (err) {
    console.error('[Atlas] Stripe checkout error:', err.message);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
