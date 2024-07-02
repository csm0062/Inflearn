window.onload = function() {
    console.log(document.getElementById('button-item'));
document.getElementById('button-item').addEventListener('click', function() {
    document.getElementById('intro').style.display = 'block';
});

// 특정 값이 콘솔에 출력될 때 모달을 표시하는 예제
function showItemModalOnConsoleValue(value) {
    if (consoleOutput.includes(value)) {
        document.getElementById('intro').style.display = 'block';
    }
}

let consoleOutput = [];
const originalConsoleLog = console.log;
console.log = function(message) {
    consoleOutput.push(message);
    originalConsoleLog.apply(console, arguments);
    showItemModalOnConsoleValue('specificValue');
    if (message === 'showPicture2') {
        showItemBox('picture2');
        localStorage.setItem('showPicture2', 'true');
    }
};

// 특정 이벤트가 발생했을 때 이미지를 표시하는 함수
function showItemBox(boxId) {
    const box = document.getElementById(boxId);
    if (box) {
        box.style.visibility = 'visible';
    }
}

// 페이지 로드 시 로컬 저장소를 확인하여 아이템 표시
window.addEventListener('load', () => {
    for (let i = 1; i <= 7; i++) {
        if (localStorage.getItem(`showPicture${i}`) === 'true') {
            showItemBox(`picture${i}`);
        }
    }
});
};