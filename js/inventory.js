// 인벤토리 관련 변수 및 함수
let inventory = [];
let inventoryImages = []; // 소지품 이미지들을 저장할 배열
let inventoryText, inventoryBag, modal, modalBackground, modalText;
let modalItems = []; // 모달에 추가된 소지품 이미지들을 저장할 배열
let memo2Clicked = false; // memo2 클릭 여부를 추적하는 변수, 철사 얻는 직접적 힌트기 때문에

// 소지품 칸을 초기화하는 함수
const createInventory = (scene) => {
    // 가방 이미지 추가
    inventoryBag = scene.add.image(1150, 40, 'bag').setInteractive();
    inventoryBag.setScale(0.5);
    inventoryBag.on('pointerdown', () => {
        toggleInventoryModal(scene);
    });
    inventoryBag.on('pointerover', () => {
        document.body.style.cursor = 'pointer';
    });
    inventoryBag.on('pointerout', () => {
        document.body.style.cursor = 'default';
    });

    // 모달 창 생성
    modalBackground = scene.add.rectangle(scene.cameras.main.centerX, scene.cameras.main.centerY - 180, 800, 300, 0xFFFAFA).setAlpha(0).setInteractive(); // 배경색 변경 예시
    modalText = scene.add.text(scene.cameras.main.centerX, 60, '소지품', {
        fontFamily: 'KyoboHandwriting2023wsa',
        fontSize: '24px',
        fill: '#000000'
    }).setAlpha(0).setOrigin(0.5);
    modal = scene.add.container(0, 0, [modalBackground, modalText]).setAlpha(0);
};

// 소지품 칸에 아이템을 추가하는 함수
const addItemToInventory = (item, imageKey) => {
    // 아이템이 이미 소지품에 있는지 확인
    if (!inventory.includes(item)) {
        inventory.push(item);
        inventoryImages.push({ key: imageKey, name: item }); // 소지품 이미지와 이름을 저장
        updateInventoryDisplay();
    } else {
        console.log('아이템이 이미 소지품에 있습니다.');
    }
};

// 소지품 칸의 내용을 업데이트하는 함수
const updateInventoryDisplay = () => {
    if (inventoryText) {
        inventoryText.setText(inventory.map(item => item.name).join('\n'));
    }
};

// 아이템 세부 정보를 표시하는 함수
const showItemDetails = (scene, itemKey) => {
    // 확대해서 보여줄 이미지를 설정
    let enlargedImageKey;
    if (itemKey === 'memo1') {
        enlargedImageKey = 'memo1-1'; // memo1 클릭 시 보여줄 이미지
    } else if (itemKey === 'memo2') {
        enlargedImageKey = 'memo2-1'; // memo2 클릭 시 보여줄 이미지
    }

    // 전체화면 이미지를 추가하고 보이게 설정
    const fullscreenImage = scene.add.image(scene.cameras.main.centerX, scene.cameras.main.centerY, enlargedImageKey)
        .setDisplaySize(scene.cameras.main.width * 0.9, scene.cameras.main.height * 0.9)
        .setAlpha(0)
        .setInteractive();

    scene.tweens.add({
        targets: fullscreenImage,
        alpha: 1,
        duration: 500
    });

    // 클릭 이벤트를 추가하여 이미지를 클릭하면 페이드 아웃하고 제거
    fullscreenImage.on('pointerdown', () => {
        scene.tweens.add({
            targets: fullscreenImage,
            alpha: 0,
            duration: 500,
            onComplete: () => {
                fullscreenImage.destroy();
            }
        });
    });
};

// 인벤토리 모달 창을 토글하는 함수
const toggleInventoryModal = (scene) => {
    if (modal.alpha === 0) {
        // 모달을 보이게 설정
        modal.setAlpha(1);
        modalBackground.setAlpha(0.8);
        modalText.setAlpha(1);

        // 소지품 이미지를 모달에 추가
        inventoryImages.forEach((imageObj, index) => {
            const itemImage = scene.add.image(scene.cameras.main.centerX - 300 + (index % 4) * 200, scene.cameras.main.centerY - 190 + Math.floor(index / 4) * 140, imageObj.key).setScale(0.3);
            const itemText = scene.add.text(scene.cameras.main.centerX - 300 + (index % 4) * 200, scene.cameras.main.centerY - 100 + Math.floor(index / 4) * 140, imageObj.name, {
                fontFamily: 'KyoboHandwriting2023wsa',
                fontSize: '25px', // 폰트 크기 조절
                fill: '#000000'
            }).setOrigin(0.5);
            modal.add([itemImage, itemText]);
            modalItems.push(itemImage); // 추가된 소지품 이미지를 저장
            modalItems.push(itemText); // 추가된 소지품 텍스트를 저장

            // 메모 아이템에 대한 클릭 이벤트 추가
            if (imageObj.key === 'memo1' || imageObj.key === 'memo2') {
                if (imageObj.key === 'memo2') {
                    memo2Clicked = true; // memo2가 클릭되었음을 기록
                }
                itemImage.setInteractive();
                itemImage.on('pointerdown', () => {
                    showItemDetails(scene, imageObj.key);
                });
            }
        });
    } else {
        // 모달을 숨김
        modal.setAlpha(0);
        modalBackground.setAlpha(0);
        modalText.setAlpha(0);

        // 모달에 추가된 소지품 이미지를 제거
        modalItems.forEach(item => item.destroy());
        modalItems = []; // 소지품 이미지 배열 초기화
    }
};

// 초기 인벤토리 생성 함수 호출
document.addEventListener('DOMContentLoaded', function () {
    const scene = { add: { /* Phaser의 scene.add와 비슷한 객체 */ } }; 
    createInventory(scene);
});
