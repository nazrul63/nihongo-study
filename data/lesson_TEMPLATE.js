/**
 * Minna no Nihongo — Lesson NN
 * Topic: [Topic name here]
 *
 * HOW TO ADD THIS LESSON:
 * 1. Copy this file → rename lesson02.js (or 03, 04 …)
 * 2. Fill in id, title, topic, grammar
 * 3. Add vocab entries (copy format from lesson01.js)
 * 4. Add kanji entries (on/kun readings, stroke count, JLPT, mnemonic)
 * 5. Add example sentences + breakdown
 * 6. In index.html uncomment: <script src="data/lessonNN.js"></script>
 * 7. Refresh the browser — done!
 */
LessonRegistry.add({
  id: 2,
  title: "Lesson 2",
  topic: "[Topic here]",
  grammar: "[Key grammar patterns here]",

  vocab: [
    // { jp:"これ", kj:"", en:"this (near me)", note:"", group:"Demonstratives" },
  ],

  kanji: [
    // {
    //   char: "何",
    //   meaning: "what, how many",
    //   strokes: 7,
    //   jlpt: "N5",
    //   onyomi: ["カ","ナン"],
    //   kunyomi: ["なに","なん"],
    //   inLesson: ["なんですか — What is it?"],
    //   mnemonic: "A person (人) carrying something unknown."
    // },
  ],

  sentences: [
    // {
    //   pattern: "〜は なん ですか",
    //   jp: "これは なん ですか。",
    //   en: "What is this?",
    //   breakdown: [
    //     { word:"これは", meaning:"this (topic)" },
    //     { word:"なん",   meaning:"what" },
    //     { word:"ですか。", meaning:"is it? (polite question)" }
    //   ]
    // },
  ],

  selfIntroTemplate: null  // set to an object if this lesson has a builder
});
