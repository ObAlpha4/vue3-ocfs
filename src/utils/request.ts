import axios from "axios";
const APIRequest = axios.create({
    // baseURL: "http://127.0.0.1:8000",
    baseURL: "https://django.obalpha4.dpdns.org",
    timeout: 5000,
    withCredentials: true,
});

APIRequest.interceptors.request.use(
    (config) => {
        const token = "test_token";
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

APIRequest.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        console.error("请求出错:", error);
        return Promise.reject(error);
    }
);

export default APIRequest;
