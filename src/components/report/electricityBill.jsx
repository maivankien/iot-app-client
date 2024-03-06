import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { showToast } from "../../components/Toast"
import { BASE_DATA } from "../../common/constants/common/common"


export const ElectricityBill = ({ value, dateStart, dateEnd }) => {
    const [total, setTotal] = useState(null)
    const [powerData, setPowerData] = useState(0)

    if (value !== total) setTotal(value)

    useEffect(() => {
        if (total > 0) {
            const dataSend = {
                ...BASE_DATA,
                NGAY_DKY: dateStart,
                NGAY_CKY: dateEnd,
                GCS_CHISO: [
                    {
                        "BCS": "KT",
                        "LOAI_CHISO": "DDK",
                        "SAN_LUONG": total.toString(),
                    }
                ]
            }
            axios.post('https://calc.evn.com.vn/TinhHoaDon/api/Calculate', dataSend)
                .then(data => {
                    const result = data.data.Data.HDN_HDON[0].SO_TIEN
                    setPowerData(result)
                })
                .catch((error) => showToast("Lỗi tính tiền điện."))
        }
    }, [total])

    return (
        <div className="electricity-bill item-tooltip">
            Tiền điện: 
            <span className="item-tooltip-value"> {powerData.toLocaleString('vi-VN')} đ</span>
        </div>
    )
}