import { ElectricityBill } from "./electricityBill"
import { getStartAndEndDates } from "../../common/helpers/common"
import { KEY_ENERGY, TYPE_ENERGY } from "../../common/constants/common/common"

export const CustomPowerMonth = ({ active, payload, type = TYPE_ENERGY.DAY }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload
        const value = data[KEY_ENERGY]
        const { date, isNull } = data

        const timeString = getStartAndEndDates(date)
        
        return (
            <div className="custom-tooltip">
                <div className="item-tooltip">
                    {type}:
                    <span className="item-tooltip-value">{date}</span>
                </div>
                {
                    (isNull || type === TYPE_ENERGY.DAY) ? null : (
                        <ElectricityBill value={value} dateStart={timeString.dateStart} dateEnd={timeString.dateEnd} />
                    )
                }
                {isNull ? (
                    <div className="item-tooltip">Không có dữ liệu</div>
                ) : (
                    <div className="item-tooltip">
                        Điện năng tiêu thụ:
                        <span className="item-tooltip-value"> {Number.isInteger(value) ? value : value.toFixed(3)} KWH</span>
                    </div>
                )}
            </div>
        )
    }
    return null
}

export const CustomLabel = ({ viewBox, value }) => {
    const { x, y, width } = viewBox

    // Calculate the center of the Bar
    const barCenterX = x + width / 2

    return (
        value === 0 ? null :
            <text x={barCenterX} y={y} dy={-5} fill="#666" textAnchor="middle">
                {Number.isInteger(value) ? value : value.toFixed(2)}
            </text>
    )
}