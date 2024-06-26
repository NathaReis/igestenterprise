const pages = [
    document.querySelector("#calendario"),  
    document.querySelector("#listEvents"),  
    document.querySelector("#form"),  
    document.querySelector("#escalaList"),  
    document.querySelector("#escalaAddList"),  
    document.querySelector("#escalaAdd"),  
]
const formEvent = {
    name: document.querySelector("#eventName"),
    describe: document.querySelector("#eventDescribe"),
    end_data: document.querySelector("#end-data"),
    end_hour: document.querySelector("#end-hour"),
    start_hour: document.querySelector("#start-hour"),
    isPublic: document.querySelector("#isPublic"),
    img: document.querySelector("#eventImg"),
    escala: []
}
const $daysPosition = document.querySelectorAll(".day") 
const $year = document.querySelectorAll(".year")
const $month = document.querySelectorAll(".month")
const $dataSelect = document.querySelectorAll(".data p")
const $btnFindSelectedDate = document.querySelector("#btnFindSelectedDate")
const nowMonth = new Date().getMonth()
const nowYear = new Date().getFullYear()
const selectedDate = {year: 0,month: 0}
const $nextSelect = document.querySelector("#nextSelect")
const $backSelect = document.querySelector("#backSelect")
const $optionsEscala = document.querySelectorAll(".escalaOption")
const $namesEscala = document.querySelector("#names-escala")
const $optionEscala = document.querySelector("#function-escala")
const $retornoOptionEscala = document.querySelector("#select-function-escala")
const $escalaHour = document.querySelector("#escala-hour")
const $escalaAdd = document.querySelector("#escalaAdd")
const $formEvent = document.querySelector("#form form")
const $viewListEscala = document.querySelector("#viewListEscala")
let yearCurrent = new Date().getFullYear()
let monthCurrent = new Date().getMonth()
let dateCurrent
let isUpdateForm = false
let yearsList = []
let clicksNextSelectDate = 0 // Qtd de clicks para usar o nextSelect
let eventImgText = ''

// Calendar
const clearClassDays = () => {
    $daysPosition.forEach(day => {
        day.classList.remove("Day")
        day.classList.remove("currentDay")
        day.innerHTML = 'day'
    })
}

const numberDays = (set=0) => {
    const lastTwoNumbersYear = yearCurrent.toString().slice(2,4)
    const leapYear = lastTwoNumbersYear % 4 == 0
    const auxMonth = monthCurrent + set
    let days
    if(auxMonth <= 6 && auxMonth != 1) {
        days = auxMonth % 2 == 0 ? 31 : 30
    }// Padrão de dias até julho
    else if(leapYear && auxMonth == 1) {
        days = 29
    }// Padrão de dias fevereiro ano bissesto
    else if(auxMonth == 1){
        days = 28
    }// Padrão de dias fevereiro 
    else if(auxMonth > 6){
        days = auxMonth % 2 != 0 ? 31 : 30
    }// Padrão de dias após julho
    return days
}

const numberDaysMonth = () => {
    // Quando começa o primeiro dia do mês
    const primaryDay = new Date(yearCurrent, monthCurrent, 1).getDay()
    return {
        lastDays: numberDays(-1),
        days: numberDays(),
        primaryDay: primaryDay
    }
}

const getDates = () => {
    clearClassDays()
    $year.forEach(year => year.innerHTML = yearCurrent)
    $month.forEach(month => month.innerHTML = monthNumberForMonthName(monthCurrent))

    const data = numberDaysMonth()
    let count = 0
    let countLast = 0
    let countNext = 0
    $daysPosition.forEach(day => {
        if(+day.id < data.primaryDay) {
            countLast++
        }// Count last days
        else {
            count++
            day.innerHTML = count
            day.classList.add("Day")
        }// days
    })
    $daysPosition.forEach(day => {
        if(+day.id - countLast >= data.days) {
            countNext++
            day.innerHTML = twoNumbers(countNext)
            day.classList.remove("Day")
        }
    })// Next days
    const posLast = countLast - 1
    for(let i = posLast; i >= 0; i--) {
        $daysPosition[i].innerHTML = data.lastDays
        data.lastDays--
    }// Last days

    if(yearCurrent == nowYear && monthCurrent == nowMonth) {
        const nowDay = new Date().getDate() + countLast - 1
        $daysPosition[nowDay].classList.add("currentDay")
    }// Current day
}
getDates()

