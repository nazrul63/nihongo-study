/* =====================================================
   にほんご Study — app.js
   ===================================================== */

/* ── Persistence — localStorage + Firebase sync ── */
const Store = {
  k:  id => `nhk_v_${id}`,
  kq: id => `nhk_q_${id}`,
  load(id)  { try { return JSON.parse(localStorage.getItem(Store.k(id))) || {known:[],review:[]}; } catch { return {known:[],review:[]}; } },
  save(id,d){
    try { localStorage.setItem(Store.k(id),JSON.stringify(d)); } catch {}
    if (typeof FireSync !== 'undefined') FireSync.push(Store.k(id), d);
  },
  loadQ(id) { try { return JSON.parse(localStorage.getItem(Store.kq(id))) || {c:0,w:0}; } catch { return {c:0,w:0}; } },
  saveQ(id,d){
    try { localStorage.setItem(Store.kq(id),JSON.stringify(d)); } catch {}
    if (typeof FireSync !== 'undefined') FireSync.push(Store.kq(id), d);
  }
};

/* ── Audio ──────────────────────────────────────────────
   Problem: browsers load voices asynchronously.
   Solution: listen for voiceschanged, pick best ja-JP voice.
   Text is stored in data-speak / data-speak-slow attributes
   on buttons to avoid passing Japanese into onclick strings.
   ─────────────────────────────────────────────────────── */
const Audio = {
  voices: [],

  init() {
    if (!('speechSynthesis' in window)) return;
    const load = () => { this.voices = window.speechSynthesis.getVoices(); };
    load();
    window.speechSynthesis.addEventListener('voiceschanged', load);
  },

  bestVoice() {
    const v = this.voices;
    return v.find(x => x.name === 'Kyoko')                    // macOS Japanese female (best)
        || v.find(x => x.name === 'Otoya')                    // macOS Japanese male
        || v.find(x => x.lang === 'ja-JP' && x.localService)  // any local ja-JP
        || v.find(x => x.lang === 'ja-JP')                    // any ja-JP
        || v.find(x => x.lang.startsWith('ja'))               // any Japanese
        || null;
  },

  speak(text, slow = false) {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }
    // Clean prefix tildes used as placeholder in vocab
    const clean = text.replace(/^〜/, '').trim();
    if (!clean) return;

    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = 'ja-JP';
    u.rate = slow ? 0.6 : 0.85;
    const v = this.bestVoice();
    if (v) u.voice = v;
    window.speechSynthesis.speak(u);
  },

  /* Called by onclick="Audio.btn(this)" on any element with
     data-speak="Japanese text" and optional data-slow="true" */
  btn(el, slow) {
    const text = el.dataset.speak;
    if (text) this.speak(text, slow);
  }
};

/* ── App state ── */
let S = {
  lessonId: null,
  mode: 'flashcard',
  group: 'All',
  fc: { idx:0, flipped:false },
  kanji: { idx:0 },
  quiz: { word:null, qmode:'jp2en' }
};

const $  = id => document.getElementById(id);
const ma = () => $('mode-area');

