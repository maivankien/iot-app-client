import '../css/home.css';
import '../css/report.css';
import moment from 'moment';
import vi from 'date-fns/locale/vi';
import instance from '../common/api/api';
import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import { showToast, ERROR_CODE } from "../components/Toast"
import { EnergyYear } from "../components/report/energyYear"
import MESSAGE_COMMON from "../common/constants/messages/common"
import { getAllDaysInMonth, formatMonthYear } from "../common/helpers/common";
import { CustomPowerMonth, CustomLabel } from "../components/report/customTooltip"
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { KEY_ENERGY, FONT_SIZE, WITH_CHART, HEIGHT_CHART } from "../common/constants/common/common"

registerLocale('vi', vi);

const Report = () => {
    document.title = "Report"

    const [sumEnergy, setSumEnergy] = useState(0)
    const [dataChart, setDataChart] = useState([])
    const [selectedMonth, setSelectedMonth] = useState(new Date())

    const handleChange = (input) => setSelectedMonth(input)

    useEffect(() => {
        const dateString = formatMonthYear(selectedMonth)
        const allDayinMonth = getAllDaysInMonth(dateString)

        const fetchData = async () => {
            try {
                const { data } = await instance.get("/report/energy/month", {
                    params: {
                        dateStart: allDayinMonth[0],
                        dateEnd: allDayinMonth[allDayinMonth.length - 1],
                    }
                })
                if (!data || data.length === 0) return showToast(ERROR_CODE.ERROR, MESSAGE_COMMON.NOT_FOUND)

                const newEnergy = data.reduce((sum, entry) => sum + entry.value, 0)
                setSumEnergy((newEnergy / 1000).toFixed(2))

                const dataMap = new Map(data.map(entry => [moment(entry.date).format("YYYY-MM-DD"), entry]))
                const mergedData = allDayinMonth.map((date, index) => {
                    const entry = dataMap.get(date)
                    return {
                        index: index + 1,
                        isNull: entry ? false : true,
                        date: moment(date).format("DD/MM/YYYY"),
                        [KEY_ENERGY]: entry ? entry.value / 1000 : 0,
                    }
                })

                setDataChart(mergedData)
            } catch (err) {
                console.log(err)
                return showToast(ERROR_CODE.ERROR, MESSAGE_COMMON.ERROR_DEFAULT)
            }
        }
        fetchData()
    }, [selectedMonth])

    return (
        <div className="Report margin-header">
            <div className="report-colunm-chart">
                <div className="colunm-chart-date-picker">
                    <h3>Chọn tháng trong năm</h3>
                    <DatePicker
                        selected={selectedMonth}
                        onChange={handleChange}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        locale="vi"
                    />
                </div>
                <label className="label">Tổng điện năng tiêu thụ trong tháng: {sumEnergy} (KWH)</label>

                <div className="colunm-chart-container">
                    <ResponsiveContainer width={WITH_CHART} height={HEIGHT_CHART}>
                        <BarChart data={dataChart}>
                            <XAxis dataKey="index" fontSize={FONT_SIZE} />
                            <YAxis unit=" KWH" width={100} fontSize={FONT_SIZE} />
                            <Tooltip content={<CustomPowerMonth />} />
                            <Legend />
                            <Bar dataKey={KEY_ENERGY} fill="#82ca9d" label={{ content: CustomLabel }} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <EnergyYear />
        </div>
    )
}

export default Report