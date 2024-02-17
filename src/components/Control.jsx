import '../css/control.css';
import React, { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import * as Icons from 'react-icons/fa';
import instance from "../common/api/api"
import client from "../common/mqtt/connect"
import { showToast } from "../components/Toast"
import MESSAGE_COMMON from '../common/constants/messages/common';
import ModalScheduler from './schedule/modalSchedule';

const Control = () => {
    const [devices, setDevices] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await instance.get("/device/list")
                setDevices(data)
            } catch (err) {
                console.log(err)
                showToast("error", MESSAGE_COMMON.ERROR_GET_DEVICE_INFO)
            }
        }
        fetchData()
    }, [])

    const handleUpdateDevice = async (deviceId, state, pin) => {
        try {
            client.publish('home/device', JSON.stringify({
                pin: pin,
                deviceId,
                state: state,
            }))
            await instance.put("/device/update", { deviceId, state })
        } catch (err) {
            console.log(err)
            showToast("error", MESSAGE_COMMON.ERROR_UPDATE_DEVICE)
        }
    }

    const toggleDevice = async (deviceId) => {
        const updatedDevices = await Promise.all(devices.map(async (device) => {
            if (device.id === deviceId) {
                const state = device.state ? 0 : 1
                await handleUpdateDevice(deviceId, state, device.pin)
                return { ...device, state }
            }
            return device
        }))

        setDevices(updatedDevices)
    }

    const [selectedDeviceId, setSelectedDeviceId] = useState(null)

    const handleOpenModal = (deviceId) => {
        setSelectedDeviceId(deviceId)
    }

    const handleCloseModal = () => {
        setSelectedDeviceId(null)
    }

    return (
        <div className="Control">
            <h1>Điều khiển</h1>
            <div className="devices">
                {devices.map((device) => (
                    <div key={device.id} className="device">
                        <div className="device-info">
                            <IconContext.Provider value={{ className: (device.state ? "active" : "deactive") + " icon" }}>
                                {React.createElement(Icons[device.icon])}
                            </IconContext.Provider>
                            <span>{device.name}</span>
                        </div>
                        <div className="button-modal">
                            <button onClick={() => handleOpenModal(device.id)}>Hẹn giờ</button>
                        </div>
                        <div className="controls">
                            <button className={device.state ? "active" : "deactive"} onClick={() => toggleDevice(device.id)}>
                                {device.state ? "Tắt" : "Bật"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <ModalScheduler deviceId={selectedDeviceId} onClose={handleCloseModal} />
        </div>
    );
}

export default Control
