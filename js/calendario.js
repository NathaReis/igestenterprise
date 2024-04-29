const $daysPosition = document.querySelectorAll(".day") 
const $year = document.querySelectorAll(".year")
const $month = document.querySelectorAll(".month")
const $dataSelect = document.querySelectorAll(".data p")
const $btnFindSelectedDate = document.querySelector("#btnFindSelectedDate")
const nowMonth = new Date().getMonth()
const nowYear = new Date().getFullYear()
let yearCurrent = new Date().getFullYear()
let monthCurrent = new Date().getMonth()

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
    if(yearCurrent == nowYear && monthCurrent == nowMonth) {
        const nowDay = new Date().getDate()
        $daysPosition[nowDay].classList.add("currentDay")
    }
    
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
const selectedDate = {
    year: 0,
    month: 0
}
const $nextSelect = document.querySelector("#nextSelect")
const $backSelect = document.querySelector("#backSelect")
let yearsList = []
let clicksNextSelectDate = 0 // Qtd de clicks para usar o nextSelect

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

const backSelect = () => {
    if(selectedDate.year == 0) {
        yearsList = yearsList.map(element => {
            let res = +element - 12
            return res < 0 ? 0 : res
        })
        clicksNextSelectDate++ // Soma cada click disponível para voltar com o next
        fillDataSelect()// Atualiza a array list de anos
    }// Seta só utilizável enquanto o ano ainda não foi escolhido
}

const nextSelect = () => {
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

// Click on the year of the date selection
function clearClassMonthSelect() {
    $dataSelect.forEach(month => {
        month.classList.remove("selectedDate")
    })
}
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
$dataSelect.forEach(element => {
    element.onclick = () => {
        if(selectedDate.year == 0) {
            const $h1YearSelected = document.querySelector("#yearSelectedInfo")
            selectedDate.year = +element.innerHTML
            $h1YearSelected.innerHTML = element.innerHTML
            findSelectMonths()
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
})

function findDate() {
    yearCurrent = selectedDate.year
    monthCurrent = selectedDate.month
    getDates()
    toggleSelectDate()
}

// Select Month
function findSelectMonths() {
    for(pos in $dataSelect) {
        $dataSelect[pos].innerHTML = monthNumberForMonthName(+pos).toString().slice(0,3)
    }
}

// ONCLICK DAY FOR LISTEVENTS
const transitionPages = (page) => {  
    const $calendario = document.querySelector("#calendario")  
    const $listEvents = document.querySelector("#listEvents")  
    const $form = document.querySelector("#form")  
    $listEvents.classList.add("hidden")
    $calendario.classList.add("hidden")        
    $form.classList.add("hidden")        
    if(page == '#listEvents') {
        $listEvents.classList.remove("hidden")
    }
    else if(page == '#calendario') {
        $calendario.classList.remove("hidden")
    }
    else if(page == '#form') {
        $form.classList.remove("hidden")
    }

    setTimeout(() => {
        const link = document.createElement("a")
        link.href = page
        link.click()
    }, 500)
}
$daysPosition.forEach(day => {
    day.onclick = () => {
        transitionPages("#listEvents")
    }
})

// List Events 
const deleteEvent = () => {
    dialog.showConfirmMessage("Exclusão","Deseja excluir o evento?","center")
    .then(() => {
        console.log("Excluir o evento")
    })
}

const addEvent = () => {
    transitionPages('#form')
}

const editEvent = () => {
    transitionPages('#form')
}