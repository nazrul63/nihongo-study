/**
 * Minna no Nihongo — Lesson 04
 * Topic: Time expressions & Daily activities
 */
LessonRegistry.add({
  id: 4,
  title: "Lesson 4",
  topic: "Time & Daily Activities",
  grammar: "今〜時〜分です  /  Vます/ません/ました/ませんでした  /  N(time)に V  /  N₁からN₂まで  /  N₁とN₂",

  /* ─────────────────── VOCABULARY ─────────────────── */
  vocab: [
    // --- Verbs (〜ます form) ---
    { jp:"おきます",       kj:"起きます",   en:"get up / wake up",          note:"おきます→おきました (past)", group:"Verbs" },
    { jp:"ねます",         kj:"寝ます",     en:"sleep / go to bed",         note:"ねます→ねました (past)",   group:"Verbs" },
    { jp:"はたらきます",   kj:"働きます",   en:"work",                       note:"",                        group:"Verbs" },
    { jp:"やすみます",     kj:"休みます",   en:"take a rest / take a holiday", note:"",                     group:"Verbs" },
    { jp:"べんきょうします", kj:"勉強します", en:"study",                     note:"べんきょう + します",    group:"Verbs" },
    { jp:"おわります",     kj:"終わります", en:"finish / end",               note:"",                        group:"Verbs" },

    // --- Places ---
    { jp:"デパート",       kj:"",      en:"department store",    note:"Loanword",                  group:"Places" },
    { jp:"ぎんこう",       kj:"銀行",  en:"bank",                note:"Already appeared in L1!",   group:"Places" },
    { jp:"ゆうびんきょく", kj:"郵便局", en:"post office",        note:"Important place in Japan",  group:"Places" },
    { jp:"としょかん",     kj:"図書館", en:"library",            note:"NAIST has a great one!",    group:"Places" },
    { jp:"びじゅつかん",   kj:"美術館", en:"art museum",         note:"",                          group:"Places" },

    // --- Time (clock) ---
    { jp:"いま",      kj:"今",   en:"now",          note:"",                                  group:"Time" },
    { jp:"〜じ",      kj:"〜時", en:"~ o'clock",    note:"e.g. 3じ = 3 o'clock",              group:"Time" },
    { jp:"〜ふん/ぷん", kj:"〜分", en:"~ minute",   note:"ふん after 2,5,7,9 / ぷん after 1,3,4,6,8,10", group:"Time" },
    { jp:"はん",      kj:"半",   en:"half (past)",  note:"e.g. 3じはん = 3:30",               group:"Time" },
    { jp:"なんじ",    kj:"何時", en:"what time?",   note:"",                                  group:"Time" },
    { jp:"なんぷん",  kj:"何分", en:"what minute?", note:"",                                  group:"Time" },
    { jp:"ごぜん",    kj:"午前", en:"a.m. / morning", note:"ごぜん9じ = 9 a.m.",             group:"Time" },
    { jp:"ごご",      kj:"午後", en:"p.m. / afternoon", note:"ごご3じ = 3 p.m.",             group:"Time" },

    // --- Parts of the day ---
    { jp:"あさ",  kj:"朝",   en:"morning",        note:"",                       group:"Parts of Day" },
    { jp:"ひる",  kj:"昼",   en:"daytime / noon", note:"",                       group:"Parts of Day" },
    { jp:"ばん",  kj:"晩",   en:"evening / night", note:"よる (夜) is the same",  group:"Parts of Day" },

    // --- Relative days ---
    { jp:"おととい", kj:"",  en:"the day before yesterday", note:"",   group:"Days" },
    { jp:"きのう",   kj:"",  en:"yesterday",                note:"",   group:"Days" },
    { jp:"きょう",   kj:"",  en:"today",                    note:"",   group:"Days" },
    { jp:"あした",   kj:"",  en:"tomorrow",                 note:"",   group:"Days" },
    { jp:"あさって", kj:"",  en:"the day after tomorrow",   note:"",   group:"Days" },
    { jp:"けさ",     kj:"",  en:"this morning",             note:"",   group:"Days" },
    { jp:"こんばん", kj:"今晩", en:"this evening / tonight", note:"",  group:"Days" },

    // --- Rest ---
    { jp:"やすみ",   kj:"休み",   en:"rest / holiday / day off", note:"", group:"Days" },
    { jp:"ひるやすみ", kj:"昼休み", en:"lunchtime",               note:"", group:"Days" },

    // --- Every~ ---
    { jp:"まいあさ", kj:"毎朝", en:"every morning", note:"", group:"Every~" },
    { jp:"まいばん", kj:"毎晩", en:"every night",   note:"", group:"Every~" },
    { jp:"まいにち", kj:"毎日", en:"every day",     note:"", group:"Every~" },

    // --- Days of the week ---
    { jp:"げつようび", kj:"月曜日", en:"Monday",              note:"月 = moon/month",  group:"Days of Week" },
    { jp:"かようび",   kj:"火曜日", en:"Tuesday",             note:"火 = fire",        group:"Days of Week" },
    { jp:"すいようび", kj:"水曜日", en:"Wednesday",           note:"水 = water",       group:"Days of Week" },
    { jp:"もくようび", kj:"木曜日", en:"Thursday",            note:"木 = tree/wood",   group:"Days of Week" },
    { jp:"きんようび", kj:"金曜日", en:"Friday",              note:"金 = gold/money",  group:"Days of Week" },
    { jp:"どようび",   kj:"土曜日", en:"Saturday",            note:"土 = earth/soil",  group:"Days of Week" },
    { jp:"にちようび", kj:"日曜日", en:"Sunday",              note:"日 = sun/day",     group:"Days of Week" },
    { jp:"なんようび", kj:"何曜日", en:"what day of the week?", note:"",               group:"Days of Week" },

    // --- Numbers / misc ---
    { jp:"ばんごう", kj:"番号", en:"number",        note:"e.g. でんわ ばんごう = phone number", group:"Misc" },
    { jp:"なんばん", kj:"何番", en:"what number?",  note:"",                                   group:"Misc" },

    // --- Particles ---
    { jp:"〜から",  kj:"", en:"from ~",              note:"start point: 9じから = from 9 o'clock", group:"Particles" },
    { jp:"〜まで",  kj:"", en:"until ~ / up to ~",  note:"end point: 5じまで = until 5 o'clock",  group:"Particles" },
    { jp:"〜と〜",  kj:"", en:"~ and ~ (nouns)",     note:"connects nouns: どようびとにちようび",   group:"Particles" },

    // --- Phrases ---
    { jp:"そちら",         kj:"",       en:"your place",               note:"Polite 'there' referring to listener's place", group:"Phrases" },
    { jp:"たいへんですね", kj:"大変ですね", en:"That's tough, isn't it?", note:"Used to express sympathy",                  group:"Phrases" },
    { jp:"えーと",         kj:"",       en:"well, let me see…",         note:"Hesitation word while thinking",              group:"Phrases" },
    { jp:"おねがいします", kj:"お願いします", en:"Please. / I ask a favour.", note:"",                                      group:"Phrases" },
    { jp:"かしこまりました", kj:"",     en:"Certainly. (formal)",        note:"Very polite response from service staff",    group:"Phrases" },
    { jp:"ありがとうございました", kj:"", en:"Thank you very much (past)", note:"ました = past; used after receiving help",  group:"Phrases" },
  ],

  /* ─────────────────── KANJI ─────────────────── */
  kanji: [
    {
      char: "今", meaning: "now, this, current", strokes: 4, jlpt: "N5",
      onyomi: ["コン","キン"], kunyomi: ["いま"],
      inLesson: ["いま (今) — now", "こんばん (今晩) — tonight"],
      mnemonic: "A roof (人) over a closed box — something happening RIGHT NOW, under this roof."
    },
    {
      char: "分", meaning: "minute, understand, part", strokes: 4, jlpt: "N5",
      onyomi: ["フン","ブン"], kunyomi: ["わ(かる)","わ(ける)"],
      inLesson: ["〜ふん/ぷん (〜分) — ~ minute", "なんぷん (何分) — what minute?"],
      mnemonic: "Eight (八) with a sword (刀) — dividing something into parts. A minute divides the hour."
    },
    {
      char: "半", meaning: "half", strokes: 5, jlpt: "N5",
      onyomi: ["ハン"], kunyomi: ["なか(ば)"],
      inLesson: ["はん (半) — half past"],
      mnemonic: "A vertical line divides ten (十) in two — exactly half. 3じはん = 3:30."
    },
    {
      char: "午", meaning: "noon, 12 o'clock", strokes: 4, jlpt: "N5",
      onyomi: ["ゴ"], kunyomi: ["—"],
      inLesson: ["ごぜん (午前) — a.m.", "ごご (午後) — p.m."],
      mnemonic: "An ancient symbol for the noon hour on the traditional clock. Always used in ごぜん/ごご."
    },
    {
      char: "前", meaning: "before, in front", strokes: 9, jlpt: "N5",
      onyomi: ["ゼン"], kunyomi: ["まえ"],
      inLesson: ["ごぜん (午前) — a.m. (before noon)"],
      mnemonic: "Boat (舟) + knife (刀) + moon (月) — a boat cutting forward through the night. Before."
    },
    {
      char: "後", meaning: "after, behind, later", strokes: 9, jlpt: "N5",
      onyomi: ["ゴ","コウ"], kunyomi: ["あと","うしろ","のち"],
      inLesson: ["ごご (午後) — p.m. (after noon)"],
      mnemonic: "Step (彳) + thread (幺) + follow (夂) — walking behind, following after."
    },
    {
      char: "朝", meaning: "morning", strokes: 12, jlpt: "N4",
      onyomi: ["チョウ"], kunyomi: ["あさ"],
      inLesson: ["あさ (朝) — morning", "まいあさ (毎朝) — every morning", "けさ — this morning"],
      mnemonic: "Moon (月) + sun (日) + rising plants (艸) — the moment moon gives way to rising sun."
    },
    {
      char: "昼", meaning: "noon, daytime", strokes: 9, jlpt: "N4",
      onyomi: ["チュウ"], kunyomi: ["ひる"],
      inLesson: ["ひる (昼) — noon/daytime", "ひるやすみ (昼休み) — lunchtime"],
      mnemonic: "A candle (尺) under the sun (日) — midday when the sun is at its highest."
    },
    {
      char: "毎", meaning: "every, each", strokes: 6, jlpt: "N4",
      onyomi: ["マイ"], kunyomi: ["—"],
      inLesson: ["まいあさ (毎朝) — every morning", "まいばん (毎晩) — every night", "まいにち (毎日) — every day"],
      mnemonic: "Mother (母) without the dots — a recurring figure. Every day, like a mother's care."
    },
    {
      char: "月", meaning: "moon, month, Monday", strokes: 4, jlpt: "N5",
      onyomi: ["ゲツ","ガツ"], kunyomi: ["つき"],
      inLesson: ["げつようび (月曜日) — Monday"],
      mnemonic: "Pictograph of a crescent moon with two lines inside. The moon — and the month it marks."
    },
    {
      char: "火", meaning: "fire, Tuesday", strokes: 4, jlpt: "N5",
      onyomi: ["カ"], kunyomi: ["ひ","ほ-"],
      inLesson: ["かようび (火曜日) — Tuesday"],
      mnemonic: "Flames rising — a simple pictograph of fire. 火曜日 = fire day = Tuesday."
    },
    {
      char: "水", meaning: "water, Wednesday", strokes: 4, jlpt: "N5",
      onyomi: ["スイ"], kunyomi: ["みず"],
      inLesson: ["すいようび (水曜日) — Wednesday"],
      mnemonic: "A central stream with ripples on both sides — flowing water. 水曜日 = water day."
    },
    {
      char: "木", meaning: "tree, wood, Thursday", strokes: 4, jlpt: "N5",
      onyomi: ["モク","ボク"], kunyomi: ["き","こ-"],
      inLesson: ["もくようび (木曜日) — Thursday"],
      mnemonic: "A tree with roots (下) and branches (上) — the most natural pictograph in kanji."
    },
    {
      char: "金", meaning: "gold, money, Friday", strokes: 8, jlpt: "N5",
      onyomi: ["キン","コン"], kunyomi: ["かね","かな-"],
      inLesson: ["きんようび (金曜日) — Friday"],
      mnemonic: "Earth (土) + a lid + dots of precious ore — gold buried in the earth."
    },
    {
      char: "土", meaning: "earth, soil, Saturday", strokes: 3, jlpt: "N5",
      onyomi: ["ド","ト"], kunyomi: ["つち"],
      inLesson: ["どようび (土曜日) — Saturday"],
      mnemonic: "A cross planted in the ground (+) — a plant growing from soil. Earth."
    },
    {
      char: "起", meaning: "get up, rise", strokes: 10, jlpt: "N4",
      onyomi: ["キ"], kunyomi: ["お(きる)","お(こす)"],
      inLesson: ["おきます (起きます) — get up, wake up"],
      mnemonic: "Run (走) + self (己) — the self running/rising up. Getting yourself up in the morning."
    },
    {
      char: "休", meaning: "rest, holiday", strokes: 6, jlpt: "N5",
      onyomi: ["キュウ"], kunyomi: ["やす(む)","やす(み)"],
      inLesson: ["やすみます (休みます) — take a rest", "やすみ (休み) — holiday", "ひるやすみ (昼休み) — lunchtime"],
      mnemonic: "Person (人) leaning against a tree (木) — resting in the shade. Simple and perfect."
    },
    {
      char: "勉", meaning: "diligence, study (effort)", strokes: 10, jlpt: "N4",
      onyomi: ["ベン"], kunyomi: ["—"],
      inLesson: ["べんきょうします (勉強します) — study"],
      mnemonic: "Exempt (免) + strength/force (力) — forcing yourself to study takes effort."
    },
    {
      char: "強", meaning: "strong, force, study", strokes: 11, jlpt: "N4",
      onyomi: ["キョウ","ゴウ"], kunyomi: ["つよ(い)","し(いる)"],
      inLesson: ["べんきょうします (勉強します) — study"],
      mnemonic: "Bow (弓) + insect (虫) — a taut bow, strong and under tension. 勉強 = effort + strength."
    },
    {
      char: "終", meaning: "end, finish", strokes: 11, jlpt: "N4",
      onyomi: ["シュウ"], kunyomi: ["お(わる)","お(える)"],
      inLesson: ["おわります (終わります) — finish"],
      mnemonic: "Silk (糸) + winter (冬) — silk thread reaching its end, like winter ending the year."
    },
    {
      char: "番", meaning: "number, turn, watch", strokes: 12, jlpt: "N4",
      onyomi: ["バン"], kunyomi: ["—"],
      inLesson: ["ばんごう (番号) — number", "なんばん (何番) — what number?"],
      mnemonic: "Paw/foot (釆) + field (田) — taking turns tending the field. Your number in the queue."
    },
  ],

  /* ─────────────────── SENTENCES ─────────────────── */
  sentences: [
    {
      pattern: "今〜時〜分です (telling time)",
      jp: "いま 2じ 10ぷん です。",
      en: "It is ten past two now.",
      breakdown: [
        { word:"いま", meaning:"now" },
        { word:"2じ", meaning:"2 o'clock (じ = o'clock)" },
        { word:"10ぷん", meaning:"10 minutes (ぷん after 10)" },
        { word:"です。", meaning:"it is (polite)" }
      ]
    },
    {
      pattern: "N(time)に V (time particle に)",
      jp: "まいあさ 6じに おきます。",
      en: "I get up at 6 every morning.",
      breakdown: [
        { word:"まいあさ", meaning:"every morning (no に needed — not a numeral)" },
        { word:"6じに", meaning:"at 6 o'clock (に marks specific time)" },
        { word:"おきます。", meaning:"get up (Vます — present/future/habitual)" }
      ]
    },
    {
      pattern: "N₁からN₂まで V (from ~ to ~)",
      jp: "9じから 5じまで はたらきます。",
      en: "I work from nine to five.",
      breakdown: [
        { word:"9じから", meaning:"from 9 o'clock (から = from)" },
        { word:"5じまで", meaning:"until 5 o'clock (まで = until/to)" },
        { word:"はたらきます。", meaning:"work (Vます)" }
      ]
    },
    {
      pattern: "Vました (past affirmative)",
      jp: "きのう べんきょうしました。",
      en: "I studied yesterday.",
      breakdown: [
        { word:"きのう", meaning:"yesterday" },
        { word:"べんきょうしました。", meaning:"studied (Vました = past affirmative)" }
      ]
    },
    {
      pattern: "Vませんでした (past negative)",
      jp: "きのう べんきょうしませんでした。",
      en: "I did not study yesterday.",
      breakdown: [
        { word:"きのう", meaning:"yesterday" },
        { word:"べんきょうしませんでした。", meaning:"did not study (Vませんでした = past negative)" }
      ]
    },
    {
      pattern: "N₁とN₂ (and — connecting nouns)",
      jp: "ぎんこうの やすみは どようびと にちようびです。",
      en: "The bank is closed on Saturdays and Sundays.",
      breakdown: [
        { word:"ぎんこうの やすみは", meaning:"the bank's holiday (topic)" },
        { word:"どようびと にちようび", meaning:"Saturday and Sunday (と connects two nouns)" },
        { word:"です。", meaning:"is" }
      ]
    },
    {
      pattern: "いま なんじですか (asking the time)",
      jp: "いま なんじ ですか。 ― ごご 3じ はんです。",
      en: "What time is it now? — It's 3:30 p.m.",
      breakdown: [
        { word:"いま なんじ ですか。", meaning:"What time is it now?" },
        { word:"ごご", meaning:"p.m." },
        { word:"3じ はん", meaning:"3:30 (はん = half past)" },
        { word:"です。", meaning:"it is" }
      ]
    },
    {
      pattern: "Sね (seeking agreement / sympathy)",
      jp: "まいにち 10じごろまで べんきょうします。 ― たいへんですね。",
      en: "I study until about 10 every day. — That must be tough!",
      breakdown: [
        { word:"まいにち", meaning:"every day" },
        { word:"10じごろまで", meaning:"until about 10 o'clock (ごろ = about)" },
        { word:"べんきょうします。", meaning:"study (habitual)" },
        { word:"たいへんですね。", meaning:"That's tough, isn't it? (ね invites agreement)" }
      ]
    },
  ],

  /* ─────────────────── EXERCISES ─────────────────── */
  exercises: [
    /* ── Verb forms ── */
    {
      id: 1,
      type: "mcq",
      grammar: "Vます / Vません",
      instruction: "Choose the correct Japanese sentence.",
      q: "\"I do not work on Sundays.\"",
      options: [
        "にちようびは はたらきます。",
        "にちようびは はたらきません。",
        "にちようびは はたらきました。",
        "にちようびは はたらきませんでした。"
      ],
      answer: 1,
      explanation: "Present negative = Vません. にちようびは (Sunday topic) + はたらきません (don't work)."
    },
    {
      id: 2,
      type: "mcq",
      grammar: "Vました / Vませんでした",
      instruction: "Choose the correct Japanese sentence.",
      q: "\"Did you study yesterday? — Yes, I did.\"",
      options: [
        "きのう べんきょうしますか。― はい、べんきょうします。",
        "きのう べんきょうしましたか。― はい、べんきょうしました。",
        "きのう べんきょうしませんか。― はい、べんきょうしません。",
        "きのう べんきょうしましたか。― はい、べんきょうします。"
      ],
      answer: 1,
      explanation: "Past question = Vましたか. Past affirmative answer = Vました. Note: you cannot answer with そうです for verb questions."
    },
    {
      id: 3,
      type: "mcq",
      grammar: "Vます / Vました",
      instruction: "Which sentence means \"I get up at 6 tomorrow morning\"?",
      q: "",
      options: [
        "けさ 6じに おきます。",
        "まいあさ 6じに おきます。",
        "あした 6じに おきます。",
        "きのう 6じに おきました。"
      ],
      answer: 2,
      explanation: "あした = tomorrow → use Vます (non-past). けさ = this morning, まいあさ = every morning, きのう → Vました (past)."
    },
    /* ── Time particle に ── */
    {
      id: 4,
      type: "mcq",
      grammar: "N(time)に V",
      instruction: "Which particle goes in the blank?",
      q: "6じ ___ おきます。(I get up at 6.)",
      options: ["は", "に", "で", "を"],
      answer: 1,
      explanation: "に marks a specific point in time when using clock times, days of the week, and dates. まいあさ / きのう / きょう do NOT use に."
    },
    {
      id: 5,
      type: "mcq",
      grammar: "N(time)に V — when NOT to use に",
      instruction: "Which sentence is correct?",
      q: "\"I study every day.\"",
      options: [
        "まいにちに べんきょうします。",
        "まいにち べんきょうします。",
        "まいにちで べんきょうします。",
        "まいにちは べんきょうします。"
      ],
      answer: 1,
      explanation: "まいにち (every day) does NOT take に — it contains no numeral. に is only used with clock times, specific dates and days."
    },
    /* ── から・まで ── */
    {
      id: 6,
      type: "mcq",
      grammar: "N₁からN₂まで",
      instruction: "Fill in the blanks: \"The library is open from 9 to 8.\"",
      q: "としょかんは 9じ ___ 8じ ___ です。",
      options: [
        "で・に",
        "は・が",
        "から・まで",
        "に・と"
      ],
      answer: 2,
      explanation: "から = from (start point), まで = until/to (end point). 9じから 8じまで = from 9 o'clock to 8 o'clock."
    },
    /* ── Days of the week ── */
    {
      id: 7,
      type: "mcq",
      grammar: "Days of the week (曜日)",
      instruction: "Match the kanji to the correct day.",
      q: "水曜日 (すいようび) is …",
      options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      answer: 2,
      explanation: "水 = water → Wednesday. Memory tip: the 5 elements — Moon(月)·Fire(火)·Water(水)·Wood(木)·Gold(金)·Earth(土)·Sun(日)."
    },
    {
      id: 8,
      type: "mcq",
      grammar: "Days of the week",
      instruction: "Which day comes between 木曜日 and 土曜日?",
      q: "",
      options: ["火曜日", "水曜日", "金曜日", "日曜日"],
      answer: 2,
      explanation: "Week order: 月(Mon)→火(Tue)→水(Wed)→木(Thu)→金(Fri)→土(Sat)→日(Sun). Between Thursday (木) and Saturday (土) is Friday (金)."
    },
    /* ── と particle ── */
    {
      id: 9,
      type: "mcq",
      grammar: "N₁とN₂ (and — connecting nouns)",
      instruction: "Choose the correct sentence for \"I study Japanese and English.\"",
      q: "",
      options: [
        "にほんごから えいごまで べんきょうします。",
        "にほんごも えいごも べんきょうします。",
        "にほんごと えいごを べんきょうします。",
        "にほんごで えいごを べんきょうします。"
      ],
      answer: 2,
      explanation: "と connects nouns in a list. を marks the object. にほんごと えいごを = 'Japanese and English' (object). Option B (も) is also natural but uses a different structure (both/also)."
    },
    /* ── Time reading ── */
    {
      id: 10,
      type: "mcq",
      grammar: "Time expressions",
      instruction: "How do you say \"9:30 a.m.\" in Japanese?",
      q: "",
      options: [
        "ごご 9じ はん",
        "ごぜん 9じ はん",
        "ごぜん 9じ 30ぷん",
        "Both B and C are correct"
      ],
      answer: 3,
      explanation: "ごぜん = a.m. Both はん (half past) and 30ぷん (30 minutes) are correct ways to say :30. So both B and C work!"
    },
    {
      id: 11,
      type: "mcq",
      grammar: "Time expressions",
      instruction: "Which is the correct reading for 7:05?",
      q: "",
      options: [
        "しちじ ごふん",
        "しちじ ごぷん",
        "ななじ ごふん",
        "Both A and C are acceptable"
      ],
      answer: 3,
      explanation: "5 (ご) + 分 = ごふん. Hours: 7 can be said as しち or なな before じ. So both しちじ ごふん and ななじ ごふん are used, but しち is more common for time."
    },
    /* ── Comprehensive ── */
    {
      id: 12,
      type: "mcq",
      grammar: "Full sentence construction",
      instruction: "Translate: \"The bank is open from 9 a.m. to 3 p.m. on weekdays.\"",
      q: "",
      options: [
        "ぎんこうは どようびと にちようびに ごぜん9じから ごご3じまで あきます。",
        "ぎんこうは げつようびから きんようびまで ごぜん9じから ごご3じまで です。",
        "ぎんこうは まいにち 9じに 3じまで です。",
        "ぎんこうは ごぜん9じから ごご3じまで はたらきます。"
      ],
      answer: 1,
      explanation: "Weekdays = Monday(月) to Friday(金) → げつようびから きんようびまで. Open hours = ごぜん9じから ごご3じまで. Bank uses です, not あきます or はたらきます for hours."
    },
  ],

  selfIntroTemplate: null
});
