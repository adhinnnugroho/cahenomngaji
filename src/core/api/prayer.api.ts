import httpClient from "./http-client";

export const prayerApi = {
    /** Get daily prayer schedule */
    getDailySchedule: (cityId: number, year: number, month: number, date: number) =>
        httpClient.get(`/api/jadwal/Daily/jadwal/${cityId}/${year}/${month}/${date}`),

    /** Get monthly prayer schedule */
    getMonthlySchedule: (cityId: number, year: number, month: number) =>
        httpClient.get(`/api/jadwal/Monthly/jadwal/${cityId}/${year}/${month}`),
};
