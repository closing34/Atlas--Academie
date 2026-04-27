/* ============================================================
   ATLAS ACADÉMIE — MOTEUR DE FORMATIONS E-LEARNING
   
   Gère :
   - Progression par leçon (verrouillée / déverrouillée / complétée)
   - 4 types d'exercices : QCM, Flashcards, Cas pratiques, Roleplay IA
   - XP par leçon + badge de completion
   - localStorage sync (→ Supabase quand activé)
   ============================================================ */

const AtlasFormations = (function () {
  'use strict';

  const STORAGE_KEY = 'atlas_formations_v1';
  const XP_LESSON_COMPLETE = 15;
  const XP_EXERCISE_PASS   = 25;
  const XP_FORMATION_DONE  = 100;

  /* ── Lecture / écriture état ── */
  function getState() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
    catch { return {}; }
  }
  function saveState(s) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  }

  /* ── Progression ── */
  function getLessonState(formationId, moduleId, lessonId) {
    const s = getState();
    return s[formationId]?.[moduleId]?.[lessonId] || { read: false, exercisePassed: false, score: null };
  }

  function markLessonRead(formationId, moduleId, lessonId) {
    const s = getState();
    if (!s[formationId]) s[formationId] = {};
    if (!s[formationId][moduleId]) s[formationId][moduleId] = {};
    if (!s[formationId][moduleId][lessonId]) s[formationId][moduleId][lessonId] = {};
    if (s[formationId][moduleId][lessonId].read) return false; // déjà lu
    s[formationId][moduleId][lessonId].read = true;
    saveState(s);
    // XP
    if (window.AtlasGamification) AtlasGamification.addXP(XP_LESSON_COMPLETE, 'lesson_read');
    return true;
  }

  function markExercisePassed(formationId, moduleId, lessonId, score) {
    const s = getState();
    if (!s[formationId]?.[moduleId]?.[lessonId]) return;
    const already = s[formationId][moduleId][lessonId].exercisePassed;
    s[formationId][moduleId][lessonId].exercisePassed = true;
    s[formationId][moduleId][lessonId].score = score;
    saveState(s);
    if (!already && window.AtlasGamification) AtlasGamification.addXP(XP_EXERCISE_PASS, 'exercise_passed');
    checkFormationComplete(formationId);
  }

  function checkFormationComplete(formationId) {
    if (!window.ATLAS_FORMATIONS) return;
    const f = ATLAS_FORMATIONS[formationId];
    if (!f) return;
    const s = getState();
    const allDone = f.modules.every(mod =>
      mod.lessons.every(les =>
        s[formationId]?.[mod.id]?.[les.id]?.exercisePassed === true
      )
    );
    if (allDone) {
      const key = `atlas_formation_done_${formationId}`;
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, '1');
        if (window.AtlasGamification) AtlasGamification.addXP(XP_FORMATION_DONE, 'formation_complete');
        showCompletionModal(f.title);
      }
    }
  }

  function isLessonUnlocked(formationId, moduleIdx, lessonIdx, formation) {
    if (moduleIdx === 0 && lessonIdx === 0) return true; // 1ère leçon toujours dispo
    const s = getState();
    // Leçon précédente dans le même module
    if (lessonIdx > 0) {
      const prevLesson = formation.modules[moduleIdx].lessons[lessonIdx - 1];
      return s[formationId]?.[formation.modules[moduleIdx].id]?.[prevLesson.id]?.read === true;
    }
    // 1ère leçon d'un nouveau module → toute dernière leçon du module précédent lue
    const prevModule = formation.modules[moduleIdx - 1];
    const lastLesson = prevModule.lessons[prevModule.lessons.length - 1];
    return s[formationId]?.[prevModule.id]?.[lastLesson.id]?.read === true;
  }

  function getFormationProgress(formationId) {
    if (!window.ATLAS_FORMATIONS) return 0;
    const f = ATLAS_FORMATIONS[formationId];
    if (!f) return 0;
    const s = getState();
    let total = 0, done = 0;
    f.modules.forEach(mod => {
      mod.lessons.forEach(les => {
        total++;
        if (s[formationId]?.[mod.id]?.[les.id]?.read) done++;
      });
    });
    return total > 0 ? Math.round((done / total) * 100) : 0;
  }

  /* ── Modal completion ── */
  function showCompletionModal(title) {
    const el = document.createElement('div');
    el.style.cssText = `
      position:fixed;top:0;left:0;right:0;bottom:0;
      background:rgba(0,0,0,.85);z-index:9999;
      display:flex;align-items:center;justify-content:center;
    `;
    el.innerHTML = `
      <div style="background:linear-gradient(135deg,#0d1b3e,#1a2c55);border:1px solid rgba(201,168,76,.4);
        border-radius:16px;padding:3rem;text-align:center;max-width:460px;animation:fadeInUp .4s ease;">
        <div style="font-size:3rem;margin-bottom:1rem;">🏆</div>
        <h2 style="font-family:var(--font-title);color:var(--gold);font-size:1.6rem;margin-bottom:.75rem;">
          Formation complétée !
        </h2>
        <p style="color:var(--gray);margin-bottom:.5rem;">${title}</p>
        <p style="color:var(--gold);font-family:var(--font-title);font-size:1.1rem;margin-bottom:2rem;">
          +${XP_FORMATION_DONE} XP bonus débloqués
        </p>
        <a href="certificat.html" style="display:inline-block;background:rgba(201,168,76,.15);
          border:1px solid rgba(201,168,76,.4);color:var(--gold);padding:.75rem 2rem;
          border-radius:8px;font-family:var(--font-title);font-size:.8rem;letter-spacing:.1em;
          text-decoration:none;margin-right:.5rem;">
          📜 Obtenir mon certificat →
        </a>
        <button onclick="this.closest('div').parentElement.remove()"
          style="background:transparent;border:1px solid rgba(255,255,255,.1);color:var(--gray);
          padding:.75rem 1.5rem;border-radius:8px;cursor:pointer;font-size:.8rem;">
          Fermer
        </button>
      </div>`;
    document.body.appendChild(el);
  }

  return { getState, getLessonState, markLessonRead, markExercisePassed, isLessonUnlocked, getFormationProgress };
})();
