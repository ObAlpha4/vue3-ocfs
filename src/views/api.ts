import axios from "axios";
const api = axios.create({
    // baseURL: "http://127.0.0.1:8000",
    baseURL: "https://django.obalpha4.dpdns.org",
    timeout: 5000,
});

export function getDataFromUrl(url: string) {
    return api.get(url);
}
