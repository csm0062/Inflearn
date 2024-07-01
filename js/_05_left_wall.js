// document.getElementById('game-container').addEventListener('mousemove', function(event) {
//     const gameContainer = document.getElementById('game-container');
//     const rect = gameContainer.getBoundingClientRect();
    
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;
    
//     console.log(`Mouse position relative to game-container: X=${x}, Y=${y}`);
// });


// 클릭 이벤트 관련 변수 초기화
let buttonDisplayed = false; 

const imageElement = document.getElementById('left-wall-image');
const leftButton = document.getElementById('left-button');
const rightButton = document.getElementById('right-button');

// 클릭가능한 영역을 추가하는 함수
/*
 * 사진은 나중에 다시 하는거로
 */
function addClickableAreas() {
    const clickableAreas = [
         {id: 'menu', x: 203, y: 142, width: 120, height: 160, image: '../image/images/leftwall/메뉴판.PNG'},
         {id: 'pianokey', x: 399, y: 206, width: 210, height: 160, image: '../image/images/leftwall/피아노건반.PNG'},
         {id: 'mirror', x: 712, y: 78, width: 160, height: 190, image: '../image/images/leftwall/거울.PNG'},
         {id: 'flowerpot', x: 703, y: 360, width: 130, height: 379, image: '../image/images/leftwall/꽃화분.PNG'},
         {id: 'television', x: 75, y: 342, width: 170, height: 160, image: '../image/images/leftwall/티비투명.PNG'},
         {id: 'green_drawer', x: 67, y: 537, width: 370, height: 220, image: '../image/images/leftwall/왼쪽벽열린선반.PNG'},
         {id: 'chest', x: 298, y: 417, width: 100, height: 100, image: '../image/images/leftwall/열린상자_빈.PNG'},
         {id: 'grandfather_clock', x: 983, y: 147, width: 230, height: 590, image: '../image/images/leftwall/괘종시계.PNG'}
    ];

    clickableAreas.forEach(area => {
        const overlay = document.createElement('div');
        overlay.classList.add('clickable-area');
        overlay.style.position = 'absolute'; // 오버레이를 절대 위치로 설정
        overlay.style.left = area.x + 'px';
        overlay.style.top = area.y + 'px';
        overlay.style.width = area.width + 'px';
        overlay.style.height = area.height + 'px';
        overlay.style.backgroundColor = 'transparent'; // 영역이 보이지 않도록 투명하게 설정
        overlay.style.pointerEvents = 'auto'; // 오버레이가 클릭 이벤트를 받도록 설정
        overlay.id = area.id;

        document.getElementById('game-container').appendChild(overlay);

        // 마우스 포인터를 변경하기 위한 이벤트 리스너 추가
        overlay.addEventListener('mouseenter', function() {
            document.body.style.cursor = 'pointer';
        });
        overlay.addEventListener('mouseleave', function() {
            document.body.style.cursor = 'default';
        });

        // 클릭 이벤트 리스너 추가
        overlay.addEventListener('click', function(event) {
            event.stopPropagation(); // 이벤트 전파를 막아 오버레이 뒤의 요소가 클릭되지 않도록 함
            handleFrameClick(event, area);
        });
    })
}

// 액자 클릭 이벤트를 처리하는 함수
function handleFrameClick(event, area) {
    if (area.href) {
        window.location.href = area.href;
    } else {
        imageElement.src = area.image;
        addCloseButton(); // 'Back' 버튼 추가
        removeClickableAreas();
        leftButton.style.display = 'none';
        rightButton.style.display = 'none';
    }
}

// 클릭 가능한 영역을 제거하는 함수
function removeClickableAreas() {
    const overlays = document.querySelectorAll('.clickable-area');
    overlays.forEach(overlay => {
        overlay.remove();
    });
    document.body.style.cursor = 'default'; // 커서를 기본값으로 설정
}

// "닫기" 버튼 추가 함수
function addCloseButton() {
    const closeButton = document.createElement("button");
    closeButton.textContent = "Back";
    closeButton.id = "close-button";
    closeButton.className = "close-button";
    document.getElementById('game-container').appendChild(closeButton);

    buttonDisplayed = true; 

    closeButton.addEventListener('click', function() {
        imageElement.src = '../image/images/leftwall/왼쪽벽.PNG'; // 원래 이미지로 돌아가기
        closeButton.remove();
        buttonDisplayed = false;
        removeClickableAreas(); // 클릭 가능한 모든 영역 제거
        addClickableAreas(); // 닫기 버튼 클릭 시 영역 다시 추가
        leftButton.style.display = 'block';
        rightButton.style.display = 'block';
    });
}

// 초기 영역 추가
addClickableAreas();
