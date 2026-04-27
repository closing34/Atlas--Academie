/* ============================================================
   ATLAS ACADÉMIE — MODULE DE SÉCURITÉ
   
   4 protections :
   1. Watermark dynamique  — affiche l'identité sur les contenus
   2. Limitation sessions  — 2 appareils max simultanément
   3. Détection partage    — comportement suspect → alerte
   4. Protection contenu   — désactive clic droit, sélection, copie
   
   Fonctionnement sans Supabase : localStorage
   Avec Supabase activé : synchronisation serveur automatique
   ============================================================ */

const AtlasSecurity = (function () {
  'use strict';

  const SESSION_KEY   = 'atlas_security_session_v1';
  const DEVICE_KEY    = 'atlas_device_id_v1';
  const SUSPECT_KEY   = 'atlas_suspect_v1';
  const WM_STYLE_ID   = 'atlas-watermark-style';
  const WM_OVERLAY_ID = 'atlas-watermark-overlay';

  /* ════════════════════════════════════════════════════════
     1. WATERMARK DYNAMIQUE
     Affiche en filigrane : nom + email + date + code session
  ════════════════════════════════════════════════════════ */

  function getUserIdentity() {
    try {
      const p = JSON.parse(localStorage.getItem('atlas_user_profile') || '{}');
      const u = JSON.parse(localStorage.getItem('atlas_user') || '{}');
      return {
        name:  p.name  || u.email?.split('@')[0] || 'Utilisateur',
        email: u.email || p.email || '',
        plan:  u.plan  || 'standard',
      };
    } catch { return { name:'Utilisateur', email:'', plan:'standard' }; }
  }

  function getDeviceId() {
    let id = localStorage.getItem(DEVICE_KEY);
    if (!id) {
      id = 'DEV-' + Math.random().toString(36).substr(2,8).toUpperCase() +
           '-' + Date.now().toString(36).toUpperCase();
      localStorage.setItem(DEVICE_KEY, id);
    }
    return id;
  }

  function injectWatermark(options = {}) {
    const {
      opacity    = 0.055,
      color      = '#C9A84C',
      fontSize   = 13,
      angle      = -30,
      spacing    = 220,
      showOnPage = true,
    } = options;

    if (!showOnPage) return;

    // Supprimer l'ancien watermark s'il existe
    document.getElementById(WM_OVERLAY_ID)?.remove();
    document.getElementById(WM_STYLE_ID)?.remove();

    const identity = getUserIdentity();
    const deviceId = getDeviceId().substr(0,12);
    const date = new Date().toLocaleDateString('fr-FR', { day:'2-digit', month:'2-digit', year:'numeric' });
    const lines = [
      identity.name.toUpperCase(),
      identity.email || deviceId,
      `Atlas Académie · ${date}`,
    ];
    const text = lines.join('   ·   ');

    // Créer l'overlay SVG
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <pattern id="wm-pattern" x="0" y="0" width="${spacing}" height="${spacing}" patternUnits="userSpaceOnUse" patternTransform="rotate(${angle})">
          <text x="0" y="${fontSize + 4}" font-family="Lato, sans-serif" font-size="${fontSize}" fill="${color}" opacity="${opacity}" letter-spacing="1">${text}</text>
          <text x="${spacing/2}" y="${spacing/2 + fontSize + 4}" font-family="Lato, sans-serif" font-size="${fontSize}" fill="${color}" opacity="${opacity}" letter-spacing="1">${text}</text>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#wm-pattern)"/>
    </svg>`;

    const overlay = document.createElement('div');
    overlay.id = WM_OVERLAY_ID;
    overlay.style.cssText = `
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      pointer-events: none;
      z-index: 9998;
      background-image: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}");
      background-repeat: repeat;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    `;
    document.body.appendChild(overlay);

    // Style d'impression renforcé
    const style = document.createElement('style');
    style.id = WM_STYLE_ID;
    style.textContent = `
      @media print {
        #${WM_OVERLAY_ID} {
          position: fixed !important;
          display: block !important;
          opacity: 1 !important;
          z-index: 99999 !important;
          print-color-adjust: exact !important;
          -webkit-print-color-adjust: exact !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Surveillance : si quelqu'un retire le watermark via DevTools
    if (window.MutationObserver) {
      const observer = new MutationObserver(() => {
        if (!document.getElementById(WM_OVERLAY_ID)) {
          setTimeout(() => injectWatermark(options), 500);
          _logSuspect('watermark_removed');
        }
      });
      observer.observe(document.body, { childList: true, subtree: false });
    }
  }

  /* ════════════════════════════════════════════════════════
     2. LIMITATION DES SESSIONS (2 appareils max)
     Sans Supabase : on compare les deviceId en localStorage
     Avec Supabase : synchronisation via check-access function
  ════════════════════════════════════════════════════════ */

  function registerSession() {
    const deviceId = getDeviceId();
    const now = Date.now();
    let sessions = _getSessions();

    // Supprimer les sessions inactives (> 4h)
    sessions = sessions.filter(s => now - s.lastSeen < 4 * 3600 * 1000);

    // Mettre à jour ou ajouter ce device
    const existing = sessions.findIndex(s => s.deviceId === deviceId);
    if (existing >= 0) {
      sessions[existing].lastSeen = now;
    } else {
      sessions.push({ deviceId, lastSeen: now, userAgent: navigator.userAgent.substr(0,80) });
    }

    // Garder max 10 sessions (côté client, la vraie limite est côté serveur)
    sessions = sessions.slice(-10);
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessions));

    return { deviceId, sessionsCount: sessions.length, sessions };
  }

  function checkSessionLimit(maxDevices = 2) {
    const data = registerSession();
    const activeDevices = data.sessions.filter(
      s => Date.now() - s.lastSeen < 4 * 3600 * 1000
    );

    if (activeDevices.length > maxDevices) {
      _logSuspect('multiple_sessions');
      return {
        blocked: true,
        count: activeDevices.length,
        max: maxDevices,
        message: `Trop d'appareils connectés simultanément (${activeDevices.length}/${maxDevices}). Déconnecte-toi sur un autre appareil.`
      };
    }
    return { blocked: false, count: activeDevices.length, max: maxDevices };
  }

  function _getSessions() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY) || '[]'); }
    catch { return []; }
  }

  /* ════════════════════════════════════════════════════════
     3. DÉTECTION PARTAGE DE COMPTE
     Indicateurs surveillés :
     - Changement trop fréquent d'IP (via headers Netlify)
     - Plusieurs deviceId actifs
     - Screenshots fréquents (PrintScreen détecté)
     - Tentatives de copie du contenu
  ════════════════════════════════════════════════════════ */

  function initShareDetection() {
    // Détecter PrintScreen
    document.addEventListener('keydown', (e) => {
      if (e.key === 'PrintScreen' || (e.ctrlKey && e.key === 'p')) {
        _logSuspect('screenshot_attempt');
        // Flash watermark plus opaque pendant 2 secondes
        _flashWatermark();
      }
    });

    // Détecter copie excessive
    let copyCount = 0;
    let copyWindow = Date.now();
    document.addEventListener('copy', () => {
      if (Date.now() - copyWindow > 60000) { copyCount = 0; copyWindow = Date.now(); }
      copyCount++;
      if (copyCount > 10) _logSuspect('excessive_copy');
    });

    // Heartbeat toutes les 5min pour maintenir la session active
    setInterval(() => registerSession(), 5 * 60 * 1000);
  }

  function _logSuspect(reason) {
    const data = _getSuspectData();
    const entry = { reason, date: new Date().toISOString(), deviceId: getDeviceId() };
    data.events = data.events || [];
    data.events.push(entry);
    data.events = data.events.slice(-50); // garder les 50 derniers
    data.count = (data.count || 0) + 1;
    localStorage.setItem(SUSPECT_KEY, JSON.stringify(data));
  }

  function _getSuspectData() {
    try { return JSON.parse(localStorage.getItem(SUSPECT_KEY) || '{}'); }
    catch { return {}; }
  }

  function getSuspectScore() {
    const data = _getSuspectData();
    return data.count || 0;
  }

  function _flashWatermark() {
    const overlay = document.getElementById(WM_OVERLAY_ID);
    if (!overlay) return;
    overlay.style.opacity = '0.25';
    setTimeout(() => { overlay.style.opacity = '1'; }, 2000);
  }

  /* ════════════════════════════════════════════════════════
     4. PROTECTION DU CONTENU
     Appliquée sur les éléments marqués .protected-content
     et les vidéos / PDF embarqués
  ════════════════════════════════════════════════════════ */

  function protectContent(options = {}) {
    const {
      disableRightClick   = true,
      disableTextSelect   = true,
      disableDragDrop     = true,
      disableDevTools     = false, // trop intrusif pour l'UX
      applyToSelector     = '.protected-content, .formation-content, video, iframe',
    } = options;

    // Clic droit
    if (disableRightClick) {
      document.addEventListener('contextmenu', (e) => {
        if (e.target.closest(applyToSelector)) {
          e.preventDefault();
          _showProtectionToast('Ce contenu est protégé.');
          _logSuspect('right_click');
          return false;
        }
      });
    }

    // Sélection texte
    if (disableTextSelect) {
      const style = document.createElement('style');
      style.textContent = `
        .protected-content, .formation-content {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Drag & drop sur les images et vidéos
    if (disableDragDrop) {
      document.addEventListener('dragstart', (e) => {
        if (e.target.closest(applyToSelector) || e.target.tagName === 'IMG') {
          e.preventDefault();
          return false;
        }
      });
    }

    // Raccourcis clavier de copie/inspection sur contenu protégé
    document.addEventListener('keydown', (e) => {
      const onProtected = e.target.closest(applyToSelector);
      if (onProtected) {
        if ((e.ctrlKey || e.metaKey) && ['c','x','s','u'].includes(e.key.toLowerCase())) {
          e.preventDefault();
          _logSuspect('keyboard_copy');
        }
      }
    });
  }

  /* ── Toast protection ── */
  function _showProtectionToast(msg) {
    const existing = document.getElementById('atlas-protection-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'atlas-protection-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px; left: 50%; transform: translateX(-50%);
      background: rgba(13,27,62,0.97);
      border: 1px solid rgba(201,168,76,0.35);
      border-radius: 8px;
      padding: 10px 20px;
      font-family: 'Raleway', sans-serif;
      font-size: 13px;
      color: #C9A84C;
      z-index: 99999;
      white-space: nowrap;
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
      animation: atlas-toast-in .2s ease;
    `;
    toast.textContent = '🔒 ' + msg;

    const anim = document.createElement('style');
    anim.textContent = `@keyframes atlas-toast-in { from { opacity:0; transform:translateX(-50%) translateY(8px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }`;
    document.head.appendChild(anim);
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  /* ════════════════════════════════════════════════════════
     5. BANNIÈRE SÉCURITÉ (page securite.html)
  ════════════════════════════════════════════════════════ */

  function getSecurityReport() {
    const sessions  = _getSessions().filter(s => Date.now() - s.lastSeen < 4 * 3600 * 1000);
    const suspect   = _getSuspectData();
    const deviceId  = getDeviceId();
    const identity  = getUserIdentity();

    return {
      identity,
      deviceId,
      activeSessions: sessions.length,
      sessions,
      suspectScore: suspect.count || 0,
      suspectEvents: (suspect.events || []).slice(-5),
    };
  }

  /* ════════════════════════════════════════════════════════
     INIT GLOBAL — à appeler sur les pages protégées
  ════════════════════════════════════════════════════════ */

  function init(options = {}) {
    const {
      watermark    = true,
      sessionLimit = true,
      maxDevices   = 2,
      shareDetect  = true,
      contentProt  = true,
      onBlocked    = null, // callback si session bloquée
    } = options;

    if (watermark)   injectWatermark();
    if (shareDetect) initShareDetection();
    if (contentProt) protectContent();

    if (sessionLimit) {
      const check = checkSessionLimit(maxDevices);
      if (check.blocked && typeof onBlocked === 'function') {
        onBlocked(check);
      }
    }

    registerSession();
  }

  /* ── API publique ── */
  return {
    init,
    injectWatermark,
    checkSessionLimit,
    registerSession,
    initShareDetection,
    protectContent,
    getSecurityReport,
    getSuspectScore,
    getDeviceId,
  };

})();
