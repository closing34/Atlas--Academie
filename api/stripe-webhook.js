// IMPORTANT: Stripe nécessite le body RAW (non parsé)
// Désactive le body parsing automatique de Vercel
const { handler } = require('../functions/stripe-webhook');

// Config Vercel pour désactiver le body parser
module.exports = async (req, res) => {
  // Gérer CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, stripe-signature');
    return res.status(200).end();
  }

  // Lire le body RAW (non parsé) pour la vérification Stripe
  const rawBody = await new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });

  const event = {
    httpMethod: req.method,
    headers: Object.fromEntries(
      Object.entries(req.headers).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v])
    ),
    body: rawBody,
    queryStringParameters: req.query || {},
  };

  try {
    const result = await handler(event, {});
    const headers = result.headers || {};
    headers['Access-Control-Allow-Origin'] = '*';
    Object.entries(headers).forEach(([k, v]) => res.setHeader(k, v));
    res.status(result.statusCode || 200).end(result.body || '');
  } catch (err) {
    console.error('[stripe-webhook]', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports.config = { api: { bodyParser: false } };
