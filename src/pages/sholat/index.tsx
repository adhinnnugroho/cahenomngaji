import ScheduleCard from "@/components/card/Schedule/ScheduleCard";
import MainLayouts from "@/components/layouts/mainLayouts"
import { jadwalSholatBg } from "@/assets/images/ImageManagement";
import Image from "next/image";
import { useScheduleData } from "@/core/hooks/sholat/useScheduleData";

const SholatPage = () => {
    const {
        dailyPrayerSchedule,
        formatDate,
        handleDateChange,
        useLocation,
        loading,
        tanggalStr,
        nextPrayer,
        timeToNextPrayer,
    } = useScheduleData();

    const TimeToPrayer = nextPrayer.time
        ? nextPrayer.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
        : '';

    return (
        <MainLayouts NavigationType="none">
            <div className="relative z-10">
                <Image src={jadwalSholatBg} alt="Last Read Background" className="w-full" />
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
                    <div className="flex flex-wrap gap-1 ml-3 mt-3 items-center absolute top-0 left-0">
                        <i className="bx bx-location-plus text-3xl" />
                        <h5 className="text-white font-semibold text-2xl">
                            {useLocation}
                        </h5>
                    </div>
                    <div className="text-center mt-24">
                        <h1 className="text-4xl font-bold capitalize">
                            {nextPrayer.name} {TimeToPrayer}
                        </h1>
                        <p className="text-3xl font-semibold">
                            {loading ? "" : '-' + timeToNextPrayer}
                        </p>
                    </div>
                </div>
            </div>


            <div className="p-3 -mt-8 relative z-20">
                <div className="bg-white p-2 text-black rounded-lg">
                    <div className="flex flex-wrap gap-3 w-full items-center justify-center">
                        <i className="bx bx-chevron-left text-3xl font-bold" onClick={() => handleDateChange(-1)} />
                        <h1 className="text-2xl  font-bold text-center">
                            {loading ? "Loading..." : formatDate(tanggalStr)}
                        </h1>
                        <i className="bx bx-chevron-right text-3xl font-bold" onClick={() => handleDateChange(1)} />
                    </div>
                </div>
            </div>

            <div className="p-4 -mt-10">
                <div className="grid grid-cols-1 gap-5  mt-10 mb-20">
                    <div className={`p-2 rounded-lg bg-gray-900`}>
                        <ScheduleCard title="Imsyak" Jadwal={loading ? "Loading..." : (dailyPrayerSchedule?.imsak)} />
                    </div>
                    <div className={`p-2 rounded-lg bg-gray-900`}>
                        <ScheduleCard title="Sholat Subuh" Jadwal={loading ? "Loading..." : (dailyPrayerSchedule?.subuh)} />
                    </div>
                    <div className={`p-2 rounded-lg bg-gray-900`}>
                        <ScheduleCard title="Sholat Dhuha" Jadwal={loading ? "Loading..." : (dailyPrayerSchedule?.dhuha)} />
                    </div>
                    <div className={`p-2 rounded-lg bg-gray-900`}>
                        <ScheduleCard title="Sholat Dzuhur" Jadwal={loading ? "Loading..." : (dailyPrayerSchedule?.dzuhur)} />
                    </div>
                    <div className={`p-2 rounded-lg bg-gray-900`}>
                        <ScheduleCard title="Sholat Ashar" Jadwal={loading ? "Loading..." : (dailyPrayerSchedule?.ashar)} />
                    </div>
                    <div className={`p-2 rounded-lg bg-gray-900`}>
                        <ScheduleCard title="Sholat Maghrib" Jadwal={loading ? "Loading..." : (dailyPrayerSchedule?.maghrib)} />
                    </div>
                    <div className={`p-2 rounded-lg bg-gray-900`}>
                        <ScheduleCard title="Sholat Isya" Jadwal={loading ? "Loading..." : (dailyPrayerSchedule?.isya)} />
                    </div>
                </div>
            </div>
        </MainLayouts >
    )
}

export default SholatPage