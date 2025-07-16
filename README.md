# Nico-style-twitch-chat-for-streamlabs（fork版）

このプロジェクトは、**Duckator様の公開されたNico-style-twitch-chat-for-streamlabsをフォーク**し、  
以下のカスタマイズを加えたバージョンです。

---

## 🪞 元プロジェクトについて

- オリジナル: [Duckator/Nico-style-twitch-chat-for-streamlabs](https://github.com/Duckator/Nico-style-twitch-chat-for-streamlabs)
- 作者: Duckator(敬称略)
- ライセンス: オリジナルのGPL-3.0 licenseを継承

---

## 🛠 改造内容

- コメントを**画面上部から横スクロール表示**
- **行ごとに管理**し、被り防止（全行使用時は被せて表示）
- **コメントの長さに応じて速度自動調整**
- MutationObserver により**動的DOM追加に対応**
- **バッジ・ユーザー名の表示復活**
- 行数の自動計算 & 制御（画面高さに基づく）

---

## 🔧 特徴

- 自動的に空いている行を割り当てて被りを防止
- 全行埋まっている場合も強制的に表示（重ねて流す）
- コメントの長さに応じて自動でスクロール速度調整
- ユーザー名やバッジも流れるように統合表示
- CSSアニメーションとJS制御で自然な演出を実現

---

## 💬 使い方・詳細
### 1. HTML構造

Custom HTML/CSSを以下のように設定する必要があります。

```HTML
<!-- chat item -->
<script type="text/template" id="chatlist_item">
    <div data-from="{from}" data-id="{messageId}">
        <span class="meta" style="color: {color}">
            <span class="badges"></span>
            <span class="name">{from}</span>
        </span>

        <span class="message">{message}</span>
    </div>
</script>



```CSS
CSSの内容を全文上書きしてください。

・nicoTwitchChatNoName.css
コメントに名前を記述しない本来のニコニコ動画感を出したいなら
・nicoTwitchChat.css
コメントに名前を記述する。配信向け


```JS
nicoTwitchChat.jsの内容を上書きしてください。

すでにイベントリスナーを使用している場合はご自身でマージしてください。
その場合、動作保証は出来ないので自己責任でお願いいたします。