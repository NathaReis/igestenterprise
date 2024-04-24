const $email = document.querySelector("#email")
const $password = document.querySelector("#password")
const $form = document.querySelector("form")
$form.addEventListener("submit", (event) => {
    event.preventDefault()
    console.log(event.target)
})

const cadastrar = async () => {
    if(!$email.value.replace(/\s/g, "") || !$password.value.replace(/\s/g, "")) {
        dialog.showAlertMessage("Cadastro", "Campo vazio!", "rightTop", 3000)
    }
    else {
        const name = await dialog.showInputMessage("Cadastro", "Digite seu nome:", "center", "Nome")
        createUser($email.value,$password.value,name)
    }// Valida se campos estão vazios
}