const backMonth = () => {
    monthCurrent--
    if(monthCurrent == -1) {
        monthCurrent = 11
        yearCurrent--
    }// Se o mês for negativo, receber valor de dezembro e diminuir o ano
    getDates()
}

$daysPosition.forEach(day => {
    day.onclick = () => {
        dateCurrent = `${yearCurrent}-${twoNumbers(monthCurrent)}-${twoNumbers(+day.innerHTML)}`
        transitionPages("listEvents")
    }
})

const nextMonth = () => {
    if(yearCurrent < nowYear + 2) {
        monthCurrent++
    }
    if(monthCurrent == 12) {
        // Limitar ao ano atual
        monthCurrent = 0
        yearCurrent++
    }// Se o mês for 12 receber valor de janeiro e aumentar o ano
    getDates()
}

// Select Date
function resetYearList() {
    yearsList = []
    let yearCurrentSelect = nowYear
    for(let i = 11; i >= 0; i--) {
        yearsList.unshift(+yearCurrentSelect)
        yearCurrentSelect--
    }// Preenchendo array inicial com os anos, de trás para frente (unshift)
    fillDataSelect()
}
resetYearList()

function resetSelect() {
    $btnFindSelectedDate.disabled = true
    selectedDate.year = 0
    selectedDate.month = ''
    $nextSelect.classList.add("disabled")
    $backSelect.classList.remove("disabled")
    clearClassMonthSelect() // Limpar a classe de todos os p
}

function validClicksNext() {
    if(clicksNextSelectDate == 0) {
        $nextSelect.classList.add("disabled")
    }   
    else {
        $nextSelect.classList.remove("disabled")
    }
}

function fillDataSelect () {
    for(pos in yearsList) {
        $dataSelect[pos].innerHTML = twoNumbers(yearsList[pos])
    }// Passa pela lista dos anos e adiciona o valor deles a  sua posição na tela
    validClicksNext()
}
fillDataSelect()

function backSelect() {
    if(selectedDate.year == 0) {
        yearsList = yearsList.map(element => {
            let res = +element - 12
            return res < 0 ? 0 : res
        })
        clicksNextSelectDate++ // Soma cada click disponível para voltar com o next
        fillDataSelect()// Atualiza a array list de anos
    }// Seta só utilizável enquanto o ano ainda não foi escolhido
}

function nextSelect() {
    if(selectedDate.year == 0) {
        if(clicksNextSelectDate != 0) {
            yearsList = yearsList.map(element => +element + 12)
            clicksNextSelectDate-- // Diminui a qtd de clicks disponíveis para clicar em next
            fillDataSelect()
        }// Se 0 clicks não pode clicar
    }// Seta só utilizável enquanto o ano ainda não foi escolhido
}

function toggleSelectDate() {
    const $selectDate = document.querySelector(".selectBox")
    $selectDate.classList.toggle("hidden")
    // Resets for close or open
    resetYearList()
    resetSelect()
}

function clearClassMonthSelect() {
    $dataSelect.forEach(month => {
        month.classList.remove("selectedDate")
    })
}// Click on the year of the date selection

function markSelectedMonth() {
    $dataSelect.forEach(month => {
        if(month.id == selectedDate.month) {
            month.classList.add("selectedDate")
        }
        else {
            month.classList.remove("selectedDate")
        }
    })
}

function findDate() {
    yearCurrent = selectedDate.year
    monthCurrent = selectedDate.month
    getDates()
    toggleSelectDate()
}

function fillSelectMonth() {
    for(pos in $dataSelect) {
        $dataSelect[pos].innerHTML = monthNumberForMonthName(+pos).toString().slice(0,3)
    }
}// Fill Month

$dataSelect.forEach(element => {
    element.onclick = () => {
        if(selectedDate.year == 0) {
            const $h1YearSelected = document.querySelector("#yearSelectedInfo")
            selectedDate.year = +element.innerHTML
            $h1YearSelected.innerHTML = element.innerHTML
            fillSelectMonth()
            // Desabilita as setas
            $nextSelect.classList.add("disabled") 
            $backSelect.classList.add("disabled")
        }// Click no ano, pois o valor ainda é 0
        else {
            clearClassMonthSelect()
            selectedDate.month = +element.id
            markSelectedMonth()
            $btnFindSelectedDate.disabled = false
        }// Click no mês, pois já tenho o ano
    }
})// Select year and month  cliking

