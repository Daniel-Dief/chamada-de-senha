const form = document.querySelector("#admin_form")
const inputP = document.querySelector("#primary")
const inputS = document.querySelector("#secondary")

fetch('/getPasswords')
.then(response => {
    if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.status);
    }
    return response.json();
})
.then(data => {
    console.log('Corpo da resposta:', data);
    inputP.value = data.senha_normal
    inputS.value = data.senha_preferencial
})


form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const payload = JSON.stringify({
        "primary_password": Number(inputP.value),
        "secondary_password": Number(inputS.value)
    })

    const response = await fetch("/setPasswords", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: payload
    });

    console.log(response)
})