/**
 * Minna no Nihongo — Lesson 02
 * Topic: This is ~ / Objects & Demonstratives
 */
LessonRegistry.add({
  id: 2,
  title: "Lesson 2",
  topic: "This is ~ / Objects",
  grammar: "これは〜です  /  〜はなんですか  /  〜のです",

  vocab: [
    // --- Demonstratives (standalone) ---
    { jp:"これ",   kj:"",    en:"this (thing here)",           note:"Points to something near the speaker",      group:"Demonstratives" },
    { jp:"それ",   kj:"",    en:"that (thing near you)",       note:"Points to something near the listener",     group:"Demonstratives" },
    { jp:"あれ",   kj:"",    en:"that (thing over there)",     note:"Points to something far from both",         group:"Demonstratives" },
    { jp:"この〜", kj:"",    en:"this ~ (here)",               note:"Modifies a noun: この ほん = this book",    group:"Demonstratives" },
    { jp:"その〜", kj:"",    en:"that ~ (near you)",           note:"Modifies a noun: その かばん = that bag",   group:"Demonstratives" },
    { jp:"あの〜", kj:"",    en:"that ~ (over there)",         note:"Modifies a noun: あの くるま = that car",   group:"Demonstratives" },

    // --- Print & Paper ---
    { jp:"ほん",       kj:"本",  en:"book",             note:"",                                       group:"Print & Paper" },
    { jp:"じしょ",     kj:"辞書", en:"dictionary",       note:"",                                       group:"Print & Paper" },
    { jp:"ざっし",     kj:"雑誌", en:"magazine",         note:"",                                       group:"Print & Paper" },
    { jp:"しんぶん",   kj:"新聞", en:"newspaper",        note:"",                                       group:"Print & Paper" },
    { jp:"ノート",     kj:"",    en:"notebook",          note:"Loanword from English",                  group:"Print & Paper" },
    { jp:"てちょう",   kj:"手帳", en:"pocket notebook",  note:"Small personal planner",                 group:"Print & Paper" },
    { jp:"めいし",     kj:"名刺", en:"business card",    note:"Important in Japanese business culture", group:"Print & Paper" },
    { jp:"カード",     kj:"",    en:"card",              note:"Loanword",                               group:"Print & Paper" },
    { jp:"テレホンカード", kj:"", en:"telephone card",   note:"Prepaid phone card",                     group:"Print & Paper" },

    // --- Stationery ---
    { jp:"えんぴつ",       kj:"鉛筆", en:"pencil",                             note:"", group:"Stationery" },
    { jp:"ボールペン",     kj:"",     en:"ballpoint pen",                      note:"Loanword (ball pen)", group:"Stationery" },
    { jp:"シャープペンシル", kj:"",   en:"mechanical pencil / propelling pencil", note:"Loanword", group:"Stationery" },

    // --- Personal Items ---
    { jp:"かぎ",   kj:"",    en:"key",              note:"", group:"Personal Items" },
    { jp:"とけい", kj:"時計", en:"watch / clock",   note:"", group:"Personal Items" },
    { jp:"かさ",   kj:"傘",  en:"umbrella",         note:"Essential in Japan's rainy season!", group:"Personal Items" },
    { jp:"かばん", kj:"",    en:"bag / briefcase",  note:"", group:"Personal Items" },

    // --- Electronics & Transport ---
    { jp:"テープ",       kj:"",    en:"[cassette] tape", note:"",                  group:"Electronics" },
    { jp:"テープレコーダー", kj:"", en:"tape recorder",  note:"Loanword",          group:"Electronics" },
    { jp:"テレビ",       kj:"",    en:"television",      note:"Loanword",          group:"Electronics" },
    { jp:"ラジオ",       kj:"",    en:"radio",           note:"Loanword",          group:"Electronics" },
    { jp:"カメラ",       kj:"",    en:"camera",          note:"Loanword",          group:"Electronics" },
    { jp:"コンピューター", kj:"",  en:"computer",        note:"Loanword",          group:"Electronics" },
    { jp:"じどうしゃ",   kj:"自動車", en:"automobile / car", note:"",             group:"Electronics" },

    // --- Furniture & Food ---
    { jp:"つくえ",     kj:"机",   en:"desk",       note:"", group:"Furniture & Food" },
    { jp:"いす",       kj:"",     en:"chair",      note:"", group:"Furniture & Food" },
    { jp:"チョコレート", kj:"",   en:"chocolate",  note:"Loanword", group:"Furniture & Food" },
    { jp:"コーヒー",   kj:"",     en:"coffee",     note:"Loanword", group:"Furniture & Food" },

    // --- Languages ---
    { jp:"えいご",   kj:"英語",  en:"the English language",  note:"",                         group:"Languages" },
    { jp:"にほんご", kj:"日本語", en:"the Japanese language", note:"The language you're learning!", group:"Languages" },
    { jp:"〜ご",     kj:"〜語",  en:"~ language",            note:"e.g. フランスご = French",  group:"Languages" },

    // --- Question & Response Words ---
    { jp:"なん",   kj:"何",  en:"what",   note:"Used before です and counters",       group:"Q-Words" },
    { jp:"そう",   kj:"",    en:"so / that's right",  note:"Used to agree or confirm",  group:"Q-Words" },

    // --- Key Phrases ---
    { jp:"ちがいます",         kj:"違います",      en:"No, it isn't. / You are wrong.", note:"Polite disagreement",                      group:"Phrases" },
    { jp:"そうですか",         kj:"",              en:"I see. / Is that so?",            note:"Shows you received new information",        group:"Phrases" },
    { jp:"あのう",             kj:"",              en:"well… / um… (hesitation)",        note:"Used to get someone's attention politely",  group:"Phrases" },
    { jp:"ほんのきもちです",   kj:"ほんの気持ちです", en:"It's nothing. / A small token.", note:"Said when giving a gift",                 group:"Phrases" },
    { jp:"どうぞ",             kj:"",              en:"Please. / Here you are.",         note:"Offering something to someone",             group:"Phrases" },
    { jp:"どうも",             kj:"",              en:"Well, thanks.",                   note:"Casual thanks",                             group:"Phrases" },
    { jp:"ありがとうございます", kj:"",            en:"Thank you very much.",            note:"[どうも]ありがとう[ございます] — brackets = optional", group:"Phrases" },
    { jp:"これからお世話になります", kj:"",        en:"I hope for your kind assistance.", note:"Said when starting a relationship/job",     group:"Phrases" },
    { jp:"こちらこそよろしく", kj:"",              en:"Pleased to meet you too.",         note:"Response to どうぞよろしく",                group:"Phrases" },
  ],

  kanji: [
    {
      char: "本", meaning: "book (also: origin)", strokes: 5, jlpt: "N5",
      onyomi: ["ホン"], kunyomi: ["もと"],
      inLesson: ["ほん (本) — book"],
      mnemonic: "You already know 本 from L1 (日本). Same character — now meaning 'book'. Books are the roots of knowledge."
    },
    {
      char: "書", meaning: "write", strokes: 10, jlpt: "N4",
      onyomi: ["ショ"], kunyomi: ["か(く)"],
      inLesson: ["じしょ (辞書) — dictionary"],
      mnemonic: "A brush (聿) writing over a surface (日/日) — writing done stroke by stroke."
    },
    {
      char: "新", meaning: "new", strokes: 13, jlpt: "N4",
      onyomi: ["シン"], kunyomi: ["あたら(しい)","あら-","にい-"],
      inLesson: ["しんぶん (新聞) — newspaper"],
      mnemonic: "Stand (立) + tree (木) + axe (斤) — chopping a fresh new tree. Something newly cut."
    },
    {
      char: "聞", meaning: "hear, ask, listen", strokes: 14, jlpt: "N4",
      onyomi: ["ブン","モン"], kunyomi: ["き(く)","き(こえる)"],
      inLesson: ["しんぶん (新聞) — newspaper"],
      mnemonic: "An ear (耳) inside a gate (門) — listening carefully through the gate."
    },
    {
      char: "手", meaning: "hand", strokes: 4, jlpt: "N5",
      onyomi: ["シュ","ズ"], kunyomi: ["て","た-"],
      inLesson: ["てちょう (手帳) — pocket notebook"],
      mnemonic: "Five fingers splayed out — one of the most natural pictographs in kanji."
    },
    {
      char: "時", meaning: "time, hour", strokes: 10, jlpt: "N5",
      onyomi: ["ジ"], kunyomi: ["とき","-どき"],
      inLesson: ["とけい (時計) — watch / clock"],
      mnemonic: "Sun (日) + temple (寺) — time measured by sunlight at the ancient temple."
    },
    {
      char: "自", meaning: "oneself, self", strokes: 6, jlpt: "N4",
      onyomi: ["ジ","シ"], kunyomi: ["みずか(ら)"],
      inLesson: ["じどうしゃ (自動車) — automobile"],
      mnemonic: "Pictograph of a nose — Japanese people point to their own nose when saying 'me'."
    },
    {
      char: "動", meaning: "move, motion", strokes: 11, jlpt: "N4",
      onyomi: ["ドウ"], kunyomi: ["うご(く)","うご(かす)"],
      inLesson: ["じどうしゃ (自動車) — automobile"],
      mnemonic: "Heavy (重) + strength (力) — it takes strength to move something heavy."
    },
    {
      char: "車", meaning: "vehicle, wheel", strokes: 7, jlpt: "N5",
      onyomi: ["シャ"], kunyomi: ["くるま"],
      inLesson: ["じどうしゃ (自動車) — automobile"],
      mnemonic: "A wheel viewed from above with an axle through the middle — ancient pictograph of a cart."
    },
    {
      char: "英", meaning: "England, brilliant, hero", strokes: 8, jlpt: "N4",
      onyomi: ["エイ"], kunyomi: ["—"],
      inLesson: ["えいご (英語) — English language"],
      mnemonic: "Plant (艹) + center (央) — a brilliant flower blooming at the center."
    },
    {
      char: "語", meaning: "language, word, speak", strokes: 14, jlpt: "N5",
      onyomi: ["ゴ"], kunyomi: ["かた(る)","かた(らう)"],
      inLesson: ["えいご (英語) — English", "にほんご (日本語) — Japanese", "〜ご (〜語) — ~ language"],
      mnemonic: "Words/speech (言) + I/me (吾) — my words, my language."
    },
    {
      char: "何", meaning: "what, how many", strokes: 7, jlpt: "N5",
      onyomi: ["カ"], kunyomi: ["なに","なん"],
      inLesson: ["なん (何) — what"],
      mnemonic: "A person (人) carrying something (可) — 'what are you carrying?'"
    },
  ],

  sentences: [
    {
      pattern: "これ／それ／あれ は〜です",
      jp: "これは じしょ です。",
      en: "This is a dictionary.",
      breakdown: [
        { word:"これは", meaning:"this (topic)" },
        { word:"じしょ", meaning:"dictionary" },
        { word:"です。", meaning:"is (polite)" }
      ]
    },
    {
      pattern: "これ／それ／あれ は〜です",
      jp: "あれは NAISTの コンピューター です。",
      en: "That is NAIST's computer.",
      breakdown: [
        { word:"あれは", meaning:"that over there (topic)" },
        { word:"NAISTの", meaning:"NAIST's (possessive)" },
        { word:"コンピューター", meaning:"computer" },
        { word:"です。", meaning:"is (polite)" }
      ]
    },
    {
      pattern: "〜はなんですか",
      jp: "それは なん ですか。",
      en: "What is that?",
      breakdown: [
        { word:"それは", meaning:"that (topic)" },
        { word:"なん", meaning:"what" },
        { word:"ですか。", meaning:"is it? (polite question)" }
      ]
    },
    {
      pattern: "ちがいます / そうですか",
      jp: "それは えんぴつ ですか。 ― ちがいます。ボールペン です。",
      en: "Is that a pencil? — No, it isn't. It's a ballpoint pen.",
      breakdown: [
        { word:"それは えんぴつ ですか。", meaning:"Is that a pencil?" },
        { word:"ちがいます。", meaning:"No, it isn't. / You are wrong." },
        { word:"ボールペン です。", meaning:"It's a ballpoint pen." }
      ]
    },
    {
      pattern: "〜は〜語でなんといいますか",
      jp: "にほんごで「computer」は なんと いいますか。",
      en: "How do you say 'computer' in Japanese?",
      breakdown: [
        { word:"にほんごで", meaning:"in Japanese (using the particle で)" },
        { word:"「computer」は", meaning:"'computer' (topic)" },
        { word:"なんと いいますか。", meaning:"how do you say?" }
      ]
    },
    {
      pattern: "どうぞ / ありがとうございます",
      jp: "どうぞ。 ― ありがとう ございます。",
      en: "Here you are. — Thank you very much.",
      breakdown: [
        { word:"どうぞ。", meaning:"Please. / Here you are. (when giving something)" },
        { word:"ありがとう ございます。", meaning:"Thank you very much." }
      ]
    },
  ],

  selfIntroTemplate: null
});
