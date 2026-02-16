import { MainLayout, ScheduleItem, Skeleton, HeroHeader, DateNavigator } from "@/components/index";
import Head from "next/head";
import { useScheduleData } from "@/core/hooks/sholat/useScheduleData";

const PRAYER_LIST = [
    { key: "imsak", label: "Imsyak" },
    { key: "subuh", label: "Subuh" },
    { key: "dhuha", label: "Dhuha" },
    { key: "dzuhur", label: "Dzuhur" },
    { key: "ashar", label: "Ashar" },
    { key: "maghrib", label: "Maghrib" },
    { key: "isya", label: "Isya" },
] as const;

const SholatPage = () => {
    const {
        dailySchedule,
        formatDate,
        handleDateChange,
        cityName,
        provinceName,
        loading,
        tanggalStr,
        currentPrayer,
        nextPrayer,
        timeToNextPrayer,
        hijriDate,
    } = useScheduleData();

    const nextPrayerTime = nextPrayer.time
        ? nextPrayer.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : "";

    return (
        <>
            <Head>
                <title>Jadwal Sholat — Cahenomngaji</title>
            </Head>
            <MainLayout>
                {/* Hero — countdown */}
                <HeroHeader size="lg">
                    <div className="flex-1 flex items-center justify-center flex-col text-center">
                        <p className="text-sm text-surface-400 font-medium">
                            {cityName}{provinceName ? `, ${provinceName}` : ""}
                        </p>
                        <h1 className="text-6xl font-extrabold tabular-nums mt-2 text-white tracking-tight">
                            {nextPrayerTime}
                        </h1>
                        <p className="text-sm text-primary-400 font-semibold mt-2">
                            {loading
                                ? ""
                                : timeToNextPrayer === "Waktu sholat telah tiba!"
                                    ? timeToNextPrayer
                                    : `-${timeToNextPrayer} menuju ${nextPrayer.name}`}
                        </p>
                    </div>
                </HeroHeader>

                {/* Date navigator */}
                <div className="px-4 -mt-6 relative z-20">
                    <DateNavigator
                        dateLabel={formatDate(tanggalStr)}
                        subLabel={hijriDate}
                        onPrev={() => handleDateChange(-1)}
                        onNext={() => handleDateChange(1)}
                        loading={loading}
                    />
                </div>

                {/* Prayer times */}
                <div className="px-4 pt-4 pb-6">
                    {loading ? (
                        <Skeleton lines={7} className="h-16" />
                    ) : (
                        <div className="space-y-2 stagger-children">
                            {PRAYER_LIST.map(({ key, label }) => (
                                <ScheduleItem
                                    key={key}
                                    title={label}
                                    time={dailySchedule?.[key] ?? "--:--"}
                                    isActive={currentPrayer.toLowerCase() === label.toLowerCase()}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </MainLayout>
        </>
    );
};

export default SholatPage;