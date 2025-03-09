import instance from "@/core/libs/axios/instance";

const DoaServicesApi = {
    getAllTypeDoa: () => instance.get(`/api/doa/type`),
    getAllDoa: (sumber: String) => instance.get(`/api/doa/${sumber}`),
    getSpecificDoa: (number: String) => instance.get(`/api/doa/specific/${number}`),
};

export default DoaServicesApi;
