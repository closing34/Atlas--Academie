/* ============================================================
   ATLAS ACADÉMIE — supabase-client.js v1.0
   Client Supabase frontend — Phase 2

   Rôle :
   - Charge le SDK Supabase via CDN
   - Gère la session utilisateur (localStorage + refresh auto)
   - Expose AtlasAuth : login, logout, getUser, isLoggedIn
   - Écoute les callbacks magic link (hash #access_token=...)
   - Émet des événements DOM pour les autres scripts

   Utilisation :
     AtlasAuth.isLoggedIn()          → bool
     AtlasAuth.getUser()             → { id, email } | null
     AtlasAuth.getAccess()           → { has_access, access_type, messages_remaining } | null
     AtlasAuth.logout()              → void
     AtlasAuth.requireLogin(return)  → redirige si non connecté
   ============================================================ */

(function () {
  'use strict';

  // ── Config ────────────────────────────────────────────────────
  // Lues depuis atlas-config.js (window.ATLAS_CONFIG)
  // Si non configuré → mode local (localStorage uniquement)
  const cfg           = window.ATLAS_CONFIG || {};
  const SUPABASE_URL      = cfg.supabaseUrl      || '';
  const SUPABASE_ANON_KEY = cfg.supabaseAnonKey  || '';
  const ACCESS_CODES      = cfg.accessCodes      || ['ATLAS2026','CREATOR','SAINT-THOMAS','TEST'];

  const STORAGE_USER   = 'atlas_user';
  const STORAGE_ACCESS = 'atlas_access';
  const STORAGE_TOKEN  = 'atlas_token';

  // ── Supabase SDK (CDN) ────────────────────────────────────────
  // On charge le SDK via CDN pour éviter un bundler
  let _supabase = null;

  function _initSupabase() {
    if (_supabase) return _supabase;
    if (!window.supabase) return null; // SDK pas encore chargé
    if (!SUPABASE_URL) return null;    // Config non remplie → mode local
    try {
      _supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true, // Détecte #access_token dans l'URL
        }
      });
      _listenAuthChanges();
    } catch (e) {
      console.warn('[AtlasAuth] Init Supabase failed:', e.message);
    }
    return _supabase;
  }

  // ── Écoute les changements d'état d'authentification ─────────
  function _listenAuthChanges() {
    if (!_supabase) return;
    _supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        await _handleSignIn(session);
      } else if (event === 'SIGNED_OUT') {
        _clearSession();
      } else if (event === 'TOKEN_REFRESHED' && session) {
        _storeToken(session.access_token);
      }
    });
  }

  // ── Traitement de la connexion ────────────────────────────────
  async function _handleSignIn(session) {
    const user = session.user;
    _storeToken(session.access_token);

    // Stocker les infos utilisateur de base
    localStorage.setItem(STORAGE_USER, JSON.stringify({
      id:    user.id,
      email: user.email,
      mode:  'supabase',
    }));

    // Récupérer l'accès depuis le backend
    try {
      const res = await fetch('/.netlify/functions/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get_user', access_token: session.access_token }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.access) {
          localStorage.setItem(STORAGE_ACCESS, JSON.stringify(data.access || {}));
        }
      }
    } catch (e) {
      console.warn('[AtlasAuth] Could not fetch user access:', e.message);
      // Accès minimal par défaut
      localStorage.setItem(STORAGE_ACCESS, JSON.stringify({
        has_access: false, access_type: 'free', messages_remaining: 5
      }));
    }

    // Émettre l'événement pour auth.html (callback)
    document.dispatchEvent(new CustomEvent('atlas:auth:ready', {
      detail: {
        user:   JSON.parse(localStorage.getItem(STORAGE_USER) || 'null'),
        access: JSON.parse(localStorage.getItem(STORAGE_ACCESS) || 'null'),
      }
    }));
  }

  function _storeToken(token) {
    if (token) localStorage.setItem(STORAGE_TOKEN, token);
  }

  function _clearSession() {
    localStorage.removeItem(STORAGE_USER);
    localStorage.removeItem(STORAGE_ACCESS);
    localStorage.removeItem(STORAGE_TOKEN);
  }

  // ── API publique ──────────────────────────────────────────────
  const AtlasAuth = {

    /**
     * Est-ce que l'utilisateur est connecté ?
     * Vérifie localStorage (fonctionne aussi sans Supabase SDK)
     */
    isLoggedIn() {
      try {
        const u = JSON.parse(localStorage.getItem(STORAGE_USER) || 'null');
        return !!(u && u.id);
      } catch { return false; }
    },

    /**
     * Retourne les infos utilisateur stockées
     * @returns {{ id, email, mode } | null}
     */
    getUser() {
      try { return JSON.parse(localStorage.getItem(STORAGE_USER) || 'null'); }
      catch { return null; }
    },

    /**
     * Retourne le résumé d'accès
     * @returns {{ has_access, access_type, messages_remaining, messages_used } | null}
     */
    getAccess() {
      try { return JSON.parse(localStorage.getItem(STORAGE_ACCESS) || 'null'); }
      catch { return null; }
    },

    /**
     * Retourne le token JWT actuel (pour les appels API)
     */
    getToken() {
      return localStorage.getItem(STORAGE_TOKEN) || null;
    },

    /**
     * Redirige vers auth.html si l'utilisateur n'est pas connecté
     * @param {string} [returnUrl] — URL de retour après connexion
     */
    requireLogin(returnUrl) {
      if (!this.isLoggedIn()) {
        if (returnUrl) localStorage.setItem('atlas_auth_return', returnUrl);
        window.location.href = 'auth.html';
        return false;
      }
      return true;
    },

    /**
     * Déconnexion
     */
    logout() {
      _clearSession();
      const sb = _initSupabase();
      if (sb) sb.auth.signOut().catch(() => {});
      window.location.href = 'auth.html';
    },

    /**
     * Rafraîchir les données d'accès depuis le backend
     * Utile après un achat ou une activation de code
     */
    async refreshAccess() {
      const token = this.getToken();
      if (!token) return null;
      try {
        const res = await fetch('/.netlify/functions/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'get_user', access_token: token }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.access) {
            localStorage.setItem(STORAGE_ACCESS, JSON.stringify(data.access));
            return data.access;
          }
        }
      } catch {}
      return null;
    },

    /**
     * Retourne les headers d'authentification pour les appels API
     * Utilise le token JWT si disponible, sinon mode local (code)
     */
    getAuthHeaders() {
      const token = this.getToken();
      const user  = this.getUser();
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = 'Bearer ' + token;
      if (user && user.id) headers['X-Atlas-User-Id'] = user.id;
      return headers;
    },
  };

  // ── Init au chargement ────────────────────────────────────────
  // On charge le SDK Supabase via CDN (ne bloque pas si absent)
  function _loadSDK() {
    if (SUPABASE_URL.startsWith('__')) {
      // Config non injectée : mode local/développement sans Supabase
      console.info('[AtlasAuth] Running in local mode (Supabase not configured)');
      return;
    }
    if (window.supabase) { _initSupabase(); return; }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
    script.onload = () => _initSupabase();
    script.onerror = () => console.warn('[AtlasAuth] SDK Supabase non chargé');
    document.head.appendChild(script);
  }

  _loadSDK();

  // ── Export global ─────────────────────────────────────────────
  window.AtlasAuth = AtlasAuth;

})();
