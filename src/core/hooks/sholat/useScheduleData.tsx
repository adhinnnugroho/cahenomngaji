import { getCoordinatesUser } from "@/core/hooks/locations/useLocationService";
import { retrieveScheduleSholatDaily, retrieveSpecificCityData, retrieveUserLocations } from "@/core/hooks/sholat/useSholatData";
import { useDateData } from "@/core/hooks/useDateData";
import { useEffect, useState, useCallback } from "react";

export const useScheduleData = () => {
    const { currentDateInfo, formatDate } = useDateData();
    const [dailyPrayerSchedule, setDailyPrayerSchedule] = useState<any>(null);
    const [City, setCity] = useState<any>(null);
    const [useLocation, setUseLocation] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [currentPrayer, setCurrentPrayer] = useState('');
    const [nextPrayer, setNextPrayer] = useState<{ name: string, time: Date | null }>({ name: '', time: null });
    const [timeToNextPrayer, setTimeToNextPrayer] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const coordinates = await getCoordinatesUser() as [number, number];
                const [latitude, longitude] = coordinates;
                const UserLocationsResponse = await retrieveUserLocations(latitude, longitude);
                if (UserLocationsResponse.city) {
                    setUseLocation(UserLocationsResponse.city.name);
                    const cityDataResponse = await retrieveSpecificCityData(UserLocationsResponse.city.name);
                    setCity(cityDataResponse);
                    if (cityDataResponse.id) {
                        const ScheduleSholatResponse = await retrieveScheduleSholatDaily(cityDataResponse.id, currentDateInfo.year, currentDateInfo.month, currentDateInfo.day);
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
            const ScheduleSholatResponse = await retrieveScheduleSholatDaily(City.id, date.getFullYear(), date.getMonth() + 1, date.getDate());
            setDailyPrayerSchedule(ScheduleSholatResponse.jadwal);
            setLoading(false);
        }
    };

    const tanggalStr = dailyPrayerSchedule?.tanggal.split(", ")[1];
    const handleDateChange = (direction: number) => {
        if (!dailyPrayerSchedule?.tanggal) return;
        const [day, month, year] = tanggalStr.split("/");
        const currentDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        currentDate.setDate(currentDate.getDate() + direction);
        const newMonth = currentDate.getMonth() + 1;
        changeSchedule(new Date(currentDate.getFullYear(), newMonth - 1, currentDate.getDate()));
        setLoading(true);
    };

    const getTimeDate = (timeStr: string) => {
        const now = new Date();
        const [hours, minutes] = timeStr.split(':');
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(),
            parseInt(hours), parseInt(minutes), 0);
    };

    const getCurrentPrayer = useCallback(() => {
        if (!dailyPrayerSchedule) return { current: '', next: { name: '', time: null }, timeToNext: 0 };

        const now = new Date();
        const prayerTimes = [
            { name: 'Imsak', time: getTimeDate(dailyPrayerSchedule.imsak) },
            { name: 'Subuh', time: getTimeDate(dailyPrayerSchedule.subuh) },
            { name: 'Terbit', time: getTimeDate(dailyPrayerSchedule.terbit) },
            { name: 'Dhuha', time: getTimeDate(dailyPrayerSchedule.dhuha) },
            { name: 'Dzuhur', time: getTimeDate(dailyPrayerSchedule.dzuhur) },
            { name: 'Ashar', time: getTimeDate(dailyPrayerSchedule.ashar) },
            { name: 'Maghrib', time: getTimeDate(dailyPrayerSchedule.maghrib) },
            { name: 'Isya', time: getTimeDate(dailyPrayerSchedule.isya) }
        ];

        const tomorrowImsak = getTimeDate(dailyPrayerSchedule.imsak);
        tomorrowImsak.setDate(tomorrowImsak.getDate() + 1);
        prayerTimes.push({ name: 'Imsak', time: tomorrowImsak });

        let current = '';
        let next = { name: '', time: null as Date | null };
        let timeToNext = 0;

        for (let i = 0; i < prayerTimes.length - 1; i++) {
            if (now >= prayerTimes[i].time && now < prayerTimes[i + 1].time) {
                current = prayerTimes[i].name;
                next = { name: prayerTimes[i + 1].name, time: prayerTimes[i + 1].time };
                timeToNext = prayerTimes[i + 1].time.getTime() - now.getTime();
                break;
            }
        }

        if (!current) {
            if (now >= prayerTimes[prayerTimes.length - 2].time) {
                current = 'Isya';
                next = { name: 'Imsak', time: prayerTimes[prayerTimes.length - 1].time };
                timeToNext = prayerTimes[prayerTimes.length - 1].time.getTime() - now.getTime();
            } else {
                current = 'Isya';
                next = { name: 'Imsak', time: prayerTimes[0].time };
                timeToNext = prayerTimes[0].time.getTime() - now.getTime();
            }
        }

        return { current, next, timeToNext };
    }, [dailyPrayerSchedule]); // gunakan useCallback dan tambahkan dailyPrayerSchedule sebagai dependency

    const formatTimeRemaining = (ms: number) => {
        if (ms < 0) return "00:00:00";
        const hours = Math.floor(ms / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((ms % (1000 * 60)) / 1000);
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    useEffect(() => {
        const updatePrayerTime = () => {
            const { current, next, timeToNext } = getCurrentPrayer();
            setCurrentPrayer(current);
            setNextPrayer(next);
            setTimeToNextPrayer(formatTimeRemaining(timeToNext));
        };

        const interval = setInterval(updatePrayerTime, 1000);
        updatePrayerTime();

        return () => clearInterval(interval);
    }, [getCurrentPrayer]); // tambahkan getCurrentPrayer sebagai dependency

    return {
        dailyPrayerSchedule,
        formatDate,
        handleDateChange,
        useLocation,
        loading,
        tanggalStr,
        currentPrayer,
        nextPrayer,
        timeToNextPrayer,
    };
};
