import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URL } from '../constants/config';
import { getAccessToken, getType } from '../utils/common-utils';
const API_URL = 'https://harshit-blogapp.herokuapp.com';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 40000,
    headers: {
        'Content-Type': 'application/json',
    }
})

axiosInstance.interceptors.request.use(
    function (config) {
        if (config.TYPE.params) {
            config.params = config.TYPE.params;
        } else if (config.TYPE.query) {
            config.url = config.url + "/" + config.TYPE.query;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function (response) {
        // Stop global loader here
        return processResponse(response);
    },
    function (error) {
        // Stop global loader here
        return Promise.reject(processError(error));
    }
)

const processResponse = (response) => {
    if (response?.status === 200) {
        return {
            data: response.data,
            isSuccess: true
        }
    } else {
        return {
            isSuccess: false,
            status: response?.status,
            message: response?.message,
            code: response?.code
        }
    }
}

const processError = (error) => {
    if (error.response) {
        return {
            isSuccess: false,
            message: (error.response.data.message) ? error.response.data.message : API_NOTIFICATION_MESSAGES.resposeFailure.message,
            code: error.response.status,
        }
    }
    else if (error.request) {
        return {
            isSuccess: false,
            message: API_NOTIFICATION_MESSAGES.requestFailure.message,
            code: "",
        }
    }
    else {
        return {
            isSuccess: false,
            message: API_NOTIFICATION_MESSAGES.notFound.message,
            code: "",
        }
    }
}


const API = {};

for (const [key, value] of Object.entries(SERVICE_URL)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? {} : body,
            responseType: value.responseType,
            headers: {
                'authorization': `${getAccessToken()}`
            },
            TYPE: getType(value, body),
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            }

        })
}

export { API };