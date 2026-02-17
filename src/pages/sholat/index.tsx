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
        locationError,
        locationPermission,
        requestLocationPermission,
        retryLocation,
        tanggalStr,
        currentPrayer,
        nextPrayer,
        timeToNextPrayer,
        hijriDate,
    } = useScheduleData();

    const nextPrayerTime = nextPrayer.time
        ? nextPrayer.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : "";

    // Show location permission prompt
    const showPermissionPrompt = locationPermission === "prompt" || locationPermission === "checking";

    return (
        <>
            <Head>
                <title>Jadwal Sholat — Cahenomngaji</title>
            </Head>
            <MainLayout>
                {showPermissionPrompt ? (
                    /* ── Location Permission Gate ── */
                    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
                        {/* Icon */}
                        <div className="w-20 h-20 rounded-full bg-primary-500/15 flex items-center justify-center mb-6">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-10 h-10 text-primary-400"
                            >
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                                <circle cx="12" cy="9" r="2.5" />
                            </svg>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-bold text-white mb-2">
                            Izinkan Akses Lokasi
                        </h2>

                        {/* Description */}
                        <p className="text-surface-400 text-sm leading-relaxed max-w-xs mb-8">
                            Kami membutuhkan lokasi Anda untuk menampilkan jadwal sholat
                            yang akurat sesuai wilayah Anda.
                        </p>

                        {/* Allow Button */}
                        <button
                            onClick={requestLocationPermission}
                            disabled={locationPermission === "checking"}
                            className="px-8 py-3 bg-primary-500 hover:bg-primary-600 disabled:opacity-60 disabled:cursor-wait text-white text-sm font-semibold rounded-2xl transition-all duration-200 shadow-lg shadow-primary-500/25 active:scale-95"
                        >
                            {locationPermission === "checking" ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Meminta izin...
                                </span>
                            ) : (
                                "Izinkan Lokasi"
                            )}
                        </button>

                        {/* Privacy note */}
                        <p className="text-surface-500 text-xs mt-4 max-w-[250px]">
                            Lokasi Anda hanya digunakan untuk menentukan jadwal sholat dan tidak disimpan.
                        </p>
                    </div>
                ) : (
                    /* ── Main Schedule Content ── */
                    <>
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

                        {/* Location error */}
                        {locationError && (
                            <div className="px-4 -mt-6 relative z-20">
                                <div className="bg-surface-800 border border-red-500/30 rounded-2xl p-5 text-center">
                                    <p className="text-red-400 text-sm font-medium mb-3">
                                        {locationError}
                                    </p>
                                    <button
                                        onClick={retryLocation}
                                        className="px-5 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-xl transition-colors"
                                    >
                                        Coba Lagi
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Date navigator */}
                        {!locationError && (
                            <div className="px-4 -mt-6 relative z-20">
                                <DateNavigator
                                    dateLabel={formatDate(tanggalStr)}
                                    subLabel={hijriDate}
                                    onPrev={() => handleDateChange(-1)}
                                    onNext={() => handleDateChange(1)}
                                    loading={loading}
                                />
                            </div>
                        )}

                        {/* Prayer times */}
                        {!locationError && (
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
                        )}
                    </>
                )}
            </MainLayout>
        </>
    );
};

export default SholatPage;

