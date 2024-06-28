// 클릭 이벤트 관련 변수 초기화
let buttonDisplayed = false; 
let secondImageDisplayed = false; 
let thirdImageDisplayed = false;
let otherAreaClicked = false; 

const liquorClickCounts = {
    '봄베이따르기': 0,
    '럼따르기': 0,
    '스미노프따르기': 0,
    '오렌지주스따르기': 0,
    '달모어따르기': 0,
    '레몬주스따르기': 0
};

const liquorAreas = [
    { x: 285, y: 190, width: 56, height: 150, image: '../image/images/barpage/봄베이따르기.png', key: '봄베이따르기' },
    { x: 369, y: 190, width: 77, height: 150, image: '../image/images/barpage/럼따르기.png', key: '럼따르기' },
    { x: 450, y: 190, width: 50, height: 150, image: '../image/images/barpage/스미노프따르기.png', key: '스미노프따르기' },
    { x: 285, y: 400, width: 50, height: 140, image: '../image/images/barpage/오렌지주스따르기.png', key: '오렌지주스따르기' },
    { x: 369, y: 390, width: 77, height: 150, image: '../image/images/barpage/달모어따르기.png', key: '달모어따르기' },
    { x: 450, y: 390, width: 50, height: 150, image: '../image/images/barpage/레몬주스따르기.png', key: '레몬주스따르기' }
];

const imageElement = document.getElementById('bar-image');

// 클릭 가능한 영역을 추가하는 함수
function addClickableAreas() {
    const clickableAreas = [
        { id: 'boyfriend-area', x: 270, y: 300, width: 180, height: 440 }, // 남자친구 영역
        { id: 'waiter-area', x: 520, y: 250, width: 180, height: 280 }, // 웨이터 영역
        { id: 'liquor-area', x: 700, y: 140, width: 350, height: 400 }  // 술장 영역
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
            handleOverlayClick(event, area);
        });
    });
}

// 술장 클릭 가능한 영역을 추가하는 함수
function addLiquorAreas() {
    liquorAreas.forEach(area => {
        const overlay = document.createElement('div');
        overlay.classList.add('liquor-area');
        overlay.style.position = 'absolute'; // 오버레이를 절대 위치로 설정
        overlay.style.left = area.x + 'px';
        overlay.style.top = area.y + 'px';
        overlay.style.width = area.width + 'px';
        overlay.style.height = area.height + 'px';
        overlay.style.backgroundColor = 'transparent'; // 영역이 보이지 않도록 투명하게 설정
        overlay.style.pointerEvents = 'auto'; // 오버레이가 클릭 이벤트를 받도록 설정

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
            handleLiquorClick(event, area);
        });
    });
}

// 클릭 가능한 영역을 제거하는 함수
function removeClickableAreas() {
    const overlays = document.querySelectorAll('.clickable-area, .liquor-area, .paper-area');
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
        imageElement.src = '../image/images/barpage/더호스텔바.PNG';
        closeButton.remove();
        buttonDisplayed = false;
        otherAreaClicked = false; 
        secondImageDisplayed = false;
        thirdImageDisplayed = false;
        resetLiquorClickCounts();
        removeClickableAreas(); // 클릭 가능한 모든 영역 제거
        addClickableAreas(); // 닫기 버튼 클릭 시 영역 다시 추가
    });
}

