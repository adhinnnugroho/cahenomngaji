import instance from "@/core/libs/axios/instance";
import DoaServices from "./useDoaService";



export async function retrieveDataDoa() {
    const ResponseEndPointDoa = await instance.get(`${process.env.REST_API_URL_DOA}`);
    return ResponseEndPointDoa;
}

export async function retrieveAllDoa() {
    const ResponseEndPointDoa = await DoaServices.getAllDoa();
    return ResponseEndPointDoa.data;
}