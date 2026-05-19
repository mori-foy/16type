/* ============================================
   Gem Type — メインロジック
   ============================================ */

/* ------------------------------------------------
   夜空の星フィールド
   ------------------------------------------------ */
(function initStarField() {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;';
  document.body.insertAdjacentElement('afterbegin', canvas);

  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // 通常の丸い星 (180個)
  const stars = Array.from({ length: 180 }, () => ({
    x:      Math.random(),
    y:      Math.random(),
    r:      0.4 + Math.random() * 1.5,
    phase:  Math.random() * Math.PI * 2,
    speed:  0.35 + Math.random() * 0.75,
    bright: 0.35 + Math.random() * 0.65,
  }));

  // ✦ 型キラキラ (22個)
  const sparkles = Array.from({ length: 22 }, () => ({
    x:     Math.random(),
    y:     Math.random(),
    r:     1.6 + Math.random() * 2.4,
    phase: Math.random() * Math.PI * 2,
    speed: 0.28 + Math.random() * 0.55,
  }));

  function drawSparkle(x, y, r, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = '#fff';
    ctx.lineCap = 'round';

    ctx.lineWidth = r * 0.45;
    ctx.beginPath(); ctx.moveTo(x - r, y); ctx.lineTo(x + r, y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x, y - r); ctx.lineTo(x, y + r); ctx.stroke();

    const d = r * 0.55;
    ctx.lineWidth = r * 0.2;
    ctx.beginPath(); ctx.moveTo(x - d, y - d); ctx.lineTo(x + d, y + d); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + d, y - d); ctx.lineTo(x - d, y + d); ctx.stroke();

    ctx.restore();
  }

  let rafId;

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    const time = t * 0.001;

    stars.forEach(s => {
      const alpha = s.bright * (0.3 + 0.7 * (0.5 + 0.5 * Math.sin(time * s.speed + s.phase)));
      ctx.beginPath();
      ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
      ctx.fill();
    });

    sparkles.forEach(s => {
      const alpha = 0.65 * (0.5 + 0.5 * Math.sin(time * s.speed + s.phase));
      if (alpha > 0.04) drawSparkle(s.x * W, s.y * H, s.r, alpha);
    });

    rafId = requestAnimationFrame(draw);
  }

  rafId = requestAnimationFrame(draw);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(rafId);
    else rafId = requestAnimationFrame(draw);
  });
}());

/* ------------------------------------------------
   State
   ------------------------------------------------ */
const initialState = () => ({
  nickname: "",
  birthday: "",
  currentQ: 0,
  scores: {
    OI: { O: 0, I: 0 },
    SC: { S: 0, C: 0 },
    WK: { W: 0, K: 0 },
    FD: { F: 0, D: 0 }
  },
  history: []  // 各問の選択を記録: { axis, value }
});

let state = initialState();
let nextTimer  = null;
let currentGem = null;

/* ------------------------------------------------
   DOM 参照
   ------------------------------------------------ */
const nicknameInput = document.getElementById('nickname');
const birthdayInput = document.getElementById('birthday');
const btnStart = document.getElementById('btn-start');
const btnRestart = document.getElementById('btn-restart');
const btnBack = document.getElementById('btn-back');

/* ------------------------------------------------
   入力バリデーション
   ------------------------------------------------ */
function validateInput() {
  btnStart.disabled = !(nicknameInput.value.trim() && birthdayInput.value);
}

nicknameInput.addEventListener('input', validateInput);
birthdayInput.addEventListener('change', validateInput);

/* ------------------------------------------------
   診断スタート
   ------------------------------------------------ */
btnStart.addEventListener('click', () => {
  state.nickname = nicknameInput.value.trim();
  state.birthday = birthdayInput.value;
  showScreen('screen-question');
  renderQuestion();
});

/* ------------------------------------------------
   質問描画
   ------------------------------------------------ */
function renderQuestion() {
  const q = QUESTIONS[state.currentQ];
  const current = state.currentQ + 1;
  const total = QUESTIONS.length;

  document.getElementById('question-num').textContent = `Q${current}`;
  document.getElementById('question-text').textContent = q.text;
  document.getElementById('current-num').textContent = current;
  document.getElementById('progress-fill').style.width =
    `${(state.currentQ / total) * 100}%`;

  btnBack.hidden = state.currentQ === 0;

  const choicesEl = document.getElementById('choices');
  choicesEl.innerHTML = '';
  q.choices.forEach((c) => {
    const btn = document.createElement('button');
    btn.className = 'choice';
    btn.innerHTML = `<span class="choice-marker"></span><span>${c.text}</span>`;
    btn.addEventListener('click', () => selectChoice(c, btn));
    choicesEl.appendChild(btn);
  });
}

