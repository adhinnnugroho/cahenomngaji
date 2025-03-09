
import PrayerServices from "../PrayerServices";

export async function getDailyPrayerSchedule(cityId: number, year: number, month: number, date: number) {

    try {
        const { data } = await PrayerServices.getDailySchedule(cityId, year, month, date);
        return data.data.data;
    } catch (error) {
        console.error('Error retrieving daily prayer schedule:', error);
        throw new Error('Failed to retrieve daily prayer schedule');
    }
}