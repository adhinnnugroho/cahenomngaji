import httpClient from "./http-client";
import type { DoaCategory, DoaDetail } from "./types/doa.types";
import type { ApiResponse } from "./types/api-response.types";

export const doaApi = {
    /** Get all doa category types */
    getTypes: () =>
        httpClient.get<ApiResponse<DoaCategory[]>>("/api/doa/type"),

    /** Get doa list by source/category */
    getBySumber: (sumber: string) =>
        httpClient.get<ApiResponse<DoaDetail[]>>(`/api/doa/${sumber}`),

    /** Get specific doa by ID/number */
    getById: (id: string) =>
        httpClient.get<ApiResponse<DoaDetail>>(`/api/doa/specific/${id}`),
};