// Pages
const closePages = () => {
    pages.forEach(page => {
        page.classList.add("hidden")
    })
}// Close Pages

const openPage = (page) => {
    pages.forEach(pag => {
        if(pag.id == page) {
            pag.classList.remove("hidden")
        }

        if(pag.id == 'form') {
            const $date = document.querySelector("#end-data")
            $date.value = dateCurrent            
        }
        else if(pag.id == 'escalaAddList') {
            preencherLista()
        }
        else if(pag.id == 'escalaList') {
            preencherListaEscala()
        }
    })
}// Open Page

const transitionPages = (page, update=false) => { 
    isUpdateForm = update // Para saber o que fazer ao entrar no form e finalizar 

    closePages()
    openPage(page)

    if(page != 'calendario' && !dateCurrent) {
        dialog.showAlertMessage("Data inválida","Selecione uma data de início","rightTop",true,2000)
        transitionPages("calendario")
    }// Validar a data atual
    else {
        const link = document.createElement("a")
        link.href = `#${page}`
        link.click()
    }
}// Transition Page

// List Events 
const deletarEvento = () => {
    dialog.showConfirmMessage("Exclusão","Deseja excluir o evento?","center")
    .then(() => {
        console.log("Excluir o evento")
    })
}

const adicionarEvento = () => {
    transitionPages('form')
}

const editarEvento = () => {
    transitionPages('form')
}

// Form Event
formEvent.end_data.addEventListener("change", () => {
    if(formEvent.end_data.value < dateCurrent) {
        formEvent.end_data.value = dateCurrent
        dialog.showAlertMessage("Alerta","Data de início maior que a de fim","center")
    }
})// Validar data do evento

formEvent.end_hour.addEventListener("change", () => {
    const end = formEvent.end_hour.value
    const start = formEvent.start_hour.value
    if(start) {
        if(start > end) {
            formEvent.end_hour.value = formEvent.start_hour.value
            dialog.showAlertMessage("Alerta","Horário de início maior que o de fim","center")
        }
    }
})// Validar horário do evento

formEvent.start_hour.addEventListener("change", () => {
    const end = formEvent.end_hour.value
    const start = formEvent.start_hour.value
    if(end) {
        if(start > end) {
            formEvent.start_hour.value = formEvent.end_hour.value
            dialog.showAlertMessage("Alerta","Horário de início maior que o de fim","center")
        }
    }
})// Validar horário do evento

formEvent.img.addEventListener("change", () => {
    const file = formEvent.img.files[0]

    if(file) {
        const extensao = file.name.split('.').pop().toLowerCase();
        const extensoesPermitidas = ['jpg', 'jpeg', 'png'];

        if(extensoesPermitidas.includes(extensao)) {
            imageForText(file)
            .then((response) => {
                eventImgText = response
            })
        }
        else {
            dialog.showErrorMessage("ERRO", "Arquivo deve ser uma imagem. <br> JPG, JPEG ou PNG")
        }
    }// Se o arquivo foi selecionado
})// Converter imagem para texto

//Escala List 
const preencherListaEscala = () => {
    let textResponse = ''
    formEvent.escala.forEach(element => {
        textResponse += `${element.hour} - ${element.function}\n`
        textResponse+= `\t${element.names}\n`
    })
    $viewListEscala.value = textResponse
}