/* ------------------------------------------------
   選択肢処理
   ------------------------------------------------ */
function selectChoice(choice, btnEl) {
  document.querySelectorAll('.choice').forEach(el =>
    el.classList.remove('selected'));
  btnEl.classList.add('selected');

  state.scores[choice.axis][choice.value]++;
  state.history.push({ axis: choice.axis, value: choice.value });

  nextTimer = setTimeout(() => {
    if (state.currentQ < QUESTIONS.length - 1) {
      state.currentQ++;
      renderQuestion();
    } else {
      document.getElementById('progress-fill').style.width = '100%';
      showScreen('screen-loading');
      setTimeout(showResult, 2200);
    }
  }, 400);
}

/* ------------------------------------------------
   戻る
   ------------------------------------------------ */
function goBack() {
  clearTimeout(nextTimer);

  const last = state.history.pop();
  if (last) state.scores[last.axis][last.value]--;

  state.currentQ--;
  renderQuestion();
}

btnBack.addEventListener('click', goBack);

/* ------------------------------------------------
   タイプ判定
   ------------------------------------------------ */
function calculateType() {
  const s = state.scores;
  return (
    (s.OI.O >= s.OI.I ? 'O' : 'I') +
    (s.SC.S >= s.SC.C ? 'S' : 'C') +
    (s.WK.W >= s.WK.K ? 'W' : 'K') +
    (s.FD.F >= s.FD.D ? 'F' : 'D')
  );
}

/* ------------------------------------------------
   誕生石取得
   ------------------------------------------------ */
function getBirthstone(dateStr) {
  const month = parseInt(dateStr.split('-')[1], 10);
  return BIRTHSTONES[month] || "—";
}

/* ------------------------------------------------
   組み合わせメッセージ生成
   ------------------------------------------------ */
function makeComboMessage(gemName, birthstone) {
  if (gemName === birthstone) {
    return `生まれた月の石と、内なる宝石が重なる稀有な巡り合わせ。あなたの輝きは、運命に祝福されています。`;
  }
  return `内なる宝石「${gemName}」に、誕生月の「${birthstone}」がお守りとして寄り添います。二つの石が、あなたの両側を照らしてくれるでしょう。`;
}

/* ------------------------------------------------
   宝石ビジュアル描画
   ------------------------------------------------ */
function renderGemVisual(gem) {
  const svg = `
    <svg class="gem-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="gem-grad" cx="35%" cy="30%">
          <stop offset="0%" stop-color="${gem.colorLight}" stop-opacity="1"/>
          <stop offset="55%" stop-color="${gem.color}" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="${gem.color}" stop-opacity="1"/>
        </radialGradient>
        <linearGradient id="gem-shine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.7"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <polygon points="100,20 160,60 170,120 100,180 30,120 40,60"
               fill="url(#gem-grad)" stroke="#b08947" stroke-width="1"/>
      <polygon points="100,20 160,60 170,120 100,180 30,120 40,60"
               fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.8"/>
      <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(255,255,255,0.3)" stroke-width="0.6"/>
      <line x1="40" y1="60" x2="160" y2="60" stroke="rgba(255,255,255,0.3)" stroke-width="0.6"/>
      <line x1="30" y1="120" x2="170" y2="120" stroke="rgba(255,255,255,0.3)" stroke-width="0.6"/>
      <line x1="40" y1="60" x2="100" y2="180" stroke="rgba(255,255,255,0.25)" stroke-width="0.6"/>
      <line x1="160" y1="60" x2="100" y2="180" stroke="rgba(255,255,255,0.25)" stroke-width="0.6"/>
      <line x1="40" y1="60" x2="170" y2="120" stroke="rgba(255,255,255,0.2)" stroke-width="0.6"/>
      <line x1="160" y1="60" x2="30" y2="120" stroke="rgba(255,255,255,0.2)" stroke-width="0.6"/>
      <polygon points="100,20 160,60 100,90 40,60" fill="url(#gem-shine)" opacity="0.5"/>
      <ellipse cx="75" cy="55" rx="16" ry="7" fill="#ffffff" opacity="0.6"/>
    </svg>
  `;
  document.getElementById('gem-visual').innerHTML = svg;
}

