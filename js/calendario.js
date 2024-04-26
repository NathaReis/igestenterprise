const $daysPosition = document.querySelectorAll(".day") 
const $year = document.querySelector("#year")
const $month = document.querySelector("#month")
const yearCurrent = new Date().getFullYear()
const monthCurrent = new Date().getMonth()
const nowMonth = new Date().getMonth()
const nowYear = new Date().getFullYear()

const numberDaysMonth = () => {
    const days = new Date(yearCurrent, monthCurrent, 0).getDate()
    const primaryDay = new Date(yearCurrent, monthCurrent, 1).getDay()
    return {
        days: days,
        primaryDay: primaryDay
    }
}

const getDates = () => {
    $year.innerHTML = yearCurrent
    $month.innerHTML = monthNumberForMonthName(monthCurrent)

    if(yearCurrent == nowYear && monthCurrent == nowMonth) {
        const nowDay = new Date().getDate()
        $daysPosition[nowDay].classList.add("currentDay")
    }

    const data = numberDaysMonth()
    let count = 1
    let countLast = 0
    for(let i = 0; i < 35; i++) {
        if(i >= data.primaryDay && i < data.days) {
            $daysPosition[i].classList.add("Day")
            $daysPosition[i].innerHTML = count - countLast
        }
        else if(i < data.primaryDay) {
            countLast++
            $daysPosition[i].innerHTML = count 
        }
        else {
            $daysPosition[i].innerHTML = count - data.days// Contagem total menos dia máximo
        }// Dias após o fim do mês
        count++
    }
}
getDates()