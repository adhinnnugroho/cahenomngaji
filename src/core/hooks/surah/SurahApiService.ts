import instance from "@/core/libs/axios/instance";

export async function getAllSurah(EndPointSurahApi: string) {
    try {
        const SurahResponse = await instance.get(EndPointSurahApi);
        return SurahResponse
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export async function getDetailSurahById(endpoint: string, id: number) {
    try {
        const response = await instance.get(`${endpoint}/${id}`);
        return response;
    } catch (error) {
        console.error("Error fetching data by ID:", error);
        throw error;
    }
}