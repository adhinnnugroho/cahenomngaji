import instance from "@/core/libs/axios/instance";

export async function retrieveDateHijr(callDate: String) {
    const baseUrl = process.env.REST_API_URL_TANGGAL;

    if (!baseUrl) {
        throw new Error("REST_API_URL_TANGGAL is not defined");
    }

    const normalizedBaseUrl = baseUrl.endsWith("/")
        ? baseUrl.slice(0, -1)
        : baseUrl;

    const ResponseEndPointDoa = await instance.get(`${normalizedBaseUrl}/${callDate}`);
    return ResponseEndPointDoa;
}

