function setClock() {
    const hours = document.getElementById('hours').value;
    const minutes = document.getElementById('minutes').value;

    if (hours === '' || minutes === '') {
        alert('Please set both hours and minutes.');
        return;
    }

    const hourHand = document.getElementById('hour-hand');
    const minuteHand = document.getElementById('minute-hand');

    const hourDegree = (hours % 12) * 30 + minutes * 0.5;
    const minuteDegree = minutes * 6;

    hourHand.style.transform = `translateX(-50%) rotate(${hourDegree}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${minuteDegree}deg)`;
}

document.addEventListener('DOMContentLoaded', () => {
    setClock(); // Initialize the clock with default values
});
