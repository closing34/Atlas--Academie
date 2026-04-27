/* ============================================================
   ATLAS ACADÉMIE — consume-message.js (Netlify Function)
   Enregistrement de la consommation après chaque réponse IA

   Phase 2 : RPC Supabase consume_message() + usage_logs
   Fallback Phase 1 si Supabase non configuré (dev local)

   ENDPOINT : POST /.netlify/functions/consume-message
   HEADERS  : Authorization: Bearer <jwt>   (optionnel)
   BODY     : {
     userId, coachId, plan,
     inputTokens, outputTokens,
     messageRef  (optionnel)
   }
   RETOUR   : { success, costEur, messagesRemaining }
   ============================================================ */

const { createClient } = require('@supabase/supabase-js');

const HEADERS = {
  'Content-Type':                 'application/json',
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Atlas-User-Id',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

// Tarifs claude-sonnet-4-6 (USD → EUR à 0.93)
const PRICE_INPUT_PER_1K  = 0.003 * 0.93;
const PRICE_OUTPUT_PER_1K = 0.015 * 0.93;
const DEFAULT_COST_EUR    = 0.008;

function ok(statusCode, data) {
  return { statusCode, headers: HEADERS, body: JSON.stringify(data) };
}

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

  const {
    userId       = 'anonymous',
    coachId      = 'unknown',
    plan         = 'free',
    inputTokens  = 0,
    outputTokens = 0,
    messageRef   = null,
  } = body;

  // Estimation coût en euros
  const costEur = inputTokens > 0 || outputTokens > 0
    ? parseFloat(
        ((inputTokens / 1000)  * PRICE_INPUT_PER_1K +
         (outputTokens / 1000) * PRICE_OUTPUT_PER_1K).toFixed(5)
      )
    : DEFAULT_COST_EUR;

  // ── Phase 2 : Supabase ────────────────────────────────────────
  const supabase = getSupabase();

  if (supabase && userId && !userId.startsWith('local_') && !userId.startsWith('anon')) {
    try {
      // 1. Appel RPC consume_message (gère atomiquement toute la logique)
      const { data: consumed, error: rpcErr } = await supabase.rpc('consume_message', {
        p_user_id:    userId,
        p_coach_type: coachId,
        p_tokens:     (inputTokens || 0) + (outputTokens || 0),
        p_cost_eur:   costEur,
      });

      if (rpcErr) {
        console.error('[consume-message] RPC error:', rpcErr);
        // Tomber en fallback
      } else {
        // 2. Log détaillé dans usage_logs
        await supabase.from('usage_logs').insert({
          user_id:              userId,
          coach_type:           coachId,
          tokens_used:          (inputTokens || 0) + (outputTokens || 0),
          tokens_input:         inputTokens  || 0,
          tokens_output:        outputTokens || 0,
          message_cost_estimate: costEur,
          message_ref:          messageRef,
          created_at:           new Date().toISOString(),
        }).catch(e => console.warn('[consume-message] Log insert failed:', e.message));

        console.log(JSON.stringify({
          event:   'message_consumed_supabase',
          userId, coachId, plan,
          inputTokens, outputTokens, costEur,
          consumed,
          ts: new Date().toISOString()
        }));

        return ok(200, {
          success:           true,
          costEur,
          messagesRemaining: consumed ? consumed.messages_remaining : null,
          logged:            true,
          mode:              'supabase',
        });
      }
    } catch (e) {
      console.error('[consume-message] Supabase error:', e.message);
    }
  }

  // ── Fallback Phase 1 : log console uniquement ─────────────────
  console.log(JSON.stringify({
    event:   'message_consumed_local',
    userId, coachId, plan,
    inputTokens, outputTokens, costEur,
    ts: new Date().toISOString()
  }));

  return ok(200, {
    success: true,
    costEur,
    logged:  true,
    mode:    'local',
  });
};
