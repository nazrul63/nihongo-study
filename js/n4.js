/* ═══════════════════════════════════════════════════════════════════════
   js/n4.js — N4 道場 exam-prep section, merged into the Minna no Nihongo site.

   This is the standalone N4 app's engine (SRS + 15-week daily allocator +
   Today/Learn/Review/Quiz/Schedule/Progress/Content views) ported to run as a
   *section* of this website — exactly like the Repository. Instead of owning
   the whole page it renders into #mode-area and swaps #mode-tabs-wrap for its
   own tab bar. Everything is wrapped in an IIFE so none of its internals leak
   into app.js's globals; only window.N4 is exposed.

   Persistence: localStorage keys  n4_srs · n4_log · n4_planChecks · n4_extra,
   mirrored to Firestore by FireSync (see auth.js) under users/{uid}/n4/*.
   One Google login → both the lesson track and this exam track sync across
   all your devices.

   Content comes from window.N4_CONTENT (kanji + grammar) and window.N4_VOCAB,
   loaded by js/n4-content.js and js/n4-vocab.js before this file.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Storage wrapper — localStorage + Firebase sync (mirrors site Store) ── */
  const NStore = {
    ok: true,
    mem: {},
    _key(k) { return 'n4_' + k; },
    get(k) {
      try {
        const v = localStorage.getItem(this._key(k));
        return v ? JSON.parse(v) : null;
      } catch (e) { this.ok = false; return (k in this.mem) ? this.mem[k] : null; }
    },
    set(k, v) {
      try { localStorage.setItem(this._key(k), JSON.stringify(v)); }
      catch (e) { this.ok = false; this.mem[k] = v; }
      // Mirror to Firestore through the site's existing sync layer.
      if (typeof FireSync !== 'undefined') FireSync.push(this._key(k), v);
    }
  };

  /* ── Content fallback (real content always arrives via N4_CONTENT/N4_VOCAB) ── */
  const SEED = { kanji: [], vocab: [], grammar: [] };

  /* ── Example-sentence starter pack (keyed by vocab word) ──────────────────
     The vocab data has no example sentences, so these are a hand-checked set of
     simple, correct beginner sentences for the most common early words. Any
     word not listed here simply shows no sentence yet. Merge more at runtime via
     window.N4_VOCAB_EX = { "word": {ex, exr, exm} } loaded before this file. */
  const VOCAB_EX = {
    // Earliest words (plan days 0–2) so the feature shows from day one
    'いい': { ex: 'いい天気ですね。',              exr: 'いい てんきですね。',                    exm: "It's nice weather, isn't it?" },
    'いつ': { ex: 'テストはいつですか。',          exr: 'テストは いつですか。',                  exm: 'When is the test?' },
    'いす': { ex: 'いすに座ってください。',        exr: 'いすに すわってください。',              exm: 'Please sit on the chair.' },
    'ここ': { ex: 'トイレはここです。',            exr: 'トイレは ここです。',                    exm: 'The toilet is here.' },
    'する': { ex: 'テニスをします。',              exr: 'テニスを します。',                      exm: 'I play tennis.' },
    'どう': { ex: 'お茶はどうですか。',            exr: 'おちゃは どうですか。',                  exm: 'How about some tea?' },
    'どこ': { ex: '駅はどこですか。',              exr: 'えきは どこですか。',                    exm: 'Where is the station?' },
    'どれ': { ex: 'わたしの本はどれですか。',      exr: 'わたしの ほんは どれですか。',          exm: 'Which one is my book?' },
    'ドア': { ex: 'ドアを開けてください。',        exr: 'ドアを あけてください。',                exm: 'Please open the door.' },
    'なぜ': { ex: 'なぜ日本語を勉強しますか。',    exr: 'なぜ にほんごを べんきょうしますか。',  exm: 'Why do you study Japanese?' },
    'はい': { ex: 'はい、そうです。',              exr: 'はい、そうです。',                        exm: "Yes, that's right." },
    'ペン': { ex: 'ペンで名前を書きます。',        exr: 'ペンで なまえを かきます。',            exm: 'I write my name with a pen.' },
    'ふろ': { ex: 'ふろに入ります。',              exr: 'ふろに はいります。',                    exm: 'I take a bath.' },
    'まだ': { ex: '時間はまだあります。',          exr: 'じかんは まだ あります。',              exm: 'There is still time.' },
    'もう': { ex: 'もう昼ごはんを食べました。',    exr: 'もう ひるごはんを たべました。',        exm: 'I already ate lunch.' },
    // Common early-kanji words (weeks 1–6)
    '本':   { ex: 'わたしは本を読みます。',        exr: 'わたしは ほんを よみます。',            exm: 'I read a book.' },
    '水':   { ex: '水を飲みます。',                exr: 'みずを のみます。',                      exm: 'I drink water.' },
    '学生': { ex: 'わたしは学生です。',            exr: 'わたしは がくせいです。',                exm: 'I am a student.' },
    '先生': { ex: '田中さんは先生です。',          exr: 'たなかさんは せんせいです。',            exm: 'Mr. Tanaka is a teacher.' },
    '車':   { ex: '車で行きます。',                exr: 'くるまで いきます。',                    exm: 'I go by car.' },
    '食べる': { ex: '朝ごはんを食べます。',        exr: 'あさごはんを たべます。',                exm: 'I eat breakfast.' },
    '飲む': { ex: 'コーヒーを飲みます。',          exr: 'コーヒーを のみます。',                  exm: 'I drink coffee.' },
    '行く': { ex: '学校へ行きます。',              exr: 'がっこうへ いきます。',                  exm: 'I go to school.' },
    '買う': { ex: 'パンを買います。',              exr: 'パンを かいます。',                      exm: 'I buy bread.' },
    '書く': { ex: '名前を書きます。',              exr: 'なまえを かきます。',                    exm: 'I write my name.' },
    '読む': { ex: '新聞を読みます。',              exr: 'しんぶんを よみます。',                  exm: 'I read a newspaper.' },
    '大きい': { ex: '大きい犬です。',              exr: 'おおきい いぬです。',                    exm: 'It is a big dog.' },
    '小さい': { ex: '小さい猫です。',              exr: 'ちいさい ねこです。',                    exm: 'It is a small cat.' },
    '高い': { ex: 'この時計は高いです。',          exr: 'この とけいは たかいです。',            exm: 'This watch is expensive.' },
    '安い': { ex: 'この本は安いです。',            exr: 'この ほんは やすいです。',              exm: 'This book is cheap.' },
    '友達': { ex: '友達と話します。',              exr: 'ともだちと はなします。',                exm: 'I talk with a friend.' },
    '時間': { ex: '時間がありません。',            exr: 'じかんが ありません。',                  exm: 'I have no time.' },
    '毎日': { ex: '毎日日本語を勉強します。',      exr: 'まいにち にほんごを べんきょうします。', exm: 'I study Japanese every day.' },
    '電車': { ex: '電車で会社へ行きます。',        exr: 'でんしゃで かいしゃへ いきます。',        exm: 'I go to work by train.' },
    '会社': { ex: '会社で働きます。',              exr: 'かいしゃで はたらきます。',              exm: 'I work at a company.' },
    '学校': { ex: '学校で勉強します。',            exr: 'がっこうで べんきょうします。',          exm: 'I study at school.' },
    '家':   { ex: '家に帰ります。',                exr: 'いえに かえります。',                    exm: 'I go home.' },
    '犬':   { ex: '犬が好きです。',                exr: 'いぬが すきです。',                      exm: 'I like dogs.' },
    '猫':   { ex: '猫はかわいいです。',            exr: 'ねこは かわいいです。',                  exm: 'Cats are cute.' },
    '名前': { ex: 'お名前は何ですか。',            exr: 'おなまえは なんですか。',                exm: 'What is your name?' },
    '今日': { ex: '今日は金曜日です。',            exr: 'きょうは きんようびです。',              exm: 'Today is Friday.' },
    '明日': { ex: '明日、京都へ行きます。',        exr: 'あした、きょうとへ いきます。',          exm: "Tomorrow I'll go to Kyoto." },
    '雨':   { ex: '今日は雨です。',                exr: 'きょうは あめです。',                    exm: 'It is rainy today.' },
    '朝':   { ex: '朝、コーヒーを飲みます。',      exr: 'あさ、コーヒーを のみます。',            exm: 'I drink coffee in the morning.' },
    '駅':   { ex: '駅はどこですか。',              exr: 'えきは どこですか。',                    exm: 'Where is the station?' },
    '飲み物': { ex: '飲み物を買います。',          exr: 'のみものを かいます。',                  exm: 'I buy a drink.' },
    '食べ物': { ex: '日本の食べ物が好きです。',    exr: 'にほんの たべものが すきです。',        exm: 'I like Japanese food.' },
    'お金': { ex: 'お金がありません。',            exr: 'おかねが ありません。',                  exm: 'I have no money.' },
    // Common adjectives / na-adjectives
    '新しい': { ex: '新しい車を買いました。', exr: 'あたらしい くるまを かいました。', exm: 'I bought a new car.' },
    '古い':  { ex: 'この本は古いです。', exr: 'この ほんは ふるいです。', exm: 'This book is old.' },
    '多い':  { ex: '東京は人が多いです。', exr: 'とうきょうは ひとが おおいです。', exm: 'Tokyo has a lot of people.' },
    '早い':  { ex: '朝早く起きます。', exr: 'あさ はやく おきます。', exm: 'I get up early in the morning.' },
    '近い':  { ex: '駅は家から近いです。', exr: 'えきは いえから ちかいです。', exm: 'The station is close to my house.' },
    '暑い':  { ex: '今日はとても暑いです。', exr: 'きょうは とても あついです。', exm: "It's very hot today." },
    '寒い':  { ex: '冬は寒いです。', exr: 'ふゆは さむいです。', exm: 'Winter is cold.' },
    '忙しい': { ex: '今週は忙しいです。', exr: 'こんしゅうは いそがしいです。', exm: "I'm busy this week." },
    '楽しい': { ex: 'パーティーは楽しかったです。', exr: 'パーティーは たのしかったです。', exm: 'The party was fun.' },
    '難しい': { ex: 'この問題は難しいです。', exr: 'この もんだいは むずかしいです。', exm: 'This problem is difficult.' },
    '好き':  { ex: '音楽が好きです。', exr: 'おんがくが すきです。', exm: 'I like music.' },
    '嫌い':  { ex: '宿題が嫌いです。', exr: 'しゅくだいが きらいです。', exm: 'I dislike homework.' },
    '上手':  { ex: '田中さんは日本語が上手です。', exr: 'たなかさんは にほんごが じょうずです。', exm: 'Tanaka is good at Japanese.' },
    '下手':  { ex: 'わたしは料理が下手です。', exr: 'わたしは りょうりが へたです。', exm: "I'm bad at cooking." },
    '便利':  { ex: 'この店は便利です。', exr: 'この みせは べんりです。', exm: 'This shop is convenient.' },
    '有名':  { ex: 'この町は有名です。', exr: 'この まちは ゆうめいです。', exm: 'This town is famous.' },
    '静か':  { ex: '図書館は静かです。', exr: 'としょかんは しずかです。', exm: 'The library is quiet.' },
    'きれい': { ex: 'この部屋はきれいです。', exr: 'この へやは きれいです。', exm: 'This room is clean.' },
    '元気':  { ex: '子どもは元気です。', exr: 'こどもは げんきです。', exm: 'The children are lively.' },
    // Common nouns
    '電話':  { ex: '友達に電話をかけます。', exr: 'ともだちに でんわを かけます。', exm: 'I call a friend.' },
    '部屋':  { ex: '部屋に入ります。', exr: 'へやに はいります。', exm: 'I enter the room.' },
    '病院':  { ex: '病院へ行きます。', exr: 'びょういんへ いきます。', exm: 'I go to the hospital.' },
    '銀行':  { ex: '銀行はどこですか。', exr: 'ぎんこうは どこですか。', exm: 'Where is the bank?' },
    '図書館': { ex: '図書館で勉強します。', exr: 'としょかんで べんきょうします。', exm: 'I study at the library.' },
    '映画':  { ex: '映画を見ます。', exr: 'えいがを みます。', exm: 'I watch a movie.' },
    '音楽':  { ex: '音楽を聞きます。', exr: 'おんがくを ききます。', exm: 'I listen to music.' },
    '天気':  { ex: '今日はいい天気です。', exr: 'きょうは いい てんきです。', exm: 'The weather is nice today.' },
    '果物':  { ex: '果物が好きです。', exr: 'くだものが すきです。', exm: 'I like fruit.' },
    '野菜':  { ex: '野菜を食べます。', exr: 'やさいを たべます。', exm: 'I eat vegetables.' },
    '肉':    { ex: '肉が好きです。', exr: 'にくが すきです。', exm: 'I like meat.' },
    '魚':    { ex: '魚を食べます。', exr: 'さかなを たべます。', exm: 'I eat fish.' },
    '手紙':  { ex: '母に手紙を書きます。', exr: 'ははに てがみを かきます。', exm: 'I write a letter to my mother.' },
    '切符':  { ex: '切符を買います。', exr: 'きっぷを かいます。', exm: 'I buy a ticket.' },
    '傘':    { ex: '傘がありません。', exr: 'かさが ありません。', exm: "I don't have an umbrella." },
    '時計':  { ex: 'この時計は高いです。', exr: 'この とけいは たかいです。', exm: 'This watch is expensive.' },
    '仕事':  { ex: '仕事が忙しいです。', exr: 'しごとが いそがしいです。', exm: 'Work is busy.' },
    '写真':  { ex: '写真を撮ります。', exr: 'しゃしんを とります。', exm: 'I take a photo.' },
    '料理':  { ex: '母は料理が上手です。', exr: 'ははは りょうりが じょうずです。', exm: 'My mother is good at cooking.' },
    '買い物': { ex: 'スーパーで買い物します。', exr: 'スーパーで かいものします。', exm: 'I shop at the supermarket.' },
    '散歩':  { ex: '公園を散歩します。', exr: 'こうえんを さんぽします。', exm: 'I take a walk in the park.' },
    '勉強':  { ex: '毎日日本語を勉強します。', exr: 'まいにち にほんごを べんきょうします。', exm: 'I study Japanese every day.' },
    // Common verbs
    '起きる': { ex: '毎朝六時に起きます。', exr: 'まいあさ ろくじに おきます。', exm: 'I get up at six every morning.' },
    '寝る':  { ex: '十一時に寝ます。', exr: 'じゅういちじに ねます。', exm: 'I go to bed at eleven.' },
    '働く':  { ex: '会社で働きます。', exr: 'かいしゃで はたらきます。', exm: 'I work at a company.' },
    '休む':  { ex: '日曜日は休みます。', exr: 'にちようびは やすみます。', exm: 'I rest on Sundays.' },
    '会う':  { ex: '友達に会います。', exr: 'ともだちに あいます。', exm: 'I meet a friend.' },
    '待つ':  { ex: 'バスを待ちます。', exr: 'バスを まちます。', exm: 'I wait for the bus.' },
    '歩く':  { ex: '学校まで歩きます。', exr: 'がっこうまで あるきます。', exm: 'I walk to school.' },
    '走る':  { ex: '毎朝走ります。', exr: 'まいあさ はしります。', exm: 'I run every morning.' },
    '乗る':  { ex: '電車に乗ります。', exr: 'でんしゃに のります。', exm: 'I get on the train.' },
    '降りる': { ex: '次の駅で降ります。', exr: 'つぎの えきで おります。', exm: 'I get off at the next station.' },
    '作る':  { ex: '夕ごはんを作ります。', exr: 'ゆうごはんを つくります。', exm: 'I make dinner.' },
    '使う':  { ex: 'はしを使います。', exr: 'はしを つかいます。', exm: 'I use chopsticks.' },
    '住む':  { ex: '東京に住んでいます。', exr: 'とうきょうに すんでいます。', exm: 'I live in Tokyo.' },
    '開ける': { ex: '窓を開けます。', exr: 'まどを あけます。', exm: 'I open the window.' },
    '閉める': { ex: 'ドアを閉めます。', exr: 'ドアを しめます。', exm: 'I close the door.' }
  };

  /* ── Kanji example sentences (curated, keyed by character) ─────────────────
     The kanji cards already show an example word; these add a full sentence for
     the most common kanji so you see the character used in context. Extend with
     window.N4_KANJI_SENT = { "字": {ja, r, m} } loaded before this file. */
  const KANJI_SENT_BASE = {
    '日': { ja: '今日はいい日ですね。', r: 'きょうは いい ひですね。', m: "It's a nice day today, isn't it?" },
    '一': { ja: 'パンを一つ食べます。', r: 'パンを ひとつ たべます。', m: 'I eat one piece of bread.' },
    '二': { ja: '二時に会いましょう。', r: 'にじに あいましょう。', m: "Let's meet at two o'clock." },
    '三': { ja: '三人で行きます。', r: 'さんにんで いきます。', m: 'The three of us will go.' },
    '四': { ja: '四月に日本へ来ました。', r: 'しがつに にほんへ きました。', m: 'I came to Japan in April.' },
    '五': { ja: '五時に帰ります。', r: 'ごじに かえります。', m: 'I go home at five.' },
    '六': { ja: '毎朝六時に起きます。', r: 'まいあさ ろくじに おきます。', m: 'I get up at six every morning.' },
    '七': { ja: '七時に家を出ます。', r: 'しちじに いえを でます。', m: 'I leave home at seven.' },
    '八': { ja: '八月はとても暑いです。', r: 'はちがつは とても あついです。', m: 'August is very hot.' },
    '九': { ja: '九時に店が開きます。', r: 'くじに みせが あきます。', m: 'The shop opens at nine.' },
    '十': { ja: '十時に寝ます。', r: 'じゅうじに ねます。', m: 'I go to bed at ten.' },
    '人': { ja: 'あの人は先生です。', r: 'あの ひとは せんせいです。', m: 'That person is a teacher.' },
    '大': { ja: '大きい犬がいます。', r: 'おおきい いぬが います。', m: 'There is a big dog.' },
    '小': { ja: '小さい部屋です。', r: 'ちいさい へやです。', m: "It's a small room." },
    '中': { ja: 'かばんの中に本があります。', r: 'かばんの なかに ほんが あります。', m: 'There is a book in the bag.' },
    '上': { ja: '机の上にペンがあります。', r: 'つくえの うえに ペンが あります。', m: 'There is a pen on the desk.' },
    '下': { ja: 'いすの下に猫がいます。', r: 'いすの したに ねこが います。', m: 'There is a cat under the chair.' },
    '本': { ja: '毎日本を読みます。', r: 'まいにち ほんを よみます。', m: 'I read a book every day.' },
    '月': { ja: '月がきれいです。', r: 'つきが きれいです。', m: 'The moon is beautiful.' },
    '山': { ja: 'あの山は高いです。', r: 'あの やまは たかいです。', m: 'That mountain is tall.' },
    '川': { ja: '川で泳ぎます。', r: 'かわで およぎます。', m: 'I swim in the river.' },
    '水': { ja: '水を飲みます。', r: 'みずを のみます。', m: 'I drink water.' },
    '金': { ja: 'お金がありません。', r: 'おかねが ありません。', m: 'I have no money.' },
    '学': { ja: '大学で勉強します。', r: 'だいがくで べんきょうします。', m: 'I study at university.' },
    '校': { ja: '学校へ行きます。', r: 'がっこうへ いきます。', m: 'I go to school.' },
    '生': { ja: 'わたしは学生です。', r: 'わたしは がくせいです。', m: 'I am a student.' },
    '先': { ja: '先生に聞きます。', r: 'せんせいに ききます。', m: 'I ask the teacher.' },
    '名': { ja: 'お名前は何ですか。', r: 'おなまえは なんですか。', m: 'What is your name?' },
    '気': { ja: 'お元気ですか。', r: 'おげんきですか。', m: 'How are you?' },
    '目': { ja: '目が大きいです。', r: 'めが おおきいです。', m: 'The eyes are big.' },
    '手': { ja: '手を洗います。', r: 'てを あらいます。', m: 'I wash my hands.' },
    '口': { ja: '口を開けてください。', r: 'くちを あけてください。', m: 'Please open your mouth.' },
    '子': { ja: '子どもが二人います。', r: 'こどもが ふたり います。', m: 'There are two children.' },
    '女': { ja: '女の子がいます。', r: 'おんなのこが います。', m: 'There is a girl.' },
    '男': { ja: '男の人がいます。', r: 'おとこのひとが います。', m: 'There is a man.' },
    '年': { ja: '来年日本へ行きます。', r: 'らいねん にほんへ いきます。', m: 'Next year I will go to Japan.' },
    '出': { ja: '七時に家を出ます。', r: 'しちじに いえを でます。', m: 'I leave home at seven.' },
    '入': { ja: '部屋に入ります。', r: 'へやに はいります。', m: 'I enter the room.' },
    '立': { ja: '立ってください。', r: 'たってください。', m: 'Please stand up.' },
    '見': { ja: '映画を見ます。', r: 'えいがを みます。', m: 'I watch a movie.' },
    '円': { ja: 'これは百円です。', r: 'これは ひゃくえんです。', m: 'This is 100 yen.' },
    '百': { ja: '学生が百人います。', r: 'がくせいが ひゃくにん います。', m: 'There are 100 students.' },
    '町': { ja: 'この町は静かです。', r: 'この まちは しずかです。', m: 'This town is quiet.' },
    '力': { ja: '力が強いです。', r: 'ちからが つよいです。', m: 'He is strong.' }
  };
  const KANJI_SENT = Object.assign({}, KANJI_SENT_BASE, (typeof window !== 'undefined' && window.N4_KANJI_SENT) || {});

  /* ── 15-week plan (to December 6, 2026) ── */
  const EXAM = new Date('2026-12-06T09:00:00');
  const PLAN = [
    ['Aug 25–31', 'Set up SRS · consolidate N5 kanji · grammar Unit 1'],
    ['Sep 1–7', 'Finish N5 kanji · start N4 kanji · grammar Unit 2'],
    ['Sep 8–14', 'N4 kanji · vocab breadth · grammar Unit 3'],
    ['Sep 15–21', 'N4 kanji · grammar Unit 4 · Week 1–3 kanji checkpoint'],
    ['Sep 22–28', 'Kanji · grammar Unit 5 · start light reading'],
    ['Sep 29–Oct 5', 'Kanji · grammar Unit 6 · listening 15 min/day'],
    ['Oct 6–12', 'Kanji · grammar Unit 7 · graded readers begin'],
    ['Oct 13–19', 'Kanji · grammar Unit 8 · reading every other day'],
    ['Oct 20–26', 'Finish N4 kanji (~300) · grammar Unit 9 · timed Vocab section'],
    ['Oct 27–Nov 2', 'Finish grammar points · daily reading · listening 20–25 min'],
    ['Nov 3–9', 'Grammar review pass · timed Grammar+Reading section'],
    ['Nov 10–16', 'Kanji weak-list · timed Listening section · reading speed'],
    ['Nov 17–23', 'First full timed mock · score it · target weakest section'],
    ['Nov 24–30', 'Second full mock · re-drill only mock errors · keep shadowing'],
    ['Dec 1–6', 'Light review · half-mock by Wed · rest · EXAM Sun Dec 6']
  ];
  const PLAN_START = new Date('2026-08-25T00:00:00');

  /* ── Utilities ── */
  const $ = s => document.querySelector(s);
  const todayStr = () => new Date().toISOString().slice(0, 10);
  function addDays(dateStr, n) { const d = new Date(dateStr + 'T00:00:00'); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); }
  function daysBetween(a, b) { return Math.round((new Date(b) - new Date(a)) / 86400000); }
  function uid(type, idx) { return type[0] + '_' + idx; }
  function toast(msg) { const t = $('#n4-toast'); if (!t) return; t.textContent = msg; t.classList.add('show'); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 1800); }

  /* ── Audio (Japanese TTS) — self-contained, prefers the Kyoko voice ──
     Kept independent of app.js so nothing here depends on cross-script load order.
     Every path is wrapped so a speaker press can never throw. ── */
  let _voices = [];
  function loadVoices() { try { if ('speechSynthesis' in window) _voices = window.speechSynthesis.getVoices(); } catch (_) {} }
  if ('speechSynthesis' in window) { loadVoices(); try { window.speechSynthesis.addEventListener('voiceschanged', loadVoices); } catch (_) {} }
  function bestVoice() {
    const v = _voices || [];
    return v.find(x => x.name === 'Kyoko')
        || v.find(x => x.name === 'Otoya')
        || v.find(x => x.lang === 'ja-JP' && x.localService)
        || v.find(x => x.lang === 'ja-JP')
        || v.find(x => x.lang && x.lang.startsWith('ja'))
        || null;
  }
  /* Strip okurigana markers so a bare reading speaks cleanly:
     "で(る)"→"でる", "ひと-"→"ひと", "セ・セイ"→"セ セイ". */
  function cleanReading(r) { return (r || '').replace(/[()（）\-]/g, '').replace(/[・･]/g, ' ').trim(); }
  function speak(text, slow) {
    try {
      const clean = (text || '').replace(/^〜/, '').trim();
      if (!clean) return;
      if (!('speechSynthesis' in window)) { toast('This browser has no speech support'); return; }
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(clean);
      u.lang = 'ja-JP';
      u.rate = slow ? 0.6 : 0.85;
      const vo = bestVoice(); if (vo) u.voice = vo;
      window.speechSynthesis.speak(u);
    } catch (_) { /* never let audio break the UI */ }
  }
  /* A small round 🔊 button carrying its phrase in data-speak (wired in render). */
  function spk(text, title) {
    const t = (text || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    if (!t) return '';
    return `<button type="button" class="n4-spk" data-speak="${t}"${title ? ` title="${title}"` : ' title="Play sound"'} aria-label="Play pronunciation">🔊</button>`;
  }
  /* Speaker for a reading (skips empty "—" entries and cleans okurigana). */
  function spkReading(r) { const c = cleanReading(r); return (!c || c === '—') ? '' : spk(c, 'Hear this reading'); }

  /* Leitner intervals by box */
  const INTERVAL = { 1: 1, 2: 2, 3: 4, 4: 7, 5: 14, 6: 30, 7: 60 };
  const MASTER_BOX = 4; // box>=4 (7-day+ interval) counts as "mastered"

  /* ── State (re-hydrated from storage every time the section is opened) ── */
  let content = { kanji: [], vocab: [], grammar: [] };
  let srs = {};        // id -> {box,due,reps,lapses}
  let log = {};        // 'YYYY-MM-DD' -> {reviews,learned,quiz}
  let planChecks = {};
  let view = 'today';

  function hydrate() {
    srs = NStore.get('srs') || {};
    log = NStore.get('log') || {};
    planChecks = NStore.get('planChecks') || {};
  }

  /* Spread whatever content is loaded across the learning window (through ~week
     12); weeks 13–15 stay free for consolidation and full mocks. */
  const NEW_WINDOW = { kanji: 80, vocab: 83, grammar: 82 };
  function dayIndexOf(type, idxInCat, catLen) {
    const end = NEW_WINDOW[type] || 69;
    if (catLen <= 0) return 0;
    return Math.min(end, Math.floor(idxInCat * (end + 1) / catLen));
  }
  function buildContent() {
    const BASE = (window.N4_CONTENT && window.N4_CONTENT.kanji) ? window.N4_CONTENT : SEED;
    if (BASE === SEED) console.warn('[N4] window.N4_CONTENT not found — is js/n4-content.js loaded before js/n4.js?');
    const extra = NStore.get('extra') || { kanji: [], vocab: [], grammar: [] };
    content = { kanji: [], vocab: [], grammar: [] };
    ['kanji', 'vocab', 'grammar'].forEach(type => {
      let baseArr = (BASE[type] || []);
      if (type === 'vocab' && window.N4_VOCAB && window.N4_VOCAB.length) baseArr = window.N4_VOCAB;
      const all = baseArr.concat(extra[type] || []);
      content[type] = all.map((it, i) => Object.assign({ id: uid(type, i), type, idx: i, day: dayIndexOf(type, i, all.length) }, it));
    });
    // Attach example sentences to vocab (curated pack + any runtime-loaded pack),
    // without overriding a sentence the item may already carry.
    const exMap = Object.assign({}, VOCAB_EX, window.N4_VOCAB_EX || {});
    content.vocab.forEach(it => {
      if (!it.ex && exMap[it.word]) { const e = exMap[it.word]; it.ex = e.ex; it.exr = e.exr; it.exm = e.exm; }
    });
  }
  function todayIndex() { return Math.max(0, daysBetween(PLAN_START.toISOString().slice(0, 10), todayStr())); }
  function portionForDay(type, dayIdx) { return itemsOf(type).filter(it => it.day === dayIdx); }
  function catchUpList(type) {
    const t = todayIndex();
    return itemsOf(type).filter(it => !isSeen(it.id) && it.day <= t).sort((a, b) => a.day - b.day || a.idx - b.idx);
  }
  function saveSrs() { NStore.set('srs', srs); }
  function saveLog() { NStore.set('log', log); }
  function bump(field) { const d = todayStr(); log[d] = log[d] || { reviews: 0, learned: 0, quiz: 0 }; log[d][field]++; saveLog(); }

  /* ── SRS helpers ── */
  function allItems() { return content.kanji.concat(content.vocab, content.grammar); }
  function itemsOf(type) { return content[type]; }
  function isSeen(id) { return !!srs[id]; }
  function isDue(id) { const s = srs[id]; return s && s.due <= todayStr(); }
  function isMastered(id) { const s = srs[id]; return s && s.box >= MASTER_BOX; }
  function dueList(typeFilter) {
    return allItems().filter(it => (!typeFilter || it.type === typeFilter) && isDue(it.id))
      .sort((a, b) => (srs[a.id].due < srs[b.id].due ? -1 : 1));
  }
  function newList(type) { return itemsOf(type).filter(it => !isSeen(it.id)); }
  function introduce(id) { srs[id] = { box: 1, due: addDays(todayStr(), INTERVAL[1]), reps: 0, lapses: 0 }; bump('learned'); saveSrs(); }
  function grade(id, g) { // g: 'again' | 'good' | 'easy'
    const s = srs[id]; if (!s) return;
    if (g === 'again') { s.box = 1; s.lapses++; s.due = todayStr(); }
    else {
      const nb = Math.min(7, s.box + (g === 'easy' ? 2 : 1));
      s.box = nb; s.due = addDays(todayStr(), INTERVAL[nb]);
    }
    s.reps++; bump('reviews'); saveSrs();
  }

  /* ── Stats ── */
  function catStats(type) {
    const items = itemsOf(type);
    const seen = items.filter(it => isSeen(it.id)).length;
    const mastered = items.filter(it => isMastered(it.id)).length;
    return { total: items.length, seen, mastered, due: items.filter(it => isDue(it.id)).length };
  }
  function streak() {
    let n = 0, d = todayStr();
    if (!(log[d] && (log[d].reviews || log[d].learned || log[d].quiz))) d = addDays(d, -1);
    while (log[d] && (log[d].reviews || log[d].learned || log[d].quiz)) { n++; d = addDays(d, -1); }
    return n;
  }
  function planWeekIndex() {
    const diff = daysBetween(PLAN_START.toISOString().slice(0, 10), todayStr());
    if (diff < 0) return 0;
    return Math.min(PLAN.length - 1, Math.floor(diff / 7));
  }
  function daysToExam() { return Math.max(0, Math.ceil((EXAM - new Date()) / 86400000)); }

  /* ═══════════════════════════ VIEWS ═══════════════════════════ */
  const VIEWS = { today: viewToday, learn: viewLearn, review: viewReview, quiz: viewQuiz, schedule: viewSchedule, progress: viewProgress, data: viewData };
  const AFTER = { today: afterToday, learn: afterLearn, review: afterReview, quiz: afterQuiz, schedule: afterSchedule, progress: afterProgress, data: afterData };

  function render() {
    const host = document.getElementById('mode-area');
    if (!host) return;
    let body;
    try {
      body = (VIEWS[view] || viewToday)();
    } catch (err) {
      try { console.error('[N4] render error in view "' + view + '":', err); } catch (_) {}
      body = '<div class="panel"><div class="eyebrow">N4</div><h2 class="section">Couldn\'t render this view</h2><p class="muted" style="margin-top:6px">' +
             ((err && err.message) ? String(err.message) : String(err)) + '</p></div>';
    }
    host.innerHTML = '<div class="n4-root">' + body + '<div class="toast" id="n4-toast"></div></div>';
    document.querySelectorAll('#mode-tabs-wrap .mode-tab[data-n4view]').forEach(b =>
      b.classList.toggle('active', b.dataset.n4view === view));
    try { (AFTER[view] || (() => {}))(); }
    catch (err) { try { console.error('[N4] after-render error in "' + view + '":', err); } catch (_) {} }
  }

  /* ---------- TODAY ---------- */
  function viewToday() {
    const k = catStats('kanji'), v = catStats('vocab'), g = catStats('grammar');
    const dueTotal = k.due + v.due + g.due;
    const newTotal = newList('kanji').length + newList('vocab').length + newList('grammar').length;
    const st = streak();
    const wi = planWeekIndex();
    const ring = (label, s) => {
      const pct = s.total ? Math.round(s.mastered / s.total * 100) : 0;
      const seenPct = s.total ? Math.round(s.seen / s.total * 100) : 0;
      return `<div class="ring"><div class="dial" style="background:conic-gradient(var(--n4-shu) 0 ${pct}%, var(--n4-celadon-soft) ${pct}% ${seenPct}%, var(--n4-line) ${seenPct}% 100%)">
        <div class="inner"><div class="pct">${pct}<span style="font-size:11px">%</span></div><div class="of">${s.mastered}/${s.total}</div></div></div>
        <div class="name">${label}</div></div>`;
    };
    return `
    <div class="today-head">
      <div class="countdown">
        <div class="big">${daysToExam()}</div>
        <div class="lbl">days to the exam</div>
        <div class="date">Sun · December 6, 2026</div>
        <div class="wk">Plan week ${wi + 1} of 15 · ${PLAN[wi][0]}</div>
      </div>
      <div class="seal">
        <div class="stamp ${st ? '' : 'dim'}"><div class="n">${st}</div><div class="d">日</div></div>
        <div class="cap">${st ? `${st}-day streak` : 'Study today to start a streak'}</div>
      </div>
    </div>

    <div class="grid cols-2">
      <div class="panel">
        <div class="eyebrow">This week's focus</div>
        <h2 class="section">${PLAN[wi][1]}</h2>
        <div class="stat-row" style="margin-top:14px">
          <div class="stat"><div class="k">Due today</div><div class="v">${dueTotal}</div></div>
          <div class="stat"><div class="k">New available</div><div class="v">${newTotal}</div></div>
          <div class="stat"><div class="k">Reviewed today</div><div class="v">${(log[todayStr()] || {}).reviews || 0}</div></div>
        </div>
        <div class="btnrow" style="margin-top:16px">
          <button class="btn shu" data-go="review" ${dueTotal ? '' : 'disabled'}>Review ${dueTotal} due →</button>
          <button class="btn ghost" data-go="learn">Learn new</button>
          <button class="btn ghost" data-go="quiz">Quiz me</button>
        </div>
      </div>

      <div class="panel">
        <div class="eyebrow">Mastery</div>
        <h2 class="section">How much has stuck</h2>
        <div class="rings" style="margin-top:16px">
          ${ring('Kanji', k)}${ring('Vocab', v)}${ring('Grammar', g)}
        </div>
        <div style="display:flex;gap:14px;justify-content:center;margin-top:14px;flex-wrap:wrap">
          <span class="pill"><span class="dot shu"></span>Mastered</span>
          <span class="pill"><span class="dot cel"></span>Learning</span>
          <span class="pill"><span class="dot ink" style="background:var(--n4-line)"></span>Not started</span>
        </div>
      </div>
    </div>

    ${todayPortionPanel()}

    ${NStore.ok ? '' : '<div class="note" style="margin-top:16px">Heads up: this preview can\'t save progress. Open the site in your own browser (or on GitHub Pages) and sign in so your streak and reviews persist and sync.</div>'}
    `;
  }
  function todayPortionPanel() {
    const ti = todayIndex();
    if (ti >= Math.max(...Object.values(NEW_WINDOW)) + 1) {
      return `<div class="panel" style="margin-top:16px"><div class="eyebrow">Today's portion</div>
        <h2 class="section">Consolidation phase — no new items</h2>
        <p class="muted" style="margin-top:6px">You're past the learning window. Today is for reviews, reading, listening and mock practice. Clear your due reviews and drill weak items.</p></div>`;
    }
    const chip = (it, seen) => `<span class="pill" style="${seen ? 'opacity:.5;text-decoration:line-through' : ''}">${it.level ? `<span class="lvtag ${it.level}">${it.level}</span>` : ''}<span class="jp" style="font-size:15px">${it.char || it.word || it.pattern}</span></span>`;
    const row = (type, label) => {
      const items = portionForDay(type, ti);
      if (!items.length) return `<div class="kv"><span>${label}</span><b class="faint">—</b></div>`;
      const done = items.filter(it => isSeen(it.id)).length;
      return `<div style="padding:8px 0;border-bottom:1px dashed var(--n4-line)">
        <div style="display:flex;justify-content:space-between;margin-bottom:6px"><span class="eyebrow">${label} · ${done}/${items.length}</span></div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">${items.map(it => chip(it, isSeen(it.id))).join('')}</div>
      </div>`;
    };
    const k = portionForDay('kanji', ti), v = portionForDay('vocab', ti), g = portionForDay('grammar', ti);
    const total = k.length + v.length + g.length;
    const doneAll = [...k, ...v, ...g].filter(it => isSeen(it.id)).length;
    return `<div class="panel" style="margin-top:16px">
      <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:8px">
        <div><div class="eyebrow">Today's portion · Day ${ti + 1}</div><h2 class="section">Learn these ${total} items today</h2></div>
        <button class="btn shu sm" data-go="learn">Start today's learning →</button>
      </div>
      <div style="margin-top:10px">${row('kanji', 'Kanji')}${row('vocab', 'Vocab')}${row('grammar', 'Grammar')}</div>
      <p class="muted" style="margin-top:10px;font-size:13px">${doneAll >= total && total > 0 ? 'All of today\'s new items are in your review rotation. ✓' : 'Grey/struck items are already learned. Behind? The Learn tab serves any earlier items you missed first.'}</p>
    </div>`;
  }
  function afterToday() { document.querySelectorAll('.n4-root [data-go]').forEach(b => b.onclick = () => { go(b.dataset.go); }); }

  /* ---------- LEARN ---------- */
  /* History-based deck: learnSeq is the ordered list of cards you've walked
     through this session; learnIdx points at the current one. Back steps back
     through that history (even to cards you already added), Skip/Got-it step
     forward — appending the next unseen card when you reach the end. This is
     why Back works during a normal add-and-advance flow. */
  let learnCat = 'kanji', learnRevealed = false, learnLevel = 'all';
  let learnSeq = [], learnIdx = -1;
  const lvOK = it => learnLevel === 'all' || it.level === learnLevel;
  function resetLearnDeck() { learnSeq = []; learnIdx = -1; learnRevealed = false; }
  function nextLearnCard() {
    const inSeq = new Set(learnSeq.map(x => x.id));
    const cu = catchUpList(learnCat).filter(lvOK).filter(it => !inSeq.has(it.id));
    const pool = cu.length ? cu : newList(learnCat).filter(lvOK).filter(it => !inSeq.has(it.id));
    return pool[0] || null;
  }
  function learnAdvance() {
    if (learnIdx < learnSeq.length - 1) learnIdx++;
    else { const nx = nextLearnCard(); if (nx) { learnSeq.push(nx); learnIdx = learnSeq.length - 1; } }
    learnRevealed = false; renderLearnStage();
  }
  function viewLearn() {
    return `
    <div class="panel">
      <div class="cat-select" id="learnCats">
        ${['kanji', 'vocab', 'grammar'].map(t => `<button class="chip" data-cat="${t}" aria-pressed="${t === learnCat}">${t[0].toUpperCase() + t.slice(1)} · ${catchUpList(t).filter(lvOK).length} due / ${newList(t).filter(lvOK).length} left</button>`).join('')}
      </div>
      <div class="cat-select" id="learnLevels" style="margin-top:-6px">
        ${[['all', 'All'], ['N5', 'N5 only'], ['N4', 'N4 only']].map(([v, l]) => `<button class="chip" data-lv="${v}" aria-pressed="${v === learnLevel}" style="padding:6px 13px">${l}</button>`).join('')}
      </div>
      <div id="learnStage"></div>
    </div>`;
  }
  function renderLearnStage() {
    const stage = $('#learnStage');
    // Ensure there's a current card; pull the first one on entry.
    if (learnIdx < 0 || learnIdx >= learnSeq.length) {
      const nx = nextLearnCard();
      if (nx) { learnSeq.push(nx); learnIdx = learnSeq.length - 1; }
    }
    if (learnIdx < 0 || !learnSeq.length) {
      stage.innerHTML = `<div class="empty"><div class="big">済</div>Every ${learnCat} item is in your review rotation.<br><span class="faint">Add more from the Content tab, then come back.</span></div>`;
      return;
    }
    const it = learnSeq[learnIdx];
    const alreadyLearned = isSeen(it.id);
    const total = itemsOf(learnCat).length;
    const done = total - newList(learnCat).length;
    const ahead = !catchUpList(learnCat).filter(lvOK).length;
    const banner = ahead
      ? `<span class="pill"><span class="dot cel"></span>Caught up — learning ahead</span>`
      : `<span class="pill"><span class="dot shu"></span>${catchUpList(learnCat).filter(lvOK).length} to learn today</span>`;
    const lvb = it.level ? `<span class="lvtag ${it.level}">${it.level}</span>` : '';
    const strip = `<div class="prog-strip"><span class="faint" style="font-size:12px">${done}/${total} learned · card ${learnIdx + 1}</span><div class="bar"><span style="width:${Math.round(done / total * 100)}%"></span></div>${lvb}${banner}</div>`;
    let front = '', back = '';
    if (learnCat === 'kanji') {
      front = `<div class="kanji-big jp">${it.char}</div>`;
      back = `<div class="meaning">${it.meaning}</div>
        <div class="detail" style="margin-top:8px">On: <b class="jp">${it.on}</b> ${spkReading(it.on)} &nbsp;·&nbsp; Kun: <b class="jp">${it.kun}</b> ${spkReading(it.kun)}</div>
        <div class="ex"><div class="exjp">${it.ex} <span style="color:var(--n4-shu)">（${it.exr}）</span> ${spk(it.ex, 'Hear the example word')}</div><div class="extr">${it.exm}</div></div>
        ${kanjiSentenceBlock(it)}
        <div class="faint" style="font-size:12px;margin-top:8px">Tip: learn the reading used in the example word — that's the one you'll actually meet.</div>`;
    } else if (learnCat === 'vocab') {
      front = `<div class="word-big jp">${it.word}</div><div style="margin-top:10px">${spk(it.reading || it.word, 'Hear pronunciation')}</div>`;
      back = `<div class="reading jp">${it.reading} ${spk(it.reading || it.word)}</div><div class="meaning">${it.meaning}</div><div class="detail" style="margin-top:6px">${it.pos}</div>${vocabExampleBlock(it)}`;
    } else {
      front = `<div class="grammar-big jp">${it.pattern}</div>`;
      back = `<div class="meaning">${it.meaning}</div><div class="detail" style="margin-top:6px"><b>Form:</b> ${it.structure}</div>
        <div class="ex"><div class="exjp">${it.ex} ${spk(it.ex, 'Hear the example sentence')}</div><div class="extr">${it.extr}</div></div>`;
    }
    const atStart = learnIdx <= 0;
    const hasNext = (learnIdx < learnSeq.length - 1) || !!nextLearnCard();
    let action;
    if (!learnRevealed) action = `<button class="btn" id="lreveal">Reveal</button>`;
    else if (alreadyLearned) action = `<span class="pill" style="padding:9px 14px"><span class="dot cel"></span>Already in your reviews</span>`;
    else action = `<button class="btn shu" id="ladd">Got it — add to reviews →</button>`;
    stage.innerHTML = `${strip}
      <div class="study-stage">${front}${learnRevealed ? back : '<div class="faint" style="margin-top:20px">Recall what you can, then reveal.</div>'}</div>
      <div class="btnrow" style="justify-content:center">
        <button class="btn ghost sm" id="lback" ${atStart ? 'disabled' : ''} title="Go back to the previous card you saw">← Back</button>
        <button class="btn ghost sm" id="lskip" ${hasNext ? '' : 'disabled'} title="Move to the next card without adding this one to reviews">Skip →</button>
        ${action}
      </div>`;
    if ($('#lreveal')) $('#lreveal').onclick = () => { learnRevealed = true; renderLearnStage(); };
    if ($('#lback')) $('#lback').onclick = () => { learnIdx = Math.max(0, learnIdx - 1); learnRevealed = false; renderLearnStage(); };
    if ($('#lskip')) $('#lskip').onclick = () => { learnAdvance(); };
    if ($('#ladd')) $('#ladd').onclick = () => { introduce(it.id); toast('Added to reviews'); updateLearnChips(); learnAdvance(); };
  }
  /* Example-sentence block for vocab (shown only when a sentence exists). */
  function vocabExampleBlock(it) {
    if (!it.ex) return '';
    return `<div class="ex"><div class="exjp">${it.ex} ${spk(it.ex, 'Hear the example sentence')}</div><div class="extr">${it.exr ? `<span class="jp" style="color:var(--n4-ink-faint)">${it.exr}</span> · ` : ''}${it.exm || ''}</div></div>`;
  }
  /* Example-sentence block for kanji (curated set, keyed by character). */
  function kanjiSentenceBlock(it) {
    const s = KANJI_SENT[it.char];
    if (!s) return '';
    return `<div class="ex" style="border-left:3px solid var(--n4-celadon)"><div class="exjp">${s.ja} ${spk(s.ja, 'Hear the example sentence')}</div><div class="extr"><span class="jp" style="color:var(--n4-ink-faint)">${s.r}</span> · ${s.m}</div></div>`;
  }
  function updateLearnChips() { document.querySelectorAll('#learnCats .chip').forEach(c => { const t = c.dataset.cat; c.textContent = `${t[0].toUpperCase() + t.slice(1)} · ${catchUpList(t).filter(lvOK).length} due / ${newList(t).filter(lvOK).length} left`; }); }
  function afterLearn() {
    document.querySelectorAll('#learnCats .chip').forEach(c => c.onclick = () => { learnCat = c.dataset.cat; resetLearnDeck(); document.querySelectorAll('#learnCats .chip').forEach(x => x.setAttribute('aria-pressed', x.dataset.cat === learnCat)); renderLearnStage(); });
    document.querySelectorAll('#learnLevels .chip').forEach(c => c.onclick = () => { learnLevel = c.dataset.lv; resetLearnDeck(); document.querySelectorAll('#learnLevels .chip').forEach(x => x.setAttribute('aria-pressed', x.dataset.lv === learnLevel)); updateLearnChips(); renderLearnStage(); });
    renderLearnStage();
  }

  /* ---------- REVIEW ---------- */
  let reviewQueue = [], reviewRevealed = false;
  function viewReview() { return `<div class="panel"><div id="reviewStage"></div></div>`; }
  function renderReviewStage() {
    const stage = $('#reviewStage');
    if (!reviewQueue.length) reviewQueue = dueList();
    if (!reviewQueue.length) {
      stage.innerHTML = `<div class="empty"><div class="big">〆</div>No reviews due. Well done.<br><span class="faint">Learn new items or come back tomorrow.</span></div>
        <div class="btnrow" style="justify-content:center"><button class="btn ghost" data-go="learn">Learn new</button></div>`;
      stage.querySelector('[data-go]').onclick = () => { go('learn'); };
      return;
    }
    const it = reviewQueue[0];
    const remaining = reviewQueue.length;
    let front = '', back = '';
    if (it.type === 'kanji') {
      front = `<div class="kanji-big jp">${it.char}</div>`;
      back = `<div class="meaning">${it.meaning}</div><div class="detail" style="margin-top:8px">On: <b class="jp">${it.on}</b> ${spkReading(it.on)} · Kun: <b class="jp">${it.kun}</b> ${spkReading(it.kun)}</div><div class="ex"><div class="exjp">${it.ex}（${it.exr}） ${spk(it.ex, 'Hear the example word')}</div><div class="extr">${it.exm}</div></div>`;
    } else if (it.type === 'vocab') {
      front = `<div class="word-big jp">${it.word}</div>`;
      back = `<div class="reading jp">${it.reading} ${spk(it.reading || it.word)}</div><div class="meaning">${it.meaning}</div>${vocabExampleBlock(it)}`;
    } else {
      front = `<div class="grammar-big jp">${it.pattern}</div>`;
      back = `<div class="meaning">${it.meaning}</div><div class="detail" style="margin-top:6px"><b>Form:</b> ${it.structure}</div><div class="ex"><div class="exjp">${it.ex} ${spk(it.ex, 'Hear the example sentence')}</div><div class="extr">${it.extr}</div></div>`;
    }
    stage.innerHTML = `
      <div class="prog-strip"><span class="faint" style="font-size:12px">${remaining} to review</span><div class="bar"><span style="width:${Math.round((1 - remaining / (remaining + (log[todayStr()] || {}).reviews || remaining)) * 100)}%"></span></div>${it.level ? `<span class="lvtag ${it.level}">${it.level}</span>` : ''}<span class="pill">${it.type}</span></div>
      <div class="study-stage">${front}${reviewRevealed ? back : '<div class="faint" style="margin-top:20px">Recall the reading &amp; meaning…</div>'}</div>
      <div class="btnrow" style="justify-content:center">
        ${reviewRevealed
        ? `<button class="btn" style="background:var(--n4-shu);border-color:var(--n4-shu)" id="gAgain">Again</button>
             <button class="btn" id="gGood">Good</button>
             <button class="btn ghost" id="gEasy">Easy</button>`
        : `<button class="btn" id="rReveal">Show answer</button>`}
      </div>`;
    if ($('#rReveal')) $('#rReveal').onclick = () => { reviewRevealed = true; renderReviewStage(); };
    const next = (g) => { grade(it.id, g); reviewQueue.shift(); reviewRevealed = false; renderReviewStage(); };
    if ($('#gAgain')) $('#gAgain').onclick = () => {
      grade(it.id, 'again'); const first = reviewQueue.shift(); reviewQueue.splice(Math.min(3, reviewQueue.length), 0, first); reviewRevealed = false; renderReviewStage();
    };
    if ($('#gGood')) $('#gGood').onclick = () => next('good');
    if ($('#gEasy')) $('#gEasy').onclick = () => next('easy');
  }
  function afterReview() { reviewQueue = []; reviewRevealed = false; renderReviewStage(); }

  /* ---------- QUIZ ---------- */
  let quiz = null;
  function makeQuiz(n = 10) {
    const pool = allItems().filter(it => isSeen(it.id));
    const source = pool.length >= 4 ? pool : allItems();
    const qs = [];
    const shuffled = [...source].sort(() => Math.random() - .5).slice(0, n);
    shuffled.forEach(it => {
      const sameType = source.filter(x => x.type === it.type && x.id !== it.id);
      let prompt, answer, getLabel;
      if (it.type === 'kanji') {
        const mode = Math.random() < .5 ? 'm' : 'r';
        prompt = it.char;
        if (mode === 'm') { answer = it.meaning; getLabel = x => x.meaning; }
        else { answer = it.exr; getLabel = x => x.exr; }
        var sub = mode === 'm' ? 'Choose the meaning' : 'Choose the reading of the example word ' + it.ex;
      } else if (it.type === 'vocab') {
        const mode = Math.random() < .5 ? 'm' : 'r';
        prompt = it.word;
        if (mode === 'm') { answer = it.meaning; getLabel = x => x.meaning; }
        else { answer = it.reading; getLabel = x => x.reading; }
        var sub = mode === 'm' ? 'Choose the meaning' : 'Choose the reading';
      } else {
        prompt = it.pattern; answer = it.meaning; getLabel = x => x.meaning; var sub = 'Choose the meaning of this grammar';
      }
      const distract = sameType.sort(() => Math.random() - .5).slice(0, 3).map(getLabel);
      const opts = [answer, ...distract].filter((v, i, a) => a.indexOf(v) === i).sort(() => Math.random() - .5);
      qs.push({ prompt, sub, answer, opts, type: it.type, jp: it.type !== 'grammar' });
    });
    return { qs, i: 0, score: 0, answered: false };
  }
  function viewQuiz() { return `<div class="panel"><div id="quizStage"></div></div>`; }
  function renderQuizStage() {
    const stage = $('#quizStage');
    if (!quiz) {
      const learned = allItems().filter(it => isSeen(it.id)).length;
      stage.innerHTML = `<div class="empty"><div class="big">試</div>Quick multiple-choice check.<br>
        <span class="faint">${learned ? `Drawing from your ${learned} learned items (plus a few new ones).` : 'Start with a mixed set — then learn items to sharpen it.'}</span></div>
        <div class="btnrow" style="justify-content:center"><button class="btn shu" id="qstart">Start 10-question quiz</button></div>`;
      $('#qstart').onclick = () => { quiz = makeQuiz(10); renderQuizStage(); };
      return;
    }
    if (quiz.i >= quiz.qs.length) {
      const pct = Math.round(quiz.score / quiz.qs.length * 100);
      bump('quiz');
      stage.innerHTML = `<div class="empty"><div class="big">${pct}%</div>${quiz.score} / ${quiz.qs.length} correct
        <div class="faint" style="margin-top:6px">${pct >= 80 ? 'Sharp. That would pass comfortably.' : pct >= 60 ? 'Solid — review the ones you missed.' : 'Keep drilling these in Review.'}</div></div>
        <div class="btnrow" style="justify-content:center"><button class="btn shu" id="qagain">Another quiz</button><button class="btn ghost" data-go="review">Go to review</button></div>`;
      $('#qagain').onclick = () => { quiz = makeQuiz(10); renderQuizStage(); };
      stage.querySelector('[data-go]').onclick = () => { go('review'); };
      quiz = null;
      return;
    }
    const q = quiz.qs[quiz.i];
    stage.innerHTML = `
      <div class="prog-strip"><span class="faint" style="font-size:12px">Question ${quiz.i + 1}/${quiz.qs.length}</span><div class="bar"><span style="width:${Math.round(quiz.i / quiz.qs.length * 100)}%"></span></div><span class="pill">Score ${quiz.score}</span></div>
      <div class="q-prompt ${q.jp ? 'jp' : ''}">${q.prompt}</div>
      <div class="q-sub">${q.sub}</div>
      <div class="opts" id="opts">${q.opts.map(o => `<button class="opt" data-opt="${encodeURIComponent(o)}">${o}</button>`).join('')}</div>`;
    document.querySelectorAll('#opts .opt').forEach(btn => btn.onclick = () => {
      if (quiz.answered) return; quiz.answered = true;
      const chosen = decodeURIComponent(btn.dataset.opt);
      document.querySelectorAll('#opts .opt').forEach(b => {
        const val = decodeURIComponent(b.dataset.opt);
        b.disabled = true;
        if (val === q.answer) b.classList.add('correct');
        else if (val === chosen) b.classList.add('wrong');
      });
      if (chosen === q.answer) quiz.score++;
      setTimeout(() => { if (!quiz || view !== 'quiz') return; quiz.i++; quiz.answered = false; renderQuizStage(); }, 900);
    });
  }
  function afterQuiz() { renderQuizStage(); }

  /* ---------- SCHEDULE (daily portions, micro→macro) ---------- */
  let schedWeek = null;
  function viewSchedule() {
    if (schedWeek === null) schedWeek = planWeekIndex();
    const start = PLAN_START.toISOString().slice(0, 10);
    const weekTabs = PLAN.map((p, i) => `<button class="chip" data-wk="${i}" aria-pressed="${i === schedWeek}" style="padding:7px 12px">W${i + 1}</button>`).join('');
    const goal = PLAN[schedWeek];
    const winMax = Math.max(...Object.values(NEW_WINDOW));
    let days = '';
    for (let d = 0; d < 7; d++) {
      const di = schedWeek * 7 + d;
      const date = addDays(start, di);
      const dd = new Date(date + 'T00:00:00');
      const wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dd.getDay()];
      const md = (dd.getMonth() + 1) + '/' + dd.getDate();
      const k = portionForDay('kanji', di), v = portionForDay('vocab', di), g = portionForDay('grammar', di);
      let body;
      if (di > winMax) {
        body = `<span class="faint">Consolidation — clear reviews, plus reading, listening &amp; mock practice per the week goal.</span>`;
      } else {
        const seg = (label, items, fmt) => items.length ? `<div style="margin:3px 0"><span class="eyebrow">${label}</span> &nbsp;<span class="jp" style="font-size:15px">${items.map(fmt).join('、')}</span></div>` : '';
        body = seg('Kanji', k, it => it.char) + seg('Vocab', v, it => it.word) + seg('Grammar', g, it => it.pattern);
        if (!body) body = `<span class="faint">Buffer / review day — no new items scheduled.</span>`;
      }
      const isToday = date === todayStr();
      days += `<div class="plan-row ${isToday ? 'now' : ''}" style="align-items:flex-start">
        <span class="wknum" style="width:56px;flex:0 0 56px;font-size:13px;line-height:1.3">${wd}<br>${md}</span>
        <div class="wkbody">${body}${isToday ? ' <span class="pill" style="margin-top:6px"><span class="dot shu"></span>today</span>' : ''}</div></div>`;
    }
    return `<div class="panel">
      <div class="eyebrow">Micro view · every day mapped</div>
      <h2 class="section">Daily portions</h2>
      <p class="muted" style="margin-top:6px">Each day lists exactly which new kanji, vocab and grammar to learn. The portions are generated from the content you've loaded, so they rescale automatically when you import more vocabulary. Spaced reviews of earlier items run on top of this, every day.</p>
      <div class="cat-select" style="margin-top:14px" id="schedWeeks">${weekTabs}</div>
      <div class="note" style="margin-bottom:14px"><b>Week ${schedWeek + 1} · ${goal[0]}</b> — ${goal[1]}</div>
      <div class="plan-list">${days}</div>
      <p class="muted" style="font-size:13px;margin-top:12px">New kanji finish around week 9, grammar around week 10; weeks 11–15 are consolidation and mocks. Jump to any week with the tabs above.</p>
    </div>`;
  }
  function afterSchedule() { document.querySelectorAll('#schedWeeks .chip').forEach(c => c.onclick = () => { schedWeek = +c.dataset.wk; render(); }); }

  /* ---------- PROGRESS ---------- */
  function viewProgress() {
    const cells = [];
    const start = addDays(todayStr(), -55);
    for (let i = 0; i < 56; i++) {
      const d = addDays(start, i);
      const r = (log[d] || {}).reviews || 0;
      const lv = r === 0 ? '' : r < 10 ? 'l1' : r < 25 ? 'l2' : 'l3';
      cells.push(`<div class="cell ${lv} ${d === todayStr() ? 'today' : ''}" title="${d}: ${r} reviews"></div>`);
    }
    const weeks = [];
    for (let w = 5; w >= 0; w--) {
      let sum = 0; const wStart = addDays(todayStr(), -(w * 7 + new Date().getDay()));
      for (let i = 0; i < 7; i++) { sum += ((log[addDays(wStart, i)] || {}).reviews || 0); }
      weeks.push({ label: w === 0 ? 'This' : (w + 'w'), val: sum });
    }
    const maxW = Math.max(10, ...weeks.map(x => x.val));
    const wi = planWeekIndex();
    const k = catStats('kanji'), v = catStats('vocab'), g = catStats('grammar');
    const totLearned = k.seen + v.seen + g.seen, totItems = k.total + v.total + g.total, totMaster = k.mastered + v.mastered + g.mastered;
    return `
    <div class="grid cols-2">
      <div class="panel">
        <div class="eyebrow">Consistency</div>
        <h2 class="section">Study calendar · last 8 weeks</h2>
        <div style="margin:16px 0"><div class="cal">${cells.join('')}</div></div>
        <div class="stat-row">
          <div class="stat"><div class="k">Current streak</div><div class="v">${streak()}<small> days</small></div></div>
          <div class="stat"><div class="k">Learned</div><div class="v">${totLearned}<small>/${totItems}</small></div></div>
          <div class="stat"><div class="k">Mastered</div><div class="v">${totMaster}</div></div>
        </div>
      </div>
      <div class="panel">
        <div class="eyebrow">Volume</div>
        <h2 class="section">Reviews per week</h2>
        <div class="weekbars">
          ${weeks.map(x => `<div class="wb"><div class="col" style="height:${Math.round(x.val / maxW * 100)}%"></div><div class="wl">${x.val}</div><div class="wl">${x.label}</div></div>`).join('')}
        </div>
        <hr class="soft">
        <div class="kv"><span>Kanji mastered</span><b>${k.mastered}/${k.total}</b></div>
        <div class="kv"><span>Vocab mastered</span><b>${v.mastered}/${v.total}</b></div>
        <div class="kv"><span>Grammar mastered</span><b>${g.mastered}/${g.total}</b></div>
      </div>
    </div>

    <div class="panel" style="margin-top:16px">
      <div class="eyebrow">The road to December 6</div>
      <h2 class="section">15-week plan</h2>
      <div class="plan-list" style="margin-top:10px">
        ${PLAN.map((p, i) => `<div class="plan-row ${i === wi ? 'now' : ''}">
          <input type="checkbox" data-wk="${i}" ${planChecks[i] ? 'checked' : ''} aria-label="Week ${i + 1} done">
          <span class="wknum">${i + 1}</span>
          <div class="wkbody"><div class="wkdate">${p[0]}${i === wi ? ' · this week' : ''}</div><div class="wkgoal">${p[1]}</div></div>
        </div>`).join('')}
      </div>
    </div>`;
  }
  function afterProgress() {
    document.querySelectorAll('.n4-root [data-wk]').forEach(c => c.onchange = () => { planChecks[c.dataset.wk] = c.checked; NStore.set('planChecks', planChecks); });
  }

  /* ---------- CONTENT / DATA ---------- */
  function viewData() {
    const cnt = t => itemsOf(t).length;
    return `
    <div class="panel">
      <div class="eyebrow">Make it your single source</div>
      <h2 class="section">Load / extend the N4 sets</h2>
      <p class="muted" style="margin-top:6px">You currently have ${cnt('kanji')} kanji · ${cnt('vocab')} vocab · ${cnt('grammar')} grammar loaded. Paste additional N4 items below to extend any category. Added items are saved to your account and merge with the built-in sets automatically — and the daily portions rescale to fit.</p>
      <div class="cat-select" id="dataCats">
        ${['kanji', 'vocab', 'grammar'].map((t, i) => `<button class="chip" data-dcat="${t}" aria-pressed="${i === 0}">${t}</button>`).join('')}
      </div>
      <div id="dataFormat" class="note" style="margin-bottom:10px"></div>
      <textarea id="dataInput" placeholder="Paste a JSON array here…"></textarea>
      <div class="btnrow" style="margin-top:12px">
        <button class="btn shu" id="dataAdd">Add to my content</button>
        <button class="btn ghost" id="dataSample">Insert example</button>
      </div>
    </div>

    <div class="panel" style="margin-top:16px">
      <div class="eyebrow">Backup</div>
      <h2 class="section">Your N4 progress data</h2>
      <p class="muted" style="margin-top:6px">Progress syncs to your Google account automatically. You can also export a local backup or reset your SRS here. (Lesson progress uses the sidebar Export/Import; this is the N4-only payload.)</p>
      <div class="btnrow" style="margin-top:6px">
        <button class="btn" id="expBtn">Export N4 backup (.json)</button>
        <label class="btn ghost" style="cursor:pointer">Import N4 backup<input id="impFile" type="file" accept="application/json" class="hide"></label>
        <button class="btn ghost" id="resetBtn" style="border-color:var(--n4-shu-soft);color:var(--n4-shu)">Reset N4 progress</button>
      </div>
      <hr class="soft">
      <div class="kv"><span>Items learned</span><b>${allItems().filter(it => isSeen(it.id)).length}</b></div>
      <div class="kv"><span>Storage working</span><b>${NStore.ok ? 'Yes — progress saves & syncs' : 'No — open in your own browser and sign in'}</b></div>
    </div>`;
  }
  const FORMATS = {
    kanji: `Format — array of: <code>{"char":"漢","meaning":"...","on":"カン","kun":"—","ex":"漢字","exr":"かんじ","exm":"kanji","level":"N4"}</code>`,
    vocab: `Format — array of: <code>{"word":"元気","reading":"げんき","meaning":"healthy; energetic","pos":"na-adjective","level":"N4"}</code>`,
    grammar: `Format — array of: <code>{"pattern":"〜ば","meaning":"...","structure":"...","ex":"...","extr":"English","level":"N4"}</code>`
  };
  const SAMPLES = {
    kanji: `[\n  {"char":"漢","meaning":"China; Han","on":"カン","kun":"—","ex":"漢字","exr":"かんじ","exm":"kanji","level":"N4"}\n]`,
    vocab: `[\n  {"word":"元気","reading":"げんき","meaning":"healthy; energetic","pos":"na-adjective","level":"N4"}\n]`,
    grammar: `[\n  {"pattern":"〜し","meaning":"and (listing reasons)","structure":"plain form + し","ex":"安いし、おいしいです。","extr":"It's cheap, and it's tasty.","level":"N4"}\n]`
  };
  let dataCat = 'kanji';
  function afterData() {
    const setFmt = () => { $('#dataFormat').innerHTML = FORMATS[dataCat]; };
    setFmt();
    document.querySelectorAll('[data-dcat]').forEach(c => c.onclick = () => { dataCat = c.dataset.dcat; document.querySelectorAll('[data-dcat]').forEach(x => x.setAttribute('aria-pressed', x.dataset.dcat === dataCat)); setFmt(); });
    $('#dataSample').onclick = () => { $('#dataInput').value = SAMPLES[dataCat]; };
    $('#dataAdd').onclick = () => {
      let arr; try { arr = JSON.parse($('#dataInput').value); } catch (e) { toast('That isn\'t valid JSON'); return; }
      if (!Array.isArray(arr) || !arr.length) { toast('Paste a non-empty JSON array'); return; }
      const extra = NStore.get('extra') || { kanji: [], vocab: [], grammar: [] };
      extra[dataCat] = (extra[dataCat] || []).concat(arr);
      NStore.set('extra', extra); buildContent();
      toast(`Added ${arr.length} ${dataCat} item(s)`);
      $('#dataInput').value = ''; render();
    };
    $('#expBtn').onclick = () => {
      const payload = { srs, log, planChecks, extra: NStore.get('extra') || {}, exported: new Date().toISOString() };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'n4-dojo-backup-' + todayStr() + '.json'; a.click();
    };
    $('#impFile').onchange = e => {
      const f = e.target.files[0]; if (!f) return; const r = new FileReader();
      r.onload = () => {
        try {
          const d = JSON.parse(r.result);
          if (d.srs) { srs = d.srs; NStore.set('srs', srs); } if (d.log) { log = d.log; NStore.set('log', log); }
          if (d.planChecks) { planChecks = d.planChecks; NStore.set('planChecks', planChecks); }
          if (d.extra) { NStore.set('extra', d.extra); buildContent(); }
          toast('Backup restored'); render();
        } catch (err) { toast('Could not read that file'); }
      };
      r.readAsText(f);
    };
    $('#resetBtn').onclick = () => {
      if (!confirm('Reset all N4 learning progress? Your added content stays. This cannot be undone.')) return;
      srs = {}; log = {}; planChecks = {}; NStore.set('srs', srs); NStore.set('log', log); NStore.set('planChecks', planChecks);
      toast('Progress reset'); render();
    };
  }

  /* ═══════════════════════════ SECTION CONTROL ═══════════════════════════ */
  function TAB_BAR() {
    const tabs = [
      ['today', '今日 Today'], ['learn', '学ぶ Learn'], ['review', '復習 Review'],
      ['quiz', 'テスト Quiz'], ['schedule', '予定 Schedule'], ['progress', '記録 Progress'],
      ['data', '内容 Content']
    ];
    return '<div class="mode-tabs" id="n4-tabs">' +
      tabs.map(([v, l]) => `<button class="mode-tab${v === view ? ' active' : ''}" data-n4view="${v}" onclick="N4.go('${v}')">${l}</button>`).join('') +
      '</div>';
  }

  function go(v) {
    view = v;
    // reset transient per-view state (learn deck history is kept across tab switches)
    learnRevealed = false; reviewQueue = []; reviewRevealed = false; quiz = null;
    render();
  }

  /* Open the N4 section (mirrors app.js openRepository) */
  function open() {
    view = 'today';
    if (typeof S !== 'undefined') S.lessonId = '__n4__';

    const t = document.getElementById('lesson-title'); if (t) t.textContent = 'N4 道場 — Exam prep';
    const tp = document.getElementById('lesson-topic'); if (tp) tp.textContent = 'Closed N4/N5 sets · spaced repetition · 15-week plan to December 6';
    const gp = document.getElementById('lesson-grammar'); if (gp) gp.textContent = '';

    document.getElementById('mode-tabs-wrap').innerHTML = TAB_BAR();

    // Sidebar active state (buildSidebar sets #n4-btn active via the app.js hook)
    if (typeof buildSidebar === 'function') buildSidebar();
    document.querySelectorAll('.lesson-btn').forEach(b => b.classList.remove('active'));
    const rb = document.getElementById('repo-btn'); if (rb) rb.classList.remove('active');
    const nb = document.getElementById('n4-btn'); if (nb) nb.classList.add('active');

    hydrate();
    buildContent();
    render();
  }

  /* One delegated listener handles every speaker button, no matter which render
     path (view render, stage re-render, quiz step) created it. */
  document.addEventListener('click', (e) => {
    try {
      const b = e.target && e.target.closest && e.target.closest('.n4-root [data-speak]');
      if (b) { e.stopPropagation(); speak(b.dataset.speak, b.hasAttribute('data-slow')); }
    } catch (_) { /* never let a click handler break the page */ }
  });

  window.N4 = { open, go };
})();
