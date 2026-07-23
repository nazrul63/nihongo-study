/* ═══════════════════════════════════════════════════════
   resources.js — "📻 Resources" tab for the Repository
   Links out to official, free, publisher-provided study aids.
   No copyrighted content is stored or embedded here —
   only outbound links to the source.

   INTEGRATION:
   1. Save as js/resources.js
   2. Add <script src="js/resources.js"></script> in index.html
      after app.js
   3. In app.js, inside openRepository(), add a new tab button
      to the repo-tabs div (see snippet at bottom of this file)
   4. In app.js, inside renderRepoTab()'s map, add:
        resources: renderResourcesRepo
   ═══════════════════════════════════════════════════════ */

const OFFICIAL_RESOURCES = {
  book: {
    title: "Minna no Nihongo Shokyu I (3rd Edition)",
    audioIndex: "https://www.3anet.co.jp/np/en/resrcs/130020/",
    bookInfo: "https://www.3anet.co.jp/np/en/books/1300/",
    publisher: "3A Corporation"
  },
  // Lesson-level metadata — audio covers lessons 0-25 on the official page
  lessonRange: { min: 0, max: 25 }
};

function renderResourcesRepo() {
  const lessons = LessonRegistry.all();
  const { book, lessonRange } = OFFICIAL_RESOURCES;

  const rows = lessons.map(l => {
    const hasAudio = l.id >= lessonRange.min && l.id <= lessonRange.max;
    return `
      <div class="res-row">
        <div class="res-lesson">
          <span class="res-num">${l.id}</span>
          <span class="res-topic">${l.title} · ${l.topic}</span>
        </div>
        ${hasAudio
          ? `<a href="${book.audioIndex}" target="_blank" rel="noopener noreferrer" class="res-link">🎧 Official audio ↗</a>`
          : `<span class="res-link res-link-disabled">— not yet covered —</span>`}
      </div>`;
  }).join('');

  ma().innerHTML = `
    <div class="res-intro">
      <div class="res-intro-title">📻 Official Study Resources</div>
      <p class="res-intro-text">
        These link to ${book.publisher}'s own free companion audio for
        <strong>${book.title}</strong> — the authentic native-voice recordings
        for every lesson's conversation and practice questions. No registration required.
      </p>
      <div class="res-intro-links">
        <a href="${book.audioIndex}" target="_blank" rel="noopener noreferrer" class="res-btn">🎧 All lesson audio ↗</a>
        <a href="${book.bookInfo}" target="_blank" rel="noopener noreferrer" class="res-btn">📖 Book details ↗</a>
      </div>
    </div>
    <div class="res-list">${rows}</div>
    <div class="res-footer">
      Audio and textbook content © ${book.publisher}. This site links to their official
      resources and does not host or redistribute their copyrighted recordings or text.
    </div>`;
}