/* ── Safe text for data attributes (no HTML escaping issues) ── */
function esc(str) {
  return str.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* ===================== SIDEBAR ===================== */
function buildSidebar() {
  const lessons = LessonRegistry.all();
  const el = $('lesson-list');
  el.innerHTML = '';
  const isRepo = S.lessonId === '__repo__';
  const rb = $('repo-btn');
  if (rb) rb.classList.toggle('active', isRepo);
  lessons.forEach(l => {
    const st = Store.load(l.id);
    const pct = l.vocab.length ? Math.round(st.known.length / l.vocab.length * 100) : 0;
    const btn = document.createElement('button');
    btn.className = 'lesson-btn' + (l.id === S.lessonId ? ' active' : '');
    btn.innerHTML = `<span class="lesson-num">${l.id}</span>
      <span><span style="display:block;font-size:13px">${l.title}</span>
      <span style="display:block;font-size:11px;color:var(--hint)">${l.topic}</span></span>
      <span class="lesson-mastery">${pct > 0 ? pct+'%' : ''}</span>`;
    btn.onclick = () => selectLesson(l.id);
    el.appendChild(btn);
  });
  updateHeader();
}

function updateHeader() {
  const lessons = LessonRegistry.all();
  let known = 0, total = 0;
  lessons.forEach(l => { const s = Store.load(l.id); known += s.known.length; total += l.vocab.length; });
  const pct = total ? Math.round(known/total*100) : 0;
  $('overall-fill').style.width = pct + '%';
  $('overall-label').textContent = pct + '% mastered';
}

/* ===================== LESSON SELECT ===================== */
function selectLesson(id) {
  S = { ...S, lessonId:id, group:'All', mode:'flashcard', fc:{idx:0,flipped:false}, kanji:{idx:0} };
  // Restore lesson tabs if we were in repo view
  $('mode-tabs-wrap').innerHTML = `
    <div class="mode-tabs">
      <button class="mode-tab active" data-mode="flashcard" onclick="switchMode('flashcard')">🃏 Flashcards</button>
      <button class="mode-tab" data-mode="kanji"     onclick="switchMode('kanji')">漢字 Kanji</button>
      <button class="mode-tab" data-mode="sentences" onclick="switchMode('sentences')">💬 Sentences</button>
      <button class="mode-tab" data-mode="quiz"      onclick="switchMode('quiz')">✏️ Quiz</button>
      <button class="mode-tab" data-mode="list"      onclick="switchMode('list')">📋 Word list</button>
    </div>`;
  buildSidebar();
  renderLesson();
}

function renderLesson() {
  const l = LessonRegistry.get(S.lessonId);
  if (!l) { ma().innerHTML = '<div class="empty"><div class="big">📚</div><p>Select a lesson to begin.</p></div>'; return; }
  $('lesson-title').textContent = l.title;
  $('lesson-topic').textContent = l.topic;
  $('lesson-grammar').textContent = l.grammar || '';
  setTab(S.mode);
  renderMode();
}

/* ===================== TABS ===================== */
function setTab(mode) {
  S.mode = mode;
  document.querySelectorAll('.mode-tab').forEach(t => t.classList.toggle('active', t.dataset.mode === mode));
}
function switchMode(mode) { setTab(mode); renderMode(); }
function renderMode() {
  const map = { flashcard:renderFlashcard, kanji:renderKanji, sentences:renderSentences, quiz:renderQuiz, list:renderList };
  (map[S.mode] || (() => {}))();
}

/* ===================== FLASHCARD ===================== */
function filtered() {
  const l = LessonRegistry.get(S.lessonId);
  return !l ? [] : S.group === 'All' ? l.vocab : l.vocab.filter(v => v.group === S.group);
}

function renderFlashcard() {
  const l = LessonRegistry.get(S.lessonId);
  const st = Store.load(S.lessonId);
  const words = filtered();
  if (S.fc.idx >= words.length) S.fc.idx = 0;
  const w = words[S.fc.idx] || {};
  const groups = ['All', ...new Set(l.vocab.map(v => v.group))];
  const knownInView = words.filter(v => st.known.includes(v.jp)).length;
  const pct = words.length ? Math.round(knownInView/words.length*100) : 0;

  // Store speak text safely in data attribute — no Japanese in onclick strings
  ma().innerHTML = `
  <div class="fc-toolbar" id="gchips"></div>
  <div class="fc-meta">
    <span>${S.fc.idx+1} / ${words.length}</span>
    <span>${w.group||''}</span>
  </div>
  <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
  <div class="card-scene" id="card-scene">
    <div class="card-inner ${S.fc.flipped?'flipped':''}" id="ci">
      <div class="card-face card-front">
        <button class="audio-btn" data-speak="${esc(w.jp)}" onclick="event.stopPropagation();Audio.btn(this,false)" title="Hear pronunciation">🔊</button>
        <div class="card-jp">${w.jp}</div>
        <div class="card-kj">${w.kj||''}</div>
        <div class="card-hint">tap to reveal</div>
      </div>
      <div class="card-face card-back">
        <div class="card-en">${w.en}</div>
        <div class="card-note">${w.note||''}</div>
      </div>
    </div>
  </div>
  <div class="fc-actions">
    <button class="fc-btn review" onclick="markCard(false)">↩ Review again</button>
    <button class="fc-btn" onclick="fcPrev()">← Prev</button>
    <button class="fc-btn" onclick="fcNext()">Next →</button>
    <button class="fc-btn know" onclick="markCard(true)">✓ I know this</button>
  </div>
  <div class="fc-stats">
    <b>${st.known.length}</b> known &nbsp;·&nbsp; <b>${st.review.length}</b> to review &nbsp;·&nbsp; ${l.vocab.length - st.known.length - st.review.length} unseen
  </div>`;

  // Tap card to flip (but not if tapping audio button)
  $('card-scene').addEventListener('click', fcFlip);

  const gc = $('gchips');
  groups.forEach(g => {
    const b = document.createElement('button');
    b.className = 'chip' + (g===S.group?' sel':'');
    b.textContent = g;
    b.onclick = () => { S.group=g; S.fc.idx=0; S.fc.flipped=false; renderFlashcard(); };
    gc.appendChild(b);
  });
}

function fcFlip() { S.fc.flipped = !S.fc.flipped; const el=$('ci'); if(el) el.classList.toggle('flipped',S.fc.flipped); }
function fcNext() { const f=filtered(); S.fc.idx=(S.fc.idx+1)%f.length; S.fc.flipped=false; renderFlashcard(); }
function fcPrev() { const f=filtered(); S.fc.idx=(S.fc.idx-1+f.length)%f.length; S.fc.flipped=false; renderFlashcard(); }
function markCard(know) {
  const w = filtered()[S.fc.idx];
  if (!w) return;
  const st = Store.load(S.lessonId);
  if (know) { if(!st.known.includes(w.jp)) st.known.push(w.jp); st.review=st.review.filter(x=>x!==w.jp); }
  else       { if(!st.review.includes(w.jp)) st.review.push(w.jp); st.known=st.known.filter(x=>x!==w.jp); }
  Store.save(S.lessonId, st);
  buildSidebar();
  fcNext();
}

/* ===================== KANJI ===================== */
function renderKanji() {
  const l = LessonRegistry.get(S.lessonId);
  if (!l || !l.kanji || !l.kanji.length) {
    ma().innerHTML = '<div class="empty"><div class="big">漢</div><p>No kanji data for this lesson yet.</p></div>';
    return;
  }
  const kj = l.kanji[S.kanji.idx] || l.kanji[0];
  const onStr  = kj.onyomi.join('、');
  const kunStr = kj.kunyomi.join('、');

  const gridHtml = l.kanji.map((k,i) =>
    `<button class="kj-chip${i===S.kanji.idx?' sel':''}" onclick="selectKanji(${i})">
      <span class="kj-char">${k.char}</span>
      <span class="kj-meaning">${k.meaning.split(',')[0]}</span>
    </button>`
  ).join('');

  const exHtml = kj.inLesson.map(e => `<div class="kc-ex-item">· ${e}</div>`).join('');

  // Use data-speak attribute — safe, no Japanese in onclick
  ma().innerHTML = `
  <div class="kanji-grid">${gridHtml}</div>
  <div class="kanji-card">
    <div class="kc-top">
      <div class="kc-char-panel">
        <div class="kc-big-char" data-speak="${esc(kj.char)}"
             onclick="Audio.btn(this,false)" title="Tap to hear">${kj.char}</div>
        <span class="kc-stroke-badge">${kj.strokes} strokes</span>
        <span class="kc-jlpt-badge">${kj.jlpt}</span>
      </div>
      <div class="kc-info">
        <div class="kc-meaning">${kj.meaning}</div>
        <div class="kc-readings">
          <div class="kc-reading-group">
            <label>On-yomi</label>
            <span class="reads">${onStr || '—'}</span>
          </div>
          <div class="kc-reading-group">
            <label>Kun-yomi</label>
            <span class="reads">${kunStr || '—'}</span>
          </div>
        </div>
        <div class="kc-examples">
          <label>In this lesson</label>
          ${exHtml}
        </div>
        <div class="kc-mnemonic">${kj.mnemonic}</div>
        <div class="kc-actions">
          <button class="kc-btn" data-speak="${esc(kj.char)}" onclick="Audio.btn(this,false)">🔊 Hear it</button>
          <button class="kc-btn" data-speak="${esc(kj.char)}" onclick="Audio.btn(this,true)">🐢 Slow</button>
          <button class="kc-btn" onclick="openCanvas('${kj.char}')">✍️ Practice writing</button>
          <a href="https://jisho.org/search/${encodeURIComponent(kj.char + ' #kanji')}" target="_blank" style="text-decoration:none">
            <button class="kc-btn">📐 Stroke order →</button>
          </a>
        </div>
      </div>
    </div>
    <div id="canvas-area"></div>
  </div>`;
}

function selectKanji(idx) { S.kanji.idx = idx; renderKanji(); }

/* ── Writing Canvas ── */
function openCanvas(char) {
  const area = $('canvas-area');
  if (!area) return;
  area.innerHTML = `
  <div class="canvas-toolbar">
    <button onclick="clearCanvas()">🗑 Clear</button>
    <button onclick="undoCanvas()">↩ Undo</button>
    <span class="canvas-target">Practice: <strong style="color:var(--accent);font-size:18px">${char}</strong></span>
  </div>
  <div class="canvas-wrap">
    <canvas id="write-canvas" height="280"></canvas>
  </div>`;

  const canvas = $('write-canvas');
  const wrap   = canvas.parentElement;
  canvas.width = wrap.offsetWidth || 860;
  const ctx = canvas.getContext('2d');
  let drawing = false;
  let strokes = [];
  let current = [];

  function drawGrid() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle='rgba(255,255,255,0.04)'; ctx.lineWidth=1;
    const cw=canvas.width, ch=canvas.height;
    ctx.setLineDash([4,4]);
    ctx.beginPath();
    for(let x=0;x<=cw;x+=cw/4){ctx.moveTo(x,0);ctx.lineTo(x,ch);}
    for(let y=0;y<=ch;y+=ch/4){ctx.moveTo(0,y);ctx.lineTo(cw,y);}
    ctx.stroke(); ctx.setLineDash([]);
    ctx.strokeStyle='rgba(255,255,255,0.08)'; ctx.lineWidth=1.5;
    ctx.beginPath();
    ctx.moveTo(cw/2,0); ctx.lineTo(cw/2,ch);
    ctx.moveTo(0,ch/2); ctx.lineTo(cw,ch/2);
    ctx.stroke();
  }

  function drawGhost() {
    ctx.font=`${canvas.height*0.72}px serif`;
    ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillStyle='rgba(180,142,247,0.07)';
    ctx.fillText(char,canvas.width/2,canvas.height/2);
  }

  function redraw() {
    drawGrid(); drawGhost();
    ctx.strokeStyle='#b48ef7'; ctx.lineWidth=3; ctx.lineCap='round'; ctx.lineJoin='round';
    [...strokes,current].forEach(stroke=>{
      if(stroke.length<2) return;
      ctx.beginPath(); ctx.moveTo(stroke[0].x,stroke[0].y);
      for(let i=1;i<stroke.length;i++) ctx.lineTo(stroke[i].x,stroke[i].y);
      ctx.stroke();
    });
  }

  function pos(e) {
    const r=canvas.getBoundingClientRect();
    const src=e.touches?e.touches[0]:e;
    return {x:src.clientX-r.left, y:src.clientY-r.top};
  }

  canvas.addEventListener('mousedown',  e=>{drawing=true;current=[pos(e)];});
  canvas.addEventListener('mousemove',  e=>{if(!drawing)return;current.push(pos(e));redraw();});
  canvas.addEventListener('mouseup',    ()=>{if(!drawing)return;strokes.push([...current]);current=[];drawing=false;});
  canvas.addEventListener('mouseleave', ()=>{if(drawing){strokes.push([...current]);current=[];drawing=false;}});
  canvas.addEventListener('touchstart', e=>{e.preventDefault();drawing=true;current=[pos(e)];},{passive:false});
  canvas.addEventListener('touchmove',  e=>{e.preventDefault();if(!drawing)return;current.push(pos(e));redraw();},{passive:false});
  canvas.addEventListener('touchend',   e=>{e.preventDefault();if(!drawing)return;strokes.push([...current]);current=[];drawing=false;},{passive:false});

  window._cv={ctx,strokes,current:()=>current,redraw};
  drawGrid(); drawGhost();
}

