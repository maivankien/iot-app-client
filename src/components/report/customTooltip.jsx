import { KEY_ENERGY } from "../../common/constants/common/common"

export const CustomPowerMonth = ({ active, payload, type = "Ngày" }) => {
    if (active && payload && payload.length) {
        const value = payload[0].payload[KEY_ENERGY]
        const { date, isNull } = payload[0].payload
        return (
            <div className="custom-tooltip">
                <div className="item-tooltip">
                    {type}:
                    <span className="item-tooltip-value">{date}</span>
                </div>
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