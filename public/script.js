const input_login = document.querySelector("#login")
const input_password = document.querySelector("#password")
const form = document.querySelector("#login_form")


form.addEventListener("submit", () => {
    event.preventDefault()
    if(input_login.value == "admin" && input_password.value == "admin") {
        window.location.replace("./action.html")
    }else {
        alert("Login ou senha incorretos!")
    }
})