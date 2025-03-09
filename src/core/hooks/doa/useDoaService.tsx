import instance from "@/core/libs/axios/instance";

const DoaServices = {
    getAllTypeDoa: () => instance.get(`/api/typeDoa`),
    getAllDoa: (sumber: String) => instance.get(`/api/doa/${sumber}`),
    getOnlyDoa: (Number: String) => instance.get(`/api/doa/only/${Number}`),
};

export default DoaServices;