function clearCanvas(){ if(!window._cv)return; window._cv.strokes.length=0; window._cv.redraw(); }
function undoCanvas() { if(!window._cv)return; window._cv.strokes.pop(); window._cv.redraw(); }

/* ===================== SENTENCES ===================== */
function renderSentences() {
  const l = LessonRegistry.get(S.lessonId);
  if (!l || !l.sentences || !l.sentences.length) {
    ma().innerHTML = '<div class="empty"><div class="big">💬</div><p>No example sentences yet.</p></div>';
    return;
  }

  let html = '';

  if (l.selfIntroTemplate) {
    const t = l.selfIntroTemplate;
    const fieldHtml = t.slots.map(s =>
      `<div class="intro-field">
        <label>${s.label}</label>
        <input type="text" id="si-${s.key}" value="${s.default}" oninput="updateIntro()" />
      </div>`
    ).join('');
    html += `<div class="intro-builder">
      <h3>✍️ Build your self-introduction</h3>
      <div class="intro-fields">${fieldHtml}</div>
      <div class="intro-output" id="intro-output">Loading…</div>
      <div style="display:flex;gap:8px">
        <button class="kc-btn" id="btn-intro-hear" onclick="speakIntro(false)">🔊 Hear my intro</button>
        <button class="kc-btn" id="btn-intro-slow" onclick="speakIntro(true)">🐢 Slow version</button>
      </div>
    </div>`;
  }

  html += l.sentences.map((s,i) => `
    <div class="sentence-card" id="sc-${i}">
      <div class="pattern-label">${s.pattern}</div>
      <div class="sentence-jp">${s.jp}</div>
      <div class="sentence-en">${s.en}</div>
      <div style="display:flex;gap:8px;margin-bottom:6px">
        <button class="kc-btn" data-speak="${esc(s.jp)}" onclick="Audio.btn(this,false)">🔊 Hear</button>
        <button class="kc-btn" data-speak="${esc(s.jp)}" onclick="Audio.btn(this,true)">🐢 Slow</button>
        <button class="kc-btn" onclick="toggleBreakdown(${i})">📖 Word by word</button>
      </div>
      <div class="bd-toggle breakdown-row" id="bd-${i}" style="display:none">
        ${s.breakdown.map(b =>
          `<div class="bd-item"><span class="bd-word">${b.word}</span><span class="bd-meaning">${b.meaning}</span></div>`
        ).join('')}
      </div>
    </div>`
  ).join('');

  ma().innerHTML = html;
  if (l.selfIntroTemplate) updateIntro();
}

