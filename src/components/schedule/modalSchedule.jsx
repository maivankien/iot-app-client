import React from 'react';
import Modal from 'react-modal';
import vi from 'date-fns/locale/vi';
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from 'react';
import instance from "../../common/api/api"
import { showToast } from "../../components/Toast"
import DatePicker, { registerLocale } from 'react-datepicker';
import SCHEDULE_MESSAGE from '../../common/constants/messages/schedule';
import { KEY_ACTION, ACTION } from '../../common/constants/common/common';

registerLocale('vi', vi)

const ModalSchedule = ({ deviceId, onClose }) => {
    const [date, setDate] = useState()
    const [schedules, setSchedules] = useState([])
    const [action, setAction] = useState(ACTION.ON)

    const handleCreateSchedule = async () => {
        const count = schedules.filter((schedule) => +schedule.action === +action).length
        if (count >= 5) return showToast("error", SCHEDULE_MESSAGE.MAX_SCHEDULE)

        if (!date) return showToast("error", SCHEDULE_MESSAGE.DATE_REQUIRED)
        if (date < new Date()) return showToast("error", SCHEDULE_MESSAGE.DATE_INVALID)

        try {
            const res = await instance.post(`/schedule/${deviceId}`, {
                time: date,
                action
            })
            const schedule = {
                action,
                id: res.data.jobId,
                time: new Date(date).getTime(),
            }
            const newSchedules = [...schedules, schedule]
            newSchedules.sort((a, b) => a.time - b.time)

            setSchedules(newSchedules)
            showToast("success", SCHEDULE_MESSAGE.CREATE_SCHEDULE_SUCCESS)
        } catch (err) {
            console.log(err)
            showToast("error", SCHEDULE_MESSAGE.CREATE_SCHEDULE_FAIL)
        }
    }

    const handleDeleteSchedule = async (id) => {
        try {
            await instance.delete(`/schedule/${id}`)
            const newSchedules = schedules.filter((schedule) => schedule.id !== id)
            setSchedules(newSchedules)
            showToast("success", SCHEDULE_MESSAGE.DELETE_SCHEDULE_SUCCESS)
        } catch (err) {
            console.log(err)
            showToast("error", SCHEDULE_MESSAGE.DELETE_SCHEDULE_FAIL)
        }
    }

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const response = await instance.get(`/schedule/${deviceId}`)
                setSchedules(response.data)
            } catch (err) {
                console.log(err)
                showToast("error", SCHEDULE_MESSAGE.ERROR)
            }
        }
        fetchSchedules()
    }, [deviceId])

    return (
        <Modal
            isOpen={!!deviceId}
            onRequestClose={onClose}
            className={"schedule-modal"}
            contentLabel="Example Modal"
        >
            <div className="schedule-title">
                <h2>Hẹn giờ</h2>
            </div>
            <div className="schedules">
                <h3>Chọn thời gian:</h3>
                <div className="schedule-date-picker">
                    <DatePicker
                        locale={"vi"}
                        selected={date}
                        showTimeSelect
                        timeIntervals={5}
                        className="date-picker"
                        dateFormat="yyyy-MM-dd HH:mm:ss"
                        onChange={(date) => setDate(date)}
                    />
                    <div className="schedule-controls">
                        <select className="schedule-options" onChange={(e) => setAction(Number(e.target.value))} value={action}>
                            <option value={ACTION.ON}>Bật</option>
                            <option value={ACTION.OFF}>Tắt</option>
                        </select>
                        <button className="create-schedule" onClick={handleCreateSchedule}>Thêm</button>
                    </div>
                </div>
                <div className="list-schedule">
                    {schedules.map((schedule) => (
                        <div key={schedule.id} className="schedule">
                            <span style={{ fontWeight: "bold" }}>{KEY_ACTION[schedule.action]}</span>
                            <span>
                                Thiết bị sẽ {KEY_ACTION[schedule.action].toLowerCase()}&nbsp;
                                {new Date(schedule.time).toLocaleString('vi-VN', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                })}
                            </span>
                            <button className="delete-schedule" onClick={() => handleDeleteSchedule(schedule.id)}>Xóa</button>
                        </div>
                    ))}
                </div>
            </div>
            <button className="close-modal" onClick={onClose}><IoClose /></button>
        </Modal>
    )
}

export default ModalSchedule
