/* ═══════════════════════════════════════════════════════════════════════
   js/n4.js — N4 道場 exam-prep section, merged into the Minna no Nihongo site.

   This is the standalone N4 app's engine (SRS + 15-week daily allocator +
   Today/Learn/Review/Quiz/Schedule/Progress/Content views) ported to run as a
   *section* of this website — exactly like the Repository. Instead of owning
   the whole page it renders into #mode-area and swaps #mode-tabs-wrap for its
   own tab bar. Everything is wrapped in an IIFE so none of its internals leak
   into app.js's globals; only window.N4 is exposed.

   Persistence: localStorage keys  n4_srs · n4_log · n4_planChecks · n4_extra,
   mirrored to Firestore by FireSync (see auth.js) under users/{uid}/n4/*.
   One Google login → both the lesson track and this exam track sync across
   all your devices.

   Content comes from window.N4_CONTENT (kanji + grammar) and window.N4_VOCAB,
   loaded by js/n4-content.js and js/n4-vocab.js before this file.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Storage wrapper — localStorage + Firebase sync (mirrors site Store) ── */
  const NStore = {
    ok: true,
    mem: {},
    _key(k) { return 'n4_' + k; },
    get(k) {
      try {
        const v = localStorage.getItem(this._key(k));
        return v ? JSON.parse(v) : null;
      } catch (e) { this.ok = false; return (k in this.mem) ? this.mem[k] : null; }
    },
    set(k, v) {
      try { localStorage.setItem(this._key(k), JSON.stringify(v)); }
      catch (e) { this.ok = false; this.mem[k] = v; }
      // Mirror to Firestore through the site's existing sync layer.
      if (typeof FireSync !== 'undefined') FireSync.push(this._key(k), v);
    }
  };

  /* ── Content fallback (real content always arrives via N4_CONTENT/N4_VOCAB) ── */
  const SEED = { kanji: [], vocab: [], grammar: [] };

  /* ── 15-week plan (to December 6, 2026) ── */
  const EXAM = new Date('2026-12-06T09:00:00');
  const PLAN = [
    ['Aug 25–31', 'Set up SRS · consolidate N5 kanji · grammar Unit 1'],
    ['Sep 1–7', 'Finish N5 kanji · start N4 kanji · grammar Unit 2'],
    ['Sep 8–14', 'N4 kanji · vocab breadth · grammar Unit 3'],
    ['Sep 15–21', 'N4 kanji · grammar Unit 4 · Week 1–3 kanji checkpoint'],
    ['Sep 22–28', 'Kanji · grammar Unit 5 · start light reading'],
    ['Sep 29–Oct 5', 'Kanji · grammar Unit 6 · listening 15 min/day'],
    ['Oct 6–12', 'Kanji · grammar Unit 7 · graded readers begin'],
    ['Oct 13–19', 'Kanji · grammar Unit 8 · reading every other day'],
    ['Oct 20–26', 'Finish N4 kanji (~300) · grammar Unit 9 · timed Vocab section'],
    ['Oct 27–Nov 2', 'Finish grammar points · daily reading · listening 20–25 min'],
    ['Nov 3–9', 'Grammar review pass · timed Grammar+Reading section'],
    ['Nov 10–16', 'Kanji weak-list · timed Listening section · reading speed'],
    ['Nov 17–23', 'First full timed mock · score it · target weakest section'],
    ['Nov 24–30', 'Second full mock · re-drill only mock errors · keep shadowing'],
    ['Dec 1–6', 'Light review · half-mock by Wed · rest · EXAM Sun Dec 6']
  ];
  const PLAN_START = new Date('2026-08-25T00:00:00');

  /* ── Utilities ── */
  const $ = s => document.querySelector(s);
  const todayStr = () => new Date().toISOString().slice(0, 10);
  function addDays(dateStr, n) { const d = new Date(dateStr + 'T00:00:00'); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); }
  function daysBetween(a, b) { return Math.round((new Date(b) - new Date(a)) / 86400000); }
  function uid(type, idx) { return type[0] + '_' + idx; }
  function toast(msg) { const t = $('#n4-toast'); if (!t) return; t.textContent = msg; t.classList.add('show'); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 1800); }

  /* Leitner intervals by box */
  const INTERVAL = { 1: 1, 2: 2, 3: 4, 4: 7, 5: 14, 6: 30, 7: 60 };
  const MASTER_BOX = 4; // box>=4 (7-day+ interval) counts as "mastered"

  /* ── State (re-hydrated from storage every time the section is opened) ── */
  let content = { kanji: [], vocab: [], grammar: [] };
  let srs = {};        // id -> {box,due,reps,lapses}
  let log = {};        // 'YYYY-MM-DD' -> {reviews,learned,quiz}
  let planChecks = {};
  let view = 'today';

  function hydrate() {
    srs = NStore.get('srs') || {};
    log = NStore.get('log') || {};
    planChecks = NStore.get('planChecks') || {};
  }

  /* Spread whatever content is loaded across the learning window (through ~week
     12); weeks 13–15 stay free for consolidation and full mocks. */
  const NEW_WINDOW = { kanji: 80, vocab: 83, grammar: 82 };
  function dayIndexOf(type, idxInCat, catLen) {
    const end = NEW_WINDOW[type] || 69;
    if (catLen <= 0) return 0;
    return Math.min(end, Math.floor(idxInCat * (end + 1) / catLen));
  }
  function buildContent() {
    const BASE = (window.N4_CONTENT && window.N4_CONTENT.kanji) ? window.N4_CONTENT : SEED;
    if (BASE === SEED) console.warn('[N4] window.N4_CONTENT not found — is js/n4-content.js loaded before js/n4.js?');
    const extra = NStore.get('extra') || { kanji: [], vocab: [], grammar: [] };
    content = { kanji: [], vocab: [], grammar: [] };
    ['kanji', 'vocab', 'grammar'].forEach(type => {
      let baseArr = (BASE[type] || []);
      if (type === 'vocab' && window.N4_VOCAB && window.N4_VOCAB.length) baseArr = window.N4_VOCAB;
      const all = baseArr.concat(extra[type] || []);
      content[type] = all.map((it, i) => Object.assign({ id: uid(type, i), type, idx: i, day: dayIndexOf(type, i, all.length) }, it));
    });
  }
  function todayIndex() { return Math.max(0, daysBetween(PLAN_START.toISOString().slice(0, 10), todayStr())); }
  function portionForDay(type, dayIdx) { return itemsOf(type).filter(it => it.day === dayIdx); }
  function catchUpList(type) {
    const t = todayIndex();
    return itemsOf(type).filter(it => !isSeen(it.id) && it.day <= t).sort((a, b) => a.day - b.day || a.idx - b.idx);
  }
  function saveSrs() { NStore.set('srs', srs); }
  function saveLog() { NStore.set('log', log); }
  function bump(field) { const d = todayStr(); log[d] = log[d] || { reviews: 0, learned: 0, quiz: 0 }; log[d][field]++; saveLog(); }

  /* ── SRS helpers ── */
  function allItems() { return content.kanji.concat(content.vocab, content.grammar); }
  function itemsOf(type) { return content[type]; }
  function isSeen(id) { return !!srs[id]; }
  function isDue(id) { const s = srs[id]; return s && s.due <= todayStr(); }
  function isMastered(id) { const s = srs[id]; return s && s.box >= MASTER_BOX; }
  function dueList(typeFilter) {
    return allItems().filter(it => (!typeFilter || it.type === typeFilter) && isDue(it.id))
      .sort((a, b) => (srs[a.id].due < srs[b.id].due ? -1 : 1));
  }
  function newList(type) { return itemsOf(type).filter(it => !isSeen(it.id)); }
  function introduce(id) { srs[id] = { box: 1, due: addDays(todayStr(), INTERVAL[1]), reps: 0, lapses: 0 }; bump('learned'); saveSrs(); }
  function grade(id, g) { // g: 'again' | 'good' | 'easy'
    const s = srs[id]; if (!s) return;
    if (g === 'again') { s.box = 1; s.lapses++; s.due = todayStr(); }
    else {
      const nb = Math.min(7, s.box + (g === 'easy' ? 2 : 1));
      s.box = nb; s.due = addDays(todayStr(), INTERVAL[nb]);
    }
    s.reps++; bump('reviews'); saveSrs();
  }

  /* ── Stats ── */
  function catStats(type) {
    const items = itemsOf(type);
    const seen = items.filter(it => isSeen(it.id)).length;
    const mastered = items.filter(it => isMastered(it.id)).length;
    return { total: items.length, seen, mastered, due: items.filter(it => isDue(it.id)).length };
  }
  function streak() {
    let n = 0, d = todayStr();
    if (!(log[d] && (log[d].reviews || log[d].learned || log[d].quiz))) d = addDays(d, -1);
    while (log[d] && (log[d].reviews || log[d].learned || log[d].quiz)) { n++; d = addDays(d, -1); }
    return n;
  }
  function planWeekIndex() {
    const diff = daysBetween(PLAN_START.toISOString().slice(0, 10), todayStr());
    if (diff < 0) return 0;
    return Math.min(PLAN.length - 1, Math.floor(diff / 7));
  }
  function daysToExam() { return Math.max(0, Math.ceil((EXAM - new Date()) / 86400000)); }

  /* ═══════════════════════════ VIEWS ═══════════════════════════ */
  const VIEWS = { today: viewToday, learn: viewLearn, review: viewReview, quiz: viewQuiz, schedule: viewSchedule, progress: viewProgress, data: viewData };
  const AFTER = { today: afterToday, learn: afterLearn, review: afterReview, quiz: afterQuiz, schedule: afterSchedule, progress: afterProgress, data: afterData };

  function render() {
    const host = document.getElementById('mode-area');
    if (!host) return;
    host.innerHTML = '<div class="n4-root">' + (VIEWS[view] || viewToday)() + '<div class="toast" id="n4-toast"></div></div>';
    document.querySelectorAll('#mode-tabs-wrap .mode-tab[data-n4view]').forEach(b =>
      b.classList.toggle('active', b.dataset.n4view === view));
    (AFTER[view] || (() => {}))();
  }

  /* ---------- TODAY ---------- */
  function viewToday() {
    const k = catStats('kanji'), v = catStats('vocab'), g = catStats('grammar');
    const dueTotal = k.due + v.due + g.due;
    const newTotal = newList('kanji').length + newList('vocab').length + newList('grammar').length;
    const st = streak();
    const wi = planWeekIndex();
    const ring = (label, s) => {
      const pct = s.total ? Math.round(s.mastered / s.total * 100) : 0;
      const seenPct = s.total ? Math.round(s.seen / s.total * 100) : 0;
      return `<div class="ring"><div class="dial" style="background:conic-gradient(var(--n4-shu) 0 ${pct}%, var(--n4-celadon-soft) ${pct}% ${seenPct}%, var(--n4-line) ${seenPct}% 100%)">
        <div class="inner"><div class="pct">${pct}<span style="font-size:11px">%</span></div><div class="of">${s.mastered}/${s.total}</div></div></div>
        <div class="name">${label}</div></div>`;
    };
    return `
    <div class="today-head">
      <div class="countdown">
        <div class="big">${daysToExam()}</div>
        <div class="lbl">days to the exam</div>
        <div class="date">Sun · December 6, 2026</div>
        <div class="wk">Plan week ${wi + 1} of 15 · ${PLAN[wi][0]}</div>
      </div>
      <div class="seal">
        <div class="stamp ${st ? '' : 'dim'}"><div class="n">${st}</div><div class="d">日</div></div>
        <div class="cap">${st ? `${st}-day streak` : 'Study today to start a streak'}</div>
      </div>
    </div>

    <div class="grid cols-2">
      <div class="panel">
        <div class="eyebrow">This week's focus</div>
        <h2 class="section">${PLAN[wi][1]}</h2>
        <div class="stat-row" style="margin-top:14px">
          <div class="stat"><div class="k">Due today</div><div class="v">${dueTotal}</div></div>
          <div class="stat"><div class="k">New available</div><div class="v">${newTotal}</div></div>
          <div class="stat"><div class="k">Reviewed today</div><div class="v">${(log[todayStr()] || {}).reviews || 0}</div></div>
        </div>
        <div class="btnrow" style="margin-top:16px">
          <button class="btn shu" data-go="review" ${dueTotal ? '' : 'disabled'}>Review ${dueTotal} due →</button>
          <button class="btn ghost" data-go="learn">Learn new</button>
          <button class="btn ghost" data-go="quiz">Quiz me</button>
        </div>
      </div>

      <div class="panel">
        <div class="eyebrow">Mastery</div>
        <h2 class="section">How much has stuck</h2>
        <div class="rings" style="margin-top:16px">
          ${ring('Kanji', k)}${ring('Vocab', v)}${ring('Grammar', g)}
        </div>
        <div style="display:flex;gap:14px;justify-content:center;margin-top:14px;flex-wrap:wrap">
          <span class="pill"><span class="dot shu"></span>Mastered</span>
          <span class="pill"><span class="dot cel"></span>Learning</span>
          <span class="pill"><span class="dot ink" style="background:var(--n4-line)"></span>Not started</span>
        </div>
      </div>
    </div>

    ${todayPortionPanel()}

    ${NStore.ok ? '' : '<div class="note" style="margin-top:16px">Heads up: this preview can\'t save progress. Open the site in your own browser (or on GitHub Pages) and sign in so your streak and reviews persist and sync.</div>'}
    `;
  }
  function todayPortionPanel() {
    const ti = todayIndex();
    if (ti >= Math.max(...Object.values(NEW_WINDOW)) + 1) {
      return `<div class="panel" style="margin-top:16px"><div class="eyebrow">Today's portion</div>
        <h2 class="section">Consolidation phase — no new items</h2>
        <p class="muted" style="margin-top:6px">You're past the learning window. Today is for reviews, reading, listening and mock practice. Clear your due reviews and drill weak items.</p></div>`;
    }
    const chip = (it, seen) => `<span class="pill" style="${seen ? 'opacity:.5;text-decoration:line-through' : ''}">${it.level ? `<span class="lvtag ${it.level}">${it.level}</span>` : ''}<span class="jp" style="font-size:15px">${it.char || it.word || it.pattern}</span></span>`;
    const row = (type, label) => {
      const items = portionForDay(type, ti);
      if (!items.length) return `<div class="kv"><span>${label}</span><b class="faint">—</b></div>`;
      const done = items.filter(it => isSeen(it.id)).length;
      return `<div style="padding:8px 0;border-bottom:1px dashed var(--n4-line)">
        <div style="display:flex;justify-content:space-between;margin-bottom:6px"><span class="eyebrow">${label} · ${done}/${items.length}</span></div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">${items.map(it => chip(it, isSeen(it.id))).join('')}</div>
      </div>`;
    };
    const k = portionForDay('kanji', ti), v = portionForDay('vocab', ti), g = portionForDay('grammar', ti);
    const total = k.length + v.length + g.length;
    const doneAll = [...k, ...v, ...g].filter(it => isSeen(it.id)).length;
    return `<div class="panel" style="margin-top:16px">
      <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:8px">
        <div><div class="eyebrow">Today's portion · Day ${ti + 1}</div><h2 class="section">Learn these ${total} items today</h2></div>
        <button class="btn shu sm" data-go="learn">Start today's learning →</button>
      </div>
      <div style="margin-top:10px">${row('kanji', 'Kanji')}${row('vocab', 'Vocab')}${row('grammar', 'Grammar')}</div>
      <p class="muted" style="margin-top:10px;font-size:13px">${doneAll >= total && total > 0 ? 'All of today\'s new items are in your review rotation. ✓' : 'Grey/struck items are already learned. Behind? The Learn tab serves any earlier items you missed first.'}</p>
    </div>`;
  }
  function afterToday() { document.querySelectorAll('.n4-root [data-go]').forEach(b => b.onclick = () => { go(b.dataset.go); }); }

  /* ---------- LEARN ---------- */
  let learnCat = 'kanji', learnRevealed = false, learnItem = null, learnLevel = 'all';
  const lvOK = it => learnLevel === 'all' || it.level === learnLevel;
  function viewLearn() {
    return `
    <div class="panel">
      <div class="cat-select" id="learnCats">
        ${['kanji', 'vocab', 'grammar'].map(t => `<button class="chip" data-cat="${t}" aria-pressed="${t === learnCat}">${t[0].toUpperCase() + t.slice(1)} · ${catchUpList(t).filter(lvOK).length} due / ${newList(t).filter(lvOK).length} left</button>`).join('')}
      </div>
      <div class="cat-select" id="learnLevels" style="margin-top:-6px">
        ${[['all', 'All'], ['N5', 'N5 only'], ['N4', 'N4 only']].map(([v, l]) => `<button class="chip" data-lv="${v}" aria-pressed="${v === learnLevel}" style="padding:6px 13px">${l}</button>`).join('')}
      </div>
      <div id="learnStage"></div>
    </div>`;
  }
  function renderLearnStage() {
    const stage = $('#learnStage');
    const cu = catchUpList(learnCat).filter(lvOK);
    const ahead = !cu.length;
    const queue = cu.length ? cu : newList(learnCat).filter(lvOK);
    const done = itemsOf(learnCat).length - newList(learnCat).length;
    if (!learnItem || !queue.find(x => x.id === learnItem.id)) learnItem = queue[0] || null;
    if (!learnItem) {
      stage.innerHTML = `<div class="empty"><div class="big">済</div>Every ${learnCat} item is in your review rotation.<br><span class="faint">Add more from the Content tab, then come back.</span></div>`;
      return;
    }
    const total = itemsOf(learnCat).length;
    const banner = ahead
      ? `<span class="pill"><span class="dot cel"></span>Caught up — learning ahead</span>`
      : `<span class="pill"><span class="dot shu"></span>${cu.length} to learn today</span>`;
    const lvb = learnItem && learnItem.level ? `<span class="lvtag ${learnItem.level}">${learnItem.level}</span>` : '';
    const strip = `<div class="prog-strip"><span class="faint" style="font-size:12px">${done}/${total} learned</span><div class="bar"><span style="width:${Math.round(done / total * 100)}%"></span></div>${lvb}${banner}</div>`;
    const it = learnItem;
    let front = '', back = '';
    if (learnCat === 'kanji') {
      front = `<div class="kanji-big jp">${it.char}</div>`;
      back = `<div class="meaning">${it.meaning}</div>
        <div class="detail" style="margin-top:8px">On: <b class="jp">${it.on}</b> &nbsp;·&nbsp; Kun: <b class="jp">${it.kun}</b></div>
        <div class="ex"><div class="exjp">${it.ex} <span style="color:var(--n4-shu)">（${it.exr}）</span></div><div class="extr">${it.exm}</div></div>`;
    } else if (learnCat === 'vocab') {
      front = `<div class="word-big jp">${it.word}</div>`;
      back = `<div class="reading jp">${it.reading}</div><div class="meaning">${it.meaning}</div><div class="detail" style="margin-top:6px">${it.pos}</div>`;
    } else {
      front = `<div class="grammar-big jp">${it.pattern}</div>`;
      back = `<div class="meaning">${it.meaning}</div><div class="detail" style="margin-top:6px"><b>Form:</b> ${it.structure}</div>
        <div class="ex"><div class="exjp">${it.ex}</div><div class="extr">${it.extr}</div></div>`;
    }
    stage.innerHTML = `${strip}
      <div class="study-stage">${front}${learnRevealed ? back : '<div class="faint" style="margin-top:20px">Recall what you can, then reveal.</div>'}</div>
      <div class="btnrow" style="justify-content:center">
        ${learnRevealed
        ? `<button class="btn ghost sm" id="lskip">Skip for now</button><button class="btn shu" id="ladd">Got it — add to reviews →</button>`
        : `<button class="btn ghost sm" id="lskip">Skip</button><button class="btn" id="lreveal">Reveal</button>`}
      </div>`;
    if ($('#lreveal')) $('#lreveal').onclick = () => { learnRevealed = true; renderLearnStage(); };
    if ($('#ladd')) $('#ladd').onclick = () => { introduce(it.id); learnRevealed = false; learnItem = null; toast('Added to reviews'); renderLearnStage(); updateLearnChips(); };
    if ($('#lskip')) $('#lskip').onclick = () => { const q = newList(learnCat).filter(lvOK); const i = q.findIndex(x => x.id === it.id); learnItem = q[(i + 1) % q.length] || null; learnRevealed = false; renderLearnStage(); };
  }
  function updateLearnChips() { document.querySelectorAll('#learnCats .chip').forEach(c => { const t = c.dataset.cat; c.textContent = `${t[0].toUpperCase() + t.slice(1)} · ${catchUpList(t).filter(lvOK).length} due / ${newList(t).filter(lvOK).length} left`; }); }
  function afterLearn() {
    document.querySelectorAll('#learnCats .chip').forEach(c => c.onclick = () => { learnCat = c.dataset.cat; learnItem = null; learnRevealed = false; document.querySelectorAll('#learnCats .chip').forEach(x => x.setAttribute('aria-pressed', x.dataset.cat === learnCat)); renderLearnStage(); });
    document.querySelectorAll('#learnLevels .chip').forEach(c => c.onclick = () => { learnLevel = c.dataset.lv; learnItem = null; learnRevealed = false; document.querySelectorAll('#learnLevels .chip').forEach(x => x.setAttribute('aria-pressed', x.dataset.lv === learnLevel)); updateLearnChips(); renderLearnStage(); });
    renderLearnStage();
  }

  /* ---------- REVIEW ---------- */
  let reviewQueue = [], reviewRevealed = false;
  function viewReview() { return `<div class="panel"><div id="reviewStage"></div></div>`; }
  function renderReviewStage() {
    const stage = $('#reviewStage');
    if (!reviewQueue.length) reviewQueue = dueList();
    if (!reviewQueue.length) {
      stage.innerHTML = `<div class="empty"><div class="big">〆</div>No reviews due. Well done.<br><span class="faint">Learn new items or come back tomorrow.</span></div>
        <div class="btnrow" style="justify-content:center"><button class="btn ghost" data-go="learn">Learn new</button></div>`;
      stage.querySelector('[data-go]').onclick = () => { go('learn'); };
      return;
    }
    const it = reviewQueue[0];
    const remaining = reviewQueue.length;
    let front = '', back = '';
    if (it.type === 'kanji') {
      front = `<div class="kanji-big jp">${it.char}</div>`;
      back = `<div class="meaning">${it.meaning}</div><div class="detail" style="margin-top:8px">On: <b class="jp">${it.on}</b> · Kun: <b class="jp">${it.kun}</b></div><div class="ex"><div class="exjp">${it.ex}（${it.exr}）</div><div class="extr">${it.exm}</div></div>`;
    } else if (it.type === 'vocab') {
      front = `<div class="word-big jp">${it.word}</div>`;
      back = `<div class="reading jp">${it.reading}</div><div class="meaning">${it.meaning}</div>`;
    } else {
      front = `<div class="grammar-big jp">${it.pattern}</div>`;
      back = `<div class="meaning">${it.meaning}</div><div class="detail" style="margin-top:6px"><b>Form:</b> ${it.structure}</div><div class="ex"><div class="exjp">${it.ex}</div><div class="extr">${it.extr}</div></div>`;
    }
    stage.innerHTML = `
      <div class="prog-strip"><span class="faint" style="font-size:12px">${remaining} to review</span><div class="bar"><span style="width:${Math.round((1 - remaining / (remaining + (log[todayStr()] || {}).reviews || remaining)) * 100)}%"></span></div>${it.level ? `<span class="lvtag ${it.level}">${it.level}</span>` : ''}<span class="pill">${it.type}</span></div>
      <div class="study-stage">${front}${reviewRevealed ? back : '<div class="faint" style="margin-top:20px">Recall the reading &amp; meaning…</div>'}</div>
      <div class="btnrow" style="justify-content:center">
        ${reviewRevealed
        ? `<button class="btn" style="background:var(--n4-shu);border-color:var(--n4-shu)" id="gAgain">Again</button>
             <button class="btn" id="gGood">Good</button>
             <button class="btn ghost" id="gEasy">Easy</button>`
        : `<button class="btn" id="rReveal">Show answer</button>`}
      </div>`;
    if ($('#rReveal')) $('#rReveal').onclick = () => { reviewRevealed = true; renderReviewStage(); };
    const next = (g) => { grade(it.id, g); reviewQueue.shift(); reviewRevealed = false; renderReviewStage(); };
    if ($('#gAgain')) $('#gAgain').onclick = () => {
      grade(it.id, 'again'); const first = reviewQueue.shift(); reviewQueue.splice(Math.min(3, reviewQueue.length), 0, first); reviewRevealed = false; renderReviewStage();
    };
    if ($('#gGood')) $('#gGood').onclick = () => next('good');
    if ($('#gEasy')) $('#gEasy').onclick = () => next('easy');
  }
  function afterReview() { reviewQueue = []; reviewRevealed = false; renderReviewStage(); }

  /* ---------- QUIZ ---------- */
  let quiz = null;
  function makeQuiz(n = 10) {
    const pool = allItems().filter(it => isSeen(it.id));
    const source = pool.length >= 4 ? pool : allItems();
    const qs = [];
    const shuffled = [...source].sort(() => Math.random() - .5).slice(0, n);
    shuffled.forEach(it => {
      const sameType = source.filter(x => x.type === it.type && x.id !== it.id);
      let prompt, answer, getLabel;
      if (it.type === 'kanji') {
        const mode = Math.random() < .5 ? 'm' : 'r';
        prompt = it.char;
        if (mode === 'm') { answer = it.meaning; getLabel = x => x.meaning; }
        else { answer = it.exr; getLabel = x => x.exr; }
        var sub = mode === 'm' ? 'Choose the meaning' : 'Choose the reading of the example word ' + it.ex;
      } else if (it.type === 'vocab') {
        const mode = Math.random() < .5 ? 'm' : 'r';
        prompt = it.word;
        if (mode === 'm') { answer = it.meaning; getLabel = x => x.meaning; }
        else { answer = it.reading; getLabel = x => x.reading; }
        var sub = mode === 'm' ? 'Choose the meaning' : 'Choose the reading';
      } else {
        prompt = it.pattern; answer = it.meaning; getLabel = x => x.meaning; var sub = 'Choose the meaning of this grammar';
      }
      const distract = sameType.sort(() => Math.random() - .5).slice(0, 3).map(getLabel);
      const opts = [answer, ...distract].filter((v, i, a) => a.indexOf(v) === i).sort(() => Math.random() - .5);
      qs.push({ prompt, sub, answer, opts, type: it.type, jp: it.type !== 'grammar' });
    });
    return { qs, i: 0, score: 0, answered: false };
  }
  function viewQuiz() { return `<div class="panel"><div id="quizStage"></div></div>`; }
  function renderQuizStage() {
    const stage = $('#quizStage');
    if (!quiz) {
      const learned = allItems().filter(it => isSeen(it.id)).length;
      stage.innerHTML = `<div class="empty"><div class="big">試</div>Quick multiple-choice check.<br>
        <span class="faint">${learned ? `Drawing from your ${learned} learned items (plus a few new ones).` : 'Start with a mixed set — then learn items to sharpen it.'}</span></div>
        <div class="btnrow" style="justify-content:center"><button class="btn shu" id="qstart">Start 10-question quiz</button></div>`;
      $('#qstart').onclick = () => { quiz = makeQuiz(10); renderQuizStage(); };
      return;
    }
    if (quiz.i >= quiz.qs.length) {
      const pct = Math.round(quiz.score / quiz.qs.length * 100);
      bump('quiz');
      stage.innerHTML = `<div class="empty"><div class="big">${pct}%</div>${quiz.score} / ${quiz.qs.length} correct
        <div class="faint" style="margin-top:6px">${pct >= 80 ? 'Sharp. That would pass comfortably.' : pct >= 60 ? 'Solid — review the ones you missed.' : 'Keep drilling these in Review.'}</div></div>
        <div class="btnrow" style="justify-content:center"><button class="btn shu" id="qagain">Another quiz</button><button class="btn ghost" data-go="review">Go to review</button></div>`;
      $('#qagain').onclick = () => { quiz = makeQuiz(10); renderQuizStage(); };
      stage.querySelector('[data-go]').onclick = () => { go('review'); };
      quiz = null;
      return;
    }
    const q = quiz.qs[quiz.i];
    stage.innerHTML = `
      <div class="prog-strip"><span class="faint" style="font-size:12px">Question ${quiz.i + 1}/${quiz.qs.length}</span><div class="bar"><span style="width:${Math.round(quiz.i / quiz.qs.length * 100)}%"></span></div><span class="pill">Score ${quiz.score}</span></div>
      <div class="q-prompt ${q.jp ? 'jp' : ''}">${q.prompt}</div>
      <div class="q-sub">${q.sub}</div>
      <div class="opts" id="opts">${q.opts.map(o => `<button class="opt" data-opt="${encodeURIComponent(o)}">${o}</button>`).join('')}</div>`;
    document.querySelectorAll('#opts .opt').forEach(btn => btn.onclick = () => {
      if (quiz.answered) return; quiz.answered = true;
      const chosen = decodeURIComponent(btn.dataset.opt);
      document.querySelectorAll('#opts .opt').forEach(b => {
        const val = decodeURIComponent(b.dataset.opt);
        b.disabled = true;
        if (val === q.answer) b.classList.add('correct');
        else if (val === chosen) b.classList.add('wrong');
      });
      if (chosen === q.answer) quiz.score++;
      setTimeout(() => { quiz.i++; quiz.answered = false; renderQuizStage(); }, 900);
    });
  }
  function afterQuiz() { renderQuizStage(); }

  /* ---------- SCHEDULE (daily portions, micro→macro) ---------- */
  let schedWeek = null;
  function viewSchedule() {
    if (schedWeek === null) schedWeek = planWeekIndex();
    const start = PLAN_START.toISOString().slice(0, 10);
    const weekTabs = PLAN.map((p, i) => `<button class="chip" data-wk="${i}" aria-pressed="${i === schedWeek}" style="padding:7px 12px">W${i + 1}</button>`).join('');
    const goal = PLAN[schedWeek];
    const winMax = Math.max(...Object.values(NEW_WINDOW));
    let days = '';
    for (let d = 0; d < 7; d++) {
      const di = schedWeek * 7 + d;
      const date = addDays(start, di);
      const dd = new Date(date + 'T00:00:00');
      const wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dd.getDay()];
      const md = (dd.getMonth() + 1) + '/' + dd.getDate();
      const k = portionForDay('kanji', di), v = portionForDay('vocab', di), g = portionForDay('grammar', di);
      let body;
      if (di > winMax) {
        body = `<span class="faint">Consolidation — clear reviews, plus reading, listening &amp; mock practice per the week goal.</span>`;
      } else {
        const seg = (label, items, fmt) => items.length ? `<div style="margin:3px 0"><span class="eyebrow">${label}</span> &nbsp;<span class="jp" style="font-size:15px">${items.map(fmt).join('、')}</span></div>` : '';
        body = seg('Kanji', k, it => it.char) + seg('Vocab', v, it => it.word) + seg('Grammar', g, it => it.pattern);
        if (!body) body = `<span class="faint">Buffer / review day — no new items scheduled.</span>`;
      }
      const isToday = date === todayStr();
      days += `<div class="plan-row ${isToday ? 'now' : ''}" style="align-items:flex-start">
        <span class="wknum" style="width:56px;flex:0 0 56px;font-size:13px;line-height:1.3">${wd}<br>${md}</span>
        <div class="wkbody">${body}${isToday ? ' <span class="pill" style="margin-top:6px"><span class="dot shu"></span>today</span>' : ''}</div></div>`;
    }
    return `<div class="panel">
      <div class="eyebrow">Micro view · every day mapped</div>
      <h2 class="section">Daily portions</h2>
      <p class="muted" style="margin-top:6px">Each day lists exactly which new kanji, vocab and grammar to learn. The portions are generated from the content you've loaded, so they rescale automatically when you import more vocabulary. Spaced reviews of earlier items run on top of this, every day.</p>
      <div class="cat-select" style="margin-top:14px" id="schedWeeks">${weekTabs}</div>
      <div class="note" style="margin-bottom:14px"><b>Week ${schedWeek + 1} · ${goal[0]}</b> — ${goal[1]}</div>
      <div class="plan-list">${days}</div>
      <p class="muted" style="font-size:13px;margin-top:12px">New kanji finish around week 9, grammar around week 10; weeks 11–15 are consolidation and mocks. Jump to any week with the tabs above.</p>
    </div>`;
  }
  function afterSchedule() { document.querySelectorAll('#schedWeeks .chip').forEach(c => c.onclick = () => { schedWeek = +c.dataset.wk; render(); }); }

  /* ---------- PROGRESS ---------- */
  function viewProgress() {
    const cells = [];
    const start = addDays(todayStr(), -55);
    for (let i = 0; i < 56; i++) {
      const d = addDays(start, i);
      const r = (log[d] || {}).reviews || 0;
      const lv = r === 0 ? '' : r < 10 ? 'l1' : r < 25 ? 'l2' : 'l3';
      cells.push(`<div class="cell ${lv} ${d === todayStr() ? 'today' : ''}" title="${d}: ${r} reviews"></div>`);
    }
    const weeks = [];
    for (let w = 5; w >= 0; w--) {
      let sum = 0; const wStart = addDays(todayStr(), -(w * 7 + new Date().getDay()));
      for (let i = 0; i < 7; i++) { sum += ((log[addDays(wStart, i)] || {}).reviews || 0); }
      weeks.push({ label: w === 0 ? 'This' : (w + 'w'), val: sum });
    }
    const maxW = Math.max(10, ...weeks.map(x => x.val));
    const wi = planWeekIndex();
    const k = catStats('kanji'), v = catStats('vocab'), g = catStats('grammar');
    const totLearned = k.seen + v.seen + g.seen, totItems = k.total + v.total + g.total, totMaster = k.mastered + v.mastered + g.mastered;
    return `
    <div class="grid cols-2">
      <div class="panel">
        <div class="eyebrow">Consistency</div>
        <h2 class="section">Study calendar · last 8 weeks</h2>
        <div style="margin:16px 0"><div class="cal">${cells.join('')}</div></div>
        <div class="stat-row">
          <div class="stat"><div class="k">Current streak</div><div class="v">${streak()}<small> days</small></div></div>
          <div class="stat"><div class="k">Learned</div><div class="v">${totLearned}<small>/${totItems}</small></div></div>
          <div class="stat"><div class="k">Mastered</div><div class="v">${totMaster}</div></div>
        </div>
      </div>
      <div class="panel">
        <div class="eyebrow">Volume</div>
        <h2 class="section">Reviews per week</h2>
        <div class="weekbars">
          ${weeks.map(x => `<div class="wb"><div class="col" style="height:${Math.round(x.val / maxW * 100)}%"></div><div class="wl">${x.val}</div><div class="wl">${x.label}</div></div>`).join('')}
        </div>
        <hr class="soft">
        <div class="kv"><span>Kanji mastered</span><b>${k.mastered}/${k.total}</b></div>
        <div class="kv"><span>Vocab mastered</span><b>${v.mastered}/${v.total}</b></div>
        <div class="kv"><span>Grammar mastered</span><b>${g.mastered}/${g.total}</b></div>
      </div>
    </div>

    <div class="panel" style="margin-top:16px">
      <div class="eyebrow">The road to December 6</div>
      <h2 class="section">15-week plan</h2>
      <div class="plan-list" style="margin-top:10px">
        ${PLAN.map((p, i) => `<div class="plan-row ${i === wi ? 'now' : ''}">
          <input type="checkbox" data-wk="${i}" ${planChecks[i] ? 'checked' : ''} aria-label="Week ${i + 1} done">
          <span class="wknum">${i + 1}</span>
          <div class="wkbody"><div class="wkdate">${p[0]}${i === wi ? ' · this week' : ''}</div><div class="wkgoal">${p[1]}</div></div>
        </div>`).join('')}
      </div>
    </div>`;
  }
  function afterProgress() {
    document.querySelectorAll('.n4-root [data-wk]').forEach(c => c.onchange = () => { planChecks[c.dataset.wk] = c.checked; NStore.set('planChecks', planChecks); });
  }

  /* ---------- CONTENT / DATA ---------- */
  function viewData() {
    const cnt = t => itemsOf(t).length;
    return `
    <div class="panel">
      <div class="eyebrow">Make it your single source</div>
      <h2 class="section">Load / extend the N4 sets</h2>
      <p class="muted" style="margin-top:6px">You currently have ${cnt('kanji')} kanji · ${cnt('vocab')} vocab · ${cnt('grammar')} grammar loaded. Paste additional N4 items below to extend any category. Added items are saved to your account and merge with the built-in sets automatically — and the daily portions rescale to fit.</p>
      <div class="cat-select" id="dataCats">
        ${['kanji', 'vocab', 'grammar'].map((t, i) => `<button class="chip" data-dcat="${t}" aria-pressed="${i === 0}">${t}</button>`).join('')}
      </div>
      <div id="dataFormat" class="note" style="margin-bottom:10px"></div>
      <textarea id="dataInput" placeholder="Paste a JSON array here…"></textarea>
      <div class="btnrow" style="margin-top:12px">
        <button class="btn shu" id="dataAdd">Add to my content</button>
        <button class="btn ghost" id="dataSample">Insert example</button>
      </div>
    </div>

    <div class="panel" style="margin-top:16px">
      <div class="eyebrow">Backup</div>
      <h2 class="section">Your N4 progress data</h2>
      <p class="muted" style="margin-top:6px">Progress syncs to your Google account automatically. You can also export a local backup or reset your SRS here. (Lesson progress uses the sidebar Export/Import; this is the N4-only payload.)</p>
      <div class="btnrow" style="margin-top:6px">
        <button class="btn" id="expBtn">Export N4 backup (.json)</button>
        <label class="btn ghost" style="cursor:pointer">Import N4 backup<input id="impFile" type="file" accept="application/json" class="hide"></label>
        <button class="btn ghost" id="resetBtn" style="border-color:var(--n4-shu-soft);color:var(--n4-shu)">Reset N4 progress</button>
      </div>
      <hr class="soft">
      <div class="kv"><span>Items learned</span><b>${allItems().filter(it => isSeen(it.id)).length}</b></div>
      <div class="kv"><span>Storage working</span><b>${NStore.ok ? 'Yes — progress saves & syncs' : 'No — open in your own browser and sign in'}</b></div>
    </div>`;
  }
  const FORMATS = {
    kanji: `Format — array of: <code>{"char":"漢","meaning":"...","on":"カン","kun":"—","ex":"漢字","exr":"かんじ","exm":"kanji","level":"N4"}</code>`,
    vocab: `Format — array of: <code>{"word":"元気","reading":"げんき","meaning":"healthy; energetic","pos":"na-adjective","level":"N4"}</code>`,
    grammar: `Format — array of: <code>{"pattern":"〜ば","meaning":"...","structure":"...","ex":"...","extr":"English","level":"N4"}</code>`
  };
  const SAMPLES = {
    kanji: `[\n  {"char":"漢","meaning":"China; Han","on":"カン","kun":"—","ex":"漢字","exr":"かんじ","exm":"kanji","level":"N4"}\n]`,
    vocab: `[\n  {"word":"元気","reading":"げんき","meaning":"healthy; energetic","pos":"na-adjective","level":"N4"}\n]`,
    grammar: `[\n  {"pattern":"〜し","meaning":"and (listing reasons)","structure":"plain form + し","ex":"安いし、おいしいです。","extr":"It's cheap, and it's tasty.","level":"N4"}\n]`
  };
  let dataCat = 'kanji';
  function afterData() {
    const setFmt = () => { $('#dataFormat').innerHTML = FORMATS[dataCat]; };
    setFmt();
    document.querySelectorAll('[data-dcat]').forEach(c => c.onclick = () => { dataCat = c.dataset.dcat; document.querySelectorAll('[data-dcat]').forEach(x => x.setAttribute('aria-pressed', x.dataset.dcat === dataCat)); setFmt(); });
    $('#dataSample').onclick = () => { $('#dataInput').value = SAMPLES[dataCat]; };
    $('#dataAdd').onclick = () => {
      let arr; try { arr = JSON.parse($('#dataInput').value); } catch (e) { toast('That isn\'t valid JSON'); return; }
      if (!Array.isArray(arr) || !arr.length) { toast('Paste a non-empty JSON array'); return; }
      const extra = NStore.get('extra') || { kanji: [], vocab: [], grammar: [] };
      extra[dataCat] = (extra[dataCat] || []).concat(arr);
      NStore.set('extra', extra); buildContent();
      toast(`Added ${arr.length} ${dataCat} item(s)`);
      $('#dataInput').value = ''; render();
    };
    $('#expBtn').onclick = () => {
      const payload = { srs, log, planChecks, extra: NStore.get('extra') || {}, exported: new Date().toISOString() };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'n4-dojo-backup-' + todayStr() + '.json'; a.click();
    };
    $('#impFile').onchange = e => {
      const f = e.target.files[0]; if (!f) return; const r = new FileReader();
      r.onload = () => {
        try {
          const d = JSON.parse(r.result);
          if (d.srs) { srs = d.srs; NStore.set('srs', srs); } if (d.log) { log = d.log; NStore.set('log', log); }
          if (d.planChecks) { planChecks = d.planChecks; NStore.set('planChecks', planChecks); }
          if (d.extra) { NStore.set('extra', d.extra); buildContent(); }
          toast('Backup restored'); render();
        } catch (err) { toast('Could not read that file'); }
      };
      r.readAsText(f);
    };
    $('#resetBtn').onclick = () => {
      if (!confirm('Reset all N4 learning progress? Your added content stays. This cannot be undone.')) return;
      srs = {}; log = {}; planChecks = {}; NStore.set('srs', srs); NStore.set('log', log); NStore.set('planChecks', planChecks);
      toast('Progress reset'); render();
    };
  }

  /* ═══════════════════════════ SECTION CONTROL ═══════════════════════════ */
  function TAB_BAR() {
    const tabs = [
      ['today', '今日 Today'], ['learn', '学ぶ Learn'], ['review', '復習 Review'],
      ['quiz', 'テスト Quiz'], ['schedule', '予定 Schedule'], ['progress', '記録 Progress'],
      ['data', '内容 Content']
    ];
    return '<div class="mode-tabs" id="n4-tabs">' +
      tabs.map(([v, l]) => `<button class="mode-tab${v === view ? ' active' : ''}" data-n4view="${v}" onclick="N4.go('${v}')">${l}</button>`).join('') +
      '</div>';
  }

  function go(v) {
    view = v;
    // reset transient per-view state
    learnItem = null; learnRevealed = false; reviewQueue = []; reviewRevealed = false; quiz = null;
    render();
  }

  /* Open the N4 section (mirrors app.js openRepository) */
  function open() {
    view = 'today';
    if (typeof S !== 'undefined') S.lessonId = '__n4__';

    const t = document.getElementById('lesson-title'); if (t) t.textContent = 'N4 道場 — Exam prep';
    const tp = document.getElementById('lesson-topic'); if (tp) tp.textContent = 'Closed N4/N5 sets · spaced repetition · 15-week plan to December 6';
    const gp = document.getElementById('lesson-grammar'); if (gp) gp.textContent = '';

    document.getElementById('mode-tabs-wrap').innerHTML = TAB_BAR();

    // Sidebar active state (buildSidebar sets #n4-btn active via the app.js hook)
    if (typeof buildSidebar === 'function') buildSidebar();
    document.querySelectorAll('.lesson-btn').forEach(b => b.classList.remove('active'));
    const rb = document.getElementById('repo-btn'); if (rb) rb.classList.remove('active');
    const nb = document.getElementById('n4-btn'); if (nb) nb.classList.add('active');

    hydrate();
    buildContent();
    render();
  }

  window.N4 = { open, go };
})();
