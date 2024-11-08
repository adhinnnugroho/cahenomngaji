import instance from "@/core/libs/axios/instance";

const DoaServices = {
    getAllDoa: () => instance.get(`/api/doa`),
};

export default DoaServices;
