/* ═══════════════════════════════════════════════════════
   poster.js — Colorful categorized vocab poster/cheat-sheet
   Inspired by category-box study sheets. Uses YOUR existing
   lesson vocab (grouped by the `group` field already in your
   data files) — no external content, just a new visual layout.

   INTEGRATION:
   1. Save as js/poster.js, load after app.js in index.html
   2. Add css/poster.css, link after style.css
   3. In app.js renderList(), add a view toggle (see snippet
      at the bottom of this file)
   ═══════════════════════════════════════════════════════ */

/* Color palette — cycles through categories in a stable order */
const POSTER_COLORS = [
  { bg:'#fde8ef', border:'#f4a6c1', header:'#e0568b' }, // pink
  { bg:'#e8f0fd', border:'#a6c3f4', header:'#3a6fd8' }, // blue
  { bg:'#e8fdf0', border:'#a6f4c3', header:'#2ea86c' }, // green
  { bg:'#fdf6e8', border:'#f4d9a6', header:'#c98a1a' }, // amber
  { bg:'#f3e8fd', border:'#c9a6f4', header:'#8a3ad8' }, // purple
  { bg:'#fdece8', border:'#f4b3a6', header:'#d85a3a' }, // coral
  { bg:'#e8fdfb', border:'#a6f0e8', header:'#1a9e8f' }, // teal
  { bg:'#fdfbe8', border:'#eef0a6', header:'#a8a01a' }, // olive
];

const POSTER_ICONS = {
  // Fallback icon guesses by keyword — falls back to 📝 if no match
  'adjective':'✨','い-adjective':'✨','な-adjective':'💫',
  'noun':'📦','verb':'🏃','phrase':'💬','phrases':'💬',
  'question':'❓','q-word':'❓','colors':'🎨','color':'🎨',
  'people':'👥','place':'📍','food':'🍚','drink':'🥤',
  'time':'⏰','date':'📅','number':'🔢','size':'📏',
  'transport':'🚃','family':'👪','animal':'🐾','body':'🖐️',
};

function posterIconFor(groupName) {
  const key = Object.keys(POSTER_ICONS).find(k => groupName.toLowerCase().includes(k));
  return key ? POSTER_ICONS[key] : '📝';
}

function renderPoster() {
  const l = LessonRegistry.get(S.lessonId);
  if (!l || !l.vocab || !l.vocab.length) {
    ma().innerHTML = '<div class="empty"><div class="big">🎴</div><p>No vocabulary to show yet.</p></div>';
    return;
  }

  const byGroup = {};
  l.vocab.forEach(v => { (byGroup[v.group] = byGroup[v.group] || []).push(v); });
  const groupNames = Object.keys(byGroup);

  const boxes = groupNames.map((g, i) => {
    const c = POSTER_COLORS[i % POSTER_COLORS.length];
    const icon = posterIconFor(g);
    const words = byGroup[g];
    return `
      <div class="poster-box" style="background:${c.bg}; border-color:${c.border};">
        <div class="poster-box-header" style="background:${c.header};">
          <span class="poster-icon">${icon}</span>
          <span class="poster-group-name">${g}</span>
        </div>
        <div class="poster-word-list">
          ${words.map(w => `
            <div class="poster-word-row">
              <span class="poster-jp">${w.jp}</span>
              ${w.kj ? `<span class="poster-kj">${w.kj}</span>` : ''}
              <span class="poster-en">${w.en}</span>
            </div>`).join('')}
        </div>
      </div>`;
  }).join('');

  ma().innerHTML = `
    <div class="poster-toolbar">
      <button class="print-btn" onclick="window.print()">🖨 Print / Save as PDF</button>
    </div>
    <div class="poster-sheet">
      <div class="poster-title">
        <span class="poster-sparkle">✿</span>
        ${l.title} — ${l.topic}
        <span class="poster-sparkle">✿</span>
      </div>
      <div class="poster-grid">${boxes}</div>
      <div class="poster-footer">
        <span class="poster-star">★</span>
        今日も少しずつ、頑張りましょう！
        <span class="poster-star">★</span>
      </div>
    </div>`;
}
