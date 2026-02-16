import axios from "axios";

const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
};

const httpClient = axios.create({
    headers,
    timeout: 60 * 1000,
});

httpClient.interceptors.request.use(
    (config) => config,
    (error) =>
        Promise.reject(
            error instanceof Error ? error : new Error(error.message || "Request error")
        )
);

httpClient.interceptors.response.use(
    (response) => response,
    (error) =>
        Promise.reject(
            error instanceof Error ? error : new Error(error.message || "Response error")
        )
);

export default httpClient;