/* ------------------------------------------------
   結果画面描画
   ------------------------------------------------ */
function showResult() {
  const type = calculateType();
  const gem = GEM_DATABASE[type];
  const birthstone = getBirthstone(state.birthday);

  document.getElementById('result-nickname').textContent = state.nickname;
  document.getElementById('gem-name-jp').textContent = gem.nameJp;
  document.getElementById('gem-name-en').textContent = gem.nameEn;
  document.getElementById('gem-catch').textContent = gem.catch;
  document.getElementById('gem-description').textContent = gem.description;
  document.getElementById('birthstone').textContent = birthstone;
  document.getElementById('element').textContent = gem.element;

  const traitsEl = document.getElementById('traits');
  traitsEl.innerHTML = '';
  gem.traits.forEach(t => {
    const span = document.createElement('span');
    span.className = 'trait';
    span.textContent = t;
    traitsEl.appendChild(span);
  });

  document.getElementById('combo-message').textContent =
    makeComboMessage(gem.nameJp, birthstone);

  currentGem = gem;
  renderGemVisual(gem);
  showScreen('screen-result');

  const card = document.querySelector('#screen-result .card');
  card.classList.remove('result-entering');
  requestAnimationFrame(() => card.classList.add('result-entering'));
  triggerResultCelebration(gem.color, gem.colorLight);
}

/* ------------------------------------------------
   診断完了 — 達成演出
   ------------------------------------------------ */
function triggerResultCelebration(color, colorLight) {
  const gemEl = document.getElementById('gem-visual');

  // 宝石の入場 (浮遊を一時上書き → 完了後に戻す)
  gemEl.style.animation = 'gemReveal 1s cubic-bezier(0.34, 1.56, 0.64, 1) both 0.18s';
  setTimeout(() => { gemEl.style.animation = ''; }, 1600);

  // DOM 描画後に座標を確定してから全演出を起動
  setTimeout(() => {
    const rect = gemEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const palette       = [color, colorLight, '#d4b878', '#c4a0d0', '#9ecfd0', '#e8b4b0', '#8dc4a0'];
    const sparkleColors = [color, colorLight, '#d4b878', '#ffffff', '#c4a0d0', '#ffe0a0'];

    // 光のリング 2波
    spawnRing(cx, cy, colorLight, 0);
    spawnRing(cx, cy, '#d4b878',  0.2);

    // パーティクルバースト
    const count = 26;
    for (let i = 0; i < count; i++) {
      const angle    = (360 / count) * i + (Math.random() - 0.5) * 25;
      const dist     = 65 + Math.random() * 115;
      const size     = 5 + Math.random() * 9;
      const hue      = palette[i % palette.length];
      const dur      = 0.7 + Math.random() * 0.5;
      const delay    = Math.random() * 0.18;
      const rad      = (angle * Math.PI) / 180;
      const isCircle = Math.random() > 0.35;
      const el       = document.createElement('div');

      el.style.cssText = [
        `position:fixed`, `left:${cx}px`, `top:${cy}px`,
        `width:${size}px`, `height:${size}px`,
        `background:${hue}`,
        `border-radius:${isCircle ? '50%' : '3px'}`,
        `pointer-events:none`, `z-index:9999`,
        `--tx:${(Math.cos(rad) * dist).toFixed(1)}px`,
        `--ty:${(Math.sin(rad) * dist).toFixed(1)}px`,
        `--rot:${Math.round(Math.random() * 360)}deg`,
        `animation:particleBurst ${dur.toFixed(2)}s ease-out ${delay.toFixed(2)}s both`,
      ].join(';');
      document.body.appendChild(el);
      setTimeout(() => el.remove(), (dur + delay + 0.15) * 1000);
    }

    // キラキラ ✦ 第1波 — 宝石が開ききった直後、近距離で密集
    spawnSparkles(cx, cy, sparkleColors, 14, 22, 85,  0.40);

    // キラキラ ✦ 第2波 — やや広がって余韻
    spawnSparkles(cx, cy, sparkleColors, 10, 55, 130, 0.85);

    // 細かいキラキラを画面の外まではじける
    spawnEdgeBurst(cx, cy, [color, colorLight, '#ffffff', '#e8c870', '#c4a0d0']);

  }, 200);
}

