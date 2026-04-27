/**
 * Atlas Académie — Adaptateur Netlify Function → Vercel API
 * Convertit le format Netlify (event, context) → Vercel (req, res)
 */

/**
 * Lit le body brut de la requête Vercel (stream Node.js)
 */
async function readBody(req) {
  // Vercel peut pré-parser le body selon Content-Type
  if (req.body !== undefined) {
    if (typeof req.body === 'string') return req.body;
    return JSON.stringify(req.body);
  }
  // Lecture manuelle du stream
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

/**
 * Wraps a Netlify-style handler for Vercel
 * @param {Function} netlifyHandler - exports.handler from a Netlify function
 * @returns {Function} Vercel-compatible handler
 */
function adapt(netlifyHandler) {
  return async (req, res) => {
    // Gérer les requêtes OPTIONS (CORS preflight)
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.status(200).end();
      return;
    }

    try {
      const body = await readBody(req);

      // Construire l'objet event Netlify
      const event = {
        httpMethod: req.method,
        headers: Object.fromEntries(
          Object.entries(req.headers).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v])
        ),
        body: body || '',
        queryStringParameters: req.query || {},
        path: req.url,
      };

      // Appeler le handler Netlify
      const result = await netlifyHandler(event, {});

      // Appliquer les headers de réponse
      const headers = result.headers || {};
      if (!headers['Content-Type'] && !headers['content-type']) {
        headers['Content-Type'] = 'application/json';
      }
      headers['Access-Control-Allow-Origin'] = '*';

      Object.entries(headers).forEach(([k, v]) => res.setHeader(k, v));
      res.status(result.statusCode || 200).end(result.body || '');

    } catch (err) {
      console.error('[Atlas API Adapter]', err);
      res.status(500).json({ error: 'Erreur interne serveur', details: err.message });
    }
  };
}

module.exports = { adapt };
