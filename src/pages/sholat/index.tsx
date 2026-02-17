import { MainLayout, ScheduleItem, Skeleton, DateNavigator } from "@/components/index";
import Head from "next/head";
import Image from "next/image";
import { jadwalSholatBg } from "@/assets/images/ImageManagement";
import { useScheduleData } from "@/core/hooks/sholat/useScheduleData";

// Professional "Neutral" Theme override
// Replaces Slate (Blue-ish) surface colors with True Neutral colors
const professionalTheme = {
    "--color-surface-50": "#fafafa",
    "--color-surface-100": "#f5f5f5",
    "--color-surface-200": "#e5e5e5",
    "--color-surface-300": "#d4d4d4",
    "--color-surface-400": "#a3a3a3",
    "--color-surface-500": "#737373",
    "--color-surface-600": "#525252",
    "--color-surface-700": "#404040",
    "--color-surface-800": "#262626",
    "--color-surface-900": "#171717",
    "--color-surface-950": "#0a0a0a",
} as React.CSSProperties;

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
            <div style={professionalTheme}>
                <MainLayout>
                    {showPermissionPrompt ? (
                        /* ── Location Permission Gate ── */
                        <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
                            {/* Icon */}
                            <div className="w-20 h-20 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-6">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-10 h-10 text-primary-500"
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
                                className="px-8 py-3 bg-primary-600 hover:bg-primary-500 disabled:opacity-60 disabled:cursor-wait text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-primary-900/20 active:scale-95 border border-primary-500/20"
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
                            {/* Pro Hero — countdown */}
                            <div className="relative z-10 min-h-[320px] rounded-3xl overflow-hidden mb-6 group border border-surface-800/50">
                                {/* Background image with Grayscale & Sepia for Professional Look */}
                                <Image
                                    src={jadwalSholatBg}
                                    alt=""
                                    className="w-full h-full object-cover absolute inset-0 grayscale sepia-[0.2] opacity-60 transition-transform duration-700 group-hover:scale-105"
                                    fill
                                    priority
                                />
                                {/* Gradient overlay - Neutral */}
                                <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/80 to-transparent" />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

                                {/* Content */}
                                <div className="relative z-10 flex flex-col h-full p-6 justify-end items-center text-center pb-10">
                                    <p className="text-sm text-surface-300 font-medium tracking-wide uppercase mb-1">
                                        {cityName}{provinceName ? `, ${provinceName}` : ""}
                                    </p>
                                    <h1 className="text-7xl font-bold tabular-nums text-white tracking-tighter drop-shadow-lg">
                                        {nextPrayerTime}
                                    </h1>
                                    <div className="mt-3 px-4 py-1.5 rounded-full bg-surface-900/50 backdrop-blur-md border border-surface-700/50">
                                        <p className="text-sm text-primary-400 font-medium">
                                            {loading
                                                ? "Memuat..."
                                                : timeToNextPrayer === "Waktu sholat telah tiba!"
                                                    ? timeToNextPrayer
                                                    : `-${timeToNextPrayer} menuju ${nextPrayer.name}`}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Location error */}
                            {locationError && (
                                <div className="px-4 -mt-6 relative z-20">
                                    <div className="bg-surface-800 border border-red-500/30 rounded-2xl p-5 text-center">
                                        <p className="text-red-400 text-sm font-medium mb-3">
                                            {locationError}
                                        </p>
                                        <button
                                            onClick={retryLocation}
                                            className="px-5 py-2 bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold rounded-xl transition-colors"
                                        >
                                            Coba Lagi
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Date navigator */}
                            {!locationError && (
                                <div className="px-2 -mt-4 relative z-20 mb-4">
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
                                <div className="px-1 pb-6">
                                    {loading ? (
                                        <Skeleton lines={7} className="h-16 rounded-xl" />
                                    ) : (
                                        <div className="space-y-3 stagger-children">
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
            </div>
        </>
    );
};

export default SholatPage;

