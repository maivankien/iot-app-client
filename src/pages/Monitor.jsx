import "../css/monitor.css"
import React, { useState, useEffect } from 'react';
import client from "../common/mqtt/connect"
import MQTT_TOPIC from "../common/constants/dict/topic"
import CustomTooltipPower from "../components/monitor/customTooltipPower"
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { showToast, MESSAGE_CODE } from "../components/Toast"
import MESSAGE_COMMON from "../common/constants/messages/common";

const Monitor = () => {
    const lenghtMonitor = 60

    document.title = 'Monitor'
    const [data, setData] = useState(Array.from({ length: lenghtMonitor }, () => ({})))

    const handleData = (message) => {
        message.time = new Date().toLocaleTimeString()
        const newData = [...data, message]
        if (newData.length > lenghtMonitor) {
            newData.shift()
        }
        setData(newData)
    }
    const handleMessage = (topic, message) => {
        if (topic === MQTT_TOPIC.HOME_DATA) {
            const data = JSON.parse(message)
            if (data.voltage === null) {
                showToast(MESSAGE_CODE.ERROR, MESSAGE_COMMON.ERROR_GET_MONITOR_DATA, 1000)
            }
            handleData(data)
        }
    }

    useEffect(() => {
        client.on('message', handleMessage)

        return () => {
            client.off('message', handleMessage)
        }
    }, [handleData])


    return (
        <div className="Monitor">
            <div className="monitor-power-linechart">
                <h3 className="line-chart-title">Biểu đồ giám sát điện năng</h3>
                <div className="line-chart-container">
                    <LineChart width={1200} height={300} data={data}>
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