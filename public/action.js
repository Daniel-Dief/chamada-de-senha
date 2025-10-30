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
async function atualizarSenhas() {
    try {
        const response = await fetch('/getPasswords');
        if (!response.ok) {
            console.error('Não foi possível buscar as senhas do servidor.');
            return;
        }
        const data = await response.json();
        document.getElementById('counter1').innerText = data.senha_normal;
        document.getElementById('counter2').innerText = data.senha_preferencial;
    } catch (error) {
        console.error('Erro ao tentar atualizar os contadores:', error);
    }
}

atualizarSenhas();

setInterval(atualizarSenhas, 1000);