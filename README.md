# Nico-style-twitch-chat-for-streamlabs（fork版）

このプロジェクトは、**Duckator様の公開されたNico-style-twitch-chat-for-streamlabsをフォーク**し、  
以下のカスタマイズを加えたバージョンです。

---

## ⚠️ 注意事項

本プロジェクトは個人によって作成・改造されたものであり、  
動作の正確性や安全性を保証するものではありません。  
ご利用に際して発生したいかなる不具合・損害についても、  
作者は一切の責任を負いかねますので、**ご自身の責任においてご利用ください**。

> This project is provided "as is" without warranty of any kind.  
> The author is not liable for any issues or damages resulting from use.

---

##　📄 元プロジェクトについて

- オリジナル: [Duckator/Nico-style-twitch-chat-for-streamlabs](https://github.com/Duckator/Nico-style-twitch-chat-for-streamlabs)
- 作者: Duckator(敬称略)
- ライセンス: GPL-3.0 licenseを継承

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

- 空いている行に自動で割り当て
- 全行埋まっている場合は、重ねて強制表示
- コメントの長さに応じてスクロール速度を調整
- ユーザー名・バッジも流れるように統合表示
- CSSアニメーションとJavaScript制御による自然な動作

---

## 💬 使い方・詳細
[Streamlabs](https://streamlabs.com/) をお使いの上、Chat Box に以下の内容を反映させてください。  
Streamlabsの基本的な使い方についてはここでは説明を省略します。

> **フォントサイズは「40px」** に設定してください。

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
```

### 2. CSS構造
以下の2つのいずれかを選択して、Chat Box の Custom CSS を全て置き換えてください。

- nicoTwitchChatNoName.css
-> コメントに名前を表示せず、ニコニコ動画風の無記名チャットにしたい方向け

- nicoTwitchChat.css
-> コメントに名前を表示。配信者が誰の発言か分かるようにしたい方向け




### 3. JS構造
nicoTwitchChat.js の内容をコピーして、Chat Box の JavaScript に貼り付けてください。
すでに他のイベントリスナーを使用している場合は、内容を手動でマージしてください。

JavaScriptの編集・適用は自己責任で行ってください。
