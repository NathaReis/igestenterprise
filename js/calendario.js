const $daysPosition = document.querySelectorAll(".day") 
const $year = document.querySelector("#year")
const $month = document.querySelector("#month")
const $dataSelect = document.querySelectorAll(".data p")
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
    $year.innerHTML = yearCurrent
    $month.innerHTML = monthNumberForMonthName(monthCurrent)
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

const setDates = () => {
    const dates = new Date()
    dates.setFullYear(yearCurrent)
    dates.setMonth(monthCurrent)
    getDates()
}

const backMonth = () => {
    monthCurrent--
    if(monthCurrent == -1) {
        monthCurrent = 11
        yearCurrent--
    }
    setDates()
}

const nextMonth = () => {
    monthCurrent++
    if(monthCurrent == 12) {
        monthCurrent = 0
        yearCurrent++
    }
    setDates()
}

let yearsList = []
let yearCurrentSelect = yearCurrent.toString().slice(2,4)
for(let i = 11; i >= 0; i--) {
    yearsList.unshift(+yearCurrentSelect)
    yearCurrentSelect--
}// Preenchendo array inicial com os anos

let clicksNextSelectDate = 0 // Inicia em zero
const toggleSelectDate = () => {
    const $selectDate = document.querySelector(".selectBox")
    $selectDate.classList.toggle("hidden")
}

const validClicksNext = () => {
    const $nextSelect = document.querySelector("#nextSelect")
    if(clicksNextSelectDate == 0) {
        $nextSelect.classList.add("disabled")
    }   
    else {
        $nextSelect.classList.remove("disabled")
    }
}

const fillDataSelect = () => {
    for(pos in yearsList) {
        $dataSelect[pos].innerHTML = twoNumbers(yearsList[pos])
    }
    validClicksNext()
}
fillDataSelect()

const backSelect = () => {
    yearsList = yearsList.map(element => {
        let res = element - 12
        if(res < 0) {
            res += 100
        }
        return res
    })
    clicksNextSelectDate++ // Soma cada click disponível para voltar com o next
    fillDataSelect()
}

const nextSelect = () => {
    if(clicksNextSelectDate != 0) {
        yearsList = yearsList.map(element => {
            let res = element + 12
            if(res > 99) {
                res -= 100
            }
            return res
        })
        clicksNextSelectDate-- // Diminui a qtd de clicks disponíveis para clicar em next
        fillDataSelect()
    }// Se 0 clicks não pode clicar
}