function toggleBreakdown(i) {
  const el = $(`bd-${i}`);
  if (el) el.style.display = el.style.display === 'flex' ? 'none' : 'flex';
}

function updateIntro() {
  const l = LessonRegistry.get(S.lessonId);
  if (!l || !l.selfIntroTemplate) return;
  const t = l.selfIntroTemplate;
  let result = t.template;
  t.slots.forEach(s => {
    const val = document.getElementById('si-'+s.key)?.value || s.default;
    result = result.replace(new RegExp(`\\{${s.key}\\}`, 'g'), `<span class="highlight">${val}</span>`);
  });
  const out = $('intro-output');
  if (out) out.innerHTML = result;
}

function speakIntro(slow) {
  const l = LessonRegistry.get(S.lessonId);
  if (!l || !l.selfIntroTemplate) return;
  const t = l.selfIntroTemplate;
  let text = t.template;
  t.slots.forEach(s => {
    const val = document.getElementById('si-'+s.key)?.value || s.default;
    text = text.replace(new RegExp(`\\{${s.key}\\}`, 'g'), val);
  });
  Audio.speak(text, slow);
}

/* ===================== QUIZ ===================== */
function renderQuiz() {
  const qs = Store.loadQ(S.lessonId);
  ma().innerHTML = `
  <div class="quiz-score-bar">
    Correct <span class="val" id="qc">${qs.c}</span> &nbsp;·&nbsp;
    Missed <span class="val" id="qw">${qs.w}</span>
    <span style="margin-left:auto"><button onclick="resetQuiz()" style="font-size:12px;color:var(--hint);background:none;border:none;cursor:pointer">Reset</button></span>
  </div>
  <div class="quiz-q" id="qq">—</div>
  <div class="quiz-sub" id="qs"></div>
  <div class="quiz-grid" id="qgrid"></div>
  <div class="quiz-feedback" id="qf"></div>
  <button class="quiz-next" onclick="nextQuiz()">Next question →</button>`;
  nextQuiz();
}

function nextQuiz() {
  const l = LessonRegistry.get(S.lessonId);
  const pool = l.vocab;
  const w = pool[Math.floor(Math.random()*pool.length)];
  S.quiz.word = w;
  S.quiz.qmode = Math.random() > 0.5 ? 'jp2en' : 'en2jp';
  const qEl=$('qq'), sEl=$('qs'), fEl=$('qf');
  if (!qEl) return;
  fEl.textContent = '';
  qEl.textContent = S.quiz.qmode === 'jp2en' ? w.jp : w.en;
  sEl.textContent = S.quiz.qmode === 'jp2en' ? (w.kj ? '('+w.kj+')' : '') : 'choose the Japanese';

  let opts = [w];
  while (opts.length < 4) { const r=pool[Math.floor(Math.random()*pool.length)]; if(!opts.find(o=>o.jp===r.jp)) opts.push(r); }
  opts.sort(()=>Math.random()-.5);

  const grid = $('qgrid');
  grid.innerHTML = '';
  opts.forEach(o => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.textContent = S.quiz.qmode === 'jp2en' ? o.en : o.jp;
    btn.onclick = () => checkQuiz(btn, o);
    grid.appendChild(btn);
  });
}

