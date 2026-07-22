/* ═══════════════════════════════════════════════════════
   practice.js — Multi-modal vocabulary practice
   Langoal-style: listening, matching, typing, sentence-fill
   all pulled from existing lesson vocab/sentences data.

   INTEGRATION:
   1. Save this file as js/practice.js
   2. Add <script src="js/practice.js"></script> in index.html
      AFTER app.js
   3. Add a tab button — see snippet at bottom of this comment
   4. Add practice.css rules — see separate file

   In index.html, add this button to LESSON_TABS (in app.js)
   and to the initial mode-tabs div:
     <button class="mode-tab" data-mode="practice"
       onclick="switchMode('practice')">🎯 Practice</button>

   In app.js renderMode(), add:  practice:renderPractice
   ═══════════════════════════════════════════════════════ */

let PR = {
  queue: [],
  current: null,
  streak: 0,
  correct: 0,
  total: 0,
  matchState: null
};

/* ── Entry point ── */
function renderPractice() {
  const l = LessonRegistry.get(S.lessonId);
  if (!l || !l.vocab || !l.vocab.length) {
    ma().innerHTML = '<div class="empty"><div class="big">🎯</div><p>No vocabulary to practice yet.</p></div>';
    return;
  }
  PR.streak = 0; PR.correct = 0; PR.total = 0;
  buildQueue(l);
  ma().innerHTML = `
    <div class="pr-scorebar">
      <span>🔥 Streak <b id="pr-streak">0</b></span>
      <span>✓ <b id="pr-correct">0</b> / <b id="pr-total">0</b></span>
      <button class="pr-restart" onclick="renderPractice()">↻ Restart</button>
    </div>
    <div id="pr-stage"></div>`;
  nextQuestion();
}

/* ── Build a shuffled queue of mixed question types ── */
function buildQueue(lesson) {
  const words = lesson.vocab;
  const sentences = lesson.sentences || [];
  const types = ['listen-meaning', 'listen-kana', 'type-reading', 'match'];
  if (sentences.length) types.push('fill-blank');

  PR.queue = [];
  words.forEach(w => {
    let t = types[Math.floor(Math.random() * types.length)];
    if (t === 'fill-blank') {
      const candidateSentences = sentences.filter(s => s.jp.includes(w.jp.replace('〜','')));
      if (candidateSentences.length) {
        PR.queue.push({ type:'fill-blank', word:w, sentence: candidateSentences[0], words });
        return;
      }
      t = 'listen-meaning';
    }
    PR.queue.push({ type:t, word:w, words });
  });

  // Batch matching questions (5 words per round) instead of individual entries
  const matchWords = PR.queue.filter(q => q.type === 'match').map(q => q.word);
  PR.queue = PR.queue.filter(q => q.type !== 'match');
  for (let i = 0; i < matchWords.length; i += 5) {
    const batch = matchWords.slice(i, i+5);
    if (batch.length >= 2) PR.queue.push({ type:'match-batch', batch, words });
  }

  PR.queue.sort(() => Math.random() - 0.5);
  PR.total = words.length;
}

function nextQuestion() {
  if (!PR.queue.length) { renderPracticeComplete(); return; }
  PR.current = PR.queue.shift();
  const stage = document.getElementById('pr-stage');
  if (!stage) return;

  switch (PR.current.type) {
    case 'listen-meaning': renderListenMeaning(stage); break;
    case 'listen-kana':    renderListenKana(stage);    break;
    case 'type-reading':   renderTypeReading(stage);   break;
    case 'fill-blank':     renderFillBlank(stage);     break;
    case 'match-batch':    renderMatchBatch(stage);    break;
    default: nextQuestion();
  }
}

/* ── Shared scoring ── */
function prScore(correct) {
  const w = PR.current.word;
  if (w) {
    const lid = w.lessonId || S.lessonId;
    const st = Store.load(lid);
    if (correct) { if(!st.known.includes(w.jp)) st.known.push(w.jp); st.review = st.review.filter(x=>x!==w.jp); }
    else         { if(!st.review.includes(w.jp)) st.review.push(w.jp); }
    Store.save(lid, st);
  }
  PR.streak = correct ? PR.streak + 1 : 0;
  if (correct) PR.correct++;
  const streakEl = document.getElementById('pr-streak');
  const corrEl   = document.getElementById('pr-correct');
  const totEl    = document.getElementById('pr-total');
  if (streakEl) streakEl.textContent = PR.streak;
  if (corrEl) corrEl.textContent = PR.correct;
  if (totEl) totEl.textContent = PR.total - PR.queue.length;
  if (typeof buildSidebar === 'function') buildSidebar();
}

function prContinueBtn() {
  return `<button class="pr-next" onclick="nextQuestion()">Continue →</button>`;
}

