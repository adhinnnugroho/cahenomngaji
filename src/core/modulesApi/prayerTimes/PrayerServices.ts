import instance from "@/core/libs/axios/instance";
const PrayerServices = {
    getDailySchedule: (cityId: number, year: number, month: number, date: number) => instance.get(`/api/jadwal/Daily/jadwal/${cityId}/${year}/${month}/${date}`)
};

export default PrayerServices;