function checkQuiz(btn, chosen) {
  const correct = chosen.jp === S.quiz.word.jp;
  document.querySelectorAll('.quiz-opt').forEach(b => {
    b.disabled = true;
    const isAns = S.quiz.qmode==='jp2en' ? b.textContent===S.quiz.word.en : b.textContent===S.quiz.word.jp;
    if (isAns) b.classList.add('correct');
  });
  const qs = Store.loadQ(S.lessonId);
  if (!correct) { btn.classList.add('wrong'); qs.w++; $('qf').textContent = 'Answer: '+(S.quiz.qmode==='jp2en'?S.quiz.word.en:S.quiz.word.jp); }
  else           { qs.c++; $('qf').textContent = S.quiz.word.note || '✓ Correct!'; }
  Store.saveQ(S.lessonId, qs);
  $('qc').textContent = qs.c;
  $('qw').textContent = qs.w;
}

function resetQuiz() { Store.saveQ(S.lessonId, {c:0,w:0}); renderQuiz(); }

/* ===================== WORD LIST ===================== */
function renderList() {
  const l = LessonRegistry.get(S.lessonId);
  const byGroup = {};
  l.vocab.forEach(v => { (byGroup[v.group] = byGroup[v.group]||[]).push(v); });
  let html = `<button class="print-btn" onclick="window.print()">🖨 Print / Save as PDF</button>`;
  Object.entries(byGroup).forEach(([g,words]) => {
    html += `<div class="list-group"><div class="list-group-title">${g}</div><div class="word-grid">`;
    words.forEach(v => {
      html += `<div class="word-card">
        <div><div class="word-jp">${v.jp}</div>${v.kj?`<div class="word-kj">${v.kj}</div>`:''}</div>
        <div class="word-en">${v.en}</div>
      </div>`;
    });
    html += `</div></div>`;
  });
  ma().innerHTML = html;
}

/* ===================== THEME ===================== */
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  // If no attribute, check computed style to detect system preference
  const isDark = current === 'dark' || (!current && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const next = isDark ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('nhk_theme', next);
  if (typeof FireSync !== 'undefined') FireSync.push('nhk_theme', next);
  const btn = $('theme-btn');
  if (btn) btn.textContent = next === 'dark' ? '🌙' : '☀️';
}

function updateThemeBtn() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const isDark = current === 'dark' || (!current && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const btn = $('theme-btn');
  if (btn) btn.textContent = isDark ? '🌙' : '☀️';
}

