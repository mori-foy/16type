/* ============================================
   Gem Type — データ定義
   ============================================ */

/* ------------------------------------------------
   4軸定義
   OI : O(外向きに輝く) / I(内側に秘める)
   SC : S(感覚で磨かれる) / C(直感で結晶化)
   WK : W(情熱の暖色) / K(静謐の寒色)
   FD : F(きらめく多面体) / D(深く澄んだ単色)
   ------------------------------------------------ */

const QUESTIONS = [
  {
    text: "人が集まる場所で、あなたは——",
    choices: [
      { text: "中心で会話を広げ、空気を温めるタイプ", axis: "OI", value: "O" },
      { text: "少し離れた席から、流れを静かに見ているタイプ", axis: "OI", value: "I" }
    ]
  },
  {
    text: "嬉しいことがあったとき、まず——",
    choices: [
      { text: "誰かに伝えて一緒に喜びたい", axis: "OI", value: "O" },
      { text: "自分の中でじっくり噛みしめたい", axis: "OI", value: "I" }
    ]
  },
  {
    text: "あなたらしさが伝わるのは——",
    choices: [
      { text: "話している時、表現している時", axis: "OI", value: "O" },
      { text: "ふとした沈黙や、佇まいの中", axis: "OI", value: "I" }
    ]
  },
  {
    text: "物事を選ぶとき、信じるのは——",
    choices: [
      { text: "実際に手で触れて確かめた感覚", axis: "SC", value: "S" },
      { text: "なんとなく感じる、その奥にあるもの", axis: "SC", value: "C" }
    ]
  },
  {
    text: "新しい場所を訪れたとき、心が動くのは——",
    choices: [
      { text: "建物の細工、料理の味、肌に触れる空気", axis: "SC", value: "S" },
      { text: "場所が持つ気配や、見えない物語", axis: "SC", value: "C" }
    ]
  },
  {
    text: "美しいものに出会ったとき——",
    choices: [
      { text: "細部までじっくり観察したくなる", axis: "SC", value: "S" },
      { text: "全体から受ける印象に身を委ねる", axis: "SC", value: "C" }
    ]
  },
  {
    text: "心が安らぐのは——",
    choices: [
      { text: "誰かと交わすあたたかなやり取り", axis: "WK", value: "W" },
      { text: "ひとりで過ごす、整った静けさ", axis: "WK", value: "K" }
    ]
  },
  {
    text: "理想の一日の風景は——",
    choices: [
      { text: "夕暮れの灯り、笑い声、賑わいの記憶", axis: "WK", value: "W" },
      { text: "朝の光、澄んだ水、輪郭のある静寂", axis: "WK", value: "K" }
    ]
  },
  {
    text: "あなたが大切にしているのは——",
    choices: [
      { text: "情の通った、心の距離が近い関係", axis: "WK", value: "W" },
      { text: "節度のある、洗練された距離感", axis: "WK", value: "K" }
    ]
  },
  {
    text: "あなたを表すなら——",
    choices: [
      { text: "場面ごとに違う顔を持つ、多面的な自分", axis: "FD", value: "F" },
      { text: "一貫した芯がある、ブレない自分", axis: "FD", value: "D" }
    ]
  },
  {
    text: "興味の持ち方は——",
    choices: [
      { text: "幅広く、つねに新しい刺激を求めて移ろう", axis: "FD", value: "F" },
      { text: "ひとつのテーマを、深く長く掘り下げたい", axis: "FD", value: "D" }
    ]
  },
  {
    text: "あなたの輝き方は——",
    choices: [
      { text: "角度によって表情を変える、変幻自在の光", axis: "FD", value: "F" },
      { text: "ひとつの色で深く澄む、揺るぎない光", axis: "FD", value: "D" }
    ]
  }
];

/* ------------------------------------------------
   16タイプ × 宝石データ
   ------------------------------------------------ */
