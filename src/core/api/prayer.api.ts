import httpClient from "./http-client";

export const prayerApi = {

    getScheduleByCoordinates: (lat: number, lng: number, year: number, month: number, date: number) =>
        httpClient.get(`/api/prayer-schedule/coordinate`, {
            params: {
                latitude: lat,
                longitude: lng,
                year,
                month,
                date
            }
        }),

    /** Get daily prayer schedule (Legacy MyQuran) */
    getDailySchedule: (cityId: string, year: number, month: number, date: number) =>
        httpClient.get(`/api/jadwal/Daily/jadwal/${cityId}/${year}/${month}/${date}`),

    /** Get monthly prayer schedule */
    getMonthlySchedule: (cityId: string, year: number, month: number) =>
        httpClient.get(`/api/jadwal/Monthly/jadwal/${cityId}/${year}/${month}`),
};
