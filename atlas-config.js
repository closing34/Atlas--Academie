/* ============================================================
   ATLAS ACADÉMIE — Configuration
   ⚠️  SEUL FICHIER À MODIFIER pour activer Supabase

   Instructions :
   1. Va sur https://supabase.com → ton projet → Settings → API
   2. Copie les valeurs ci-dessous
   3. Redéploie le dossier "site" dans Netlify

   NE JAMAIS mettre la clé service_role ici (frontend uniquement)
   ============================================================ */

window.ATLAS_CONFIG = {

  // ── Supabase ─────────────────────────────────────────────────
  // Settings → API → "Project URL"
  supabaseUrl: '',

  // Settings → API → "anon public" (PAS service_role)
  supabaseAnonKey: '',

  // ── Site ─────────────────────────────────────────────────────
  // URL de ton site Netlify (pour les redirections magic link)
  siteUrl: 'https://atlas-academie.netlify.app',

  // ── Codes d'accès valides (miroir de la table Supabase) ──────
  // Ajoute ici tes codes promo — ils fonctionnent même hors-ligne
  accessCodes: ['ATLAS2026', 'CREATOR', 'SAINT-THOMAS', 'TEST', 'ULTIMATECLOSING2024'],

};
