import ScheduleCard from "@/components/card/Schedule/ScheduleCard";
import MainLayouts from "@/components/layouts/mainLayouts"
import { getCoordinatesUser } from "@/core/hooks/locations/useLocationService";
import { retrieveScheduleSholatDaily, retrieveSpecificCityData, retrieveUserLocations } from "@/core/hooks/sholat/useSholatData";
import { useDateData } from "@/core/hooks/useDateData";
import { useEffect, useState } from "react";

const SholatPage = () => {
    const { currentDateInfo, currentDate } = useDateData();
    const [dailyPrayerSchedule, setDailyPrayerSchedule] = useState<any>(null);
    const [City, setCity] = useState<any>(null);
    const [daysInMonth, setDaysInMonth] = useState<{ date: Date; dayName: string; isToday: boolean }[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [Today, setToday] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Mendapatkan koordinat pengguna
                const coordinates = await getCoordinatesUser() as [number, number];
                const [latitude, longitude] = coordinates;

                // Mendapatkan lokasi pengguna
                const UserLocationsResponse = await retrieveUserLocations(latitude, longitude);

                // Jika lokasi pengguna sudah didapatkan, ambil ID kota
                if (UserLocationsResponse.city) {
                    const cityDataResponse = await retrieveSpecificCityData(UserLocationsResponse.city.name);
                    setCity(cityDataResponse);
                    // Ambil jadwal sholat harian jika ID kota tersedia
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

    useEffect(() => {
        const getDaysInMonth = () => {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const today = new Date();
            const days = [];

            for (let day = 0; day <= 6; day++) {
                const date = new Date(year, month, today.getDate() + day - today.getDay());
                const dayName = getDayName(date.getDay());
                const isToday = date.toDateString() === today.toDateString();
                setToday(today.toDateString());
                days.push({ date, dayName, isToday });
            }

            setDaysInMonth(days);
        };

        const getDayName = (dayIndex: number) => {
            const daysOfWeek = ['Ming', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
            return daysOfWeek[dayIndex];
        };

        getDaysInMonth();
    }, [currentDate]);

    const changeSchedule = async (date: Date) => {
        setSelectedDate(date);
        setToday(date.toDateString());
        setDaysInMonth(prev => prev.map(day => ({ ...day, isToday: day.date.toDateString() === date.toDateString() })));
        if (City.id) {
            const ScheduleSholatResponse = await retrieveScheduleSholatDaily(City.id, date.getFullYear(), date.getMonth() + 1, date.getDate());
            setDailyPrayerSchedule(ScheduleSholatResponse.jadwal);
            setLoading(false);
        }
    };

    return (
        <MainLayouts NavigationType="none">
            <div className="p-3 mt-5">
                <div className="flex items-start gap-2">
                    <i className='bx bxs-calendar text-3xl font-semibold'></i>
                    <div className="">
                        <h1 className="text-2xl  font-bold">
                            Hari ini
                        </h1>
                        <h2>
                            {loading ? "Loading..." : dailyPrayerSchedule?.tanggal}
                        </h2>
                    </div>
                </div>

                <div className="overflow-x-auto scrollbar-hidden mt-10">
                    <div className="flex gap-2 text-center">
                        {daysInMonth.map((day, index) => (
                            <div className={`border border-gray-500 p-3  rounded-md cursor-pointer ${!selectedDate && Today === day.date.toDateString()
                                ? 'bg-purple-600 border-purple-600' : 'border-gray-700'}  ${selectedDate && day.date.toDateString() === selectedDate.toDateString()
                                    ? 'bg-purple-600 border-purple-600' : ''}`}
                                key={index} onClick={() => changeSchedule(day.date)}>
                                <p className='text-xl'>{day.dayName}</p>
                                <p className='text-xl'>{day.date.getDate()}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5  mt-10 mb-20">
                    <div className={`p-2 rounded-lg bg-gray-900`}>
                        <ScheduleCard title="Imsyak" Jadwal={loading ? "Loading..." : (dailyPrayerSchedule && dailyPrayerSchedule.imsak)} />
                    </div>
                    <div className={`p-2 rounded-lg bg-gray-900`}>
                        <ScheduleCard title="Sholat Subuh" Jadwal={loading ? "Loading..." : (dailyPrayerSchedule && dailyPrayerSchedule.subuh)} />
                    </div>
                    <div className={`p-2 rounded-lg bg-gray-900`}>
                        <ScheduleCard title="Sholat Dhuha" Jadwal={loading ? "Loading..." : (dailyPrayerSchedule && dailyPrayerSchedule.dhuha)} />
                    </div>
                    <div className={`p-2 rounded-lg bg-gray-900`}>
                        <ScheduleCard title="Sholat Dzuhur" Jadwal={loading ? "Loading..." : (dailyPrayerSchedule && dailyPrayerSchedule.dzuhur)} />
                    </div>
                    <div className={`p-2 rounded-lg bg-gray-900`}>
                        <ScheduleCard title="Sholat Ashar" Jadwal={loading ? "Loading..." : (dailyPrayerSchedule && dailyPrayerSchedule.ashar)} />
                    </div>
                    <div className={`p-2 rounded-lg bg-gray-900`}>
                        <ScheduleCard title="Sholat Maghrib" Jadwal={loading ? "Loading..." : (dailyPrayerSchedule && dailyPrayerSchedule.maghrib)} />
                    </div>
                    <div className={`p-2 rounded-lg bg-gray-900`}>
                        <ScheduleCard title="Sholat Isya" Jadwal={loading ? "Loading..." : (dailyPrayerSchedule && dailyPrayerSchedule.isya)} />
                    </div>
                </div>
            </div >
        </MainLayouts >
    )
}

export default SholatPage