import "../css/monitor.css"
import React, { useState } from 'react';
import client from "../common/mqtt/connect"
import MQTT_TOPIC from "../common/constants/dict/topic"
import CustomTooltipPower from "./monitor/customTooltipPower"
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';


const Monitor = () => {
    document.title = 'Monitor'
    const [data, setData] = useState([])

    const handleData = (message) => {
        message.time = new Date().toLocaleTimeString()
        const newData = [...data, message]
        if (newData.length > 60) {
            newData.shift()
        }
        setData(newData)
    }
    const handleMessage = (topic, message) => {
        if (topic === MQTT_TOPIC.HOME_DATA) {
            handleData(JSON.parse(message))
        }
    }

    client.on('message', handleMessage)

    return (
        <div className="Monitor">
            <div className="monitor-power-linechart">
                <h3 className="line-chart-title">Biểu đồ giám sát điện năng</h3>
                <div className="line-chart-container">
                    <LineChart width={1000} height={300} data={data}>
                        <YAxis unit=" W" />
                        <XAxis dataKey="null" />
                        <Line type="monotone" strokeWidth={2} dataKey="power" stroke="#82ca9d" animationType="linear" animationDuration={200} />
                        <Tooltip content={<CustomTooltipPower />} />
                        <Legend />
                    </LineChart>
                </div>
            </div>
        </div>
    )
}
export default Monitor