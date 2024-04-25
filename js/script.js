const $email = document.querySelector("#email")
const $password = document.querySelector("#password")
const $form = document.querySelector("form")

$form.addEventListener("submit", async (event) => {
    event.preventDefault()
    loading()
    
    loginUser($email.value,$password.value)
    .then(res => {
        console.log(res)
    })
    .catch(error => {
        messageFirebase(error)
    })
    .finally(() => loading(false))
})// Logar

const cadastrar = async () => {
    if(!$email.value.replace(/\s/g, "") || !$password.value.replace(/\s/g, "")) {
        dialog.showAlertMessage("Cadastro", "Campo vazio!", "rightTop", true, 1500)
    }
    else {        
        const name = await dialog.showInputMessage("Cadastro", "Digite seu nome:", "center", "Nome")
        createUser($email.value,$password.value,name)
        .then(res => console.log(res))// Cadastro ok
        .catch(error => {
            $form.reset()
            messageFirebase(error)
        })// Cadastro erro
    }// Valida se campos estão vazios
}// Cadastrar

const recuperarSenha = async () => {
    loading()

    resetPassword($email.value.replace(/\s/g, ""))
    .then(() => {
        dialog.showSuccessMessage("Senha",`Um email para redefinir a senha foi envidado para ${$email.value}.`,"center")
    })
    .catch(error => {
        messageFirebase(error)
    })
    .finally(() => loading(false))
}