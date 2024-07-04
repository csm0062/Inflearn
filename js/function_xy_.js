function logCoordinates(event) {
    const gameContainer = document.getElementById('game-container');
    const rect = gameContainer.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    console.log(`Mouse position relative to game-container: X=${x}, Y=${y}`);
    console.log(`Mouse position in percentage: X=${xPercent.toFixed(2)}%, Y=${yPercent.toFixed(2)}%`);
}

document.getElementById('game-container').addEventListener('click', logCoordinates);
