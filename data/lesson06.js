LessonRegistry.add({
  id: 6,
  title: "Lesson 6",
  topic: "Actions, Food & Invitations",
  grammar: "NをV(transitive)  /  Nをします  /  N(place)でV  /  Vませんか  /  Vましょう  /  お〜",

  vocab: [
    // --- Action Verbs ---
    { jp:"たべます",   kj:"食べます", en:"eat",                   note:"なにを たべますか = What do you eat?",     group:"Action Verbs" },
    { jp:"のみます",   kj:"飲みます", en:"drink",                  note:"",                                        group:"Action Verbs" },
    { jp:"すいます",   kj:"吸います", en:"smoke [a cigarette]",    note:"たばこを すいます",                        group:"Action Verbs" },
    { jp:"みます",     kj:"見ます",   en:"see / look at / watch",  note:"えいがを みます = watch a movie",          group:"Action Verbs" },
    { jp:"ききます",   kj:"聞きます", en:"hear / listen",          note:"おんがくを ききます = listen to music",     group:"Action Verbs" },
    { jp:"よみます",   kj:"読みます", en:"read",                   note:"ほんを よみます = read a book",             group:"Action Verbs" },
    { jp:"かきます",   kj:"書きます", en:"write / draw / paint",   note:"てがみを かきます = write a letter",        group:"Action Verbs" },
    { jp:"かいます",   kj:"買います", en:"buy",                    note:"スーパーで かいます = buy at the supermarket", group:"Action Verbs" },
    { jp:"とります",   kj:"撮ります", en:"take [a photograph]",    note:"しゃしんを とります",                       group:"Action Verbs" },
    { jp:"します",     kj:"",         en:"do",                     note:"Nをします: サッカーをします = play soccer", group:"Action Verbs" },
    { jp:"あいます",   kj:"会います", en:"meet [a friend]",        note:"ともだちに あいます (に, not を!)",          group:"Action Verbs" },

    // --- Meals ---
    { jp:"ごはん",     kj:"",       en:"a meal / cooked rice", note:"あさごはん、ひるごはん、ばんごはん",      group:"Meals" },
    { jp:"あさごはん", kj:"朝ごはん", en:"breakfast",           note:"",                                      group:"Meals" },
    { jp:"ひるごはん", kj:"昼ごはん", en:"lunch",               note:"",                                      group:"Meals" },
    { jp:"ばんごはん", kj:"晩ごはん", en:"supper / dinner",     note:"",                                      group:"Meals" },

    // --- Food ---
    { jp:"パン",     kj:"",    en:"bread",     note:"Loanword from Portuguese 'pão'",  group:"Food" },
    { jp:"たまご",   kj:"卵",  en:"egg",       note:"",                               group:"Food" },
    { jp:"にく",     kj:"肉",  en:"meat",      note:"ぎゅうにく=beef, とりにく=chicken, ぶたにく=pork", group:"Food" },
    { jp:"さかな",   kj:"魚",  en:"fish",      note:"Japan is famous for its fish cuisine", group:"Food" },
    { jp:"やさい",   kj:"野菜", en:"vegetable", note:"",                              group:"Food" },
    { jp:"くだもの", kj:"果物", en:"fruit",    note:"",                               group:"Food" },

    // --- Drinks ---
    { jp:"みず",       kj:"水",   en:"water",                    note:"",                                  group:"Drinks" },
    { jp:"おちゃ",     kj:"お茶", en:"tea / green tea",          note:"お is an honorific prefix (おー)",  group:"Drinks" },
    { jp:"こうちゃ",   kj:"紅茶", en:"black tea",                note:"紅 = red/crimson, 茶 = tea",        group:"Drinks" },
    { jp:"ぎゅうにゅう", kj:"牛乳", en:"milk",                   note:"(ミルク) is also used",             group:"Drinks" },
    { jp:"ジュース",   kj:"",     en:"juice",                    note:"Loanword",                          group:"Drinks" },
    { jp:"ビール",     kj:"",     en:"beer",                     note:"Loanword",                          group:"Drinks" },
    { jp:"さけ",       kj:"酒",   en:"alcohol / Japanese rice wine", note:"[お]さけ — お is respectful prefix", group:"Drinks" },

    // --- Media & Objects ---
    { jp:"ビデオ",   kj:"",    en:"video tape / video deck",  note:"Loanword",                   group:"Media & Objects" },
    { jp:"えいが",   kj:"映画", en:"movie",                   note:"えいがを みます = watch a movie", group:"Media & Objects" },
    { jp:"CD",       kj:"",    en:"CD / compact disc",        note:"CDを ききます = listen to a CD", group:"Media & Objects" },
    { jp:"てがみ",   kj:"手紙", en:"letter",                  note:"てがみを かきます = write a letter", group:"Media & Objects" },
    { jp:"レポート", kj:"",    en:"report",                   note:"レポートを かきます",               group:"Media & Objects" },
    { jp:"しゃしん", kj:"写真", en:"photograph",              note:"しゃしんを とります = take a photo",  group:"Media & Objects" },

    // --- Places ---
    { jp:"みせ",     kj:"店",  en:"store / shop",  note:"みせで かいます = buy at a shop",       group:"Places" },
    { jp:"レストラン", kj:"",  en:"restaurant",    note:"レストランで たべます = eat at a restaurant", group:"Places" },
    { jp:"にわ",     kj:"庭",  en:"garden",        note:"にわで はなみを します = do hanami in garden", group:"Places" },

    // --- Activities with します ---
    { jp:"しゅくだい",   kj:"宿題",  en:"homework",               note:"しゅくだいを します = do homework",         group:"Activities" },
    { jp:"テニス",       kj:"",      en:"tennis",                  note:"テニスを します = play tennis",            group:"Activities" },
    { jp:"サッカー",     kj:"",      en:"soccer / football",       note:"サッカーを します = play soccer",          group:"Activities" },
    { jp:"はなみ",       kj:"花見",  en:"cherry-blossom viewing",  note:"[お]はなみを します — Spring tradition!", group:"Activities" },

    // --- Question Word ---
    { jp:"なに", kj:"何", en:"what (as object)",  note:"なにを たべますか = What will you eat? (なに before を)", group:"Q-Words" },

    // --- Adverbs ---
    { jp:"いっしょに", kj:"",    en:"together",          note:"いっしょに たべましょう = Let's eat together",    group:"Adverbs" },
    { jp:"ちょっと",   kj:"",    en:"a little / briefly", note:"ちょっと やすみましょう = Let's take a short rest", group:"Adverbs" },
    { jp:"いつも",     kj:"",    en:"always / usually",  note:"",                                               group:"Adverbs" },
    { jp:"ときどき",   kj:"時々", en:"sometimes",         note:"",                                               group:"Adverbs" },

    // --- Connector ---
    { jp:"それから", kj:"", en:"after that / and then", note:"Connects sequential actions: 〜します。それから、〜します。", group:"Connectors" },

    // --- Phrases ---
    { jp:"ええ",         kj:"",    en:"yes (casual)",        note:"More casual than はい",                          group:"Phrases" },
    { jp:"いいですね",   kj:"",    en:"That's good. / Sounds nice!", note:"Response to an invitation",             group:"Phrases" },
    { jp:"わかりました", kj:"",    en:"I understand. / I see.", note:"わかります = understand (Vます form)",        group:"Phrases" },
    { jp:"何ですか",     kj:"",    en:"Yes? (responding when called)", note:"Used when someone calls your name",   group:"Phrases" },
    { jp:"じゃ、また",   kj:"",    en:"See you [later / tomorrow].", note:"じゃ、また あした = See you tomorrow",  group:"Phrases" },
  ],

  kanji: [
    {
      char: "食", meaning: "eat, food", strokes: 9, jlpt: "N5",
      onyomi: ["ショク","ジキ"], kunyomi: ["た(べる)","く(う)"],
      inLesson: ["たべます (食べます) — eat", "あさごはん (朝ごはん) — breakfast"],
      mnemonic: "A person (人) with a lid over a bowl of rice (良) — eating a covered meal."
    },
    {
      char: "飲", meaning: "drink, swallow", strokes: 12, jlpt: "N5",
      onyomi: ["イン"], kunyomi: ["の(む)"],
      inLesson: ["のみます (飲みます) — drink"],
      mnemonic: "Food/eat (食) + yawn/open mouth (欠) — opening your mouth wide to drink."
    },
    {
      char: "見", meaning: "see, look, watch", strokes: 7, jlpt: "N5",
      onyomi: ["ケン"], kunyomi: ["み(る)","み(せる)","み(える)"],
      inLesson: ["みます (見ます) — see, look at, watch"],
      mnemonic: "An eye (目) on two legs (儿) — a person standing up to take a good look."
    },
    {
      char: "読", meaning: "read", strokes: 14, jlpt: "N5",
      onyomi: ["ドク","トク","トウ"], kunyomi: ["よ(む)"],
      inLesson: ["よみます (読みます) — read"],
      mnemonic: "Words (言) + sell/exchange (売) — reading is trading words for knowledge."
    },
    {
      char: "買", meaning: "buy, purchase", strokes: 12, jlpt: "N5",
      onyomi: ["バイ"], kunyomi: ["か(う)"],
      inLesson: ["かいます (買います) — buy"],
      mnemonic: "Net (罒) over shells (貝) — using a net to gather money shells for purchasing."
    },
    {
      char: "肉", meaning: "meat, flesh", strokes: 6, jlpt: "N4",
      onyomi: ["ニク"], kunyomi: ["—"],
      inLesson: ["にく (肉) — meat"],
      mnemonic: "A piece of meat with striations (muscle lines) — a cut of meat on the butcher's block."
    },
    {
      char: "魚", meaning: "fish", strokes: 11, jlpt: "N5",
      onyomi: ["ギョ"], kunyomi: ["さかな","うお"],
      inLesson: ["さかな (魚) — fish"],
      mnemonic: "Head, body, tail, and fins — one of the best pictographic kanji in the language."
    },
    {
      char: "野", meaning: "field, plains, wild", strokes: 11, jlpt: "N4",
      onyomi: ["ヤ"], kunyomi: ["の"],
      inLesson: ["やさい (野菜) — vegetable"],
      mnemonic: "Village (里) + give (予) — the fields outside the village that give us food."
    },
    {
      char: "菜", meaning: "vegetable, greens, dish", strokes: 11, jlpt: "N4",
      onyomi: ["サイ"], kunyomi: ["な"],
      inLesson: ["やさい (野菜) — vegetable"],
      mnemonic: "Plants/grass (艹) + claw + tree (采) — hands picking greens from a tree/plant."
    },
    {
      char: "茶", meaning: "tea, brown", strokes: 9, jlpt: "N4",
      onyomi: ["チャ","サ"], kunyomi: ["—"],
      inLesson: ["おちゃ (お茶) — tea, green tea", "こうちゃ (紅茶) — black tea"],
      mnemonic: "Plant (艹) + person between two lines (人+木) — tea leaves plucked by a person."
    },
    {
      char: "映", meaning: "reflect, project, shine", strokes: 9, jlpt: "N4",
      onyomi: ["エイ"], kunyomi: ["うつ(る)","うつ(す)","は(える)"],
      inLesson: ["えいが (映画) — movie"],
      mnemonic: "Sun (日) + center/middle (央) — the sun shining brilliantly at the center, like a projector."
    },
    {
      char: "画", meaning: "picture, draw, painting", strokes: 8, jlpt: "N4",
      onyomi: ["ガ","カク"], kunyomi: ["えが(く)","かく"],
      inLesson: ["えいが (映画) — movie"],
      mnemonic: "A brush stroke on a field (田) — drawing lines to create a picture."
    },
    {
      char: "写", meaning: "copy, photograph, describe", strokes: 5, jlpt: "N4",
      onyomi: ["シャ"], kunyomi: ["うつ(す)","うつ(る)"],
      inLesson: ["しゃしん (写真) — photograph"],
      mnemonic: "A roof (冖) over a bird (烏 simplified) — capturing an image like a bird's view."
    },
    {
      char: "真", meaning: "true, genuine, photograph", strokes: 10, jlpt: "N4",
      onyomi: ["シン"], kunyomi: ["ま","まこと"],
      inLesson: ["しゃしん (写真) — photograph"],
      mnemonic: "Spoon/utensil (匕) over an eye (目) at a frame — looking carefully at what is true."
    },
  ],

  sentences: [
    {
      pattern: "NをV (object particle を)",
      jp: "まいあさ ジュースを のみます。",
      en: "I drink juice every morning.",
      breakdown: [
        { word:"まいあさ", meaning:"every morning" },
        { word:"ジュースを", meaning:"juice (を = direct object marker)" },
        { word:"のみます。", meaning:"drink (Vます)" }
      ]
    },
    {
      pattern: "N(place)でV (location of action)",
      jp: "えきで しんぶんを かいます。",
      en: "I buy a newspaper at the station.",
      breakdown: [
        { word:"えきで", meaning:"at the station (で = place where action occurs)" },
        { word:"しんぶんを", meaning:"newspaper (direct object)" },
        { word:"かいます。", meaning:"buy" }
      ]
    },
    {
      pattern: "Nをします (activities with します)",
      jp: "どようびに テニスを します。",
      en: "I play tennis on Saturdays.",
      breakdown: [
        { word:"どようびに", meaning:"on Saturday (に marks specific day)" },
        { word:"テニスを", meaning:"tennis (を marks object of します)" },
        { word:"します。", meaning:"do / play (habitual)" }
      ]
    },
    {
      pattern: "Vませんか (invitation — polite)",
      jp: "いっしょに ひるごはんを たべませんか。",
      en: "Won't you have lunch with me?",
      breakdown: [
        { word:"いっしょに", meaning:"together" },
        { word:"ひるごはんを", meaning:"lunch (direct object)" },
        { word:"たべませんか。", meaning:"won't you eat? (Vませんか = polite invitation)" }
      ]
    },
    {
      pattern: "Vましょう (let's — accepting / proposing)",
      jp: "ええ、たべましょう。",
      en: "Yes, let's eat.",
      breakdown: [
        { word:"ええ、", meaning:"yes (casual)" },
        { word:"たべましょう。", meaning:"let's eat (Vましょう = positive invitation/agreement)" }
      ]
    },
    {
      pattern: "何をしましたか (what did you do?)",
      jp: "きのう なにを しましたか。― にほんごを べんきょうしました。それから えいがを みました。",
      en: "What did you do yesterday? — I studied Japanese. Then I watched a movie.",
      breakdown: [
        { word:"なにを しましたか。", meaning:"What did you do? (なに = what, as object)" },
        { word:"にほんごを べんきょうしました。", meaning:"I studied Japanese (Vました past)" },
        { word:"それから", meaning:"after that / and then" },
        { word:"えいがを みました。", meaning:"I watched a movie" }
      ]
    },
    {
      pattern: "Vませんか / Vましょう — Full exchange",
      jp: "いっしょに きょうとへ いきませんか。― ええ、いいですね。いきましょう。",
      en: "Won't you come to Kyoto with me? — Yes, that sounds good. Let's go!",
      breakdown: [
        { word:"いっしょに", meaning:"together" },
        { word:"いきませんか。", meaning:"won't you go? (polite invitation)" },
        { word:"いいですね。", meaning:"that's good / sounds nice" },
        { word:"いきましょう。", meaning:"let's go (accepting the invitation)" }
      ]
    },
    {
      pattern: "お〜 (honorific prefix)",
      jp: "おちゃを のみませんか。― ええ、のみましょう。",
      en: "Won't you have some tea? — Yes, let's.",
      breakdown: [
        { word:"おちゃを", meaning:"tea (お is honorific prefix — always used with ちゃ)" },
        { word:"のみませんか。", meaning:"won't you drink? (invitation)" },
        { word:"のみましょう。", meaning:"let's drink (agreement)" }
      ]
    },
  ],

  exercises: [
    {
      id: 1, type:"mcq",
      grammar: "NをV — object particle を",
      instruction: "Choose the correct particle: まいにち こうちゃ ___ のみます。",
      q: "",
      options: ["が", "に", "を", "で"],
      answer: 2,
      explanation: "を marks the direct object of a transitive verb (like のみます). こうちゃを のみます = I drink black tea. を is pronounced the same as を (the particle) = 'o'."
    },
    {
      id: 2, type:"mcq",
      grammar: "N(place)でV — place of action",
      instruction: "\"I read books at the library.\" Choose the correct sentence.",
      q: "",
      options: [
        "としょかんへ ほんを よみます。",
        "としょかんで ほんを よみます。",
        "としょかんに ほんを よみます。",
        "としょかんを ほんで よみます。"
      ],
      answer: 1,
      explanation: "で marks the place where an action takes place. としょかんで = at the library. Compare: としょかんへ means 'to the library' (direction only, no action indicated)."
    },
    {
      id: 3, type:"mcq",
      grammar: "Vませんか vs Vましょう",
      instruction: "Your friend invites you: \"いっしょに サッカーを しませんか。\" How do you accept?",
      q: "",
      options: [
        "いいえ、しません。",
        "ええ、しましょう。",
        "ええ、しませんか。",
        "いいですね。しました。"
      ],
      answer: 1,
      explanation: "Vませんか = polite invitation (Won't you ~?). Vましょう = positive acceptance or proposal (Let's ~!). So the answer to しませんか is しましょう."
    },
    {
      id: 4, type:"mcq",
      grammar: "なん vs なに",
      instruction: "Which is correct for \"What will you buy?\"",
      q: "",
      options: [
        "なんを かいますか。",
        "なにを かいますか。",
        "なんで かいますか。",
        "なにが かいますか。"
      ],
      answer: 1,
      explanation: "なに is used before the particle を (and in most other cases). なん is used before counter suffixes (なんさい, なんじ) and words starting with た・だ・な rows. なにを かいますか = What will you buy?"
    },
    {
      id: 5, type:"mcq",
      grammar: "Nをします",
      instruction: "\"I do homework every night.\" Choose the correct Japanese.",
      q: "",
      options: [
        "まいばん しゅくだいが します。",
        "まいばん しゅくだいに します。",
        "まいばん しゅくだいを します。",
        "まいばん しゅくだいで します。"
      ],
      answer: 2,
      explanation: "Nをします: を marks the activity/noun used with します. This pattern covers sports (テニスをします), events (パーティーをします), and tasks (しゅくだいをします)."
    },
    {
      id: 6, type:"mcq",
      grammar: "で — place of action vs へ — direction",
      instruction: "Which sentence means \"I eat lunch at the restaurant\"?",
      q: "",
      options: [
        "レストランへ ひるごはんを たべます。",
        "レストランで ひるごはんを たべます。",
        "レストランに ひるごはんを たべます。",
        "レストランを ひるごはんで たべます。"
      ],
      answer: 1,
      explanation: "で marks the location where an action occurs. レストランで = at the restaurant. レストランへ would only mean 'going towards the restaurant', not eating there."
    },
    {
      id: 7, type:"mcq",
      grammar: "それから — sequential actions",
      instruction: "\"I watched a movie. Then I ate dinner.\" Choose the correct sentence.",
      q: "",
      options: [
        "えいがを みました。ばんごはんを たべました。",
        "えいがを みました。それから ばんごはんを たべました。",
        "えいがを みました。そして ばんごはんを たべました。",
        "Both B and C are correct"
      ],
      answer: 3,
      explanation: "それから (after that / and then) connects sequential actions. Both それから and そして work here. それから emphasises the time sequence (first A, then B), while そして is a more neutral 'and'."
    },
    {
      id: 8, type:"mcq",
      grammar: "あいます — special particle に",
      instruction: "\"I met a friend.\" Which particle is correct?",
      q: "ともだち ___ あいました。",
      options: ["を", "で", "に", "と"],
      answer: 2,
      explanation: "あいます (会います = meet) uses に, NOT を! This is an exception — most action verbs use を for objects, but あいます uses に: ともだちに あいます = I meet a friend."
    },
    {
      id: 9, type:"mcq",
      grammar: "お〜 honorific prefix",
      instruction: "Which word ALWAYS uses the honorific prefix お?",
      q: "",
      options: ["おビール", "おさかな", "おちゃ", "おパン"],
      answer: 2,
      explanation: "おちゃ (tea) is always written with お — it has become part of the word. お is also fixed in おさけ (sake). For most other foods like ビール, パン, さかな, お is optional or not used."
    },
    {
      id: 10, type:"mcq",
      grammar: "Full L6 — combining patterns",
      instruction: "\"Won't you go to see a movie with me at Nara tomorrow?\"",
      q: "",
      options: [
        "あした いっしょに ならで えいがを みませんか。",
        "あした いっしょに ならへ えいがを みませんか。",
        "あした いっしょに ならへ いって えいがを みませんか。",
        "あした いっしょに ならに えいがを みませんか。"
      ],
      answer: 0,
      explanation: "ならで = at Nara (で marks place of action = watching). ならへ = toward Nara (direction only). The activity (watching a movie) happens AT Nara, so で is correct here. Full pattern: いっしょに + ならで + えいがを + みませんか."
    },
  ],
  selfIntroTemplate: null
});
