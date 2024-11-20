import instance from "@/core/libs/axios/instance";

const DoaServices = {
    getAllTypeDoa: () => instance.get(`/api/typeDoa`),
    getAllDoa: (Sumber: String) => instance.get(`/api/doa/${Sumber}`),
    getOnlyDoa: (Number: String) => instance.get(`/api/doa/only/${Number}`),
};

export default DoaServices;
