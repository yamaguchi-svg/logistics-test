import { useState, useRef } from "react";

const ALL_QUESTIONS = {
  beginner: [
    { q: "国内で最も流通しているパレットの規格サイズは？", key: "1100×1100mm（JIS規格）", hint: "単位はmm" },
    { q: "ウイング車の最大の荷役メリットを答えよ", key: "両サイドが開くためフォークで左右から積み降ろしができ荷役効率が高い", hint: "開口部の特徴から考える" },
    { q: "危険物の第4類とはどんな物質か？具体例を1つ挙げよ", key: "引火性液体。例：ガソリン・灯油・アルコール類など", hint: "身近な液体燃料を思い浮かべよ" },
    { q: "2024年問題とは何か？一言で述べよ", key: "ドライバーの時間外労働が年960時間に上限規制され輸送力不足や運賃上昇が懸念される問題", hint: "労働規制が関係している" },
    { q: "ドレージとは何か？", key: "港湾（CY）と配送先・工場間を結ぶ海上コンテナのトラック輸送", hint: "港と目的地を結ぶ輸送" },
    { q: "20ftコンテナの最大積載重量はおよそ何トンか？", key: "約22t（総重量24t－コンテナ自重約2.2t）", hint: "総重量からコンテナ自重を引く" },
    { q: "バン（箱車）の荷役の弱点は何か？", key: "後方の扉からしか荷役できないためフォーク作業の効率が低い", hint: "開口部の位置を考える" },
    { q: "冷凍仕様のトラックの温度帯は何℃か？", key: "-30℃〜-18℃", hint: "マイナスの温度帯" },
    { q: "チャーター便と路線便の最大の違いは何か？", key: "チャーターは1社専用の貸切。路線便は複数荷主の荷物を混載して運ぶ", hint: "専用か共有かの違い" },
    { q: "パワーゲートはどんな時に有効か？", key: "フォークのない現場で手降ろしを減らしたい時。荷台の昇降装置で人力負担を軽減する", hint: "荷役設備がない現場を想像する" },
    { q: "デバンニングとは何か？", key: "コンテナから貨物を取り出す作業", hint: "バンニングの逆" },
    { q: "危険物輸送でイエローカードが必要な理由は？", key: "事故発生時に緊急連絡先・応急措置法・物質情報を現場で即確認できるようにするため", hint: "緊急時対応に関係する" },
    { q: "10t車（大型トラック）の最大積載量はおよそ何tか？", key: "10〜13t", hint: "車名の数字がヒント" },
    { q: "モーダルシフトとは何か？", key: "トラック輸送を鉄道や船舶など環境負荷の低い輸送モードへ転換すること", hint: "環境対応との関係を考える" },
    { q: "CY（コンテナヤード）とは何か？", key: "港湾に隣接するFCL貨物の受け渡しを行うコンテナ保管場所", hint: "港湾エリアにある施設" },
    { q: "冷凍倉庫の温度基準は何℃以下か？", key: "-18℃以下", hint: "食品衛生法の基準を思い出す" },
    { q: "「実車率」とはどんなKPIか？", key: "総走行距離に対して荷物を積んで走った距離の割合（目標70%以上）", hint: "空車で走る距離との比率" },
    { q: "平ボディ（平車）が雨天時に必要な作業は何か？", key: "シート養生（防水シートで荷物を覆い飛散・濡れを防ぐ作業）", hint: "屋根がないことから考える" },
    { q: "危険物乙種4類の免許が対応する危険物の類は？", key: "第4類（引火性液体）", hint: "数字の一致に注目" },
    { q: "荷待ち時間とは何か？", key: "トラックが荷積み・荷降ろしの順番待ちをしている時間", hint: "ドライバーが待機している状況" },
    { q: "フォークリフトのカウンターバランス式とリーチ式の違いは？", key: "カウンター式は屋内外兼用で作業半径が広い。リーチ式は狭通路対応の屋内専用でマストが前後移動する", hint: "使用環境と通路幅の違い" },
    { q: "「積載率（重量）」の目標値はどのくらいか？", key: "80%以上", hint: "KPIの標準目標値" },
    { q: "タンクローリーで危険物を運ぶ際に必要な資格は？", key: "危険物取扱者免許（乙種4類など）", hint: "消防法に基づく資格" },
    { q: "40ftコンテナの最大積載重量はおよそ何トンか？", key: "約27t", hint: "20ftより大きい" },
    { q: "「スポット便」とはどんな輸送形態か？", key: "定期便ではなく単発・不定期で手配する輸送", hint: "定期との対比" },
  ],
  intermediate: [
    { q: "積載率が低い状態が続くと輸送コストにどんな影響が出るか？", key: "1個あたりの輸送単価が上昇する。固定費は同じでも積載量が少ないと割高になる", hint: "固定費の考え方を使う" },
    { q: "手積み・手降ろしがコストを押し上げる主な理由を2つ挙げよ", key: "①作業時間が長くなりドライバーの拘束時間が増える　②荷待ち・荷役時間の延長が2024年問題の労働規制に抵触しやすい", hint: "時間コストと法規制の両面" },
    { q: "500km以上の輸送でモーダルシフトが有利になるのはなぜか？", key: "長距離ほどトラックの燃料費・人件費・拘束時間が増大し鉄道・船舶のコスト優位性が顕在化する", hint: "距離とコストの関係" },
    { q: "混載便が成立する3つの条件とは何か？", key: "①方面（行き先）が一致する　②納品時間帯が近い　③荷姿が標準化されている", hint: "マッチングに必要な要素" },
    { q: "共同配送で積載率が上がる仕組みを説明せよ", key: "複数荷主の荷物を同一車両で運ぶことで1社分だけでは埋まらない荷台スペースを埋め合わせる", hint: "1社では足りない空間を補う" },
    { q: "デマレージが発生するとはどういう状況か？", key: "輸入コンテナのフリータイム（無料保管期間、通常4〜7日）を超過した場合に発生する延滞料金", hint: "フリータイムとの関係" },
    { q: "樹脂パレットが食品・医薬品物流で好まれる理由は？", key: "腐食・害虫リスクがなく衛生的。軽量で耐久性も高くGMP・HACCP等の衛生基準を満たしやすい", hint: "木製パレットとの比較" },
    { q: "冷凍車が待機中もエンジンを稼働させる理由は何か？", key: "冷凍機の電源確保のため。停止すると庫内温度が上昇し温度逸脱・品質劣化が起きる", hint: "冷凍機の電源はどこから？" },
    { q: "「4方差しパレット」が荷役効率を高める理由は？", key: "フォークをどの方向からでも差し込めるためバースや倉庫の向きに関係なくスムーズに荷役できる", hint: "フォークの差し込み方向に注目" },
    { q: "危険物第4類の「指定数量」とは何か？なぜ重要か？", key: "消防法で定めた危険物の基準量。この数量以上の保管・輸送は特別な許可・届出・専門資格が必要になる", hint: "法規制の基準点" },
    { q: "フリーロケーション管理と固定ロケーション管理の違いは？", key: "固定は商品ごとに置き場所を固定。フリーは空きスペースに自由配置しWMSで管理。保管効率はフリーが高い", hint: "保管効率の観点で考える" },
    { q: "「物流コスト比率」が高い場合、まず何を疑うべきか？", key: "積載率の低下・手作業比率の高さ・配送頻度と物量のミスマッチ・特殊車両の多用など非効率な運用構造", hint: "非効率が発生しやすいポイントを洗い出す" },
    { q: "「先入先出し（FIFO）」が食品物流で不可欠な理由は？", key: "賞味期限・製造日の古いものを先に出荷しないと期限切れ商品が残り廃棄ロスや食品事故につながる", hint: "賞味期限管理との関係" },
    { q: "危険物を異なる類同士で混載してはいけない理由は？", key: "類ごとに性質が異なり混合することで発火・爆発・有毒ガス発生などの危険な化学反応が起きるリスクがある", hint: "化学的な反応リスク" },
    { q: "保税倉庫とはどんな倉庫か？利用メリットは？", key: "輸入貨物を関税未払いのまま保管できる倉庫。再輸出の場合は関税が免除される", hint: "関税と保管の関係" },
    { q: "「帰り便」を活用すると運賃が安くなる理由は？", key: "配送後の空車回送を防ぐため運送会社が帰り荷を割安で引き受けることが多い", hint: "空車コストの観点" },
    { q: "ミルクランとはどんな集荷方式か？その効果は？", key: "1台のトラックが複数の工場・拠点を巡回して集荷する方式。便数・車両台数を減らしコストと環境負荷を削減できる", hint: "牛乳配達のような動き方" },
    { q: "WMSが「在庫精度99%以上」を維持するためにどんな機能が重要か？", key: "入出庫時の検品、ロケーション管理、循環棚卸による差異検知と訂正機能", hint: "差異が発生する場面を考える" },
    { q: "タンクローリーの「用途転換が困難」な理由は何か？", key: "輸送物に応じた専用洗浄設備が必要で異物混入リスクを排除するための洗浄コスト・時間が非常に大きい", hint: "洗浄の問題を考える" },
    { q: "ユニック（車載クレーン）が平ボディに搭載される理由は？", key: "クレーンや荷役設備のない現場でもトラック単体で荷物の吊り上げ荷役ができるから", hint: "荷役設備のない現場を想像する" },
    { q: "LCL貨物とFCL貨物でコスト構造はどう違うか？", key: "LCLはCFSで他社と合積みするため仕分けコストが加算される。FCLはコンテナ単価は高いが大量輸送時に割安", hint: "物量が少ない場合と多い場合で逆転する" },
    { q: "「クロスドッキング」が倉庫コストを下げる仕組みを説明せよ", key: "入荷した商品を保管せずそのまま仕分け・積み替えて出荷するため保管スペースや在庫金利がほぼゼロになる", hint: "保管をしないことがポイント" },
  ],
  advanced: [
    { q: "荷待ち90分が発生した場合、10t車1台あたりの実質コスト増加はどう説明できるか？", key: "ドライバーの拘束時間が1.5時間延び1日の運行可能距離・件数が減少。2024年問題の960時間上限にも接近し長期的に稼働率と人件費効率を悪化させる", hint: "時間コストと年間上限規制の両面で考える" },
    { q: "積載率65%が慢性化している。改善に向けて最初に打つべき施策を2つ挙げ理由を述べよ", key: "①パレット化・ユニットロード化（荷姿規格化で空間充填率向上）　②共同配送の検討（複数荷主で積み合わせ充填率向上）。どちらも大規模投資なしで改善できる", hint: "大きな投資なしにできることから始める" },
    { q: "500km輸送を鉄道コンテナに切り替えるか判断する際、確認すべき3つの条件とは？", key: "①配送頻度とロットが定期・大量か　②ラストマイルを含めたトータルコストが有利か　③リードタイムが1〜2日長くなっても許容できるか", hint: "コスト・物量・リードタイムの3軸" },
    { q: "危険物第4類の灯油2,000L（非水溶性）を1台で輸送する場合、消防法上どんな対応が必要か？", key: "第2石油類（非水溶性）の指定数量は1,000L。2,000Lは指定数量の2倍のため危険物取扱者の乗車・移動タンク貯蔵所許可・危険マーク掲示・消火器搭載が必要", hint: "指定数量と比較して何倍かを考える" },
    { q: "40ftハイキューブコンテナを使う判断基準は何か？通常の40ftと何が違うか？", key: "天井高が2.9m（通常2.39m）で容積が約76㎥（通常67㎥）。軽量でかさ高い商品を容積基準で満載にしたい場合に有利", hint: "重量制約と容積制約のどちらが先に来るかで判断" },
    { q: "倉庫の保管効率が95%を超えると何が問題になるか？", key: "荷物の入れ替えスペースがなくなり入出庫効率が低下。作業ミス・事故リスクも高まる。適正は85%前後でバッファが必要", hint: "100%が最良でない理由を考える" },
    { q: "食品業界の「1/3ルール」とは何か？物流にどう影響するか？", key: "賞味期限の残り1/3を超えた商品は小売が受け付けない商慣習。製造から納品までの時間制約が厳しくなりFIFO厳守・高頻度配送が必要になる", hint: "賞味期限の消費ルールから逆算する" },
    { q: "スタッカークレーン式自動倉庫の導入が適切なケースと不適切なケースを各1つ述べよ", key: "適切：高回転・高頻度の品目を大量保管し省人化したい場合。不適切：SKU数が多く入出庫パターンが不規則・季節変動が大きい場合", hint: "設備の柔軟性の限界を考える" },
    { q: "「誤出荷率0.1%以下」の目標を達成するために最低限必要な仕組みを3つ挙げよ", key: "①出荷時の二重検品（ダブルチェック）　②バーコード/RFID照合による自動確認　③WMSによる出庫指示の一元化", hint: "ヒューマンエラーを防ぐ仕組み" },
    { q: "GDP（医薬品適正流通基準）への対応で最も難しいオペレーション上の課題は何か？", key: "輸送中の温度ロガーによる連続記録と逸脱時の対応手順（CAPA）の文書化。証跡・トレーサビリティの維持が難しい", hint: "温度管理だけでなく記録も重要" },
    { q: "新規エリアへの配送展開で運送会社が見つからない場合、真っ先に確認すべきことは何か？", key: "①採算が取れない遠隔地・小ロットかどうか　②荷役条件（手降ろし・荷待ち長）が敬遠されていないか　③帰り便が組めない片道輸送になっていないか", hint: "相手が断る理由を相手目線で考える" },
    { q: "倉庫診断で「ピッキング生産性が低い」と判明した。動線以外で改善できる施策を2つ挙げよ", key: "①ABC分析でAランク品を優良ロケーションに集約する　②GTP（Goods to Person）方式の導入で人が棚まで移動する時間をゼロにする", hint: "人が歩く量を減らす方法を考える" },
    { q: "共同配送の導入を阻む最大の実務課題と解決策を述べよ", key: "競合荷主間の情報共有への抵抗（物量・コストが漏れるリスク）。第三者の物流事業者がプラットフォームを仲介し個別情報を開示せずマッチングする仕組みが有効", hint: "競合他社と協力することの心理的・実務的障壁" },
    { q: "輸送コスト削減のために「往復利用」を提案する際、荷主に確認すべき最重要事項は何か？", key: "帰り便の荷物の有無・物量・荷姿・納品先方向が往路の配送エリアと合致するか。マッチングが成立しなければ効果は得られない", hint: "往路と復路の条件が揃わないと成立しない" },
    { q: "バイオディーゼルやEVトラック導入でCO2削減効果を訴求する際の注意点は何か？", key: "カーボンオフセット分と実削減量を区別する必要がある。電源構成の再エネ比率やバイオ燃料の原料由来によってLCA排出量が変わるため数値の根拠が重要", hint: "見かけの削減と実質の削減を区別する" },
  ],
};

