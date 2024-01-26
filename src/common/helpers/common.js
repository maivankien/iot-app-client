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
