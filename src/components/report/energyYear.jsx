import '../../css/home.css';
import '../../css/report.css';
import vi from 'date-fns/locale/vi';
import instance from '../../common/api/api';
import React, { useEffect, useState } from "react"
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import { showToast, MESSAGE_CODE } from "../../components/Toast"
import MESSAGE_COMMON from "../../common/constants/messages/common"
import { CustomPowerMonth, CustomLabel } from "../../components/report/customTooltip"
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { KEY_ENERGY, FONT_SIZE, WITH_CHART, HEIGHT_CHART, ALL_MONTH_IN_YEAR } from "../../common/constants/common/common"


registerLocale('vi', vi)

export const EnergyYear = () => {
    const [sumEnergy, setSumEnergy] = useState(0)
    const [dataChart, setDataChart] = useState([])
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

    const handleYearChange = (date) => setSelectedYear(date.getFullYear())

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await instance.get("/report/energy/year", {
                    params: {
                        year: selectedYear,
                    }
                })
                if (!data || data.length === 0) return showToast(MESSAGE_CODE.ERROR, MESSAGE_COMMON.NOT_FOUND)

                const newEnergy = data.reduce((sum, entry) => sum + entry.value, 0)
                setSumEnergy((newEnergy / 1000).toFixed(2))

                const dataMap = new Map(data.map(entry => [entry.month, entry]))

                const mergedData = ALL_MONTH_IN_YEAR.map((month, index) => {
                    const entry = dataMap.get(month)
                    return {
                        index: index + 1,
                        isNull: entry ? false : true,
                        date: `${month}/${selectedYear}`,
                        [KEY_ENERGY]: entry ? entry.value / 1000 : 0,
                    }
                })
                setDataChart(mergedData)
            } catch (err) {
                console.log(err)
                return showToast(MESSAGE_CODE.ERROR, MESSAGE_COMMON.ERROR_DEFAULT)
            }
        }
        fetchData()
    }, [selectedYear])

    return (
        <div className="report-colunm-chart padding-t-b-60">
            <div className="colunm-chart-date-picker">
                <h3>Chọn năm</h3>
                <DatePicker
                    selected={selectedYear ? new Date(selectedYear, 0, 1) : null}
                    onChange={handleYearChange}
                    dateFormat="yyyy"
                    showYearPicker
                    showMonthYearPicker
                    locale="vi"
                />
            </div>
            <label className="label">Tổng điện năng tiêu thụ trong năm: {sumEnergy} (KWH)</label>
            <div className="colunm-chart-container">
                <ResponsiveContainer width={WITH_CHART} height={HEIGHT_CHART}>
                    <BarChart data={dataChart} barSize={50}>
                        <XAxis dataKey="index" fontSize={FONT_SIZE} />
                        <YAxis unit=" KWH" width={100} fontSize={FONT_SIZE} />
                        <Tooltip content={<CustomPowerMonth type="Tháng" />} />
                        <Legend />
                        <Bar dataKey={KEY_ENERGY} fill="#82ca9d" label={{ content: CustomLabel }} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