/* ═══════════ TYPE 1: Listen → choose meaning ═══════════ */
function renderListenMeaning(stage) {
  const { word, words } = PR.current;
  let opts = [word];
  while (opts.length < 4) {
    const r = words[Math.floor(Math.random()*words.length)];
    if (!opts.find(o=>o.jp===r.jp)) opts.push(r);
  }
  opts.sort(()=>Math.random()-.5);

  stage.innerHTML = `
    <div class="pr-card">
      <div class="pr-type-label">🔊 Listen &amp; choose the meaning</div>
      <button class="pr-play-btn" data-speak="${escAttr(word.jp)}" onclick="Audio.btn(this,false)">🔊 Play sound</button>
      <div class="pr-options">
        ${opts.map(o=>`<button class="pr-opt" onclick="prCheckMC(this,${o.jp===word.jp})">${o.en}</button>`).join('')}
      </div>
      <div class="pr-feedback" id="pr-fb"></div>
    </div>`;
  setTimeout(() => Audio.speak(word.jp.replace('〜',''), false), 300);
}

/* ═══════════ TYPE 2: Listen → choose correct kana ═══════════ */
function renderListenKana(stage) {
  const { word, words } = PR.current;
  let opts = [word];
  while (opts.length < 4) {
    const r = words[Math.floor(Math.random()*words.length)];
    if (!opts.find(o=>o.jp===r.jp)) opts.push(r);
  }
  opts.sort(()=>Math.random()-.5);

  stage.innerHTML = `
    <div class="pr-card">
      <div class="pr-type-label">🔊 Listen &amp; choose what you hear</div>
      <button class="pr-play-btn" data-speak="${escAttr(word.jp)}" onclick="Audio.btn(this,false)">🔊 Play sound</button>
      <div class="pr-options pr-options-kana">
        ${opts.map(o=>`<button class="pr-opt pr-opt-kana" onclick="prCheckMC(this,${o.jp===word.jp})">${o.jp}</button>`).join('')}
      </div>
      <div class="pr-feedback" id="pr-fb"></div>
    </div>`;
  setTimeout(() => Audio.speak(word.jp.replace('〜',''), false), 300);
}

function prCheckMC(btn, correct) {
  document.querySelectorAll('.pr-opt').forEach(b => b.disabled = true);
  btn.classList.add(correct ? 'pr-correct' : 'pr-wrong');
  if (!correct) {
    const word = PR.current.word;
    document.querySelectorAll('.pr-opt').forEach(b => {
      const t = b.textContent.trim();
      if (t === word.en || t === word.jp) b.classList.add('pr-correct');
    });
  }
  prScore(correct);
  const answerText = (PR.current.type === 'listen-kana' || PR.current.type === 'fill-blank')
    ? PR.current.word.jp : PR.current.word.en;
  const fb = document.getElementById('pr-fb');
  if (fb) fb.innerHTML = `${correct ? '✓ Correct!' : '✗ The answer was: ' + answerText} ${prContinueBtn()}`;
}

/* ═══════════ TYPE 3: Type the reading ═══════════ */
function renderTypeReading(stage) {
  const { word } = PR.current;
  stage.innerHTML = `
    <div class="pr-card">
      <div class="pr-type-label">⌨️ Type the Japanese reading</div>
      <div class="pr-prompt-en">${word.en}</div>
      ${word.note ? `<div class="pr-hint">${word.note}</div>` : ''}
      <input type="text" id="pr-input" class="pr-text-input" placeholder="Type in hiragana/katakana…" autocomplete="off" autocapitalize="off" />
      <button class="pr-submit" onclick="prCheckType()">Check</button>
      <div class="pr-feedback" id="pr-fb"></div>
    </div>`;
  const inp = document.getElementById('pr-input');
  if (inp) {
    inp.focus();
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') prCheckType(); });
  }
}

function prCheckType() {
  const inp = document.getElementById('pr-input');
  if (!inp || inp.disabled) return;
  const word = PR.current.word;
  const given = inp.value.trim();
  const target = word.jp.replace('〜','').trim();
  const correct = given === target;
  inp.disabled = true;
  inp.classList.add(correct ? 'pr-input-correct' : 'pr-input-wrong');
  prScore(correct);
  const fb = document.getElementById('pr-fb');
  if (fb) fb.innerHTML = `
    ${correct ? '✓ Correct!' : `✗ Correct answer: <strong>${target}</strong>`}
    <button class="pr-play-btn-sm" data-speak="${escAttr(word.jp)}" onclick="Audio.btn(this,false)">🔊</button>
    ${prContinueBtn()}`;
}

