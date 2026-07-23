/**
 * Supplement Lesson — Japanese Counters (助数詞)
 * Not numbered 1-25 to avoid colliding with future book lessons.
 * Covers every major counting system: generic objects, people,
 * age, floors, long/flat/small/machine objects, books, price,
 * time, dates, and size/dimension vocabulary.
 *
 * KEY LEARNING POINT: Japanese counters change sound (rendaku/
 * gemination) for certain numbers — this is the #1 source of
 * counter mistakes. Notes on each entry flag these explicitly.
 */
LessonRegistry.add({
  id: 90,
  title: "Counters",
  topic: "Counting Everything — Days, Age, Floors, Objects, People, Size",
  grammar: "Number + Counter  /  なん + counter = \"how many ~?\"  /  Sound changes: っ(gemination) and voicing shifts",

  vocab: [
    /* ═══════════ GENERIC COUNTER つ (things with no specific counter) ═══════════ */
    { jp:"ひとつ", kj:"一つ", en:"one (thing)",   note:"Generic counter for objects 1-10. Used when no specific counter fits.", group:"Generic つ" },
    { jp:"ふたつ", kj:"二つ", en:"two (things)",  note:"", group:"Generic つ" },
    { jp:"みっつ", kj:"三つ", en:"three (things)", note:"", group:"Generic つ" },
    { jp:"よっつ", kj:"四つ", en:"four (things)", note:"", group:"Generic つ" },
    { jp:"いつつ", kj:"五つ", en:"five (things)", note:"", group:"Generic つ" },
    { jp:"むっつ", kj:"六つ", en:"six (things)",  note:"", group:"Generic つ" },
    { jp:"ななつ", kj:"七つ", en:"seven (things)", note:"", group:"Generic つ" },
    { jp:"やっつ", kj:"八つ", en:"eight (things)", note:"", group:"Generic つ" },
    { jp:"ここのつ", kj:"九つ", en:"nine (things)", note:"", group:"Generic つ" },
    { jp:"とお",   kj:"十",   en:"ten (things)",  note:"Irregular — no つ suffix at 10", group:"Generic つ" },
    { jp:"いくつ", kj:"",     en:"how many (things)?", note:"Also used to ask age casually", group:"Generic つ" },

    /* ═══════════ PEOPLE COUNTER 人 ═══════════ */
    { jp:"ひとり",   kj:"一人", en:"one person",   note:"Irregular! Not いちにん.", group:"People 人" },
    { jp:"ふたり",   kj:"二人", en:"two people",   note:"Irregular! Not ににん.",   group:"People 人" },
    { jp:"さんにん", kj:"三人", en:"three people", note:"Regular from here on: number + にん", group:"People 人" },
    { jp:"よにん",   kj:"四人", en:"four people",  note:"よ not し — avoids death homophone", group:"People 人" },
    { jp:"ごにん",   kj:"五人", en:"five people",  note:"", group:"People 人" },
    { jp:"ろくにん", kj:"六人", en:"six people",   note:"", group:"People 人" },
    { jp:"ななにん", kj:"七人", en:"seven people", note:"しちにん also used",        group:"People 人" },
    { jp:"はちにん", kj:"八人", en:"eight people", note:"", group:"People 人" },
    { jp:"きゅうにん", kj:"九人", en:"nine people", note:"", group:"People 人" },
    { jp:"じゅうにん", kj:"十人", en:"ten people",  note:"", group:"People 人" },
    { jp:"なんにん", kj:"何人", en:"how many people?", note:"", group:"People 人" },

    /* ═══════════ AGE COUNTER 歳/才 ═══════════ */
    { jp:"いっさい", kj:"一歳", en:"1 year old",   note:"Gemination: いち→いっ before さい", group:"Age 歳" },
    { jp:"にさい",   kj:"二歳", en:"2 years old",  note:"", group:"Age 歳" },
    { jp:"さんさい", kj:"三歳", en:"3 years old",  note:"", group:"Age 歳" },
    { jp:"よんさい", kj:"四歳", en:"4 years old",  note:"", group:"Age 歳" },
    { jp:"ごさい",   kj:"五歳", en:"5 years old",  note:"", group:"Age 歳" },
    { jp:"ろくさい", kj:"六歳", en:"6 years old",  note:"", group:"Age 歳" },
    { jp:"ななさい", kj:"七歳", en:"7 years old",  note:"", group:"Age 歳" },
    { jp:"はっさい", kj:"八歳", en:"8 years old",  note:"Gemination: はち→はっ before さい", group:"Age 歳" },
    { jp:"きゅうさい", kj:"九歳", en:"9 years old", note:"", group:"Age 歳" },
    { jp:"じゅっさい", kj:"十歳", en:"10 years old", note:"Gemination: じゅう→じゅっ before さい", group:"Age 歳" },
    { jp:"はたち",   kj:"二十歳", en:"20 years old", note:"Completely irregular! Most important age word (adulthood in Japan).", group:"Age 歳" },
    { jp:"なんさい", kj:"何歳",  en:"how old?",     note:"おいくつ is the polite form (from L1)", group:"Age 歳" },

    /* ═══════════ FLOOR COUNTER 階 (review + extend from L4) ═══════════ */
    { jp:"いっかい", kj:"一階", en:"1st floor",  note:"Gemination before か/さ/た/ぱ sounds", group:"Floors 階" },
    { jp:"にかい",   kj:"二階", en:"2nd floor",  note:"", group:"Floors 階" },
    { jp:"さんがい", kj:"三階", en:"3rd floor",  note:"Irregular voicing: か→が after さん", group:"Floors 階" },
    { jp:"よんかい", kj:"四階", en:"4th floor",  note:"", group:"Floors 階" },
    { jp:"ごかい",   kj:"五階", en:"5th floor",  note:"", group:"Floors 階" },
    { jp:"ろっかい", kj:"六階", en:"6th floor",  note:"Gemination: ろく→ろっ", group:"Floors 階" },
    { jp:"ななかい", kj:"七階", en:"7th floor",  note:"", group:"Floors 階" },
    { jp:"はっかい", kj:"八階", en:"8th floor",  note:"Gemination, sometimes はちかい too", group:"Floors 階" },
    { jp:"きゅうかい", kj:"九階", en:"9th floor", note:"", group:"Floors 階" },
    { jp:"じゅっかい", kj:"十階", en:"10th floor", note:"Gemination: じゅう→じゅっ", group:"Floors 階" },
    { jp:"なんがい", kj:"何階", en:"what floor?", note:"Voiced が, not か — memorise as a set phrase", group:"Floors 階" },

    /* ═══════════ LONG THIN OBJECTS 本 (pens, bottles, trees, umbrellas) ═══════════ */
    { jp:"いっぽん", kj:"一本", en:"1 (long thin object)", note:"ぽん/ほん/ぼん alternation — the trickiest counter!", group:"Long Objects 本" },
    { jp:"にほん",   kj:"二本", en:"2 (long thin objects)", note:"ほん (plain)", group:"Long Objects 本" },
    { jp:"さんぼん", kj:"三本", en:"3 (long thin objects)", note:"ぼん (voiced)", group:"Long Objects 本" },
    { jp:"よんほん", kj:"四本", en:"4 (long thin objects)", note:"ほん (plain)", group:"Long Objects 本" },
    { jp:"ごほん",   kj:"五本", en:"5 (long thin objects)", note:"ほん (plain)", group:"Long Objects 本" },
    { jp:"ろっぽん", kj:"六本", en:"6 (long thin objects)", note:"ぽん (gemination)", group:"Long Objects 本" },
    { jp:"ななほん", kj:"七本", en:"7 (long thin objects)", note:"ほん (plain)", group:"Long Objects 本" },
    { jp:"はっぽん", kj:"八本", en:"8 (long thin objects)", note:"ぽん (gemination)", group:"Long Objects 本" },
    { jp:"きゅうほん", kj:"九本", en:"9 (long thin objects)", note:"ほん (plain)", group:"Long Objects 本" },
    { jp:"じゅっぽん", kj:"十本", en:"10 (long thin objects)", note:"ぽん (gemination)", group:"Long Objects 本" },
    { jp:"なんぼん", kj:"何本", en:"how many (long objects)?", note:"ぼん (voiced) — set phrase", group:"Long Objects 本" },

    /* ═══════════ SMALL ANIMALS 匹 (cats, dogs, fish, insects) ═══════════ */
    { jp:"いっぴき", kj:"一匹", en:"1 (small animal)", note:"ぴき/ひき/びき alternation — same pattern as 本", group:"Small Animals 匹" },
    { jp:"にひき",   kj:"二匹", en:"2 (small animals)", note:"ひき (plain)", group:"Small Animals 匹" },
    { jp:"さんびき", kj:"三匹", en:"3 (small animals)", note:"びき (voiced)", group:"Small Animals 匹" },
    { jp:"よんひき", kj:"四匹", en:"4 (small animals)", note:"ひき (plain)", group:"Small Animals 匹" },
    { jp:"ごひき",   kj:"五匹", en:"5 (small animals)", note:"ひき (plain)", group:"Small Animals 匹" },
    { jp:"ろっぴき", kj:"六匹", en:"6 (small animals)", note:"ぴき (gemination)", group:"Small Animals 匹" },
    { jp:"ななひき", kj:"七匹", en:"7 (small animals)", note:"ひき (plain)", group:"Small Animals 匹" },
    { jp:"はっぴき", kj:"八匹", en:"8 (small animals)", note:"ぴき (gemination)", group:"Small Animals 匹" },
    { jp:"きゅうひき", kj:"九匹", en:"9 (small animals)", note:"ひき (plain)", group:"Small Animals 匹" },
    { jp:"じゅっぴき", kj:"十匹", en:"10 (small animals)", note:"ぴき (gemination)", group:"Small Animals 匹" },
    { jp:"なんびき", kj:"何匹", en:"how many (small animals)?", note:"びき (voiced) — set phrase", group:"Small Animals 匹" },

    /* ═══════════ FLAT OBJECTS 枚 (paper, tickets, plates, shirts) ═══════════ */
    { jp:"いちまい", kj:"一枚", en:"1 (flat object)", note:"Regular pattern — no sound changes!", group:"Flat Objects 枚" },
    { jp:"にまい",   kj:"二枚", en:"2 (flat objects)", note:"", group:"Flat Objects 枚" },
    { jp:"さんまい", kj:"三枚", en:"3 (flat objects)", note:"", group:"Flat Objects 枚" },
    { jp:"よんまい", kj:"四枚", en:"4 (flat objects)", note:"", group:"Flat Objects 枚" },
    { jp:"ごまい",   kj:"五枚", en:"5 (flat objects)", note:"", group:"Flat Objects 枚" },
    { jp:"なんまい", kj:"何枚", en:"how many (flat objects)?", note:"", group:"Flat Objects 枚" },

    /* ═══════════ MACHINES & VEHICLES 台 ═══════════ */
    { jp:"いちだい", kj:"一台", en:"1 (machine/vehicle)", note:"Regular pattern — cars, computers, TVs", group:"Machines 台" },
    { jp:"にだい",   kj:"二台", en:"2 (machines)", note:"", group:"Machines 台" },
    { jp:"さんだい", kj:"三台", en:"3 (machines)", note:"", group:"Machines 台" },
    { jp:"よんだい", kj:"四台", en:"4 (machines)", note:"", group:"Machines 台" },
    { jp:"ごだい",   kj:"五台", en:"5 (machines)", note:"", group:"Machines 台" },
    { jp:"なんだい", kj:"何台", en:"how many (machines)?", note:"", group:"Machines 台" },

    /* ═══════════ BOOKS 冊 ═══════════ */
    { jp:"いっさつ", kj:"一冊", en:"1 (bound book)", note:"Gemination pattern, like さい", group:"Books 冊" },
    { jp:"にさつ",   kj:"二冊", en:"2 (books)", note:"", group:"Books 冊" },
    { jp:"さんさつ", kj:"三冊", en:"3 (books)", note:"", group:"Books 冊" },
    { jp:"よんさつ", kj:"四冊", en:"4 (books)", note:"", group:"Books 冊" },
    { jp:"ごさつ",   kj:"五冊", en:"5 (books)", note:"", group:"Books 冊" },
    { jp:"なんさつ", kj:"何冊", en:"how many (books)?", note:"", group:"Books 冊" },

    /* ═══════════ SIZE & DIMENSION ADJECTIVES ═══════════ */
    { jp:"おおきい", kj:"大きい", en:"big / large",       note:"Describes objects and people", group:"Size & Dimension" },
    { jp:"ちいさい", kj:"小さい", en:"small",              note:"", group:"Size & Dimension" },
    { jp:"ながい",   kj:"長い",   en:"long",               note:"", group:"Size & Dimension" },
    { jp:"みじかい", kj:"短い",   en:"short (length)",     note:"For objects, not height", group:"Size & Dimension" },
    { jp:"たかい",   kj:"高い",   en:"tall / high / expensive", note:"Also means expensive!", group:"Size & Dimension" },
    { jp:"ひくい",   kj:"低い",   en:"low / short (height)", note:"", group:"Size & Dimension" },
    { jp:"ひろい",   kj:"広い",   en:"wide / spacious",    note:"", group:"Size & Dimension" },
    { jp:"せまい",   kj:"狭い",   en:"narrow / cramped",   note:"", group:"Size & Dimension" },
    { jp:"おもい",   kj:"重い",   en:"heavy",              note:"", group:"Size & Dimension" },
    { jp:"かるい",   kj:"軽い",   en:"light (weight)",     note:"", group:"Size & Dimension" },
    { jp:"ふとい",   kj:"太い",   en:"thick / fat",        note:"", group:"Size & Dimension" },
    { jp:"ほそい",   kj:"細い",   en:"thin / slender",     note:"", group:"Size & Dimension" },

    /* ═══════════ PRICE — LARGE NUMBERS (review from L3, extended) ═══════════ */
    { jp:"ひゃくえん", kj:"百円", en:"100 yen",      note:"", group:"Price 円" },
    { jp:"ごひゃくえん", kj:"五百円", en:"500 yen",  note:"", group:"Price 円" },
    { jp:"せんえん",   kj:"千円", en:"1,000 yen",   note:"", group:"Price 円" },
    { jp:"いちまんえん", kj:"一万円", en:"10,000 yen", note:"まん = 10,000 — critical unit in Japanese counting", group:"Price 円" },
    { jp:"ごせんえん", kj:"五千円", en:"5,000 yen",  note:"", group:"Price 円" },
    { jp:"じゅうまんえん", kj:"十万円", en:"100,000 yen", note:"じゅう + まん", group:"Price 円" },
    { jp:"いくらですか", kj:"いくらですか", en:"How much is it?", note:"Standard price question (from L3)", group:"Price 円" },

    /* ═══════════ DATE / MONTH / YEAR — CONSOLIDATED REVIEW ═══════════ */
    { jp:"なんがつなんにち", kj:"何月何日", en:"what date? (month + day)", note:"Combines なんがつ + なんにち", group:"Dates Review" },
    { jp:"なんねん", kj:"何年", en:"what year?", note:"2026ねん = year 2026", group:"Dates Review" },
    { jp:"にせんにじゅうろくねん", kj:"2026年", en:"the year 2026", note:"Read digit-by-digit + ねん", group:"Dates Review" },
  ],

  kanji: [
    {
      char: "歳", meaning: "age, years old", strokes: 13, jlpt: "N4",
      onyomi: ["サイ"], kunyomi: ["—"],
      inLesson: ["いっさい (一歳) — 1 year old", "はたち (二十歳) — 20 years old", "なんさい (何歳) — how old?"],
      mnemonic: "Stop (止) + halberd (戌-like) — marking the years that stop and pass, like notches in time."
    },
    {
      char: "才", meaning: "talent, age (informal)", strokes: 3, jlpt: "N4",
      onyomi: ["サイ"], kunyomi: ["—"],
      inLesson: ["Alternative simpler kanji sometimes used for age instead of 歳"],
      mnemonic: "A simplified stroke pattern — literally the 'talent' one is born with, hence also used for age."
    },
    {
      char: "枚", meaning: "counter for flat objects", strokes: 8, jlpt: "N4",
      onyomi: ["マイ"], kunyomi: ["—"],
      inLesson: ["いちまい (一枚) — one (flat object)", "なんまい (何枚) — how many (flat objects)?"],
      mnemonic: "Tree (木) + hit/strike (攴) — thin wooden boards struck off a tree, like sheets of paper."
    },
    {
      char: "匹", meaning: "counter for small animals", strokes: 4, jlpt: "N4",
      onyomi: ["ヒキ"], kunyomi: ["—"],
      inLesson: ["いっぴき (一匹) — one (small animal)", "なんびき (何匹) — how many (small animals)?"],
      mnemonic: "A simplified pictograph resembling an animal's hindquarters — used for counting creatures."
    },
    {
      char: "台", meaning: "counter for machines/vehicles, platform", strokes: 5, jlpt: "N4",
      onyomi: ["ダイ","タイ"], kunyomi: ["—"],
      inLesson: ["いちだい (一台) — one machine/vehicle", "なんだい (何台) — how many machines?"],
      mnemonic: "A platform (厶) resting on a base — the pedestal that machines and vehicles sit on."
    },
    {
      char: "冊", meaning: "counter for bound books", strokes: 5, jlpt: "N4",
      onyomi: ["サツ"], kunyomi: ["—"],
      inLesson: ["いっさつ (一冊) — one book", "なんさつ (何冊) — how many books?"],
      mnemonic: "Bound bamboo strips tied together with a cord — the ancient form of a bound book."
    },
    {
      char: "大", meaning: "big, large", strokes: 3, jlpt: "N5",
      onyomi: ["ダイ","タイ"], kunyomi: ["おお(きい)"],
      inLesson: ["おおきい (大きい) — big, large (also seen in だいがく from L1)"],
      mnemonic: "A person (人) with arms stretched as wide as possible — the essence of 'big'."
    },
    {
      char: "小", meaning: "small", strokes: 3, jlpt: "N5",
      onyomi: ["ショウ"], kunyomi: ["ちい(さい)","こ-","お-"],
      inLesson: ["ちいさい (小さい) — small"],
      mnemonic: "Three small strokes, a tiny dot flanked by two smaller ones — the picture of smallness itself."
    },
    {
      char: "長", meaning: "long, chief, leader", strokes: 8, jlpt: "N4",
      onyomi: ["チョウ"], kunyomi: ["なが(い)"],
      inLesson: ["ながい (長い) — long"],
      mnemonic: "Long flowing hair on an elder — age brings both long hair and long experience, hence 'chief'."
    },
    {
      char: "短", meaning: "short", strokes: 12, jlpt: "N4",
      onyomi: ["タン"], kunyomi: ["みじか(い)"],
      inLesson: ["みじかい (短い) — short (length)"],
      mnemonic: "Arrow (矢) + bean (豆) — an arrow is long, but a bean is short. Comparing the two."
    },
    {
      char: "高", meaning: "tall, high, expensive", strokes: 10, jlpt: "N5",
      onyomi: ["コウ"], kunyomi: ["たか(い)"],
      inLesson: ["たかい (高い) — tall / high / expensive"],
      mnemonic: "A tall tower pictograph — a multi-story gate tower, tall and impressive (and costly to build)."
    },
    {
      char: "低", meaning: "low", strokes: 7, jlpt: "N4",
      onyomi: ["テイ"], kunyomi: ["ひく(い)"],
      inLesson: ["ひくい (低い) — low / short (height)"],
      mnemonic: "Person (人) + base/bottom (氐) — a person standing low to the ground."
    },
    {
      char: "重", meaning: "heavy, important, layer", strokes: 9, jlpt: "N4",
      onyomi: ["ジュウ","チョウ"], kunyomi: ["おも(い)","かさ(なる)"],
      inLesson: ["おもい (重い) — heavy"],
      mnemonic: "A cart (車-like) loaded with layered goods — heavy with many stacked items."
    },
    {
      char: "軽", meaning: "light (weight), simple", strokes: 12, jlpt: "N4",
      onyomi: ["ケイ"], kunyomi: ["かる(い)"],
      inLesson: ["かるい (軽い) — light (weight)"],
      mnemonic: "Vehicle (車) + through-thread (圣) — a cart light enough to thread through anywhere."
    },
  ],

  sentences: [
    {
      pattern: "Generic つ counter",
      jp: "りんごを みっつ ください。",
      en: "Please give me three apples.",
      breakdown: [
        { word:"りんごを", meaning:"apples (object)" },
        { word:"みっつ", meaning:"three (generic counter, no specific counter for apples)" },
        { word:"ください。", meaning:"please give me" }
      ]
    },
    {
      pattern: "People counter 人",
      jp: "かぞくは よにん です。",
      en: "There are four people in my family.",
      breakdown: [
        { word:"かぞくは", meaning:"family (topic)" },
        { word:"よにん", meaning:"four people (よ, not し, to avoid the 'death' homophone)" },
        { word:"です。", meaning:"is / are" }
      ]
    },
    {
      pattern: "Age counter 歳 (with はたち exception)",
      jp: "わたしは はたちです。",
      en: "I am 20 years old.",
      breakdown: [
        { word:"わたしは", meaning:"I (topic)" },
        { word:"はたちです。", meaning:"am 20 years old (completely irregular reading for 20)" }
      ]
    },
    {
      pattern: "Long-object counter 本 (sound changes)",
      jp: "ボールペンを さんぼん かいました。",
      en: "I bought three ballpoint pens.",
      breakdown: [
        { word:"ボールペンを", meaning:"ballpoint pens (object)" },
        { word:"さんぼん", meaning:"three (long thin objects — ぼん, voiced form after さん)" },
        { word:"かいました。", meaning:"bought" }
      ]
    },
    {
      pattern: "Small-animal counter 匹",
      jp: "にわに ねこが にひき います。",
      en: "There are two cats in the garden.",
      breakdown: [
        { word:"にわに", meaning:"in the garden (location)" },
        { word:"ねこが", meaning:"cats (subject)" },
        { word:"にひき", meaning:"two (small animals — plain ひき form)" },
        { word:"います。", meaning:"there are (for animate things)" }
      ]
    },
    {
      pattern: "Floor counter 階 (irregular voicing)",
      jp: "としょかんは さんがい です。",
      en: "The library is on the 3rd floor.",
      breakdown: [
        { word:"としょかんは", meaning:"the library (topic)" },
        { word:"さんがい", meaning:"3rd floor (voiced が after さん — irregular)" },
        { word:"です。", meaning:"is" }
      ]
    },
    {
      pattern: "Size adjectives",
      jp: "その かばんは おおきいですが、この かばんは ちいさいです。",
      en: "That bag is big, but this bag is small.",
      breakdown: [
        { word:"その かばんは", meaning:"that bag (topic)" },
        { word:"おおきいですが、", meaning:"is big, but…" },
        { word:"この かばんは", meaning:"this bag (topic)" },
        { word:"ちいさいです。", meaning:"is small" }
      ]
    },
    {
      pattern: "Price with large numbers",
      jp: "この とけいは いちまんえん です。",
      en: "This watch is 10,000 yen.",
      breakdown: [
        { word:"この とけいは", meaning:"this watch (topic)" },
        { word:"いちまんえん", meaning:"10,000 yen (いち + まん + えん)" },
        { word:"です。", meaning:"is" }
      ]
    },
  ],

  exercises: [
    {
      id: 1, type:"mcq",
      grammar: "Choosing the right counter",
      instruction: "You want to count 3 pencils (long thin objects). Which counter is correct?",
      q: "",
      options: ["さんまい", "さんぼん", "さんにん", "さんさつ"],
      answer: 1,
      explanation: "本 (ほん/ぼん/ぽん) is used for long thin objects: pencils, bottles, umbrellas. さんぼん uses the voiced ぼん form after さん."
    },
    {
      id: 2, type:"mcq",
      grammar: "Choosing the right counter",
      instruction: "You want to count 2 cats. Which counter is correct?",
      q: "",
      options: ["にだい", "にほん", "にひき", "にまい"],
      answer: 2,
      explanation: "匹 (ひき/びき/ぴき) is used for small animals like cats, dogs, fish. にひき uses the plain ひき form after に."
    },
    {
      id: 3, type:"mcq",
      grammar: "Irregular people counter",
      instruction: "How do you say \"one person\"?",
      q: "",
      options: ["いちにん", "ひとつ", "ひとり", "いちじん"],
      answer: 2,
      explanation: "ひとり (一人) is a completely irregular reading for one person. ふたり (two people) is also irregular. From three onward it's regular: さんにん、よにん…"
    },
    {
      id: 4, type:"mcq",
      grammar: "Irregular age — はたち",
      instruction: "What does はたち mean?",
      q: "",
      options: ["8 years old", "10 years old", "20 years old", "80 years old"],
      answer: 2,
      explanation: "はたち (二十歳) is the completely irregular reading for 20 years old — the most important age word, as 20 marks legal adulthood in Japan."
    },
    {
      id: 5, type:"mcq",
      grammar: "Floor counter voicing",
      instruction: "How do you say \"3rd floor\"?",
      q: "",
      options: ["さんかい", "さんがい", "みっかい", "さんにち"],
      answer: 1,
      explanation: "さんがい uses irregular VOICED が (not か) after さん — this must be memorised as an exception, unlike most other numbers with 階."
    },
    {
      id: 6, type:"mcq",
      grammar: "Gemination pattern (age/books)",
      instruction: "How do you say \"1 year old\"?",
      q: "",
      options: ["いちさい", "いっさい", "いさい", "いちねん"],
      answer: 1,
      explanation: "いっさい uses gemination — いち becomes いっ before さい (a small っ doubles the following consonant sound). Same pattern appears in はっさい(8), じゅっさい(10)."
    },
    {
      id: 7, type:"mcq",
      grammar: "Counter for flat objects",
      instruction: "You want 5 sheets of paper. Which counter?",
      q: "",
      options: ["ごひき", "ごまい", "ごほん", "ごさつ"],
      answer: 1,
      explanation: "枚 (まい) is used for flat, thin objects: paper, tickets, plates, shirts. It has NO sound changes — always regular まい across all numbers."
    },
    {
      id: 8, type:"mcq",
      grammar: "Counter for books",
      instruction: "\"How many books did you buy?\" Choose the correct question.",
      q: "",
      options: [
        "なんまい ほんを かいましたか。",
        "なんさつ ほんを かいましたか。",
        "なんびき ほんを かいましたか。",
        "なんぼん ほんを かいましたか。"
      ],
      answer: 1,
      explanation: "冊 (さつ) is the counter for bound books, magazines, notebooks. なんさつ = how many books?"
    },
    {
      id: 9, type:"mcq",
      grammar: "なぜよにん not よんにん or しにん",
      instruction: "Why is 4 people よにん and not しにん?",
      q: "",
      options: [
        "し sounds too formal",
        "し is a homophone for death (死), considered inauspicious",
        "よ is easier to pronounce",
        "There is no reason, both are equally common"
      ],
      answer: 1,
      explanation: "し (death, 死) is avoided in many counting contexts due to superstition. よにん (four people) and よじ→なんじ patterns avoid this unlucky homophone. Similarly, 9 is sometimes read きゅう instead of く (苦, suffering)."
    },
    {
      id: 10, type:"mcq",
      grammar: "Size adjectives — たかい's double meaning",
      instruction: "たかい can mean both \"tall\" and…",
      q: "",
      options: ["heavy", "expensive", "wide", "long"],
      answer: 1,
      explanation: "たかい (高い) uniquely means both 'tall/high' AND 'expensive' — context determines which. この とけいは たかいです = This watch is expensive."
    },
    {
      id: 11, type:"mcq",
      grammar: "Machine/vehicle counter",
      instruction: "How do you count 2 cars?",
      q: "",
      options: ["にひき", "にだい", "にほん", "ふたつ"],
      answer: 1,
      explanation: "台 (だい) counts machines and vehicles: cars, computers, TVs, bicycles. にだい is fully regular — no sound changes."
    },
    {
      id: 12, type:"mcq",
      grammar: "Full combination — price + counter",
      instruction: "\"I bought three 100-yen pens.\" Choose the correct sentence.",
      q: "",
      options: [
        "ひゃくえんの ペンを さんぼん かいました。",
        "ひゃくえんの ペンを さんまい かいました。",
        "ひゃくえんの ペンを みっつ かいました。",
        "Both A and C are acceptable"
      ],
      answer: 3,
      explanation: "Pens are long thin objects, so 本(ぼん) is the specific counter — さんぼん. However, つ (generic counter) can also be used for almost anything when the specific counter is uncertain — みっつ also works, though 本 is more precise."
    },
  ],

  selfIntroTemplate: null
});
