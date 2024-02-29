import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const MESSAGE_CODE = {
    SUCESS: "success",
    ERROR: "error",
    WARNING: "warning"
}

export const showToast = (type, message, time = 3000) => {
    switch (type) {
        case MESSAGE_CODE.SUCESS:
            toast.success(message, {
                position: 'top-right',
                autoClose: time,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            break;
        case MESSAGE_CODE.ERROR:
            toast.error(message, {
                position: 'top-right',
                autoClose: time,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            break;
        case MESSAGE_CODE.WARNING:
            toast.warn(message, {
                position: 'top-right',
                autoClose: time,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            break;
        default:
            break;
    }
};

export const Toast = () => {
    return <ToastContainer />;
}

