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
        userCityLocations,
        userProvinceLocations,
        loading,
        tanggalStr,
        nextPrayer,
        timeToNextPrayer,
        dateInHijr
    } = useScheduleData();

    const TimeToPrayer = nextPrayer.time
        ? nextPrayer.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : '';

    return (
        <MainLayouts NavigationType="none">
            <div className="relative z-10">
                <Image src={jadwalSholatBg} alt="Last Read Background" className="w-full " />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-65"></div>

                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
                    <div className="text-center">
                        <h2 className="drop-shadow-2xl text-xl font-semibold">
                            {userCityLocations}, {userProvinceLocations}
                        </h2>
                        <h1 className="text-7xl font-bold capitalize mb-3 mt-3">
                            {TimeToPrayer}
                        </h1>
                        <p className="text-xl font-semibold">
                            {loading ? "" : timeToNextPrayer === "Waktu sholat telah tiba!"
                                ? timeToNextPrayer
                                : `-${timeToNextPrayer} menuju Sholat ${nextPrayer.name}`}
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-3 -mt-8 relative z-20">
                <div className="bg-white p-2 text-black rounded-lg">
                    <div className="flex justify-between items-center w-full">
                        <div className="flex">
                            <i
                                className="bx bx-chevron-left text-3xl font-bold cursor-pointer"
                                onClick={() => handleDateChange(-1)}
                            />
                        </div>

                        <div className="text-center flex-grow">
                            <h1 className="text-2xl font-bold">
                                {loading ? "Loading..." : formatDate(tanggalStr)}
                            </h1>
                            <p>
                                {dateInHijr}
                            </p>
                        </div>

                        <div className="flex">
                            <i
                                className="bx bx-chevron-right text-3xl font-bold cursor-pointer"
                                onClick={() => handleDateChange(1)}
                            />
                        </div>
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