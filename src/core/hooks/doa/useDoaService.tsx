import instance from "@/core/libs/axios/instance";

const DoaServices = {
    getAllTypeDoa: () => instance.get(`/api/typeDoa`),
    getAllDoa: (Sumber: String) => instance.get(`/api/doa/${Sumber}`),
};

export default DoaServices;
