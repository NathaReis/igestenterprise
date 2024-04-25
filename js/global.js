const $corpo = document.querySelector("body")

// Loading
const loadingHtml = 
`<div class="loadingBox hidden">
    <div aria-label="Orange and tan hamster running in a metal wheel" role="img" class="wheel-and-hamster">
        <div class="wheel"></div>
        <div class="hamster">
            <div class="hamster__body">
                <div class="hamster__head">
                    <div class="hamster__ear"></div>
                    <div class="hamster__eye"></div>
                    <div class="hamster__nose"></div>
                </div>
                <div class="hamster__limb hamster__limb--fr"></div>
                <div class="hamster__limb hamster__limb--fl"></div>
                <div class="hamster__limb hamster__limb--br"></div>
                <div class="hamster__limb hamster__limb--bl"></div>
                <div class="hamster__tail"></div>
            </div>
        </div>
        <div class="spoke"></div>
    </div>
</div>`
$corpo.innerHTML = loadingHtml + $corpo.innerHTML
const loading = (active=true) => {
    const $loading = document.querySelector(".loadingBox")
    if(active) {
        $loading.classList.remove("hidden")
    }
    else {
        $loading.classList.add("hidden")
    }
}

/* Hamburguer */
const showSidebar = () => {
    const $sidebar = document.querySelector(".sidebar")
    $sidebar.classList.toggle("hidden")        
}

//Messages Error Firebase
const messageFirebase = (msg) => {
    switch(msg) {
        case 'auth/invalid-email':
            dialog.showErrorMessage("Cadastro", "Email inválido!","rightTop",true,3000)
            break 
        case 'auth/weak-password':
            dialog.showErrorMessage("Cadastro", "Senha curta! Mínimo 6 dígitos.","rightTop",true,3000)
            break    
        case 'auth/network-request-failed':
            dialog.showErrorMessage("Cadastro", "Falha na conexão com a internet!","rightTop",true,3200)
            break    
        case 'auth/email-already-in-use':
            dialog.showErrorMessage("Cadastro", "Esse email já está em uso!","center")
            break    
        case 'auth/invalid-credential':
            dialog.showErrorMessage("Login", "Senha incorreta!","rightTop",true,3000)
            break    
        case 'auth/missing-email':
            dialog.showErrorMessage("Senha", "Email ausente! Digite um email por favor.","center")
            break    
        default:
            dialog.showErrorMessage("ERRO", msg,"center")   
    }
}
                
//showMessage
const showMessage = document.createElement("div")
showMessage.classList.add("showMessageBox")
showMessage.classList.add("hidden")
$corpo.appendChild(showMessage)
let typeAux // Para o type da mensagem com timer não influenciar o do dialog que ficará

const createMessage = (title,message,type,position,timer,float,placeholder) => {

    return new Promise((resolve, reject) => {
        // Definindo a message box
        const $showMessageBox = document.querySelector(".showMessageBox")
        if(!float) {
            $showMessageBox.classList.remove("hidden")
        }
        
        // Tipos de icones
        const errorSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#bb0b0b" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16"><path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/></svg>`
        const alertSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FCA311" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16"><path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/></svg>`
        const successSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#5ccb5f" class="bi bi-check-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>`
        const infoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#14213D" class="bi bi-info-circle-fill" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/></svg>`
    
        // Escolhendo a posição do dialog
        const dialogBox = document.createElement("div")
        dialogBox.classList.add("dialogBox")
        switch(position) {
            case "center":
                $showMessageBox.classList.add("center")
                break
            case "centerTop":
                $showMessageBox.classList.add("centerTop")
                break
            case "leftTop":
                dialogBox.classList.add("leftTop")
                break
            case "rightTop":
                dialogBox.classList.add("rightTop")
                break
            case "leftBottom":
                dialogBox.classList.add("leftBottom")
                break
            case "rightBottom":
                dialogBox.classList.add("rightBottom")
                break
            default:
                $showMessageBox.classList.add("center")
        }
    
        // Escolhendo o icone
        const dialogIcon = document.createElement("p")
        switch(type) {
            case "error":
                dialogIcon.innerHTML = errorSvg
                break
            case "info":
                dialogIcon.innerHTML = infoSvg
                break
            case "alert":
                dialogIcon.innerHTML = alertSvg
                break
            case "success":
                dialogIcon.innerHTML = successSvg
                break
            default:
                dialogIcon.innerHTML = infoSvg
                break
        }
        dialogBox.appendChild(dialogIcon)
        
        // Criando o título
        const dialogTitle = document.createElement("h1")
        dialogTitle.innerHTML = title
        dialogBox.appendChild(dialogTitle)
        
        // Criando a mensagem
        const dialogMessage = document.createElement("p")
        dialogMessage.innerHTML = message
        dialogBox.appendChild(dialogMessage)
    
        // Criando input
    
        if(type == "input") {
            let contemNumeros = (str) => {
                return /\d/.test(str);
            }
    
            const inputBox = document.createElement("div")
            inputBox.classList.add("inputBox")
            inputBox.classList.add("center")
    
            const input = document.createElement("input")
            input.type = "text"
            input.placeholder = placeholder
            inputBox.appendChild(input)
    
            const svgInput = document.createElement("p")
            svgInput.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/></svg>`
            svgInput.onclick = () => {
                if(input.value.replace(/\s/g, "")) {
                    if(!contemNumeros(input.value)) {
                        resolve(input.value)
                        closeMessage()
                    }
                    else {
                        dialog.showAlertMessage("Cadastro","Nome inválido!","rightTop",true,3000)
                    }// Valida se o texto contem numero
                }
                else {
                    dialog.showAlertMessage("Cadastro","Texto não reconhecido!","rightTop",true,3000)
                }// Valida se o input está vazio
            }
            inputBox.appendChild(svgInput)
    
            dialogBox.appendChild(inputBox)  
        }
    
        if(float) {
            $corpo.appendChild(dialogBox)
        }
        else {
            $showMessageBox.appendChild(dialogBox)
        }// Add dialog in the message box or in the body

        const closeMessage = () => {
            dialogBox.remove()
            $showMessageBox.classList.add("hidden")
        }
        $showMessageBox.addEventListener("click", event => {
            if(event.target === $showMessageBox && type !== "input") {
                closeMessage()
            }// Fechar normalmente quando o tipo não for input
        })// Fechar message ao clicar fora da caixa de dialogo
        $showMessageBox.addEventListener("dblclick", event => {
            if(event.target === $showMessageBox && type === "input") {
                closeMessage()
            }// Fechar com dblclick quando o tipo for input
        })// Fechar message ao clicar fora da caixa de dialogo
        if(timer) {
            type = typeAux
            setTimeout(() => {
                dialogBox.remove()
            },timer)
        }// Se o timer existir contar a partir dele para fechar a janela
        else {
            typeAux = type
        }// Manter o type original, independente da mensagem temporária
    })
}

// Método para chamar as caixas de dialogo
const dialog = {
    showErrorMessage: (title="",message="",position="",float=false,timer=0,type="error") => createMessage(title,message,type,position,timer,float),
    showInfoMessage: (title="",message="",position="",float=false,timer=0,type="info") => createMessage(title,message,type,position,timer,float),
    showAlertMessage: (title="",message="",position="",float=false,timer=0,type="alert") => createMessage(title,message,type,position,timer,float),
    showSuccessMessage: (title="",message="",position="",float=false,timer=0,type="success") => createMessage(title,message,type,position,timer,float),
    showInputMessage: (title="",message="",position="",placeholder="",float=false,timer=0,type="input") => createMessage(title,message,type,position,timer,float,placeholder),
}