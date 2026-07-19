LessonRegistry.add({
  id: 5,
  title: "Lesson 5",
  topic: "Going Places / Transportation / Dates",
  grammar: "N(place)へ行きます  /  N(vehicle)でV  /  N(person)とV  /  どこへも行きません  /  いつ  /  Sよ",

  vocab: [
    // --- Movement Verbs ---
    { jp:"いきます",   kj:"行きます", en:"go",              note:"どこへ いきますか = Where will you go?",  group:"Movement Verbs" },
    { jp:"きます",     kj:"来ます",   en:"come",             note:"にほんへ きました = I came to Japan.",    group:"Movement Verbs" },
    { jp:"かえります", kj:"帰ります", en:"go home / return", note:"うちへ かえります = I'll go home.",       group:"Movement Verbs" },

    // --- Places ---
    { jp:"がっこう", kj:"学校", en:"school",      note:"",                             group:"Places" },
    { jp:"スーパー", kj:"",     en:"supermarket", note:"Loanword",                     group:"Places" },
    { jp:"えき",     kj:"駅",   en:"station",     note:"Essential word for Japan life!", group:"Places" },

    // --- Transportation ---
    { jp:"ひこうき",     kj:"飛行機", en:"airplane",                    note:"",                               group:"Transport" },
    { jp:"ふね",         kj:"船",     en:"ship / boat",                 note:"",                               group:"Transport" },
    { jp:"でんしゃ",     kj:"電車",   en:"electric train",              note:"Most common transport in Japan", group:"Transport" },
    { jp:"ちかてつ",     kj:"地下鉄", en:"subway / underground",        note:"",                               group:"Transport" },
    { jp:"しんかんせん", kj:"新幹線", en:"Shinkansen / bullet train",   note:"Max 320km/h!",                   group:"Transport" },
    { jp:"バス",         kj:"",       en:"bus",                         note:"Loanword",                       group:"Transport" },
    { jp:"タクシー",     kj:"",       en:"taxi",                        note:"Loanword",                       group:"Transport" },
    { jp:"じてんしゃ",   kj:"自転車", en:"bicycle",                     note:"",                               group:"Transport" },
    { jp:"あるいて",     kj:"歩いて", en:"on foot / walking",           note:"で is NOT used with あるいて",   group:"Transport" },

    // --- People ---
    { jp:"ひと",     kj:"人",    en:"person / people",    note:"ひとりで = alone",                 group:"People" },
    { jp:"ともだち", kj:"友達",  en:"friend",             note:"",                                 group:"People" },
    { jp:"かれ",     kj:"彼",    en:"he / boyfriend",     note:"Also means romantic partner",      group:"People" },
    { jp:"かのじょ", kj:"彼女",  en:"she / girlfriend",   note:"Also means romantic partner",      group:"People" },
    { jp:"かぞく",   kj:"家族",  en:"family",             note:"かぞくと いきます = go with family", group:"People" },
    { jp:"ひとりで", kj:"一人で", en:"alone / by oneself", note:"と is NOT used when going alone", group:"People" },

    // --- Relative Time ---
    { jp:"せんしゅう", kj:"先週", en:"last week",  note:"先=previous", group:"Relative Time" },
    { jp:"こんしゅう", kj:"今週", en:"this week",  note:"今=now/this",  group:"Relative Time" },
    { jp:"らいしゅう", kj:"来週", en:"next week",  note:"来=coming",    group:"Relative Time" },
    { jp:"せんげつ",   kj:"先月", en:"last month", note:"",            group:"Relative Time" },
    { jp:"こんげつ",   kj:"今月", en:"this month", note:"",            group:"Relative Time" },
    { jp:"らいげつ",   kj:"来月", en:"next month", note:"",            group:"Relative Time" },
    { jp:"きょねん",   kj:"去年", en:"last year",  note:"",            group:"Relative Time" },
    { jp:"ことし",     kj:"",     en:"this year",  note:"",            group:"Relative Time" },
    { jp:"らいねん",   kj:"来年", en:"next year",  note:"",            group:"Relative Time" },

    // --- Month Counter ---
    { jp:"〜がつ",  kj:"〜月", en:"-th month",   note:"いちがつ=Jan … じゅうにがつ=Dec", group:"Month & Date" },
    { jp:"なんがつ", kj:"何月", en:"what month?", note:"",                               group:"Month & Date" },

    // --- Date Counter (irregular readings!) ---
    { jp:"ついたち",     kj:"1日",  en:"1st of the month",       note:"Irregular! Must memorise", group:"Date Counter" },
    { jp:"ふつか",       kj:"2日",  en:"2nd / two days",         note:"Irregular",                group:"Date Counter" },
    { jp:"みっか",       kj:"3日",  en:"3rd / three days",       note:"Irregular",                group:"Date Counter" },
    { jp:"よっか",       kj:"4日",  en:"4th / four days",        note:"Irregular",                group:"Date Counter" },
    { jp:"いつか",       kj:"5日",  en:"5th / five days",        note:"Irregular",                group:"Date Counter" },
    { jp:"むいか",       kj:"6日",  en:"6th / six days",         note:"Irregular",                group:"Date Counter" },
    { jp:"なのか",       kj:"7日",  en:"7th / seven days",       note:"Irregular",                group:"Date Counter" },
    { jp:"ようか",       kj:"8日",  en:"8th / eight days",       note:"Irregular",                group:"Date Counter" },
    { jp:"ここのか",     kj:"9日",  en:"9th / nine days",        note:"Irregular",                group:"Date Counter" },
    { jp:"とおか",       kj:"10日", en:"10th / ten days",        note:"Irregular",                group:"Date Counter" },
    { jp:"じゅうよっか", kj:"14日", en:"14th / fourteen days",   note:"じゅう + よっか (mixed)", group:"Date Counter" },
    { jp:"はつか",       kj:"20日", en:"20th / twenty days",     note:"Irregular",                group:"Date Counter" },
    { jp:"にじゅうよっか", kj:"24日", en:"24th / twenty-four days", note:"にじゅう + よっか",   group:"Date Counter" },
    { jp:"〜にち",   kj:"〜日", en:"-th day / ~ days",           note:"Regular: 11にち、12にち…", group:"Date Counter" },
    { jp:"なんにち", kj:"何日", en:"which day? / how many days?", note:"",                        group:"Date Counter" },

    // --- Q-Word ---
    { jp:"いつ", kj:"", en:"when", note:"Does NOT take particle に", group:"Q-Words" },

    // --- Special ---
    { jp:"たんじょうび", kj:"誕生日", en:"birthday", note:"いつですか = When is it?", group:"Special" },

    // --- Train Types ---
    { jp:"ふつう",     kj:"普通", en:"local train",   note:"Stops at every station",             group:"Train Types" },
    { jp:"きゅうこう", kj:"急行", en:"rapid train",   note:"Skips minor stations",               group:"Train Types" },
    { jp:"とっきゅう", kj:"特急", en:"express train", note:"Fastest; extra ticket often needed", group:"Train Types" },
    { jp:"つぎの",     kj:"次の", en:"next",          note:"つぎの でんしゃ = next train",       group:"Train Types" },

    // --- Phrases ---
    { jp:"どういたしまして", kj:"",       en:"You're welcome.",      note:"Response to ありがとう",  group:"Phrases" },
    { jp:"〜ばんせん",       kj:"〜番線", en:"platform number ~",    note:"5ばんせん = platform 5", group:"Phrases" },
  ],

  kanji: [
    {
      char: "来", meaning: "come, next, future", strokes: 7, jlpt: "N5",
      onyomi: ["ライ"], kunyomi: ["く(る)","き(たる)"],
      inLesson: ["きます (来ます) — come", "らいしゅう (来週) — next week", "らいねん (来年) — next year"],
      mnemonic: "A person (人) nestled between branches of a tree — arriving to rest here. Coming home."
    },
    {
      char: "帰", meaning: "return home, go back", strokes: 10, jlpt: "N4",
      onyomi: ["キ"], kunyomi: ["かえ(る)","かえ(す)"],
      inLesson: ["かえります (帰ります) — go home, return"],
      mnemonic: "A broom (帚) with a tail — sweeping your way back home at day's end."
    },
    {
      char: "駅", meaning: "station", strokes: 14, jlpt: "N5",
      onyomi: ["エキ"], kunyomi: ["—"],
      inLesson: ["えき (駅) — station"],
      mnemonic: "Horse (馬) + measuring stick (尺) — the distance a horse travels between rest points."
    },
    {
      char: "飛", meaning: "fly, leap", strokes: 9, jlpt: "N4",
      onyomi: ["ヒ"], kunyomi: ["と(ぶ)","と(ばす)"],
      inLesson: ["ひこうき (飛行機) — airplane"],
      mnemonic: "Wings spread wide, a bird lifting off — the most dynamic kanji for flight."
    },
    {
      char: "友", meaning: "friend", strokes: 4, jlpt: "N5",
      onyomi: ["ユウ"], kunyomi: ["とも"],
      inLesson: ["ともだち (友達) — friend"],
      mnemonic: "Two right hands (又+又) clasped together — the gesture of friendship across cultures."
    },
    {
      char: "家", meaning: "house, home, family", strokes: 10, jlpt: "N5",
      onyomi: ["カ","ケ"], kunyomi: ["いえ","や"],
      inLesson: ["かぞく (家族) — family"],
      mnemonic: "A roof (宀) over a pig (豕) — ancient homes had animals under the same roof."
    },
    {
      char: "族", meaning: "tribe, family, clan", strokes: 11, jlpt: "N4",
      onyomi: ["ゾク"], kunyomi: ["—"],
      inLesson: ["かぞく (家族) — family"],
      mnemonic: "Banner/flag (方) + arrow (矢) — a clan rallying under their war banner."
    },
    {
      char: "週", meaning: "week", strokes: 11, jlpt: "N4",
      onyomi: ["シュウ"], kunyomi: ["—"],
      inLesson: ["せんしゅう (先週) — last week", "こんしゅう (今週) — this week", "らいしゅう (来週) — next week"],
      mnemonic: "Going around (辶) + periodic cycle — the 7-day cycle that comes around again and again."
    },
    {
      char: "年", meaning: "year", strokes: 6, jlpt: "N5",
      onyomi: ["ネン"], kunyomi: ["とし"],
      inLesson: ["きょねん (去年) — last year", "ことし — this year", "らいねん (来年) — next year"],
      mnemonic: "A person (人) carrying rice stalks (禾) — the annual harvest marks the year's end."
    },
    {
      char: "歩", meaning: "walk, step", strokes: 8, jlpt: "N4",
      onyomi: ["ホ","ブ"], kunyomi: ["ある(く)","あゆ(む)"],
      inLesson: ["あるいて (歩いて) — on foot / walking"],
      mnemonic: "Stop (止) + a bit (少) — walking is stopping and starting a little at a time."
    },
    {
      char: "校", meaning: "school", strokes: 10, jlpt: "N5",
      onyomi: ["コウ"], kunyomi: ["—"],
      inLesson: ["がっこう (学校) — school"],
      mnemonic: "Tree (木) + intertwine (交) — a place where knowledge crosses and grows like branches."
    },
  ],

  sentences: [
    {
      pattern: "N(place)へ 行きます",
      jp: "あした ならへ いきます。",
      en: "I will go to Nara tomorrow.",
      breakdown: [
        { word:"あした", meaning:"tomorrow" },
        { word:"ならへ", meaning:"to Nara (へ = direction particle, pronounced 'e')" },
        { word:"いきます。", meaning:"will go (Vます)" }
      ]
    },
    {
      pattern: "N(vehicle)で V",
      jp: "しんかんせんで とうきょうへ いきます。",
      en: "I will go to Tokyo by Shinkansen.",
      breakdown: [
        { word:"しんかんせんで", meaning:"by Shinkansen (で = means of transport)" },
        { word:"とうきょうへ", meaning:"to Tokyo" },
        { word:"いきます。", meaning:"will go" }
      ]
    },
    {
      pattern: "N(person)と V",
      jp: "かぞくと にほんへ きました。",
      en: "I came to Japan with my family.",
      breakdown: [
        { word:"かぞくと", meaning:"with my family (と = together with)" },
        { word:"にほんへ", meaning:"to Japan" },
        { word:"きました。", meaning:"came (past tense)" }
      ]
    },
    {
      pattern: "どこへも + negative",
      jp: "きのう どこへも いきませんでした。",
      en: "I didn't go anywhere yesterday.",
      breakdown: [
        { word:"きのう", meaning:"yesterday" },
        { word:"どこへも", meaning:"anywhere (question word + も + negative)" },
        { word:"いきませんでした。", meaning:"did not go (past negative)" }
      ]
    },
    {
      pattern: "いつ (when — no particle に)",
      jp: "いつ にほんへ きましたか。― 3がつ 25にちに きました。",
      en: "When did you come to Japan? — I came on March 25th.",
      breakdown: [
        { word:"いつ", meaning:"when (no particle added after いつ)" },
        { word:"3がつ 25にちに", meaning:"on March 25th (に marks specific date)" },
        { word:"きました。", meaning:"came (past)" }
      ]
    },
    {
      pattern: "Sよ (assertive emphasis)",
      jp: "この でんしゃは こうしえんへ いきませんよ。つぎの ふつうですよ。",
      en: "This train doesn't go to Koshien. The next local train does.",
      breakdown: [
        { word:"いきませんよ。", meaning:"doesn't go — よ asserts info the listener didn't know" },
        { word:"つぎの ふつうですよ。", meaning:"it's the next local train (assertive)" }
      ]
    },
    {
      pattern: "たんじょうび / Date expressions",
      jp: "たんじょうびは いつですか。― 7がつ 20にちです。",
      en: "When is your birthday? — It's July 20th.",
      breakdown: [
        { word:"たんじょうびは", meaning:"birthday (topic)" },
        { word:"いつ ですか。", meaning:"when is it?" },
        { word:"7がつ 20にちです。", meaning:"July 20th (7th month, 20th day)" }
      ]
    },
  ],

  exercises: [
    {
      id: 1, type:"mcq",
      grammar: "N(place)へ — direction particle",
      instruction: "Choose the correct particle: わたしは まいにち がっこう ___ いきます。",
      q: "",
      options: ["に", "で", "へ", "を"],
      answer: 2,
      explanation: "へ marks direction of movement towards a place. に also works for destinations, but Lesson 5 introduces へ specifically for movement verbs (行きます/来ます/帰ります)."
    },
    {
      id: 2, type:"mcq",
      grammar: "N(vehicle)で — means of transport",
      instruction: "\"I go to university by bicycle.\"",
      q: "",
      options: [
        "じてんしゃへ だいがくに いきます。",
        "じてんしゃで だいがくへ いきます。",
        "じてんしゃと だいがくへ いきます。",
        "じてんしゃに だいがくへ いきます。"
      ],
      answer: 1,
      explanation: "で marks means/method of transport. じてんしゃで = by bicycle. Note: あるいて (on foot) does NOT use で — it already expresses the method."
    },
    {
      id: 3, type:"mcq",
      grammar: "N(person)と V — companion particle",
      instruction: "\"I went to Nara with a friend.\"",
      q: "",
      options: [
        "ともだちに ならへ いきました。",
        "ともだちで ならへ いきました。",
        "ともだちと ならへ いきました。",
        "ひとりで ともだちと いきました。"
      ],
      answer: 2,
      explanation: "と marks a companion. ともだちと = with a friend. If going alone, use ひとりで — と is not used when alone."
    },
    {
      id: 4, type:"mcq",
      grammar: "どこへも + negative = nowhere",
      instruction: "\"I didn't go anywhere last Sunday.\"",
      q: "",
      options: [
        "せんしゅうの にちようびは どこへも いきました。",
        "せんしゅうの にちようびは どこへも いきませんでした。",
        "せんしゅうの にちようびは どこへ いきませんでした。",
        "せんしゅうの にちようびは どこも いきました。"
      ],
      answer: 1,
      explanation: "どこへも + NEGATIVE = nowhere. The interrogative (どこ) + も + negative verb denies everything. Same pattern: 何も食べません (I don't eat anything)."
    },
    {
      id: 5, type:"mcq",
      grammar: "Irregular date reading",
      instruction: "What is the correct reading for 20日?",
      q: "",
      options: ["にじゅうにち", "はつか", "にじゅうか", "ふつか"],
      answer: 1,
      explanation: "はつか is the special irregular reading for the 20th. Key irregular dates: ついたち(1), ふつか(2), みっか(3), よっか(4), いつか(5), むいか(6), なのか(7), ようか(8), ここのか(9), とおか(10), じゅうよっか(14), はつか(20), にじゅうよっか(24)."
    },
    {
      id: 6, type:"mcq",
      grammar: "Irregular date reading",
      instruction: "A friend's birthday is ついたち. Which date?",
      q: "",
      options: ["1st", "10th", "11th", "20th"],
      answer: 0,
      explanation: "ついたち = the 1st of the month. This is the most unusual date reading. It comes from 月立ち (tsukitachi) — when the moon rises."
    },
    {
      id: 7, type:"mcq",
      grammar: "Relative time: 先/今/来",
      instruction: "Match: らいしゅう means…",
      q: "",
      options: ["last week", "this week", "next week", "every week"],
      answer: 2,
      explanation: "先(せん)=previous, 今(こん)=this/now, 来(らい)=coming/next. Works for 週(week), 月(month), 年(year): 先週・今週・来週 / 先月・今月・来月 / 去年・ことし・来年."
    },
    {
      id: 8, type:"mcq",
      grammar: "いつ — no particle に",
      instruction: "\"When will you go to Hiroshima?\"",
      q: "",
      options: [
        "いつに ひろしまへ いきますか。",
        "いつ ひろしまへ いきますか。",
        "いつで ひろしまへ いきますか。",
        "なんにちに ひろしまへ いきますか。"
      ],
      answer: 1,
      explanation: "いつ (when) does NOT take particle に. This differs from specific times/dates which DO take に (e.g., 3がつ 25にちに). This is an important exception to memorise."
    },
    {
      id: 9, type:"mcq",
      grammar: "あるいて — no で",
      instruction: "\"I walked home from the station.\"",
      q: "",
      options: [
        "えきから あるいてで かえりました。",
        "えきから あるいて かえりました。",
        "えきで あるいて かえりました。",
        "えきから あるきます かえりました。"
      ],
      answer: 1,
      explanation: "あるいて already expresses the method (walking), so で is NOT added. Compare: でんしゃで (by train) uses で because でんしゃ is just a noun. あるいて is the て-form of 歩く and implies the method."
    },
    {
      id: 10, type:"mcq",
      grammar: "Full L5 sentence construction",
      instruction: "\"Last week I went to Kyoto by Shinkansen with my friend.\"",
      q: "",
      options: [
        "せんしゅう ともだちと しんかんせんで きょうとへ いきました。",
        "せんしゅう ともだちに しんかんせんに きょうとへ いきました。",
        "せんしゅう ともだちで しんかんせんと きょうとへ いきました。",
        "せんしゅう ともだちと しんかんせんへ きょうとで いきました。"
      ],
      answer: 0,
      explanation: "Particle summary: ともだちと (with friend), しんかんせんで (by Shinkansen), きょうとへ (to Kyoto). Japanese order: Time → Companion/Means → Destination → Verb."
    },
  ],
  selfIntroTemplate: null
});
