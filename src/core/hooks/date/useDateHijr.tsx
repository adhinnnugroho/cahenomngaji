import instance from "@/core/libs/axios/instance";

export async function retrieveDateHijr(callDate: String) {
    const ResponseEndPointDoa = await instance.get(`${process.env.REST_API_URL_TANGGAL}/` + callDate);
    return ResponseEndPointDoa;
}

