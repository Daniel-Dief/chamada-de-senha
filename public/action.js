async function increaseCounter(counterId) {
    let url = '';

    if (counterId === 'counter1') {
        url = '/addPrimaryPassword';
    } else if (counterId === 'counter2') {
        url = '/addSecondaryPassword';
    } else {
        return;
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('Erro na resposta do servidor');
        }

        const data = await response.json();
        const counterElement = document.getElementById(counterId);

        if (counterId === 'counter1') {
            counterElement.innerText = data.primaryNumber;
        } else if (counterId === 'counter2') {
            counterElement.innerText = data.secondayNumber;
        }

    } catch (error) {
        console.error('Falha na requisição:', error);
    }
}

function decreaseCounter(counterId) {
    let counter = document.getElementById(counterId);
    let value = parseInt(counter.innerText);
    if (value > 0) {
        counter.innerText = value - 1;
    }
}