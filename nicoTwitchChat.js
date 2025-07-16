// Please use event listeners to run functions.
document.addEventListener('onLoad', function (obj) {
  // obj will be empty for chat widget
  // this will fire only once when the widget loads
});

document.addEventListener('onEventReceived', function (obj) {
  // obj will contain information about the event
});
const log = document.getElementById("log");
const lineHeight = 40;
const maxLines = Math.floor(window.innerHeight / lineHeight);
const lineStatus = new Array(maxLines).fill(false);

// 0行目から順に使用
function getNextAvailableLine() {
    for (let i = 0; i < maxLines; i++) {
        if (!lineStatus[i]) return i;
    }
    return null;
}

const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
        for (let node of mutation.addedNodes) {
            const msg = node.nodeType === 1 ? node.querySelector('.message') : null;
            if (!msg) return;
            const line = getNextAvailableLine();

            if (line === null) {
                msg.style.display = 'none';
                return;
            }

            const topPos = line * lineHeight;
            msg.style.top = `${topPos}px`;
            msg.style.position = 'absolute';

            // 距離に応じて速度を上げ、最大10秒に制限
            const messageWidth = msg.offsetWidth;
            const screenWidth = window.innerWidth;
            const totalDistance = screenWidth + messageWidth;
            const duration = 5000 / (totalDistance / 2500);

            // アニメーション設定
            msg.style.animationName = 'none';
            void msg.offsetHeight; // 再描画
            msg.style.animation = `slideInLeftToRight ${duration}ms linear forwards`;

            // 行をロック
            lineStatus[line] = true;
            setTimeout(() => {
                lineStatus[line] = false;
            }, duration);
        }
    }
});

observer.observe(log, { childList: true });