const GEM_DATABASE = {
  "OSWF": {
    nameEn: "Ruby", nameJp: "ルビー",
    catch: "情熱で人を惹きつける主役",
    color: "#c41e3a", colorLight: "#e63956",
    traits: ["情熱的", "リーダー気質", "華やか"],
    element: "炎",
    description: "深紅の輝きで、誰よりも先に部屋を照らす存在。明るく行動的で、確かな手応えのある世界を愛するあなたは、生まれながらの「中心人物」。多面に砕かれた光が、どの角度からも人を魅了します。"
  },
  "OSWD": {
    nameEn: "Garnet", nameJp: "ガーネット",
    catch: "ひたむきで頼れる情熱家",
    color: "#7b1c2e", colorLight: "#a3253d",
    traits: ["誠実", "情熱的", "粘り強い"],
    element: "炎",
    description: "深く濃い赤を湛え、揺るがぬ熱を内に蓄える石。社交的でありながら、一度信じた人や道に対しては一途。実直であたたかなあなたは、長く深い絆を育てる才能を持っています。"
  },
  "OSKF": {
    nameEn: "Diamond", nameJp: "ダイヤモンド",
    catch: "誰もが認める本物の輝き",
    color: "#e0e0e0", colorLight: "#ffffff",
    traits: ["気品", "知的", "万能"],
    element: "光",
    description: "あらゆる光を取り込み、最高の輝きへ変換する究極の結晶。社交の場で機知に富み、現実的な判断力と気品を備えるあなたは、誰の目にも明らかな「本物」の存在感を放ちます。"
  },
  "OSKD": {
    nameEn: "Sapphire", nameJp: "サファイア",
    catch: "信念をもって人を導く人",
    color: "#0f3a87", colorLight: "#1e5fb8",
    traits: ["誠実", "知的", "気高い"],
    element: "水",
    description: "深い青の中に揺るぎない誠実を宿す石。社交的でありながら芯はクール、約束を守り、信念を持って人に向き合うあなたは、王侯貴族にも愛された格調の象徴です。"
  },
  "OCWF": {
    nameEn: "Opal", nameJp: "オパール",
    catch: "見る角度ごとに違う表情の人",
    color: "#f5c889", colorLight: "#ffe0b3",
    traits: ["創造的", "魅惑的", "多彩"],
    element: "虹",
    description: "見るたびに違う色を見せる、神秘の遊色を持つ石。直感的で情熱的、表現豊かなあなたは、ひとつの言葉では捉えきれない多彩な魅力で人を惹きつけます。芸術家の魂を持つ人。"
  },
  "OCWD": {
    nameEn: "Tourmaline", nameJp: "トルマリン",
    catch: "唯一無二の世界観を持つ人",
    color: "#c2185b", colorLight: "#e91e63",
    traits: ["個性的", "情熱的", "信念がある"],
    element: "炎",
    description: "ひとつの石の中に複数の色が共存する、矛盾を抱えた美しさ。表現力豊かで、しかし揺るがない核を持つあなたは、唯一無二のスタイルで世界に語りかける人。"
  },
  "OCKF": {
    nameEn: "Tanzanite", nameJp: "タンザナイト",
    catch: "未来を見通すビジョナリー",
    color: "#5a4a9c", colorLight: "#7a6abe",
    traits: ["知的", "先見性", "洞察力"],
    element: "宙",
    description: "見る角度で青から紫へ移ろう、知性の宝石。発想力に富み、未来を見通す力を持つあなたは、まだ誰も見たことのない景色を言葉と行動で形にしていく人。"
  },
  "OCKD": {
    nameEn: "Lapis Lazuli", nameJp: "ラピスラズリ",
    catch: "真実を求める思想家",
    color: "#1e3a8a", colorLight: "#2c54c0",
    traits: ["知性", "理想家", "誠実"],
    element: "宙",
    description: "古代から「天空の欠片」と呼ばれた、深い藍の石。理想を語り、真実を求めるあなたは、社交の場でも揺るがぬ哲学を持つ思想家。深く、誠実で、神聖な輝きを放ちます。"
  },
  "ISWF": {
    nameEn: "Morganite", nameJp: "モルガナイト",
    catch: "やさしさで包みこむ人",
    color: "#f4b8b8", colorLight: "#fcd5d5",
    traits: ["優しい", "繊細", "愛情深い"],
    element: "風",
    description: "淡いピンクのやわらかな光をたたえる、慈愛の石。控えめでありながら細やかな感性を持ち、身近な人へ深い愛情を注ぐあなたは、静かにあたたかさを広げていく存在。"
  },
  "ISWD": {
    nameEn: "Amber", nameJp: "琥珀",
    catch: "そばにいると安心する人",
    color: "#c97b1f", colorLight: "#e89942",
    traits: ["穏やか", "誠実", "包容力"],
    element: "土",
    description: "悠久の時間を内側に閉じ込めた、温かな黄金色の石。控えめで穏やか、しかしその深さは何千万年の蓄積。あなたといる人は、なぜか安心して呼吸ができるのです。"
  },
  "ISKF": {
    nameEn: "Aquamarine", nameJp: "アクアマリン",
    catch: "透明感のある清涼な存在",
    color: "#7bc4d4", colorLight: "#a3dae6",
    traits: ["清廉", "知的", "透明感"],
    element: "水",
    description: "澄んだ水のような淡青を持つ、海の宝石。控えめで現実的、しかし内側には軽やかな知性が揺れる。あなたの存在は、人の心に静かなさざ波を残します。"
  },
  "ISKD": {
    nameEn: "Pearl", nameJp: "真珠",
    catch: "在り方そのものが美しい人",
    color: "#f0ead6", colorLight: "#faf6e8",
    traits: ["上品", "忍耐強い", "気品"],
    element: "水",
    description: "長い時間をかけて、静かに育まれる唯一の宝石。控えめで誠実、揺るがぬ品格を持つあなたは、派手さではなく「在り方そのもの」で人を魅了する稀有な存在。"
  },
  "ICWF": {
    nameEn: "Amethyst", nameJp: "アメジスト",
    catch: "詩のように世界を見る人",
    color: "#7a3f9c", colorLight: "#9d5ec1",
    traits: ["神秘的", "直感力", "癒し系"],
    element: "宙",
    description: "深い紫の中に宇宙を宿す石。直感的で繊細、心の奥に豊かな世界を持つあなたは、夢と現実の境を行き来する詩人。その言葉は、誰かの夜を静かに照らします。"
  },
  "ICWD": {
    nameEn: "Rhodochrosite", nameJp: "ロードクロサイト",
    catch: "愛情を深く注ぐ人",
    color: "#d8527a", colorLight: "#e8779b",
    traits: ["共感力", "愛情深い", "献身的"],
    element: "炎",
    description: "薔薇色の縞模様に、深い愛情を閉じ込めた石。内向きでありながら情熱的、信じた相手にすべてを注ぐあなたは、深く長く続く絆を編む人。静かに、けれど熱く。"
  },
  "ICKF": {
    nameEn: "Moonstone", nameJp: "ムーンストーン",
    catch: "月のように美しい感性の人",
    color: "#dce4f0", colorLight: "#eef2f8",
    traits: ["神秘的", "直感的", "感受性豊か"],
    element: "月",
    description: "月光のような青白い光を内に宿す、夢の石。直感に優れ、感受性豊かなあなたは、見えないものを言葉や形にする才能の持ち主。月のように、満ち欠けする美しさを持つ人。"
  },
  "ICKD": {
    nameEn: "Emerald", nameJp: "エメラルド",
    catch: "静かに磨かれた知性の人",
    color: "#0d6b4f", colorLight: "#1a9070",
    traits: ["知的", "深い", "信念がある"],
    element: "森",
    description: "深い緑の奥に、誰にも明かさない真実をたたえた石。内省的でありながら揺るがぬ信念を持つあなたは、長い時間をかけて磨かれてきた静かな知性そのもの。"
  }
};

/* ------------------------------------------------
   月別誕生石
   ------------------------------------------------ */
const BIRTHSTONES = {
  1: "ガーネット",
  2: "アメジスト",
  3: "アクアマリン",
  4: "ダイヤモンド",
  5: "エメラルド",
  6: "ムーンストーン",
  7: "ルビー",
  8: "ペリドット",
  9: "サファイア",
  10: "オパール",
  11: "トパーズ",
  12: "タンザナイト"
};