function spawnRing(cx, cy, color, delay) {
  const el = document.createElement('div');
  el.style.cssText = [
    `position:fixed`, `left:${cx}px`, `top:${cy}px`,
    `width:80px`, `height:80px`,
    `border:2.5px solid ${color}`,
    `border-radius:50%`,
    `pointer-events:none`, `z-index:9998`,
    `animation:lightRing 0.9s ease-out ${delay}s both`,
  ].join(';');
  document.body.appendChild(el);
  setTimeout(() => el.remove(), (0.9 + delay + 0.1) * 1000);
}

function spawnEdgeBurst(cx, cy, colors) {
  const count  = 72;
  const maxDim = Math.hypot(window.innerWidth, window.innerHeight);

  for (let i = 0; i < count; i++) {
    const el    = document.createElement('div');
    const angle = Math.random() * 360;
    const rad   = (angle * Math.PI) / 180;
    const dist  = maxDim * (0.55 + Math.random() * 0.6);
    const size  = 1.5 + Math.random() * 2.5;
    const hue   = colors[Math.floor(Math.random() * colors.length)];
    const dur   = 0.85 + Math.random() * 0.5;
    const delay = Math.random() * 0.22;

    el.style.cssText = [
      `position:fixed`, `left:${cx}px`, `top:${cy}px`,
      `width:${size}px`, `height:${size}px`,
      `background:${hue}`,
      `border-radius:50%`,
      `pointer-events:none`, `z-index:9999`,
      `--tx:${(Math.cos(rad) * dist).toFixed(1)}px`,
      `--ty:${(Math.sin(rad) * dist).toFixed(1)}px`,
      `animation:edgeBurst ${dur.toFixed(2)}s ease-out ${delay.toFixed(2)}s both`,
    ].join(';');

    document.body.appendChild(el);
    setTimeout(() => el.remove(), (dur + delay + 0.15) * 1000);
  }
}

function spawnSparkles(cx, cy, colors, count, minDist, maxDist, baseDelay) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * 360;
    const dist  = minDist + Math.random() * (maxDist - minDist);
    const rad   = (angle * Math.PI) / 180;
    const x     = cx + Math.cos(rad) * dist;
    const y     = cy + Math.sin(rad) * dist;
    const size  = 10 + Math.random() * 16;
    const dur   = 0.48 + Math.random() * 0.36;
    const delay = baseDelay + Math.random() * 0.28;
    const hue   = colors[Math.floor(Math.random() * colors.length)];
    const el    = document.createElement('div');

    el.textContent = '✦';
    el.style.cssText = [
      `position:fixed`, `left:${x}px`, `top:${y}px`,
      `font-size:${size}px`, `color:${hue}`,
      `pointer-events:none`, `z-index:9999`, `line-height:1`,
      `animation:sparklePop ${dur.toFixed(2)}s ease-out ${delay.toFixed(2)}s both`,
    ].join(';');
    document.body.appendChild(el);
    setTimeout(() => el.remove(), (dur + delay + 0.1) * 1000);
  }
}

/* ------------------------------------------------
   画面切り替え
   ------------------------------------------------ */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s =>
    s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ------------------------------------------------
   シェア機能
   ------------------------------------------------ */
function makeShareText() {
  if (!currentGem) return '';
  return `【宝石16タイプ診断】\n${state.nickname}さんの宝石は「${currentGem.nameJp}」✨\n${currentGem.catch}\n\n#宝石16タイプ診断 #${currentGem.nameJp}`;
}

function showShareToast(msg) {
  const el = document.createElement('div');
  el.className = 'share-toast';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2600);
}

document.getElementById('share-x').addEventListener('click', () => {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(makeShareText())}`;
  window.open(url, '_blank', 'noopener,noreferrer');
});

document.getElementById('share-line').addEventListener('click', () => {
  const url = `https://line.me/R/msg/text/?${encodeURIComponent(makeShareText() + '\n' + location.href)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
});

document.getElementById('share-instagram').addEventListener('click', async () => {
  const text = makeShareText();
  if (navigator.share) {
    try { await navigator.share({ text }); } catch (_) { /* キャンセル */ }
  } else {
    try {
      await navigator.clipboard.writeText(text);
      showShareToast('コピーしました ✦ インスタに貼り付けてね');
    } catch (_) {
      showShareToast('テキストを手動でコピーしてください');
    }
  }
});

/* ------------------------------------------------
   リスタート
   ------------------------------------------------ */
btnRestart.addEventListener('click', () => {
  state = initialState();
  nicknameInput.value = "";
  birthdayInput.value = "";
  validateInput();
  showScreen('screen-input');
});
