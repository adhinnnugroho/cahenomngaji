import DoaServicesApi from "./DoaServiceApi";


export async function getTypeDoa() {
    try {
        const { data } = await DoaServicesApi.getAllTypeDoa();
        return data.data ?? [];
    } catch (error) {
        console.error("Error retrieving doa types:", error);
        return [];
    }
}

export async function getDoa(sumber: string) {
    try {
        const { data } = await DoaServicesApi.getAllDoa(sumber);
        return { data: data.data ?? [] };
    } catch (error) {
        console.error("Error retrieving doa data:", error);
        return { data: [] };
    }
}

export async function getSpesificDoa(number: String) {
    try {
        const { data } = await DoaServicesApi.getSpecificDoa(number);
        return data.data ?? null;
    } catch (error) {
        console.error("Error retrieving specific doa:", error);
        return null;
    }
}
