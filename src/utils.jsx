import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const handleSuccess = (msg) => {
    toast.success(msg, {
        position: 'top-right'
    });
};

export const handleError = (msg) => {
    toast.error(msg, {
        position: 'top-right'
    });
};

// ToastContainer with z-index applied
export const ToastWrapper = () => (
    <ToastContainer
        position="top-right"
        toastStyle={{ zIndex: 1 }} // 👈 Ensuring high z-index
    />
);
