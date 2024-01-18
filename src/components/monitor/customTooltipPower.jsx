const CustomTooltipPower = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { time, voltage = 0, current = 0, frequency = 0, pf = 0, power = 0 } = payload[0].payload
        return (
            <div className="custom-tooltip">
                <div className="item-tooltip">
                    Công suất:
                    <span className="item-tooltip-value"> {power.toFixed(2)} W</span>
                </div>
                <div className="item-tooltip">
                    Điện áp:
                    <span className="item-tooltip-value"> {voltage.toFixed(2)} V</span>
                </div>
                <div className="item-tooltip">
                    Dòng điện:
                    <span className="item-tooltip-value"> {current.toFixed(2)} A</span>
                </div>
                <div className="item-tooltip">
                    Tần số:
                    <span className="item-tooltip-value"> {frequency.toFixed(2)} Hz</span>
                </div>
                <div className="item-tooltip">
                    Hệ số công suất:
                    <span className="item-tooltip-value"> {pf.toFixed(2)}</span>
                </div>
                <div className="item-tooltip">
                    Thời gian:
                    <span className="item-tooltip-value"> {time}</span>
                </div>
            </div>
        )
    }
    return null
}

export default CustomTooltipPower