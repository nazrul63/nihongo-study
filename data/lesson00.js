/**
 * Minna no Nihongo — Lesson 00
 * Topic: Hiragana & Katakana
 *
 * Card layout:
 *   FRONT → hiragana (large) + katakana (below) — both scripts at once
 *   BACK  → romaji pronunciation
 *
 * Groups follow the traditional gojūon (五十音) order,
 * then voiced (dakuten), semi-voiced, and combination sounds (yōon).
 */
LessonRegistry.add({
  id: 0,
  title: "Lesson 0",
  topic: "Hiragana & Katakana",
  grammar: "46 base sounds · voiced (dakuten ゛) · semi-voiced (handakuten ゜) · combinations (拗音)",

  vocab: [

    /* ══════════════ VOWELS 母音 ══════════════ */
    { jp:"あ", kj:"ア", en:"a",  note:"Open 'ah' — like 'father'. Most common Japanese vowel.", group:"Vowels 母音" },
    { jp:"い", kj:"イ", en:"i",  note:"'ee' — like 'feet'. Shorter and crisper than English.",  group:"Vowels 母音" },
    { jp:"う", kj:"ウ", en:"u",  note:"Unrounded 'oo' — lips stay flat, not pushed forward.",   group:"Vowels 母音" },
    { jp:"え", kj:"エ", en:"e",  note:"'eh' — like 'bed'. Clean and short.",                    group:"Vowels 母音" },
    { jp:"お", kj:"オ", en:"o",  note:"'oh' — like 'go'. Round and short.",                     group:"Vowels 母音" },

    /* ══════════════ K-ROW か行 ══════════════ */
    { jp:"か", kj:"カ", en:"ka", note:"Mnemonic: カ looks like a sword — 'KA-ching!'",     group:"K-row か行" },
    { jp:"き", kj:"キ", en:"ki", note:"Mnemonic: キ looks like a KEY.",                    group:"K-row か行" },
    { jp:"く", kj:"ク", en:"ku", note:"Mnemonic: ク looks like a bird beak going 'coo'.", group:"K-row か行" },
    { jp:"け", kj:"ケ", en:"ke", note:"Mnemonic: ケ looks like a KE-y without the bow.",  group:"K-row か行" },
    { jp:"こ", kj:"コ", en:"ko", note:"Mnemonic: コ looks like two sides of a COt.",      group:"K-row か行" },

    /* ══════════════ S-ROW さ行 ══════════════ */
    { jp:"さ", kj:"サ", en:"sa",  note:"",                                                             group:"S-row さ行" },
    { jp:"し", kj:"シ", en:"shi", note:"'shi' not 'si'. ひ looks like a fishhook — 'SHEe'.",           group:"S-row さ行" },
    { jp:"す", kj:"ス", en:"su",  note:"す looks like a swan — 'SUwan'. Short vowel.",                  group:"S-row さ行" },
    { jp:"せ", kj:"セ", en:"se",  note:"",                                                             group:"S-row さ行" },
    { jp:"そ", kj:"ソ", en:"so",  note:"そ looks like a 'Z' with a curve — zigzag SO.",               group:"S-row さ行" },

    /* ══════════════ T-ROW た行 ══════════════ */
    { jp:"た", kj:"タ", en:"ta",  note:"",                                                              group:"T-row た行" },
    { jp:"ち", kj:"チ", en:"chi", note:"'chi' not 'ti'. ち looks like a cheerful face — 'CHEEr'.",     group:"T-row た行" },
    { jp:"つ", kj:"ツ", en:"tsu", note:"'tsu' not 'tu'. つ/ツ look like a wave — 'TSUnami'.",          group:"T-row た行" },
    { jp:"て", kj:"テ", en:"te",  note:"テ looks like a TV antenna.",                                  group:"T-row た行" },
    { jp:"と", kj:"ト", en:"to",  note:"ト looks like a TOtem pole with a spike.",                     group:"T-row た行" },

    /* ══════════════ N-ROW な行 ══════════════ */
    { jp:"な", kj:"ナ", en:"na", note:"ナ looks like a nail being hammered — 'NAil'.", group:"N-row な行" },
    { jp:"に", kj:"ニ", en:"ni", note:"ニ looks like two parallel NI-les (Niles).",  group:"N-row な行" },
    { jp:"ぬ", kj:"ヌ", en:"nu", note:"ぬ looks like noodles swirling in a bowl.",   group:"N-row な行" },
    { jp:"ね", kj:"ネ", en:"ne", note:"ね looks like a sleeping cat (neko=cat).",    group:"N-row な行" },
    { jp:"の", kj:"ノ", en:"no", note:"の looks like the word 'no' in one stroke.",  group:"N-row な行" },

    /* ══════════════ H-ROW は行 ══════════════ */
    { jp:"は", kj:"ハ", en:"ha", note:"は = 'wa' when used as topic particle (は).",        group:"H-row は行" },
    { jp:"ひ", kj:"ヒ", en:"hi", note:"ひ looks like a smile — HI there!",                 group:"H-row は行" },
    { jp:"ふ", kj:"フ", en:"fu", note:"'fu' not 'hu'. フ looks like Mt. Fuji from above!", group:"H-row は行" },
    { jp:"へ", kj:"ヘ", en:"he", note:"へ = 'e' when used as direction particle (へ).",   group:"H-row は行" },
    { jp:"ほ", kj:"ホ", en:"ho", note:"ほ looks like a HOliday signpost.",                 group:"H-row は行" },

    /* ══════════════ M-ROW ま行 ══════════════ */
    { jp:"ま", kj:"マ", en:"ma", note:"マ looks like MArk — two lines with a drop.", group:"M-row ま行" },
    { jp:"み", kj:"ミ", en:"mi", note:"ミ looks like three water ripples (みず=water).", group:"M-row ま行" },
    { jp:"む", kj:"ム", en:"mu", note:"む looks like a bull face — MOO.",                 group:"M-row ま行" },
    { jp:"め", kj:"メ", en:"me", note:"め looks like eyes crossed — look at ME!",        group:"M-row ま行" },
    { jp:"も", kj:"モ", en:"mo", note:"も looks like a fishhook with MORE fish.",        group:"M-row ま行" },

    /* ══════════════ Y-ROW や行 ══════════════ */
    { jp:"や", kj:"ヤ", en:"ya", note:"や looks like a YAK's horns.",                    group:"Y-row や行" },
    { jp:"ゆ", kj:"ユ", en:"yu", note:"ゆ looks like a YOU-turn in the road.",           group:"Y-row や行" },
    { jp:"よ", kj:"ヨ", en:"yo", note:"よ/ヨ look like the word 'yo' — three bars.",    group:"Y-row や行" },

    /* ══════════════ R-ROW ら行 ══════════════ */
    { jp:"ら", kj:"ラ", en:"ra", note:"Japanese 'r' is between r/l — tap the tongue lightly.", group:"R-row ら行" },
    { jp:"り", kj:"リ", en:"ri", note:"リ looks like two REEDs.",                               group:"R-row ら行" },
    { jp:"る", kj:"ル", en:"ru", note:"る looks like a ROOm with a curly exit.",               group:"R-row ら行" },
    { jp:"れ", kj:"レ", en:"re", note:"レ looks like an L going RIGHT.",                       group:"R-row ら行" },
    { jp:"ろ", kj:"ロ", en:"ro", note:"ろ/ロ look like a ROad turning right.",                 group:"R-row ら行" },

    /* ══════════════ W-ROW わ行 + ん ══════════════ */
    { jp:"わ", kj:"ワ", en:"wa", note:"ワ looks like a WAterskiier.",                              group:"W-row & ん" },
    { jp:"を", kj:"ヲ", en:"wo", note:"Used only as the object particle を. Pronounced like お.", group:"W-row & ん" },
    { jp:"ん", kj:"ン", en:"n",  note:"Only kana that stands alone as a consonant. Never starts a word. Before m/b/p it sounds like 'm'.", group:"W-row & ん" },

    /* ══════════════ VOICED — G-ROW が行 ══════════════ */
    { jp:"が", kj:"ガ", en:"ga", note:"か + ゛(dakuten) = voiced", group:"Voiced が行" },
    { jp:"ぎ", kj:"ギ", en:"gi", note:"き + ゛= voiced",           group:"Voiced が行" },
    { jp:"ぐ", kj:"グ", en:"gu", note:"く + ゛= voiced",           group:"Voiced が行" },
    { jp:"げ", kj:"ゲ", en:"ge", note:"け + ゛= voiced",           group:"Voiced が行" },
    { jp:"ご", kj:"ゴ", en:"go", note:"こ + ゛= voiced",           group:"Voiced が行" },

    /* ══════════════ VOICED — Z-ROW ざ行 ══════════════ */
    { jp:"ざ", kj:"ザ", en:"za",  note:"さ + ゛= voiced",                   group:"Voiced ざ行" },
    { jp:"じ", kj:"ジ", en:"ji",  note:"し + ゛= voiced. 'ji' not 'zi'.",   group:"Voiced ざ行" },
    { jp:"ず", kj:"ズ", en:"zu",  note:"す + ゛= voiced",                   group:"Voiced ざ行" },
    { jp:"ぜ", kj:"ゼ", en:"ze",  note:"せ + ゛= voiced",                   group:"Voiced ざ行" },
    { jp:"ぞ", kj:"ゾ", en:"zo",  note:"そ + ゛= voiced",                   group:"Voiced ざ行" },

    /* ══════════════ VOICED — D-ROW だ行 ══════════════ */
    { jp:"だ", kj:"ダ", en:"da",  note:"た + ゛= voiced",                            group:"Voiced だ行" },
    { jp:"ぢ", kj:"ヂ", en:"ji",  note:"ち + ゛. Same sound as じ. Rare in modern Japanese.", group:"Voiced だ行" },
    { jp:"づ", kj:"ヅ", en:"zu",  note:"つ + ゛. Same sound as ず. Rare in modern Japanese.", group:"Voiced だ行" },
    { jp:"で", kj:"デ", en:"de",  note:"て + ゛= voiced",                            group:"Voiced だ行" },
    { jp:"ど", kj:"ド", en:"do",  note:"と + ゛= voiced",                            group:"Voiced だ行" },

    /* ══════════════ VOICED — B-ROW ば行 ══════════════ */
    { jp:"ば", kj:"バ", en:"ba", note:"は + ゛= voiced", group:"Voiced ば行" },
    { jp:"び", kj:"ビ", en:"bi", note:"ひ + ゛= voiced", group:"Voiced ば行" },
    { jp:"ぶ", kj:"ブ", en:"bu", note:"ふ + ゛= voiced", group:"Voiced ば行" },
    { jp:"べ", kj:"ベ", en:"be", note:"へ + ゛= voiced", group:"Voiced ば行" },
    { jp:"ぼ", kj:"ボ", en:"bo", note:"ほ + ゛= voiced", group:"Voiced ば行" },

    /* ══════════════ SEMI-VOICED — P-ROW ぱ行 ══════════════ */
    { jp:"ぱ", kj:"パ", en:"pa", note:"は + ゜(handakuten) = semi-voiced", group:"Semi-voiced ぱ行" },
    { jp:"ぴ", kj:"ピ", en:"pi", note:"ひ + ゜= semi-voiced",              group:"Semi-voiced ぱ行" },
    { jp:"ぷ", kj:"プ", en:"pu", note:"ふ + ゜= semi-voiced",              group:"Semi-voiced ぱ行" },
    { jp:"ぺ", kj:"ペ", en:"pe", note:"へ + ゜= semi-voiced",              group:"Semi-voiced ぱ行" },
    { jp:"ぽ", kj:"ポ", en:"po", note:"ほ + ゜= semi-voiced",              group:"Semi-voiced ぱ行" },

    /* ══════════════ COMBINATIONS 拗音 — KY / GY ══════════════ */
    { jp:"きゃ", kj:"キャ", en:"kya", note:"き + small や. The や is written small.", group:"Combinations きゃ行" },
    { jp:"きゅ", kj:"キュ", en:"kyu", note:"き + small ゆ",                          group:"Combinations きゃ行" },
    { jp:"きょ", kj:"キョ", en:"kyo", note:"き + small よ",                          group:"Combinations きゃ行" },
    { jp:"ぎゃ", kj:"ギャ", en:"gya", note:"ぎ + small や",                          group:"Combinations きゃ行" },
    { jp:"ぎゅ", kj:"ギュ", en:"gyu", note:"ぎ + small ゆ",                          group:"Combinations きゃ行" },
    { jp:"ぎょ", kj:"ギョ", en:"gyo", note:"ぎ + small よ",                          group:"Combinations きゃ行" },

    /* ══════════════ COMBINATIONS — SH / J ══════════════ */
    { jp:"しゃ", kj:"シャ", en:"sha", note:"し + small や — SHArp sound", group:"Combinations しゃ行" },
    { jp:"しゅ", kj:"シュ", en:"shu", note:"し + small ゆ",               group:"Combinations しゃ行" },
    { jp:"しょ", kj:"ショ", en:"sho", note:"し + small よ",               group:"Combinations しゃ行" },
    { jp:"じゃ", kj:"ジャ", en:"ja",  note:"じ + small や",               group:"Combinations しゃ行" },
    { jp:"じゅ", kj:"ジュ", en:"ju",  note:"じ + small ゆ",               group:"Combinations しゃ行" },
    { jp:"じょ", kj:"ジョ", en:"jo",  note:"じ + small よ",               group:"Combinations しゃ行" },

    /* ══════════════ COMBINATIONS — CH ══════════════ */
    { jp:"ちゃ", kj:"チャ", en:"cha", note:"ち + small や — CHArm sound", group:"Combinations ちゃ行" },
    { jp:"ちゅ", kj:"チュ", en:"chu", note:"ち + small ゆ",               group:"Combinations ちゃ行" },
    { jp:"ちょ", kj:"チョ", en:"cho", note:"ち + small よ",               group:"Combinations ちゃ行" },

    /* ══════════════ COMBINATIONS — NY / HY / MY / RY ══════════════ */
    { jp:"にゃ", kj:"ニャ", en:"nya", note:"に + small や", group:"Combinations にゃ行" },
    { jp:"にゅ", kj:"ニュ", en:"nyu", note:"に + small ゆ", group:"Combinations にゃ行" },
    { jp:"にょ", kj:"ニョ", en:"nyo", note:"に + small よ", group:"Combinations にゃ行" },
    { jp:"ひゃ", kj:"ヒャ", en:"hya", note:"ひ + small や", group:"Combinations ひゃ行" },
    { jp:"ひゅ", kj:"ヒュ", en:"hyu", note:"ひ + small ゆ", group:"Combinations ひゃ行" },
    { jp:"ひょ", kj:"ヒョ", en:"hyo", note:"ひ + small よ", group:"Combinations ひゃ行" },
    { jp:"みゃ", kj:"ミャ", en:"mya", note:"み + small や", group:"Combinations みゃ行" },
    { jp:"みゅ", kj:"ミュ", en:"myu", note:"み + small ゆ", group:"Combinations みゃ行" },
    { jp:"みょ", kj:"ミョ", en:"myo", note:"み + small よ", group:"Combinations みゃ行" },
    { jp:"りゃ", kj:"リャ", en:"rya", note:"り + small や", group:"Combinations りゃ行" },
    { jp:"りゅ", kj:"リュ", en:"ryu", note:"り + small ゆ — like 竜 (dragon)!", group:"Combinations りゃ行" },
    { jp:"りょ", kj:"リョ", en:"ryo", note:"り + small よ", group:"Combinations りゃ行" },

    /* ══════════════ COMBINATIONS — BY / PY ══════════════ */
    { jp:"びゃ", kj:"ビャ", en:"bya", note:"び + small や", group:"Combinations びゃ行" },
    { jp:"びゅ", kj:"ビュ", en:"byu", note:"び + small ゆ", group:"Combinations びゃ行" },
    { jp:"びょ", kj:"ビョ", en:"byo", note:"び + small よ", group:"Combinations びゃ行" },
    { jp:"ぴゃ", kj:"ピャ", en:"pya", note:"ぴ + small や", group:"Combinations ぴゃ行" },
    { jp:"ぴゅ", kj:"ピュ", en:"pyu", note:"ぴ + small ゆ", group:"Combinations ぴゃ行" },
    { jp:"ぴょ", kj:"ピョ", en:"pyo", note:"ぴ + small よ", group:"Combinations ぴゃ行" },

    /* ══════════════ SPECIAL (katakana only) ══════════════ */
    { jp:"ー",   kj:"ー",   en:"long vowel", note:"Katakana only. Extends the previous vowel. e.g. コーヒー (kō-hī) = coffee.", group:"Special" },
    { jp:"っ",   kj:"ッ",   en:"double consonant", note:"Small tsu — doubles the following consonant. e.g. きって (kitte) = stamp. Creates a brief stop.", group:"Special" },
  ],

  kanji: [],  // no kanji in this lesson

  sentences: [
    {
      pattern: "Reading practice — hiragana",
      jp: "あいうえお。かきくけこ。さしすせそ。",
      en: "a-i-u-e-o. ka-ki-ku-ke-ko. sa-shi-su-se-so.",
      breakdown: [
        { word:"あいうえお", meaning:"the five vowels" },
        { word:"かきくけこ", meaning:"k-row" },
        { word:"さしすせそ", meaning:"s-row" }
      ]
    },
    {
      pattern: "Reading practice — katakana loanwords",
      jp: "コーヒー・カメラ・コンピューター・テレビ",
      en: "coffee · camera · computer · television",
      breakdown: [
        { word:"コーヒー", meaning:"coffee (ー = long vowel)" },
        { word:"カメラ", meaning:"camera" },
        { word:"コンピューター", meaning:"computer" },
        { word:"テレビ", meaning:"television" }
      ]
    },
    {
      pattern: "Your name in katakana",
      jp: "ナズルル・イスラム",
      en: "Nazrul Islam",
      breakdown: [
        { word:"ナ", meaning:"na" },
        { word:"ズ", meaning:"zu" },
        { word:"ル", meaning:"ru" },
        { word:"ル", meaning:"ru" },
        { word:"イスラム", meaning:"Islam (i-su-ra-mu)" }
      ]
    },
    {
      pattern: "Reading practice — common words",
      jp: "にほん・にほんご・だいがく・けんきゅうしゃ",
      en: "Japan · Japanese language · university · researcher",
      breakdown: [
        { word:"にほん", meaning:"Japan (learned in L1!)" },
        { word:"にほんご", meaning:"Japanese language" },
        { word:"だいがく", meaning:"university" },
        { word:"けんきゅうしゃ", meaning:"researcher — that's you!" }
      ]
    },
  ],

  selfIntroTemplate: null
});
