import instance from "@/core/libs/axios/instance";
import DoaServices from "./useDoaService";



export async function retrieveDataTypeDoa() {
    const ResponseEndPointDoa = await instance.get(`${process.env.REST_API_URL_DOA}`);
    return ResponseEndPointDoa;
}

export async function retrieveDataDoa(Sumber: String) {
    const ResponseEndPointDoa = await instance.get(`${process.env.REST_API_URL_DOA}/${Sumber}`);
    return ResponseEndPointDoa;
}

export async function retrieveDataOnlyDoa(Number: String) {
    const ResponseEndPointDoa = await instance.get(`${process.env.REST_API_URL_ONLY_DOA}/${Number}`);
    return ResponseEndPointDoa;
}

export async function retrieveAllTypeDoa() {
    const ResponseEndPointDoa = await DoaServices.getAllTypeDoa();
    return ResponseEndPointDoa.data.data;
}

export async function retrieveAllDoa(sumber: String) {
    const { data } = await DoaServices.getAllDoa(sumber);
    return data.data;
}


export async function retrieveOnlyDoa(Number: String) {
    const ResponseEndPointDoa = await DoaServices.getOnlyDoa(Number);
    return ResponseEndPointDoa.data.data;
}