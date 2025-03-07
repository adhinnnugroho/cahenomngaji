import instance from "@/core/libs/axios/instance";

const ExternalPrayerApiUrl = `${process.env.REST_API_URL_SCHEDULE}/sholat/jadwal`;

export async function getMonthlyPrayerSchedule(CityId: number, Year: number, Month: number) {
    const monthlySchedule = await instance.get(`${ExternalPrayerApiUrl}/${CityId}/${Year}/${Month}`);
    return monthlySchedule;
}

export async function getDailyPrayerSchedule(CityId: string, Year: string, Month: string, date: string) {
    const dailySchedule = await instance.get(`${ExternalPrayerApiUrl}/${CityId}/${Year}/${Month}/${date}`);
    return dailySchedule.data;
}