/* ===================== PROGRESS SYNC ===================== */
function exportProgress() {
  // Collect all nhk_ keys from localStorage
  const data = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('nhk_')) {
      data[key] = localStorage.getItem(key);
    }
  }
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `nihongo-progress-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showSyncMsg('✓ Progress exported!');
}

function importProgress(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      let count = 0;
      Object.entries(data).forEach(([key, val]) => {
        if (key.startsWith('nhk_')) { localStorage.setItem(key, val); count++; }
      });
      showSyncMsg(`✓ Imported ${count} records`);
      buildSidebar();         // refresh mastery %
      if (S.lessonId) renderLesson();
    } catch {
      showSyncMsg('✗ Invalid file');
    }
  };
  reader.readAsText(file);
  event.target.value = ''; // reset so same file can be re-imported
}

function showSyncMsg(msg) {
  const el = $('sync-msg');
  if (!el) return;
  el.textContent = msg;
  setTimeout(() => { el.textContent = ''; }, 3000);
}

/* ===================== BOOT ===================== */
document.addEventListener('DOMContentLoaded', () => {
  Audio.init();
  updateThemeBtn();
  buildSidebar();
  const first = LessonRegistry.all()[0];
  if (first) selectLesson(first.id);
});

/* ╔═══════════════════════════════════════════════════════╗
   ║               CENTRAL REPOSITORY                     ║
   ╚═══════════════════════════════════════════════════════╝ */

/* ── Repository state ── */
let R = {
  tab: 'dashboard',     // dashboard | vocab | kanji | grammar
  search: '',
  filter: { mastery:'all', category:'all', lesson:'all', jlpt:'all' },
  sort: 'lesson'
};

/* ── Data helpers ── */
function allVocab() {
  return LessonRegistry.all().flatMap(l =>
    l.vocab.map(v => ({ ...v, lessonId:l.id, lessonTitle:l.title }))
  );
}

function allKanji() {
  return LessonRegistry.all().flatMap(l =>
    (l.kanji || []).map(k => ({ ...k, lessonId:l.id, lessonTitle:l.title }))
  );
}

function allGrammar() {
  return LessonRegistry.all().flatMap(l => {
    const sentences = l.sentences || [];
    const patterns  = [...new Set(sentences.map(s => s.pattern))];
    return patterns.map(p => ({
      pattern:   p,
      lessonId:  l.id,
      lessonTitle: l.title,
      sentences: sentences.filter(s => s.pattern === p)
    }));
  });
}

function getMastery(lessonId, jp) {
  const st = Store.load(lessonId);
  if (st.known.includes(jp))   return 'known';
  if (st.review.includes(jp))  return 'review';
  return 'unseen';
}

function masteryDot(m) {
  const map = { known:'#059669', review:'#d97706', unseen:'#6b7280' };
  const tip  = { known:'Known', review:'Review', unseen:'Unseen' };
  return `<span class="m-dot" style="color:${map[m]}" title="${tip[m]}">●</span>`;
}

/* ── Open repository ── */
function openRepository() {
  S.lessonId = '__repo__';
  document.querySelectorAll('.lesson-btn').forEach(b => b.classList.remove('active'));
  const rb = $('repo-btn');
  if (rb) rb.classList.add('active');

  $('lesson-title').textContent   = 'じしょ Repository';
  $('lesson-topic').textContent   = 'All lessons · unified search · progress overview';
  $('lesson-grammar').textContent = '';

  // Swap mode-tabs for repo-tabs
  $('mode-tabs-wrap').innerHTML = `
    <div class="mode-tabs" id="repo-tabs">
      <button class="mode-tab ${R.tab==='dashboard'?'active':''}" onclick="switchRepoTab('dashboard')">📊 Dashboard</button>
      <button class="mode-tab ${R.tab==='vocab'?'active':''}"     onclick="switchRepoTab('vocab')">📖 Vocabulary</button>
      <button class="mode-tab ${R.tab==='kanji'?'active':''}"     onclick="switchRepoTab('kanji')">漢字 Kanji</button>
      <button class="mode-tab ${R.tab==='grammar'?'active':''}"   onclick="switchRepoTab('grammar')">📝 Grammar</button>
    </div>`;

  renderRepoTab();
}

function switchRepoTab(tab) {
  R.tab = tab;
  R.search = '';
  document.querySelectorAll('#repo-tabs .mode-tab').forEach(t =>
    t.classList.toggle('active', t.textContent.toLowerCase().includes(tab.slice(0,4)))
  );
  renderRepoTab();
}

function renderRepoTab() {
  const map = { dashboard:renderDashboard, vocab:renderVocabRepo, kanji:renderKanjiRepo, grammar:renderGrammarRepo };
  (map[R.tab] || renderDashboard)();
}

/* ═══════════════════ DASHBOARD ═══════════════════ */
function renderDashboard() {
  const lessons = LessonRegistry.all();
  const vocab   = allVocab();
  const kanji   = allKanji();

  let totalKnown=0, totalReview=0, totalVocab=vocab.length;
  vocab.forEach(v => {
    const m = getMastery(v.lessonId, v.jp);
    if (m==='known')  totalKnown++;
    if (m==='review') totalReview++;
  });
  const totalUnseen = totalVocab - totalKnown - totalReview;
  const mastPct = totalVocab ? Math.round(totalKnown/totalVocab*100) : 0;

  // Collect review items across all lessons
  const reviewItems = vocab.filter(v => getMastery(v.lessonId, v.jp) === 'review').slice(0, 12);

  // Random drill: pick from known + unseen pool
  const drillPool = vocab.filter(v => getMastery(v.lessonId, v.jp) !== 'known');

  const lessonCards = lessons.map(l => {
    const st  = Store.load(l.id);
    const tot = l.vocab.length;
    const kn  = st.known.length;
    const rv  = st.review.length;
    const pct = tot ? Math.round(kn/tot*100) : 0;
    return `<div class="dash-lesson">
      <div class="dl-header">
        <span class="dl-title">L${l.id} · ${l.topic}</span>
        <span class="dl-pct" style="color:var(--accent)">${pct}%</span>
      </div>
      <div class="dash-bar"><div class="dash-bar-fill" style="width:${pct}%"></div></div>
      <div class="dl-stats">
        <span style="color:var(--success)">✓ ${kn} known</span> ·
        <span style="color:#d97706">↩ ${rv} review</span> ·
        <span style="color:var(--hint)">${tot-kn-rv} unseen</span>
      </div>
    </div>`;
  }).join('');

  const reviewHtml = reviewItems.length
    ? reviewItems.map(v => `
        <div class="review-chip">
          <button class="audio-btn" style="position:relative;top:0;right:0;margin-right:4px" data-speak="${esc(v.jp)}" onclick="Audio.btn(this,false)">🔊</button>
          <span class="rc-jp">${v.jp}</span>
          <span class="rc-en">${v.en}</span>
          <span class="rc-l">L${v.lessonId}</span>
        </div>`).join('')
    : '<p style="color:var(--hint);font-size:13px">No words flagged for review — nice work!</p>';

  ma().innerHTML = `
  <div class="dash-grid">

    <!-- Big stat -->
    <div class="dash-card dash-big">
      <div class="dbc-number">${mastPct}<span style="font-size:28px">%</span></div>
      <div class="dbc-label">overall vocabulary mastered</div>
      <div class="dbc-sub">${totalKnown} known · ${totalReview} review · ${totalUnseen} unseen · ${kanji.length} kanji</div>
      <div class="dbc-bar">
        <div class="dbc-seg" style="width:${totalVocab?totalKnown/totalVocab*100:0}%;background:var(--success)"></div>
        <div class="dbc-seg" style="width:${totalVocab?totalReview/totalVocab*100:0}%;background:#d97706"></div>
      </div>
    </div>

    <!-- Random drill -->
    <div class="dash-card" style="display:flex;flex-direction:column;justify-content:center;align-items:center;gap:12px;text-align:center">
      <div style="font-size:32px">🎲</div>
      <div style="font-size:14px;color:var(--muted)">Random drill from<br>unmastered words</div>
      <button class="fc-btn know" style="margin:0" onclick="startRandomDrill()">Start drill →</button>
      <div style="font-size:12px;color:var(--hint)">${drillPool.length} words available</div>
    </div>

    <!-- Lesson progress -->
    <div class="dash-card" style="grid-column:1/-1">
      <div class="dash-card-title">Lesson progress</div>
      <div class="dash-lessons">${lessonCards}</div>
    </div>

    <!-- Due for review -->
    <div class="dash-card" style="grid-column:1/-1">
      <div class="dash-card-title">Due for review <span style="font-size:12px;color:var(--hint);font-weight:400">(${reviewItems.length} shown)</span></div>
      <div class="review-chips">${reviewHtml}</div>
    </div>

  </div>`;
}

/* ── Random drill from full repository ── */
let drillPool = [];
let drillIdx  = 0;

function startRandomDrill() {
  drillPool = allVocab()
    .filter(v => getMastery(v.lessonId, v.jp) !== 'known')
    .sort(() => Math.random() - 0.5);
  drillIdx = 0;
  renderDrillCard();
}

function renderDrillCard() {
  if (!drillPool.length) {
    ma().innerHTML = `<div class="empty"><div class="big">🎉</div><p>All words mastered!</p></div>`;
    return;
  }
  const w = drillPool[drillIdx % drillPool.length];
  ma().innerHTML = `
  <div style="margin-bottom:.75rem;font-size:13px;color:var(--hint)">
    Random drill · ${drillIdx+1} / ${drillPool.length} &nbsp;
    <button onclick="renderDashboard()" style="background:none;border:none;color:var(--accent);cursor:pointer;font-size:13px">← Back to dashboard</button>
  </div>
  <div class="card-scene" onclick="drillFlip()">
    <div class="card-inner" id="drill-ci">
      <div class="card-face card-front">
        <button class="audio-btn" data-speak="${esc(w.jp)}" onclick="event.stopPropagation();Audio.btn(this,false)">🔊</button>
        <div class="card-jp">${w.jp}</div>
        <div class="card-kj">${w.kj||''}</div>
        <div style="font-size:11px;color:var(--hint);margin-top:6px">L${w.lessonId} · ${w.group}</div>
        <div class="card-hint">tap to reveal</div>
      </div>
      <div class="card-face card-back">
        <div class="card-en">${w.en}</div>
        <div class="card-note">${w.note||''}</div>
      </div>
    </div>
  </div>
  <div class="fc-actions">
    <button class="fc-btn review" onclick="drillMark(false)">↩ Review again</button>
    <button class="fc-btn know"   onclick="drillMark(true)">✓ I know this</button>
  </div>`;
}

function drillFlip() { const el=$('drill-ci'); if(el) el.classList.toggle('flipped'); }
function drillMark(know) {
  const w = drillPool[drillIdx % drillPool.length];
  const st = Store.load(w.lessonId);
  if (know) { if(!st.known.includes(w.jp)) st.known.push(w.jp); st.review=st.review.filter(x=>x!==w.jp); }
  else       { if(!st.review.includes(w.jp)) st.review.push(w.jp); st.known=st.known.filter(x=>x!==w.jp); }
  Store.save(w.lessonId, st);
  buildSidebar();
  if (know) drillPool.splice(drillIdx % drillPool.length, 1);
  else drillIdx++;
  if (drillPool.length === 0) { ma().innerHTML='<div class="empty"><div class="big">🎉</div><p>All words mastered!</p><button class="fc-btn" onclick="renderDashboard()" style="margin:1rem auto;display:block">← Dashboard</button></div>'; return; }
  renderDrillCard();
}

/* ═══════════════════ VOCABULARY REPO ═══════════════════ */
function renderVocabRepo() {
  const lessons    = LessonRegistry.all();
  const categories = [...new Set(allVocab().map(v => v.group))].sort();
  const jlptLevels = [];

  ma().innerHTML = `
  <div class="repo-toolbar">
    <input class="repo-search" id="vocab-search" placeholder="Search Japanese, English, notes…" oninput="filterVocab()" />
    <div class="repo-filters">
      <select class="repo-select" id="vf-mastery" onchange="filterVocab()">
        <option value="all">All mastery</option>
        <option value="known">✓ Known</option>
        <option value="review">↩ Review</option>
        <option value="unseen">○ Unseen</option>
      </select>
      <select class="repo-select" id="vf-category" onchange="filterVocab()">
        <option value="all">All categories</option>
        ${categories.map(c=>`<option value="${c}">${c}</option>`).join('')}
      </select>
      <select class="repo-select" id="vf-lesson" onchange="filterVocab()">
        <option value="all">All lessons</option>
        ${lessons.map(l=>`<option value="${l.id}">L${l.id} · ${l.topic}</option>`).join('')}
      </select>
      <select class="repo-select" id="vf-sort" onchange="filterVocab()">
        <option value="lesson">Sort: Lesson</option>
        <option value="alpha-jp">Sort: JP A→Z</option>
        <option value="alpha-en">Sort: EN A→Z</option>
        <option value="mastery">Sort: Mastery</option>
      </select>
    </div>
  </div>
  <div class="repo-count" id="vocab-count"></div>
  <div class="repo-list" id="vocab-list"></div>`;

  filterVocab();
}

function filterVocab() {
  let words = allVocab();
  const q   = ($('vocab-search')?.value || '').toLowerCase().trim();
  const fm  = $('vf-mastery')?.value  || 'all';
  const fc  = $('vf-category')?.value || 'all';
  const fl  = $('vf-lesson')?.value   || 'all';
  const fs  = $('vf-sort')?.value     || 'lesson';

  if (q)         words = words.filter(v => v.jp.includes(q) || (v.kj||'').includes(q) || v.en.toLowerCase().includes(q) || (v.note||'').toLowerCase().includes(q));
  if (fm!=='all') words = words.filter(v => getMastery(v.lessonId,v.jp) === fm);
  if (fc!=='all') words = words.filter(v => v.group === fc);
  if (fl!=='all') words = words.filter(v => String(v.lessonId) === fl);

  if (fs==='alpha-jp') words.sort((a,b)=>a.jp.localeCompare(b.jp,'ja'));
  else if (fs==='alpha-en') words.sort((a,b)=>a.en.localeCompare(b.en));
  else if (fs==='mastery') {
    const ord = {known:0,review:1,unseen:2};
    words.sort((a,b)=>ord[getMastery(a.lessonId,a.jp)]-ord[getMastery(b.lessonId,b.jp)]);
  } else words.sort((a,b)=>a.lessonId-b.lessonId);

  const cnt = $('vocab-count');
  if (cnt) cnt.textContent = `${words.length} words`;

  const list = $('vocab-list');
  if (!list) return;
  if (!words.length) { list.innerHTML='<div class="repo-empty">No words match your filters.</div>'; return; }

  list.innerHTML = words.map(v => {
    const m = getMastery(v.lessonId, v.jp);
    return `<div class="repo-row">
      ${masteryDot(m)}
      <span class="rr-jp">${v.jp}</span>
      <span class="rr-kj">${v.kj||''}</span>
      <span class="rr-en">${v.en}</span>
      <span class="rr-cat">${v.group}</span>
      <span class="rr-l">L${v.lessonId}</span>
      <button class="rr-audio" data-speak="${esc(v.jp)}" onclick="Audio.btn(this,false)">🔊</button>
    </div>`;
  }).join('');
}

/* ═══════════════════ KANJI REPO ═══════════════════ */
function renderKanjiRepo() {
  const all     = allKanji();
  const lessons = LessonRegistry.all();
  const jlpts   = [...new Set(all.map(k=>k.jlpt))].sort();

  ma().innerHTML = `
  <div class="repo-toolbar">
    <input class="repo-search" id="kanji-search" placeholder="Search meaning, reading, character…" oninput="filterKanji()" />
    <div class="repo-filters">
      <select class="repo-select" id="kf-jlpt" onchange="filterKanji()">
        <option value="all">All JLPT</option>
        ${jlpts.map(j=>`<option value="${j}">${j}</option>`).join('')}
      </select>
      <select class="repo-select" id="kf-lesson" onchange="filterKanji()">
        <option value="all">All lessons</option>
        ${lessons.map(l=>`<option value="${l.id}">L${l.id}</option>`).join('')}
      </select>
    </div>
  </div>
  <div class="repo-count" id="kanji-count"></div>
  <div class="kanji-repo-grid" id="kanji-repo-grid"></div>`;

  filterKanji();
}

function filterKanji() {
  let all = allKanji();
  const q  = ($('kanji-search')?.value||'').toLowerCase().trim();
  const fj = $('kf-jlpt')?.value   || 'all';
  const fl = $('kf-lesson')?.value || 'all';

  if (q)         all = all.filter(k => k.char.includes(q) || k.meaning.toLowerCase().includes(q) || k.onyomi.join('').toLowerCase().includes(q) || k.kunyomi.join('').toLowerCase().includes(q));
  if (fj!=='all') all = all.filter(k => k.jlpt===fj);
  if (fl!=='all') all = all.filter(k => String(k.lessonId)===fl);

  const cnt = $('kanji-count');
  if (cnt) cnt.textContent = `${all.length} kanji`;

  const grid = $('kanji-repo-grid');
  if (!grid) return;
  if (!all.length) { grid.innerHTML='<div class="repo-empty">No kanji match your filters.</div>'; return; }

  grid.innerHTML = all.map(k => `
    <div class="kanji-repo-card" onclick="goToKanji(${k.lessonId},'${k.char}')">
      <div class="krc-top">
        <span class="krc-char" data-speak="${esc(k.char)}" onclick="event.stopPropagation();Audio.btn(this,false)">${k.char}</span>
        <span class="krc-jlpt">${k.jlpt}</span>
      </div>
      <div class="krc-meaning">${k.meaning}</div>
      <div class="krc-reads">
        <span style="color:var(--accent)">${k.onyomi.join('・')}</span>
        ${k.kunyomi.length?`<span style="color:var(--muted)"> / ${k.kunyomi.join('・')}</span>`:''}
      </div>
      <div class="krc-strokes">${k.strokes} strokes · L${k.lessonId}</div>
    </div>`
  ).join('');
}

function goToKanji(lessonId, char) {
  // Navigate to that lesson's kanji tab, select the right kanji
  selectLesson(lessonId);
  S.mode = 'kanji';
  const l = LessonRegistry.get(lessonId);
  S.kanji.idx = (l?.kanji||[]).findIndex(k=>k.char===char) || 0;
  // Restore lesson tabs
  setTab('kanji');
  renderKanji();
}

/* ═══════════════════ GRAMMAR REPO ═══════════════════ */
function renderGrammarRepo() {
  const grammar = allGrammar();

  if (!grammar.length) {
    ma().innerHTML='<div class="empty"><div class="big">📝</div><p>Grammar data will appear as lessons are added.</p></div>';
    return;
  }

  const html = grammar.map(g => `
    <div class="grammar-card">
      <div class="gc-header">
        <span class="gc-pattern">${g.pattern}</span>
        <span class="gc-lesson">L${g.lessonId} · ${g.lessonTitle}</span>
      </div>
      <div class="gc-sentences">
        ${g.sentences.map(s=>`
          <div class="gc-sentence">
            <div class="gc-jp">${s.jp}</div>
            <div class="gc-en">${s.en}</div>
            <div style="display:flex;gap:6px;margin-top:4px">
              <button class="kc-btn" data-speak="${esc(s.jp)}" onclick="Audio.btn(this,false)">🔊 Hear</button>
              <button class="kc-btn" data-speak="${esc(s.jp)}" onclick="Audio.btn(this,true)">🐢 Slow</button>
            </div>
          </div>`).join('')}
      </div>
    </div>`).join('');

  ma().innerHTML = `
  <div style="font-size:13px;color:var(--muted);margin-bottom:1rem">${grammar.length} patterns across ${LessonRegistry.all().length} lesson(s)</div>
  ${html}`;
}
