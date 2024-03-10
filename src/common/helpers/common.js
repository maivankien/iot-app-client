import moment from "moment"


export const getAllDaysInMonth = (inputString) => {
    const [month, year] = inputString.split("/")
    const daysInMonth = moment(inputString, "MM/YYYY").daysInMonth()

    return Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1
        const formattedDay = day < 10 ? `0${day}` : `${day}`
        return `${year}-${month}-${formattedDay}`
    })
}

export const formatMonthYear = (inputString) => {
    return moment(inputString).format('MM/yyyy')
}


export const getStartAndEndDates = (timeString) => {
    const parts = timeString.split('/')
    const year = parseInt(parts[1], 10)
    const month = parseInt(parts[0], 10) - 1

    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)

    const startDate = ("0" + (firstDayOfMonth.getDate())).slice(-2) + "/" + ("0" + (firstDayOfMonth.getMonth() + 1)).slice(-2) + "/" + firstDayOfMonth.getFullYear()
    const endDate = ("0" + (lastDayOfMonth.getDate())).slice(-2) + "/" + ("0" + (lastDayOfMonth.getMonth() + 1)).slice(-2) + "/" + lastDayOfMonth.getFullYear()

    return {
        dateStart: startDate,
        dateEnd: endDate
    }
}

export const getFirstAndLastDayOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)

    const formattedFirstDay = ("0" + firstDay.getDate()).slice(-2) + "/" + ("0" + (firstDay.getMonth() + 1)).slice(-2) + "/" + firstDay.getFullYear()
    const formattedLastDay = ("0" + lastDay.getDate()).slice(-2) + "/" + ("0" + (lastDay.getMonth() + 1)).slice(-2) + "/" + lastDay.getFullYear()

    return {
        firstDay: formattedFirstDay,
        lastDay: formattedLastDay
    }
}