//Escala Add List
function preencherLista() {
    const container = document.querySelector("#listEscalaAddList")
    container.innerHTML = ""
    for(escala of formEvent.escala) {
        const card = document.createElement("div")
        card.classList.add("card")
        card.classList.add("space")
        card.classList.add("flex")

        const dados = document.createElement("div")
        dados.classList.add("space")
        dados.classList.add("grid")

        const elementos = document.createElement("div")
        elementos.classList.add("card-element")
        elementos.classList.add("grid")
        elementos.classList.add("eventData")

        const func = document.createElement("p")
        func.innerHTML = escala.function
        elementos.appendChild(func)

        const hour = document.createElement("p")
        hour.innerHTML = escala.hour
        elementos.appendChild(hour)

        dados.appendChild(elementos)

        const options = document.createElement("div")
        options.classList.add("card")
        options.classList.add("eventOptions")

        const buttons = document.createElement("fieldset")
        buttons.classList.add("buttons")

        const edit = document.createElement("button")
        edit.type = "button"
        edit.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/></svg>`
        edit.onclick = () => {
            editarEscala(escala)
        }
        buttons.appendChild(edit)

        const del = document.createElement("button")
        del.type = "button"
        del.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/></svg>`
        del.onclick = () => {
            dialog.showConfirmMessage("Exclusão","Deseja excluir o componente?","center")
            .then(() => {
                const newList = formEvent.escala.filter(element => element != escala)
                formEvent.escala = newList
                preencherLista()
            })
            .catch(error => console.log(error))
        }
        buttons.appendChild(del)

        options.appendChild(buttons)
        
        card.appendChild(dados)
        card.appendChild(options)
        container.appendChild(card)
    }
}

// Escala Add
const resetEscalaAddComponents = () => {
    $optionEscala.value = ""
    $namesEscala.value = ""
    $escalaHour.value = ""
    $retornoOptionEscala.innerHTML = "Selecionar"
}

const orderEscala = (escala) => {
    let newList = []
    if(formEvent.escala.length > 0) {
        formEvent.escala.forEach(esc => {
            if(esc.hour <= escala.hour) {
                formEvent.escala = formEvent.escala.filter(element => element != esc)// Elimina elemento de escala
                newList.push(esc)// Adiciona ele á nova lista
            }
        })// Elementos antes da escala

        newList.push(escala)

        formEvent.escala.forEach(esc => {
            if(esc.hour > escala.hour) {
                newList.push(esc)// Adiciona ele á nova lista
            }
        })// Elementos após a escala
        formEvent.escala = newList
    }
    else {
        formEvent.escala.push(escala)
    }
}

$escalaAdd.addEventListener("submit", (e) => {
    e.preventDefault()

    const escala = {
        names: $namesEscala.value,
        function: $optionEscala.value,
        hour: $escalaHour.value,
    }
    if(isUpdateForm) {
        const pos = formEvent.escala.indexOf(isUpdateForm)
        formEvent.escala[pos] = escala
    }// Atualiza escala
    else {
        orderEscala(escala)
    }// Adiciona escala

    resetEscalaAddComponents()        
    transitionPages("escalaAddList")
})// Adicionar ou atualizar

const editarEscala = (escala) => {
    $optionEscala.value = escala.function
    $namesEscala.value = escala.names
    $escalaHour.value = escala.hour
    $retornoOptionEscala.innerHTML = `${escala.function.toString().toUpperCase()}`
    transitionPages("escalaAdd", escala)
}// Escala update

const toggleOptionsEscala = () => {
    const $optionsBox = document.querySelector("#options-select-escala")
    $optionsBox.classList.toggle("hidden")
}// Toggle do select de funções para escala

$optionsEscala.forEach(opt => {
    opt.onclick = () => {
        const inputFunctionOption = document.querySelector("#function-escala")
        inputFunctionOption.value = opt.id
        $retornoOptionEscala.innerHTML = opt.innerHTML
        toggleOptionsEscala()
    }
})// Select de funções para a escala

$escalaHour.addEventListener("change", () => {
    const end_hour = formEvent.end_hour.value 
    const start_hour = formEvent.start_hour.value 

    if($escalaHour.value > end_hour || start_hour > $escalaHour.value) {
        $escalaHour.value = start_hour
        dialog.showAlertMessage("Alerta","Horário fora do evento!","center")
    }
})// Validar o horário da escala, se está dentro do horário do evento

$formEvent.addEventListener("submit", (e) => {
    e.preventDefault()
    let event = {
        name: document.querySelector("#eventName").value,
        describe: document.querySelector("#eventDescribe").value,
        end_data: document.querySelector("#end-data").value,
        start_data: dateCurrent,
        end_hour: document.querySelector("#end-hour").value,
        start_hour: document.querySelector("#start-hour").value,
        isPublic: document.querySelector("#isPublic").checked,
        img: eventImgText,
        escala: formEvent.escala,
    }
    console.log(event)
})// Salvar ou atualizar evento