// 클릭 이벤트를 처리하는 함수
function handleOverlayClick(event, area) {
    const clickX = event.clientX - imageElement.getBoundingClientRect().left;
    const clickY = event.clientY - imageElement.getBoundingClientRect().top;

    function checkAreaClick(area) {
        return clickX >= area.x && clickX <= (area.x + area.width) &&
               clickY >= area.y && clickY <= (area.y + area.height);
    }

    // 남자친구 영역 클릭 시 동작
    if (area.id === 'boyfriend-area' && checkAreaClick(area) && !buttonDisplayed) {
        imageElement.src = '../image/images/barpage/내버려둬.PNG';
        otherAreaClicked = true; 
        addCloseButton();
        removeClickableAreas(); // 영역 제거
        addPaperArea(); // 남자친구 클릭 시 추가 영역 생성
    } 
    // 웨이터 영역 클릭 시 동작
    else if (area.id === 'waiter-area' && checkAreaClick(area) && !buttonDisplayed) {
        imageElement.src = '../image/images/barpage/말하는웨이터.PNG';
        otherAreaClicked = true; 
        addCloseButton();
        removeClickableAreas(); // 영역 제거
    } 
    // 술장 영역 클릭 시 동작
    else if (area.id === 'liquor-area' && checkAreaClick(area) && !secondImageDisplayed && !otherAreaClicked) {
        imageElement.src = '../image/images/barpage/술있는곳확대.png';
        secondImageDisplayed = true; 
        addCloseButton();
        removeClickableAreas(); // 영역 제거
        addLiquorAreas(); // 두 번째 이미지 클릭 시 주류 영역 추가
    }
}

// 특정 주류 항목 클릭 이벤트를 처리하는 함수
function handleLiquorClick(event, area) {
    const clickX = event.clientX - imageElement.getBoundingClientRect().left;
    const clickY = event.clientY - imageElement.getBoundingClientRect().top;

    function checkAreaClick(area) {
        return clickX >= area.x && clickX <= (area.x + area.width) &&
               clickY >= area.y && clickY <= (area.y + area.height);
    }

    if (secondImageDisplayed && !thirdImageDisplayed && checkAreaClick(area)) {
        imageElement.src = area.image;
        liquorClickCounts[area.key] += 1;
        thirdImageDisplayed = true; 
        document.getElementById('close-button').style.display = 'none';

        // 1초 후에 두 번째 이미지로 돌아가기
        setTimeout(function() {
            checkLiquorClickCombination();
            imageElement.src = '../image/images/barpage/술있는곳확대.png';
            thirdImageDisplayed = false; 
            document.getElementById('close-button').style.display = 'block';
        }, 1000);
    }
}

// 특정 영역을 클릭했을 때 추가되는 함수
function addPaperArea() {
    const paperArea = { x: 495, y: 717, width: 126, height: 63 };

    const overlay = document.createElement('div');
    overlay.classList.add('paper-area');
    overlay.style.position = 'absolute'; // 오버레이를 절대 위치로 설정
    overlay.style.left = paperArea.x + 'px';
    overlay.style.top = paperArea.y + 'px';
    overlay.style.width = paperArea.width + 'px';
    overlay.style.height = paperArea.height + 'px';
    overlay.style.backgroundColor = 'transparent'; // 영역이 보이지 않도록 투명하게 설정
    overlay.style.pointerEvents = 'auto'; // 오버레이가 클릭 이벤트를 받도록 설정

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
        handlePaperClick(event, paperArea);
    });
}

// 종이 영역 클릭 이벤트를 처리하는 함수
function handlePaperClick(event, area) {
    imageElement.src = '../image/images/barpage/신문.png';
}

// 클릭 횟수를 확인하는 함수
function checkLiquorClickCombination() {
    if (liquorClickCounts['레몬주스따르기'] === 1 &&
        liquorClickCounts['스미노프따르기'] === 1 &&
        liquorClickCounts['오렌지주스따르기'] === 1 &&
        liquorClickCounts['봄베이따르기'] === 0 &&
        liquorClickCounts['럼따르기'] === 0 &&
        liquorClickCounts['달모어따르기'] === 0) {
        setTimeout(function() {
            imageElement.src = '../image/images/barpage/잔을채우다1.png';
            setTimeout(function() {
                imageElement.src = '../image/images/barpage/잔완성.png';
                thirdImageDisplayed = false;
                document.getElementById('close-button').style.display = 'block';
            }, 1000); // 1초 동안 특정 이미지를 표시한 후 원래 이미지로 돌아가기
        }, 500);
        return true;
    }
    return false;
}

// 클릭 횟수를 초기화하는 함수
function resetLiquorClickCounts() {
    for (let key in liquorClickCounts) {
        liquorClickCounts[key] = 0;
    }
}
// 초기 영역 추가
addClickableAreas();