import DoaServicesApi from "./DoaServiceApi";


export async function getTypeDoa() {
    const { data } = await DoaServicesApi.getAllTypeDoa();
    return data.data;
}

export async function getDoa(sumber: String) {
    const { data } = await DoaServicesApi.getAllDoa(sumber);
    return data.data;
}

export async function getSpesificDoa(number: String) {
    const { data } = await DoaServicesApi.getSpecificDoa(number);
    return data.data;
}