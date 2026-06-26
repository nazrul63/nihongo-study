/**
 * Minna no Nihongo — Lesson 01
 * Topic: Self-introduction
 */
LessonRegistry.add({
  id: 1,
  title: "Lesson 1",
  topic: "Self-introduction",
  grammar: "〜は〜です  /  〜からきました  /  はじめまして",

  /* ── VOCABULARY ─────────────────────────────────────── */
  vocab: [
    { jp:"わたし",       kj:"",      en:"I",                        note:"First person pronoun",                   group:"Pronouns" },
    { jp:"あなた",       kj:"",      en:"you",                      note:"Second person pronoun",                  group:"Pronouns" },
    { jp:"あのひと",     kj:"あの人", en:"that person / he / she",   note:"あのかた is the polite form",              group:"Pronouns" },
    { jp:"〜さん",       kj:"",      en:"Mr. / Ms. ~",              note:"Polite suffix added to names",           group:"Suffixes"  },
    { jp:"〜ちゃん",     kj:"",      en:"~ (for children's names)", note:"Informal, used instead of さん",          group:"Suffixes"  },
    { jp:"〜くん",       kj:"",      en:"~ (for boys / juniors)",   note:"Informal male suffix",                   group:"Suffixes"  },
    { jp:"〜じん",       kj:"〜人",  en:"national of ~",            note:"e.g. アメリカじん = American",             group:"Suffixes"  },
    { jp:"せんせい",     kj:"先生",  en:"teacher / instructor",     note:"Not used for one's own job",             group:"Occupations" },
    { jp:"きょうし",     kj:"教師",  en:"teacher / instructor",     note:"More formal term",                       group:"Occupations" },
    { jp:"がくせい",     kj:"学生",  en:"student",                  note:"",                                       group:"Occupations" },
    { jp:"かいしゃいん", kj:"会社員", en:"company employee",         note:"",                                       group:"Occupations" },
    { jp:"しゃいん",     kj:"社員",  en:"employee of ~ company",    note:"e.g. IMCのしゃいん",                      group:"Occupations" },
    { jp:"ぎんこういん", kj:"銀行員", en:"bank employee",            note:"",                                       group:"Occupations" },
    { jp:"いしゃ",       kj:"医者",  en:"(medical) doctor",         note:"",                                       group:"Occupations" },
    { jp:"けんきゅうしゃ",kj:"研究者",en:"researcher / scholar",    note:"Your role at NAIST!",                    group:"Occupations" },
    { jp:"アナウンサー", kj:"",      en:"announcer",                note:"Katakana loanword",                      group:"Occupations" },
    { jp:"だいがく",     kj:"大学",  en:"university",               note:"Where you study",                        group:"Places"      },
    { jp:"びょういん",   kj:"病院",  en:"hospital",                 note:"",                                       group:"Places"      },
    { jp:"だれ",         kj:"",      en:"who",                      note:"どなた is the polite form",               group:"Q-Words"     },
    { jp:"〜さい",       kj:"〜歳",  en:"~ years old",              note:"",                                       group:"Numbers"     },
    { jp:"なんさい",     kj:"何歳",  en:"how old?",                 note:"おいくつ is the polite form",             group:"Numbers"     },
    { jp:"はい",         kj:"",      en:"yes",                      note:"",                                       group:"Basics"      },
    { jp:"いいえ",       kj:"",      en:"no",                       note:"",                                       group:"Basics"      },
    { jp:"はじめまして",   kj:"初めまして",         en:"How do you do?",         note:"First meeting greeting",              group:"Phrases" },
    { jp:"〜からきました", kj:"〜から来ました",      en:"I am from ~",            note:"e.g. バングラデシュからきました",       group:"Phrases" },
    { jp:"どうぞよろしく", kj:"どうぞよろしく[お願いします]", en:"Pleased to meet you", note:"End of self-introduction",    group:"Phrases" },
    { jp:"しつれいですが", kj:"失礼ですが",          en:"Excuse me, but...",      note:"When asking personal info",           group:"Phrases" },
    { jp:"おなまえは？",   kj:"お名前は？",          en:"May I have your name?",  note:"Polite way to ask",                   group:"Phrases" },
    { jp:"こちらは〜さんです", kj:"",              en:"This is Mr./Ms. ~",      note:"Introducing someone",                 group:"Phrases" },
    { jp:"アメリカ",   kj:"",    en:"U.S.A.",      note:"", group:"Countries" },
    { jp:"イギリス",   kj:"",    en:"U.K.",        note:"", group:"Countries" },
    { jp:"インド",     kj:"",    en:"India",       note:"", group:"Countries" },
    { jp:"インドネシア",kj:"",   en:"Indonesia",   note:"", group:"Countries" },
    { jp:"かんこく",   kj:"韓国", en:"South Korea", note:"", group:"Countries" },
    { jp:"タイ",       kj:"",    en:"Thailand",    note:"", group:"Countries" },
    { jp:"ちゅうごく", kj:"中国", en:"China",       note:"", group:"Countries" },
    { jp:"ドイツ",     kj:"",    en:"Germany",     note:"", group:"Countries" },
    { jp:"にほん",     kj:"日本", en:"Japan",       note:"Where you live now!", group:"Countries" },
    { jp:"ブラジル",   kj:"",    en:"Brazil",      note:"", group:"Countries" },
  ],

  /* ── KANJI ──────────────────────────────────────────── */
  kanji: [
    {
      char: "人", meaning: "person", strokes: 2, jlpt: "N5",
      onyomi: ["ジン","ニン"], kunyomi: ["ひと"],
      inLesson: ["〜じん (〜人) — national of ~", "あのひと (あの人) — that person"],
      mnemonic: "Two strokes: a person leaning on one leg — the simplest image of a human."
    },
    {
      char: "大", meaning: "big, large", strokes: 3, jlpt: "N5",
      onyomi: ["ダイ","タイ"], kunyomi: ["おお(きい)"],
      inLesson: ["だいがく (大学) — university"],
      mnemonic: "A person (人) with arms stretched wide — showing something big."
    },
    {
      char: "日", meaning: "day, sun", strokes: 4, jlpt: "N5",
      onyomi: ["ニチ","ジツ"], kunyomi: ["ひ","か"],
      inLesson: ["にほん (日本) — Japan"],
      mnemonic: "A rectangle with a line through it — an ancient pictograph of the sun."
    },
    {
      char: "本", meaning: "origin, book", strokes: 5, jlpt: "N5",
      onyomi: ["ホン"], kunyomi: ["もと"],
      inLesson: ["にほん (日本) — Japan"],
      mnemonic: "Tree (木) with a line marking its base (root/origin). Japan = 'origin of the sun'."
    },
    {
      char: "生", meaning: "life, birth", strokes: 5, jlpt: "N5",
      onyomi: ["セイ","ショウ"], kunyomi: ["い(きる)","う(まれる)","なま"],
      inLesson: ["せんせい (先生) — teacher", "がくせい (学生) — student"],
      mnemonic: "A plant sprouting from the ground — the image of life emerging."
    },
    {
      char: "先", meaning: "ahead, previous", strokes: 6, jlpt: "N5",
      onyomi: ["セン"], kunyomi: ["さき"],
      inLesson: ["せんせい (先生) — teacher"],
      mnemonic: "Person (儿) walking ahead of soil (土) — someone who has gone before you."
    },
    {
      char: "名", meaning: "name", strokes: 6, jlpt: "N4",
      onyomi: ["メイ","ミョウ"], kunyomi: ["な"],
      inLesson: ["おなまえは？(お名前は？) — May I have your name?"],
      mnemonic: "Evening (夕) + mouth (口): in the dark, you call out your name."
    },
    {
      char: "会", meaning: "meeting, meet", strokes: 6, jlpt: "N5",
      onyomi: ["カイ","エ"], kunyomi: ["あ(う)"],
      inLesson: ["かいしゃいん (会社員) — company employee"],
      mnemonic: "People gathered under a roof — a meeting."
    },
    {
      char: "学", meaning: "study, learn", strokes: 8, jlpt: "N5",
      onyomi: ["ガク"], kunyomi: ["まな(ぶ)"],
      inLesson: ["がくせい (学生) — student", "だいがく (大学) — university"],
      mnemonic: "Child (子) under a roof with learning marks — a student in school."
    },
    {
      char: "国", meaning: "country", strokes: 8, jlpt: "N5",
      onyomi: ["コク"], kunyomi: ["くに"],
      inLesson: ["かんこく (韓国) — South Korea", "ちゅうごく (中国) — China"],
      mnemonic: "A border (口) surrounding a jewel (玉) — a nation guarding its treasure."
    },
    {
      char: "者", meaning: "person (who does)", strokes: 8, jlpt: "N4",
      onyomi: ["シャ"], kunyomi: ["もの"],
      inLesson: ["けんきゅうしゃ (研究者) — researcher", "いしゃ (医者) — doctor"],
      mnemonic: "Soil (土) + sun (日) + a mark — someone who does the work day in and out."
    },
    {
      char: "社", meaning: "company, shrine", strokes: 7, jlpt: "N4",
      onyomi: ["シャ"], kunyomi: ["やしろ"],
      inLesson: ["かいしゃいん (会社員) — company employee", "しゃいん (社員) — company staff"],
      mnemonic: "Show (示) + soil (土): a shrine built on sacred ground — also a company's 'home'."
    },
    {
      char: "医", meaning: "medicine", strokes: 7, jlpt: "N4",
      onyomi: ["イ"], kunyomi: ["—"],
      inLesson: ["いしゃ (医者) — doctor"],
      mnemonic: "An arrow (矢) in a box (匸) — early medicine used arrows as surgical tools."
    },
    {
      char: "行", meaning: "go, carry out", strokes: 6, jlpt: "N5",
      onyomi: ["コウ","ギョウ"], kunyomi: ["い(く)","おこな(う)"],
      inLesson: ["ぎんこういん (銀行員) — bank employee"],
      mnemonic: "A crossroads (彳+亍) — going forward at an intersection."
    },
    {
      char: "員", meaning: "member, staff", strokes: 10, jlpt: "N4",
      onyomi: ["イン"], kunyomi: ["—"],
      inLesson: ["かいしゃいん (会社員)","しゃいん (社員)","ぎんこういん (銀行員)"],
      mnemonic: "Mouth (口) over shell (貝): a valued member who speaks for the group."
    },
    {
      char: "病", meaning: "illness", strokes: 10, jlpt: "N4",
      onyomi: ["ビョウ","ヘイ"], kunyomi: ["や(む)","やまい"],
      inLesson: ["びょういん (病院) — hospital"],
      mnemonic: "Sick bed (疒) + ice (氷 without water): being frozen in bed with illness."
    },
    {
      char: "院", meaning: "institution, temple", strokes: 10, jlpt: "N4",
      onyomi: ["イン"], kunyomi: ["—"],
      inLesson: ["びょういん (病院) — hospital"],
      mnemonic: "Mound (阜) + a complete enclosure (完): a walled institution on a hill."
    },
    {
      char: "銀", meaning: "silver", strokes: 14, jlpt: "N4",
      onyomi: ["ギン"], kunyomi: ["—"],
      inLesson: ["ぎんこういん (銀行員) — bank employee"],
      mnemonic: "Metal (金) + a kneeling person (艮): silver refined under pressure."
    },
  ],

  /* ── EXAMPLE SENTENCES ──────────────────────────────── */
  sentences: [
    {
      pattern: "〜は〜です",
      jp: "わたしは けんきゅうしゃ です。",
      en: "I am a researcher.",
      breakdown: [
        { word:"わたしは", meaning:"I (topic)" },
        { word:"けんきゅうしゃ", meaning:"researcher" },
        { word:"です。", meaning:"am / is (polite)" }
      ]
    },
    {
      pattern: "〜は〜です",
      jp: "あのひとは せんせい です。",
      en: "That person is a teacher.",
      breakdown: [
        { word:"あのひとは", meaning:"that person (topic)" },
        { word:"せんせい", meaning:"teacher" },
        { word:"です。", meaning:"is (polite)" }
      ]
    },
    {
      pattern: "〜は〜です",
      jp: "NAISTは だいがく です。",
      en: "NAIST is a university.",
      breakdown: [
        { word:"NAISTは", meaning:"NAIST (topic)" },
        { word:"だいがく", meaning:"university" },
        { word:"です。", meaning:"is (polite)" }
      ]
    },
    {
      pattern: "〜からきました",
      jp: "わたしは バングラデシュから きました。",
      en: "I am from Bangladesh.",
      breakdown: [
        { word:"わたしは", meaning:"I (topic)" },
        { word:"バングラデシュから", meaning:"from Bangladesh" },
        { word:"きました。", meaning:"came" }
      ]
    },
    {
      pattern: "〜からきました",
      jp: "せんせいは にほんから きました。",
      en: "The teacher is from Japan.",
      breakdown: [
        { word:"せんせいは", meaning:"teacher (topic)" },
        { word:"にほんから", meaning:"from Japan" },
        { word:"きました。", meaning:"came" }
      ]
    },
    {
      pattern: "Full self-introduction",
      jp: "はじめまして。わたしは ナズルル です。バングラデシュから きました。NAISTの けんきゅうしゃ です。どうぞ よろしく おねがいします。",
      en: "How do you do? I am Nazrul. I am from Bangladesh. I am a researcher at NAIST. Pleased to meet you.",
      breakdown: [
        { word:"はじめまして。", meaning:"How do you do? (first meeting)" },
        { word:"わたしは ナズルル です。", meaning:"I am Nazrul." },
        { word:"バングラデシュから きました。", meaning:"I came from Bangladesh." },
        { word:"NAISTの けんきゅうしゃ です。", meaning:"I am a researcher at NAIST." },
        { word:"どうぞ よろしく おねがいします。", meaning:"Pleased to meet you." }
      ]
    },
  ],

  /* ── SELF-INTRO TEMPLATE ────────────────────────────── */
  selfIntroTemplate: {
    slots: [
      { label:"Your name (romaji)", key:"name",    default:"ナズルル" },
      { label:"Your country",       key:"country", default:"バングラデシュ" },
      { label:"Your occupation",    key:"job",     default:"けんきゅうしゃ" },
      { label:"Your university",    key:"uni",     default:"NAIST" },
    ],
    template: "はじめまして。わたしは {name} です。{country} から きました。{uni} の {job} です。どうぞ よろしく おねがいします。"
  }
});