/* ═══════════ TYPE 4: Fill in the blank ═══════════ */
function renderFillBlank(stage) {
  const { word, sentence, words } = PR.current;
  const target = word.jp.replace('〜','');
  const blanked = sentence.jp.split(target).join('＿＿＿＿');

  let opts = [word];
  while (opts.length < 4) {
    const r = words[Math.floor(Math.random()*words.length)];
    if (!opts.find(o=>o.jp===r.jp)) opts.push(r);
  }
  opts.sort(()=>Math.random()-.5);

  stage.innerHTML = `
    <div class="pr-card">
      <div class="pr-type-label">✏️ Fill in the blank</div>
      <div class="pr-sentence-jp">${blanked}</div>
      <div class="pr-sentence-en">${sentence.en}</div>
      <div class="pr-options">
        ${opts.map(o=>`<button class="pr-opt" onclick="prCheckMC(this,${o.jp===word.jp})">${o.jp}</button>`).join('')}
      </div>
      <div class="pr-feedback" id="pr-fb"></div>
    </div>`;
}

/* ═══════════ TYPE 5: Matching game ═══════════ */
function renderMatchBatch(stage) {
  const { batch } = PR.current;
  const left  = [...batch].sort(()=>Math.random()-.5);
  const right = [...batch].sort(()=>Math.random()-.5);

  PR.matchState = { selectedLeft:null, selectedRight:null, matched:new Set(), pairs:batch };

  stage.innerHTML = `
    <div class="pr-card">
      <div class="pr-type-label">🔗 Match the pairs</div>
      <div class="pr-match-grid">
        <div class="pr-match-col">
          ${left.map(w=>`<button class="pr-match-item" data-jp="${escAttr(w.jp)}" onclick="prMatchClick(this,'left')">${w.jp}</button>`).join('')}
        </div>
        <div class="pr-match-col">
          ${right.map(w=>`<button class="pr-match-item" data-jp="${escAttr(w.jp)}" onclick="prMatchClick(this,'right')">${w.en}</button>`).join('')}
        </div>
      </div>
      <div class="pr-feedback" id="pr-fb"></div>
    </div>`;
}

function prMatchClick(btn, side) {
  if (btn.classList.contains('pr-matched')) return;
  const state = PR.matchState;

  if (side === 'left') {
    document.querySelectorAll('.pr-match-col:first-child .pr-match-item').forEach(b=>b.classList.remove('pr-selected'));
    btn.classList.add('pr-selected');
    state.selectedLeft = btn;
  } else {
    document.querySelectorAll('.pr-match-col:last-child .pr-match-item').forEach(b=>b.classList.remove('pr-selected'));
    btn.classList.add('pr-selected');
    state.selectedRight = btn;
  }

  if (state.selectedLeft && state.selectedRight) {
    const match = state.selectedLeft.dataset.jp === state.selectedRight.dataset.jp;
    if (match) {
      state.selectedLeft.classList.add('pr-matched');
      state.selectedRight.classList.add('pr-matched');
      state.selectedLeft.classList.remove('pr-selected');
      state.selectedRight.classList.remove('pr-selected');
      state.matched.add(state.selectedLeft.dataset.jp);
      const w = state.pairs.find(p => p.jp === state.selectedLeft.dataset.jp);
      if (w) { PR.current.word = w; prScore(true); }
      state.selectedLeft = null; state.selectedRight = null;

      if (state.matched.size === state.pairs.length) {
        const fb = document.getElementById('pr-fb');
        if (fb) fb.innerHTML = `✓ All matched! ${prContinueBtn()}`;
      }
    } else {
      state.selectedLeft.classList.add('pr-shake');
      state.selectedRight.classList.add('pr-shake');
      const l = state.selectedLeft, r = state.selectedRight;
      setTimeout(() => {
        l.classList.remove('pr-selected','pr-shake');
        r.classList.remove('pr-selected','pr-shake');
      }, 500);
      state.selectedLeft = null; state.selectedRight = null;
    }
  }
}

/* ═══════════ Completion screen ═══════════ */
function renderPracticeComplete() {
  const pct = PR.total ? Math.round(PR.correct / PR.total * 100) : 0;
  const stage = document.getElementById('pr-stage');
  if (!stage) return;
  stage.innerHTML = `
    <div class="pr-complete">
      <div class="pr-complete-emoji">${pct >= 80 ? '🎉' : pct >= 50 ? '👍' : '💪'}</div>
      <div class="pr-complete-pct">${pct}%</div>
      <div class="pr-complete-sub">${PR.correct} / ${PR.total} correct this round</div>
      <button class="pr-next" onclick="renderPractice()">Practice again →</button>
    </div>`;
}

/* ── Local escape helper (in case esc() from app.js isn't loaded) ── */
function escAttr(str) {
  return String(str).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
