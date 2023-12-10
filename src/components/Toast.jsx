import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showToast = (type, message, time = 3000) => {
    switch (type) {
        case 'success':
            toast.success(message, {
                position: 'top-right',
                autoClose: time,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            break;
        case 'error':
            toast.error(message, {
                position: 'top-right',
                autoClose: time,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            break;
        case 'warning':
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

const Toast = () => {
    return <ToastContainer />;
}

export { showToast, Toast }
