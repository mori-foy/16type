# Gem Type — 16タイプ宝石診断

ニックネームと生年月日、12問の質問に答えると、あなたに合った宝石がわかる診断サイト。

## ✦ 特徴

- オリジナル4軸 × 16タイプ × 16種の宝石
- 生年月日から誕生石を取得し、メイン宝石との組み合わせメッセージを生成
- 白基調 × ゴールドアクセントの上品なデザイン
- レスポンシブ対応（スマホ・PC両対応）
- 外部ライブラリ不要（Google Fontsのみ）

## ✦ ディレクトリ構成

```
gem-type/
├── index.html       # メインHTML
├── css/
│   └── style.css    # スタイル
├── js/
│   ├── data.js      # 質問・宝石データ
│   └── app.js       # メインロジック
├── README.md        # このファイル
└── .gitignore       # Git管理外ファイル
```

## ✦ ローカルでの動作確認（Windows）

### 方法1: そのままブラウザで開く

`index.html` をダブルクリックするだけ。
ファイルパス（`file://...`）で動作するが、一部ブラウザではフォント読み込みに制約が出る場合あり。

### 方法2: ローカルサーバーで起動（推奨）

Pythonがインストールされていれば、コマンドプロンプト（または PowerShell）で：

```cmd
cd path\to\gem-type
python -m http.server 8000
```

ブラウザで http://localhost:8000 を開く。

Node.jsがインストールされていれば：

```cmd
cd path\to\gem-type
npx serve
```

VS Codeの場合は「Live Server」拡張機能を入れて、`index.html` を右クリック →「Open with Live Server」が最も手軽。

## ✦ Git でのバージョン管理

### 初期化〜初回コミット

```cmd
cd path\to\gem-type
git init
git add .
git commit -m "Initial commit: Gem Type 16タイプ宝石診断"
```

### GitHubへプッシュ

GitHubで新規リポジトリ（例: `gem-type`）を作成してから：

```cmd
git branch -M main
git remote add origin https://github.com/あなたのユーザー名/gem-type.git
git push -u origin main
```

### 以降の更新

```cmd
git add .
git commit -m "変更内容のメモ"
git push
```

## ✦ デプロイ

### GitHub Pages（無料・最も手軽）

1. リポジトリの **Settings** → **Pages** へ
2. **Source** を `Deploy from a branch` に
3. **Branch** を `main` / `/ (root)` に設定して **Save**
4. 数分後、`https://あなたのユーザー名.github.io/gem-type/` で公開される

### Vercel（無料・自動デプロイ）

1. https://vercel.com にGitHubアカウントでログイン
2. **Add New** → **Project** → リポジトリを選択
3. そのまま **Deploy** をクリック
4. push するたびに自動デプロイされる

### Netlify（無料・ドラッグ&ドロップでも可）

1. https://app.netlify.com にログイン
2. プロジェクトフォルダをドラッグ&ドロップするだけで公開
3. もしくはGitHub連携で自動デプロイ

## ✦ カスタマイズ

- **質問を変える**: `js/data.js` の `QUESTIONS` 配列を編集
- **宝石の説明を変える**: `js/data.js` の `GEM_DATABASE` を編集
- **デザイン調整**: `css/style.css` 冒頭の `:root` でカラー変数を変更可能

## ✦ ライセンス

個人利用・改変自由
