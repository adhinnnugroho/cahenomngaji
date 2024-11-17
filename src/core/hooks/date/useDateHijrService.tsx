import instance from "@/core/libs/axios/instance";

const DateHijrService = {
    getDateInHijr: (date: String) => instance.get(`/api/date/${date}`),
};

export default DateHijrService;