const LEVEL_CONFIG = {
  beginner:     { label: "🟢 初級", color: "#1A6B3C", bg: "#D6F0E3", tagBg: "#1A6B3C", description: "基礎知識・用語の確認" },
  intermediate: { label: "🟡 中級", color: "#B85C00", bg: "#FFF0DC", tagBg: "#B85C00", description: "仕組みと理由の理解" },
  advanced:     { label: "🔴 上級", color: "#8B1A1A", bg: "#FDE8E8", tagBg: "#8B1A1A", description: "判断力・実務思考" },
};

const SCORE_LABEL = {
  4: { label: "完璧",    color: "#1A6B3C", bg: "#D6F0E3", icon: "🏆" },
  3: { label: "良好",    color: "#2563EB", bg: "#DBEAFE", icon: "✅" },
  2: { label: "一部正解", color: "#B85C00", bg: "#FFF0DC", icon: "🔶" },
  1: { label: "理解不足", color: "#8B1A1A", bg: "#FDE8E8", icon: "❌" },
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickQuestions(n = 10) {
  const beg = shuffle(ALL_QUESTIONS.beginner).slice(0, Math.ceil(n * 0.35)).map(q => ({ ...q, level: "beginner" }));
  const mid = shuffle(ALL_QUESTIONS.intermediate).slice(0, Math.ceil(n * 0.35)).map(q => ({ ...q, level: "intermediate" }));
  const adv = shuffle(ALL_QUESTIONS.advanced).slice(0, Math.ceil(n * 0.30)).map(q => ({ ...q, level: "advanced" }));
  return shuffle([...beg, ...mid, ...adv]).slice(0, n);
}

async function gradeAnswer(question, modelAnswer, userAnswer) {
  const res = await fetch("/api/grade", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, modelAnswer, userAnswer }),
  });
  if (!res.ok) throw new Error("API error");
  return res.json();
}

