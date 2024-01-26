import { KEY_ENERGY, FONT_SIZE } from "../../common/constants/common/common"

export const CustomPowerMonth = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const value = payload[0].payload[KEY_ENERGY]
        const { date, isNull } = payload[0].payload
        return (
            <div className="custom-tooltip">
                <div className="item-tooltip">
                    Ngày:
                    <span className="item-tooltip-value"> {date}</span>
                </div>
                {isNull ? (
                    <div className="item-tooltip">Không có dữ liệu</div>
                ) : (
                    <div className="item-tooltip">
                        Điện năng tiêu thụ:
                        <span className="item-tooltip-value"> {value.toFixed(2)} KWH</span>
                    </div>
                )}
            </div>
        )
    }
    return null
}

export const CustomLabel = ({ x, y, value }) => (
    value === 0 ? null :
    <text x={x + 12} y={y} dy={-10} fill="#666" fontSize={FONT_SIZE} textAnchor="middle">
        {value.toFixed(2)}
    </text>
)