import instance from "@/core/libs/axios/instance";

const DoaServices = {
    getAllTypeDoa: () => instance.get(`/api/typeDoa`),
};

export default DoaServices;
