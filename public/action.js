function increaseCounter(counterId) {
    let counter = document.getElementById(counterId);
    let value = parseInt(counter.innerText);
    if (value < 99) {
        counter.innerText = value + 1;
    }
}

function decreaseCounter(counterId) {
    let counter = document.getElementById(counterId);
    let value = parseInt(counter.innerText);
    if (value > 0) {
        counter.innerText = value - 1;
    }
}