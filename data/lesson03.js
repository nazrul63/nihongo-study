/**
 * Minna no Nihongo — Lesson 03
 * Topic: Where is ~ / Locations & Shopping
 */
LessonRegistry.add({
  id: 3,
  title: "Lesson 3",
  topic: "Where is ~ / Locations & Shopping",
  grammar: "〜はどこですか  /  〜はなんがいですか  /  いくらですか  /  〜をください",

  vocab: [
    // --- Place Words (plain) ---
    { jp:"ここ",   kj:"",  en:"here, this place",              note:"Informal; こちら is polite", group:"Place Words" },
    { jp:"そこ",   kj:"",  en:"there, that place near you",    note:"Informal; そちら is polite", group:"Place Words" },
    { jp:"あそこ", kj:"",  en:"that place over there",         note:"Informal; あちら is polite", group:"Place Words" },
    { jp:"どこ",   kj:"",  en:"where, what place",             note:"Informal; どちら is polite", group:"Place Words" },

    // --- Polite Place Words ---
    { jp:"こちら", kj:"",  en:"this way / this place (polite)", note:"Polite form of ここ",  group:"Polite Place Words" },
    { jp:"そちら", kj:"",  en:"that way near you (polite)",     note:"Polite form of そこ",  group:"Polite Place Words" },
    { jp:"あちら", kj:"",  en:"that way over there (polite)",   note:"Polite form of あそこ", group:"Polite Place Words" },
    { jp:"どちら", kj:"",  en:"which way / where (polite)",     note:"Polite form of どこ",  group:"Polite Place Words" },

    // --- Building Locations ---
    { jp:"きょうしつ",  kj:"教室",   en:"classroom",               note:"",                                        group:"Building" },
    { jp:"しょくどう",  kj:"食堂",   en:"dining hall / canteen",   note:"NAIST has one!",                          group:"Building" },
    { jp:"じむしょ",    kj:"事務所", en:"office",                  note:"You may need this word at NAIST admin",   group:"Building" },
    { jp:"かいぎしつ",  kj:"会議室", en:"conference room",         note:"",                                        group:"Building" },
    { jp:"うけつけ",    kj:"受付",   en:"reception desk",          note:"",                                        group:"Building" },
    { jp:"ロビー",      kj:"",       en:"lobby",                   note:"Loanword",                               group:"Building" },
    { jp:"へや",        kj:"部屋",   en:"room",                    note:"",                                        group:"Building" },
    { jp:"トイレ",      kj:"",       en:"toilet / restroom",       note:"おてあらい (お手洗い) is more polite",     group:"Building" },
    { jp:"かいだん",    kj:"階段",   en:"staircase",               note:"",                                        group:"Building" },
    { jp:"エレベーター", kj:"",      en:"elevator / lift",         note:"Loanword",                               group:"Building" },
    { jp:"エスカレーター", kj:"",    en:"escalator",               note:"Loanword",                               group:"Building" },

    // --- Personal Places ---
    { jp:"くに",   kj:"国",  en:"country / home country", note:"[お]くに with お is more polite", group:"Personal Places" },
    { jp:"かいしゃ", kj:"会社", en:"company",               note:"",                             group:"Personal Places" },
    { jp:"うち",   kj:"",    en:"house / home",            note:"One's own home",               group:"Personal Places" },

    // --- Shopping Items ---
    { jp:"でんわ",  kj:"電話",  en:"telephone / telephone call", note:"",                         group:"Shopping" },
    { jp:"くつ",    kj:"靴",   en:"shoes",                      note:"",                         group:"Shopping" },
    { jp:"ネクタイ", kj:"",    en:"necktie",                    note:"Loanword",                 group:"Shopping" },
    { jp:"ワイン",  kj:"",     en:"wine",                       note:"Loanword",                 group:"Shopping" },
    { jp:"たばこ",  kj:"",     en:"tobacco / cigarette",        note:"",                         group:"Shopping" },
    { jp:"うりば",  kj:"売り場", en:"counter / department (in a store)", note:"e.g. くつうりば = shoe department", group:"Shopping" },

    // --- Floors & Numbers ---
    { jp:"ちか",    kj:"地下",  en:"basement",        note:"e.g. ちか1かい = basement floor 1", group:"Floors & Numbers" },
    { jp:"〜かい",  kj:"〜階",  en:"-th floor",       note:"いっかい=1F, にかい=2F, さんがい=3F", group:"Floors & Numbers" },
    { jp:"なんがい", kj:"何階", en:"what floor?",     note:"",                                   group:"Floors & Numbers" },
    { jp:"〜えん",  kj:"〜円",  en:"~ yen",           note:"Japanese currency unit",             group:"Floors & Numbers" },
    { jp:"いくら",  kj:"",     en:"how much?",        note:"Used to ask the price",              group:"Floors & Numbers" },
    { jp:"ひゃく",  kj:"百",   en:"hundred (100)",   note:"",                                   group:"Floors & Numbers" },
    { jp:"せん",    kj:"千",   en:"thousand (1,000)", note:"",                                  group:"Floors & Numbers" },
    { jp:"まん",    kj:"万",   en:"ten thousand (10,000)", note:"Important unit in Japanese counting", group:"Floors & Numbers" },

    // --- Key Phrases ---
    { jp:"すみません",     kj:"",              en:"Excuse me.",                  note:"Also used to say sorry or get attention",     group:"Phrases" },
    { jp:"〜でございます", kj:"",              en:"It is ~ (very polite)",        note:"Super polite form of です; used in shops",    group:"Phrases" },
    { jp:"みせてください", kj:"見せてください", en:"Please show me ~.",           note:"[〜を] みせてください",                       group:"Phrases" },
    { jp:"じゃ",           kj:"",              en:"well / then / in that case",  note:"Casual version of では",                      group:"Phrases" },
    { jp:"ください",        kj:"",              en:"Please give me ~.",           note:"[〜を] ください — used for ordering/buying",  group:"Phrases" },
  ],

  kanji: [
    {
      char: "食", meaning: "eat, food", strokes: 9, jlpt: "N5",
      onyomi: ["ショク","ジキ"], kunyomi: ["た(べる)","く(う)"],
      inLesson: ["しょくどう (食堂) — dining hall"],
      mnemonic: "A person (人) with a lid sitting over rice (良) — eating a covered dish of food."
    },
    {
      char: "室", meaning: "room, chamber", strokes: 9, jlpt: "N4",
      onyomi: ["シツ"], kunyomi: ["むろ"],
      inLesson: ["きょうしつ (教室) — classroom", "かいぎしつ (会議室) — conference room"],
      mnemonic: "Roof (宀) + arriving (至) — a room you arrive inside under a roof."
    },
    {
      char: "部", meaning: "section, part, department", strokes: 11, jlpt: "N4",
      onyomi: ["ブ"], kunyomi: ["—"],
      inLesson: ["へや (部屋) — room"],
      mnemonic: "District (阜) + divided (咅) — a part or section of a larger whole."
    },
    {
      char: "電", meaning: "electricity, electric", strokes: 13, jlpt: "N5",
      onyomi: ["デン"], kunyomi: ["—"],
      inLesson: ["でんわ (電話) — telephone"],
      mnemonic: "Rain (雨) + lightning bolt (申) — electricity from lightning in the rain. Ancient and vivid."
    },
    {
      char: "話", meaning: "speak, talk, story", strokes: 13, jlpt: "N5",
      onyomi: ["ワ"], kunyomi: ["はな(す)","はなし"],
      inLesson: ["でんわ (電話) — telephone"],
      mnemonic: "Words/speech (言) + tongue (舌) — speaking with your tongue produces words."
    },
    {
      char: "地", meaning: "ground, earth, place", strokes: 6, jlpt: "N4",
      onyomi: ["チ","ジ"], kunyomi: ["—"],
      inLesson: ["ちか (地下) — basement"],
      mnemonic: "Soil (土) + a serpent curling (也) — earth where creatures live underground."
    },
    {
      char: "下", meaning: "below, under, down", strokes: 3, jlpt: "N5",
      onyomi: ["カ","ゲ"], kunyomi: ["した","しも","もと","さ(げる)","お(りる)"],
      inLesson: ["ちか (地下) — basement (lit. underground)"],
      mnemonic: "A horizontal line (base) with a small mark pointing DOWN below it. Simple and logical."
    },
    {
      char: "階", meaning: "floor, story, stairs", strokes: 12, jlpt: "N4",
      onyomi: ["カイ"], kunyomi: ["—"],
      inLesson: ["〜かい (〜階) — -th floor", "なんがい (何階) — what floor?", "かいだん (階段) — staircase"],
      mnemonic: "Hill/mound (阜) + all together (皆) — all levels of a building stacked like a hill."
    },
    {
      char: "百", meaning: "hundred", strokes: 6, jlpt: "N5",
      onyomi: ["ヒャク"], kunyomi: ["もも"],
      inLesson: ["ひゃく (百) — hundred"],
      mnemonic: "One (一) above white (白) — one hundred pure white units. A clean hundred."
    },
    {
      char: "千", meaning: "thousand", strokes: 3, jlpt: "N5",
      onyomi: ["セン"], kunyomi: ["ち"],
      inLesson: ["せん (千) — thousand"],
      mnemonic: "A diagonal stroke across ten (十) — ten taken to a whole new scale: one thousand."
    },
    {
      char: "万", meaning: "ten thousand", strokes: 3, jlpt: "N5",
      onyomi: ["マン","バン"], kunyomi: ["—"],
      inLesson: ["まん (万) — ten thousand"],
      mnemonic: "An ancient scorpion pictograph — countless legs, countless things. Ten thousand."
    },
    {
      char: "売", meaning: "sell", strokes: 7, jlpt: "N4",
      onyomi: ["バイ"], kunyomi: ["う(る)","う(れる)"],
      inLesson: ["うりば (売り場) — department / counter in a store"],
      mnemonic: "Samurai (士) above a net (罒) and legs (儿) — a merchant spreading their wares."
    },
  ],

  sentences: [
    {
      pattern: "〜はどこですか",
      jp: "じむしょは どこ ですか。",
      en: "Where is the office?",
      breakdown: [
        { word:"じむしょは", meaning:"office (topic)" },
        { word:"どこ", meaning:"where" },
        { word:"ですか。", meaning:"is it? (polite question)" }
      ]
    },
    {
      pattern: "〜はどこですか",
      jp: "すみません、トイレは どちら ですか。",
      en: "Excuse me, where is the restroom?",
      breakdown: [
        { word:"すみません、", meaning:"excuse me" },
        { word:"トイレは", meaning:"restroom (topic)" },
        { word:"どちら", meaning:"which direction / where (polite)" },
        { word:"ですか。", meaning:"is it? (polite question)" }
      ]
    },
    {
      pattern: "〜はなんがいですか",
      jp: "しょくどうは なんがい ですか。 ― 3かい です。",
      en: "What floor is the canteen? — It's on the 3rd floor.",
      breakdown: [
        { word:"しょくどうは", meaning:"canteen (topic)" },
        { word:"なんがい", meaning:"what floor" },
        { word:"ですか。", meaning:"is it?" },
        { word:"3かい です。", meaning:"it is floor 3" }
      ]
    },
    {
      pattern: "いくらですか",
      jp: "すみません、この とけいは いくら ですか。",
      en: "Excuse me, how much is this watch?",
      breakdown: [
        { word:"すみません、", meaning:"excuse me" },
        { word:"この とけいは", meaning:"this watch (topic)" },
        { word:"いくら", meaning:"how much" },
        { word:"ですか。", meaning:"is it?" }
      ]
    },
    {
      pattern: "〜をください",
      jp: "じゃ、それを ください。",
      en: "Well then, I'll take that one. / Please give me that.",
      breakdown: [
        { word:"じゃ、", meaning:"well then / in that case" },
        { word:"それを", meaning:"that (object marker を)" },
        { word:"ください。", meaning:"please give me" }
      ]
    },
    {
      pattern: "〜をみせてください",
      jp: "あの かばんを みせて ください。",
      en: "Please show me that bag over there.",
      breakdown: [
        { word:"あの かばんを", meaning:"that bag over there (object)" },
        { word:"みせて ください。", meaning:"please show me" }
      ]
    },
  ],

  selfIntroTemplate: null
});
