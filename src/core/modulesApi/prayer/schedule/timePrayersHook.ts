import { useDateData } from "@/core/hooks/useDateData";
import { useEffect, useState } from "react";
import GeolocationHooks from "../../geolocations/GeolocationHooks";
import { retrieveScheduleSholatDaily } from "@/core/hooks/sholat/useSholatData";
import { getDailyPrayerSchedule } from "./internalApiCall";

const timePrayerHook = () => {
    const { userCityLocations, userProvinceLocations, City } = GeolocationHooks();

    const [nextPrayer, setNextPrayer] = useState<{ name: string, time: Date | null }>({ name: '', time: null });
    const [currentPrayer, setCurrentPrayer] = useState('');
    const { currentDateInfo, formatDate } = useDateData();
    const [dailyPrayerSchedule, setDailyPrayerSchedule] = useState<any>(null);
    const [timeToNextPrayer, setTimeToNextPrayer] = useState('');
    const [dateInHijr, setDateInHijr] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userCityLocations) {
                    if (City.id) {
                        const ScheduleSholatResponse = await getDailyPrayerSchedule(City.id, currentDateInfo.year, currentDateInfo.month, currentDateInfo.day);
                        setDailyPrayerSchedule(ScheduleSholatResponse.jadwal);
                        setLoading(false);
                    }
                }
            } catch (error) {
                console.error('Error retrieving data:', error);
            }
        };

        fetchData();
    }, [currentDateInfo.year, currentDateInfo.month, currentDateInfo.day]);

    const changeSchedule = async (date: Date) => {
        if (City?.id) {
            const ScheduleSholatResponse = await getDailyPrayerSchedule(City.id, date.getFullYear(), date.getMonth() + 1, date.getDate());
            setDailyPrayerSchedule(ScheduleSholatResponse.jadwal);
            setLoading(false);
        }
    };

}

export default timePrayerHook