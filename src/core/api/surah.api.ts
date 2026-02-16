import httpClient from "./http-client";
import type { Surah, SurahDetail } from "./types/surah.types";
import type { ApiResponse } from "./types/api-response.types";

export const surahApi = {
    /** Get all surah list (114 surahs) */
    getAll: () =>
        httpClient.get<ApiResponse<Surah[]>>("/api/surah/surah"),

    /** Get surah detail by ID (includes ayat) */
    getById: (id: number) =>
        httpClient.get<ApiResponse<SurahDetail>>(`/api/surah/surah/${id}`),
};