function getRating(pct) {
  if (pct >= 90) return { label: "物流設計者", color: "#1A6B3C", icon: "🏆", desc: "制約・コスト・代替案を統合して最適解を導ける人材" };
  if (pct >= 75) return { label: "実務中堅",   color: "#2563EB", icon: "⭐", desc: "改善課題を自ら発見し提案の筋道を立てられるレベル" };
  if (pct >= 55) return { label: "基礎実務",   color: "#B85C00", icon: "📦", desc: "現場の流れとコスト感覚を持ち始めているレベル" };
  return { label: "入門", color: "#8B1A1A", icon: "📚", desc: "物流の表面的な用語は知っているが仕組みの説明が不十分" };
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [questionCount, setQuestionCount] = useState(10);
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [isGrading, setIsGrading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [results, setResults] = useState([]);
  const textareaRef = useRef(null);

  const startTest = () => {
    const qs = pickQuestions(questionCount);
    setQuestions(qs);
    setCurrentIdx(0);
    setAnswers([]);
    setInputVal("");
    setShowHint(false);
    setResults([]);
    setScreen("test");
  };

  const submitAnswer = async () => {
    if (!inputVal.trim()) return;
    setIsGrading(true);
    const q = questions[currentIdx];
    let result;
    try {
      result = await gradeAnswer(q.q, q.key, inputVal.trim());
    } catch {
      result = { score: 2, feedback: "採点中にエラーが発生しました", correct_point: "", missing_point: "再度お試しください" };
    }
    const newAnswer = { question: q, userAnswer: inputVal.trim(), result };
    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);
    setIsGrading(false);
    if (currentIdx + 1 >= questions.length) {
      setResults(newAnswers);
      setScreen("result");
    } else {
      setCurrentIdx(currentIdx + 1);
      setInputVal("");
      setShowHint(false);
    }
  };

  const totalScore = results.reduce((s, r) => s + r.result.score, 0);
  const maxScore = results.length * 4;
  const pct = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  // ── HOME ──────────────────────────────────────────────────────────────────
  if (screen === "home") return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0F2447 0%, #1B3A6B 50%, #2E5FA3 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <div style={{ maxWidth: 560, width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>📦</div>
        <h1 style={{ color: "white", fontSize: 32, fontWeight: "bold", margin: "0 0 8px" }}>物流理解度診断テスト</h1>
        <p style={{ color: "#9BB8D4", fontSize: 15, marginBottom: 40 }}>Logistics Competency Assessment</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 40, flexWrap: "wrap" }}>
          {Object.entries(LEVEL_CONFIG).map(([k, v]) => (
            <div key={k} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px 20px" }}>
              <div style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>{v.label}</div>
              <div style={{ color: "#9BB8D4", fontSize: 12 }}>{v.description}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 16, padding: "28px", marginBottom: 28, border: "1px solid rgba(255,255,255,0.15)" }}>
          <p style={{ color: "#CBD5E0", fontSize: 14, margin: "0 0 20px" }}>出題数を選んでください</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            {[5, 10, 15, 20].map(n => (
              <button key={n} onClick={() => setQuestionCount(n)} style={{ padding: "10px 24px", borderRadius: 10, border: "2px solid", cursor: "pointer", fontWeight: "bold", fontSize: 16, transition: "all 0.2s", background: questionCount === n ? "white" : "transparent", borderColor: questionCount === n ? "white" : "rgba(255,255,255,0.4)", color: questionCount === n ? "#1B3A6B" : "white" }}>
                {n}問
              </button>
            ))}
          </div>
        </div>
        <button onClick={startTest} style={{ width: "100%", padding: "16px", borderRadius: 14, border: "none", background: "linear-gradient(135deg, #2E5FA3, #1B3A6B)", color: "white", fontSize: 18, fontWeight: "bold", cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
          テストを開始する →
        </button>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 16 }}>問題は毎回ランダムに出題されます</p>
      </div>
    </div>
  );

  // ── TEST ──────────────────────────────────────────────────────────────────
  if (screen === "test") {
    const q = questions[currentIdx];
    const cfg = LEVEL_CONFIG[q.level];
    const progress = (currentIdx / questions.length) * 100;
    return (
      <div style={{ minHeight: "100vh", background: "#F0F4F8", fontFamily: "Arial, sans-serif", paddingBottom: 40 }}>
        <div style={{ background: "#1B3A6B", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>📦 物流診断テスト</span>
          <span style={{ color: "#9BB8D4", fontSize: 14 }}>{currentIdx + 1} / {questions.length}</span>
        </div>
        <div style={{ height: 4, background: "#E2E8F0" }}>
          <div style={{ height: "100%", background: cfg.color, width: `${progress}%`, transition: "width 0.5s" }} />
        </div>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={{ background: cfg.tagBg, color: "white", fontSize: 12, fontWeight: "bold", padding: "4px 12px", borderRadius: 20 }}>{cfg.label}</span>
            <span style={{ color: "#718096", fontSize: 13 }}>{cfg.description}</span>
          </div>
          <div style={{ background: "white", borderRadius: 16, padding: "28px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", marginBottom: 20, borderLeft: `5px solid ${cfg.color}` }}>
            <p style={{ color: "#1A202C", fontSize: 20, fontWeight: "bold", lineHeight: 1.6, margin: 0 }}>{q.q}</p>
          </div>
          {!showHint ? (
            <button onClick={() => setShowHint(true)} style={{ background: "transparent", border: "1px dashed #CBD5E0", color: "#718096", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13, marginBottom: 16 }}>
              💡 ヒントを見る
            </button>
          ) : (
            <div style={{ background: "#FEFCE8", border: "1px solid #FCD34D", borderRadius: 10, padding: "12px 16px", marginBottom: 16 }}>
              <span style={{ color: "#92400E", fontSize: 14 }}>💡 {q.hint}</span>
            </div>
          )}
          <div style={{ background: "white", borderRadius: 16, padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
            <label style={{ color: "#4A5568", fontSize: 14, fontWeight: "bold", display: "block", marginBottom: 10 }}>あなたの解答</label>
            <textarea ref={textareaRef} value={inputVal} onChange={e => setInputVal(e.target.value)} placeholder="解答を入力してください..." disabled={isGrading} rows={4}
              style={{ width: "100%", border: "2px solid #E2E8F0", borderRadius: 10, padding: "12px", fontSize: 15, fontFamily: "Arial, sans-serif", resize: "vertical", outline: "none", boxSizing: "border-box", color: "#1A202C" }}
              onFocus={e => e.target.style.borderColor = cfg.color}
              onBlur={e => e.target.style.borderColor = "#E2E8F0"}
            />
            <button onClick={submitAnswer} disabled={!inputVal.trim() || isGrading}
              style={{ width: "100%", marginTop: 14, padding: "14px", borderRadius: 12, border: "none", background: !inputVal.trim() || isGrading ? "#CBD5E0" : `linear-gradient(135deg, ${cfg.color}, #1B3A6B)`, color: "white", fontSize: 16, fontWeight: "bold", cursor: !inputVal.trim() || isGrading ? "not-allowed" : "pointer" }}>
              {isGrading ? "🤖 AI採点中..." : currentIdx + 1 >= questions.length ? "採点して結果を見る ✓" : "採点して次の問題へ →"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── RESULT ────────────────────────────────────────────────────────────────
  const rating = getRating(pct);
  const byLevel = { beginner: [], intermediate: [], advanced: [] };
  results.forEach(r => byLevel[r.question.level].push(r));

  return (
    <div style={{ minHeight: "100vh", background: "#F0F4F8", fontFamily: "Arial, sans-serif", paddingBottom: 60 }}>
      <div style={{ background: "#1B3A6B", padding: "16px 24px" }}>
        <span style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>📦 診断結果</span>
      </div>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 16px" }}>
        <div style={{ background: "linear-gradient(135deg, #0F2447, #1B3A6B)", borderRadius: 20, padding: "32px", textAlign: "center", marginBottom: 24, boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
          <div style={{ fontSize: 48 }}>{rating.icon}</div>
          <div style={{ color: "#9BB8D4", fontSize: 14, marginTop: 8 }}>総合スコア</div>
          <div style={{ color: "white", fontSize: 64, fontWeight: "bold", lineHeight: 1 }}>{pct}<span style={{ fontSize: 24 }}>%</span></div>
          <div style={{ color: "#9BB8D4", fontSize: 14, marginTop: 4 }}>{totalScore} / {maxScore} 点</div>
          <div style={{ marginTop: 16 }}>
            <span style={{ background: "rgba(255,255,255,0.15)", color: "white", fontWeight: "bold", fontSize: 18, padding: "8px 24px", borderRadius: 24 }}>{rating.label}</span>
          </div>
          <p style={{ color: "#9BB8D4", fontSize: 14, marginTop: 12 }}>{rating.desc}</p>
        </div>
        <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
          {Object.entries(byLevel).map(([level, qs]) => {
            if (!qs.length) return null;
            const cfg = LEVEL_CONFIG[level];
            const avg = qs.reduce((s, r) => s + r.result.score, 0) / qs.length;
            return (
              <div key={level} style={{ flex: 1, background: "white", borderRadius: 14, padding: "16px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderTop: `4px solid ${cfg.color}` }}>
                <div style={{ fontSize: 20 }}>{cfg.label.split(" ")[0]}</div>
                <div style={{ color: cfg.color, fontSize: 24, fontWeight: "bold" }}>{Math.round((avg / 4) * 100)}%</div>
                <div style={{ color: "#718096", fontSize: 12 }}>{qs.length}問</div>
              </div>
            );
          })}
        </div>
        <h3 style={{ color: "#2D3748", fontSize: 18, fontWeight: "bold", margin: "0 0 16px" }}>問題ごとの解説</h3>
        {results.map((r, i) => {
          const cfg = LEVEL_CONFIG[r.question.level];
          const sl = SCORE_LABEL[r.result.score];
          return (
            <div key={i} style={{ background: "white", borderRadius: 14, padding: "20px", marginBottom: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", borderLeft: `4px solid ${cfg.color}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                    <span style={{ background: cfg.tagBg, color: "white", fontSize: 11, padding: "2px 8px", borderRadius: 10, fontWeight: "bold" }}>Q{i+1}</span>
                    <span style={{ color: cfg.color, fontSize: 12 }}>{cfg.label}</span>
                  </div>
                  <p style={{ color: "#2D3748", fontWeight: "bold", fontSize: 15, margin: 0 }}>{r.question.q}</p>
                </div>
                <div style={{ background: sl.bg, borderRadius: 10, padding: "6px 12px", textAlign: "center", minWidth: 64 }}>
                  <div style={{ fontSize: 20 }}>{sl.icon}</div>
                  <div style={{ color: sl.color, fontSize: 12, fontWeight: "bold" }}>{sl.label}</div>
                  <div style={{ color: sl.color, fontSize: 18, fontWeight: "bold" }}>{r.result.score}/4</div>
                </div>
              </div>
              <div style={{ background: "#F7FAFC", borderRadius: 8, padding: "10px 14px", marginBottom: 8 }}>
                <div style={{ color: "#718096", fontSize: 12, marginBottom: 2 }}>あなたの解答</div>
                <div style={{ color: "#2D3748", fontSize: 14 }}>{r.userAnswer}</div>
              </div>
              <div style={{ background: "#F0FFF4", borderRadius: 8, padding: "10px 14px", marginBottom: 8 }}>
                <div style={{ color: "#276749", fontSize: 12, marginBottom: 2 }}>模範解答のポイント</div>
                <div style={{ color: "#2D3748", fontSize: 14 }}>{r.question.key}</div>
              </div>
              <div style={{ color: "#4A5568", fontSize: 14, padding: "8px 12px", background: r.result.score >= 3 ? "#EBF8FF" : "#FFF5F5", borderRadius: 8 }}>
                <span style={{ fontWeight: "bold" }}>AI評価：</span>{r.result.feedback}
                {r.result.missing_point && <span style={{ color: "#8B1A1A", marginLeft: 8 }}>▶ {r.result.missing_point}</span>}
              </div>
            </div>
          );
        })}
        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          <button onClick={startTest} style={{ flex: 1, padding: "14px", borderRadius: 12, border: "none", background: "linear-gradient(135deg, #2E5FA3, #1B3A6B)", color: "white", fontSize: 16, fontWeight: "bold", cursor: "pointer" }}>
            🔄 もう一度チャレンジ
          </button>
          <button onClick={() => setScreen("home")} style={{ padding: "14px 20px", borderRadius: 12, border: "2px solid #CBD5E0", background: "white", color: "#4A5568", fontSize: 15, fontWeight: "bold", cursor: "pointer" }}>
            🏠 TOP
          </button>
        </div>
      </div>
    </div>
  );
}
