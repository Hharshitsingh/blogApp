import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const getAccessToken = () => {
    return sessionStorage.getItem("accesstoken");
}

export const addEllipsis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) : str;
}

export const timeStamp = (date) => {
    date = new Date(date);
    var currentOffset = date.getTimezoneOffset();
    var ISTOffset = 330;   // IST offset UTC +5:30
    var ISTTime = new Date(date.getTime() + (ISTOffset + currentOffset) * 60000);
    var hoursIST = ISTTime.getHours();
    var minutesIST = ISTTime.getMinutes();
    var dateIST = ISTTime.toDateString();
    var timeStamp = dateIST + " " + (hoursIST + 1) + ':' + minutesIST;
    return timeStamp;
}

export const getType = (value, body) => {
    if (value.params) {
        return { params: body };
    } else if (value.query) {
        if (typeof body === 'object') {
            return { query: body._id };
        } else {
            return { query: body };
        }
    }
    return {};
}

export const errorNotify = (message) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export const successNotify = (message) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}