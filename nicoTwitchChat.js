// Please use event listeners to run functions.
document.addEventListener('onLoad', function (obj) {
  // obj will be empty for chat widget
  // this will fire only once when the widget loads
});

document.addEventListener('onEventReceived', function (obj) {
  // obj will contain information about the event
});
const log = document.getElementById("log");
const lineHeight = 80;
const maxLines = Math.floor(window.innerHeight / lineHeight);
const lineStatus = new Array(maxLines).fill(null); // 各行に表示中の要素を記録（nullなら空き）

function canReuseLine(lineIndex, newMsgWidth) {
    const existing = lineStatus[lineIndex];
    if (!existing) return true;

    const rect = existing.getBoundingClientRect();
    return rect.right + 50 < window.innerWidth; // 最低50px空いてたらOK
}

function findAvailableLine(msgWidth) {
    for (let i = 0; i < maxLines; i++) {
        if (canReuseLine(i, msgWidth)) {
            return i;
        }
    }
    // すべて重なりそうな場合はランダムに1行選んで被せる
    return Math.floor(Math.random() * maxLines);
}

const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
        for (let node of mutation.addedNodes) {
            const msg = node.nodeType === 1 ? node.querySelector('.message') : null;
            if (!msg) continue;

            msg.style.position = 'absolute';
            msg.style.left = '100vw'; // スタート位置を初期化（必要）

            const msgWidth = msg.offsetWidth;
            const screenWidth = window.innerWidth;
            const totalDistance = screenWidth + msgWidth;
            const rawDuration = 5000 / (totalDistance / 2500);
            const duration = Math.max(2000, rawDuration);

            // 行を選ぶ（空いてる or 重なってなければ再利用）
            const line = findAvailableLine(msgWidth);
            const topPos = line * lineHeight;

            msg.style.top = `${topPos}px`;
            msg.style.animation = 'none';
            void msg.offsetHeight;
            msg.style.animation = `slideInLeftToRight ${duration}ms linear forwards`;

            // この行に現在のmsgを登録（上書きOK）
            lineStatus[line] = msg;

            // 削除後にlineStatusを空に戻す
            setTimeout(() => {
                if (lineStatus[line] === msg) {
                    lineStatus[line] = null;
                }
            }, duration);
        }
    }
});

observer.observe(log, { childList: true });
