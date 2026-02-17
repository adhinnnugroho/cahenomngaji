import { useEffect, useState, useCallback } from "react";
import { prayerApi } from "@/core/api/prayer.api";
import { geolocationApi, getRealTimeCoordinates } from "@/core/api/geolocation.api";
import { dateApi } from "@/core/api/date.api";
import { useDateData } from "@/core/hooks/useDateData";
import type { PrayerSchedule, NextPrayerInfo } from "@/core/api/types/prayer.types";
import type { CityData } from "@/core/api/types/geolocation.types";

export type LocationPermissionState = "checking" | "prompt" | "granted" | "denied";

export const useScheduleData = () => {
    const { currentDateInfo, formatDate } = useDateData();
    const [dailySchedule, setDailySchedule] = useState<PrayerSchedule | null>(null);
    const [city, setCity] = useState<CityData | null>(null);
    const [cityName, setCityName] = useState("");
    const [provinceName, setProvinceName] = useState("");
    const [loading, setLoading] = useState(true);
    const [locationError, setLocationError] = useState<string | null>(null);
    const [currentPrayer, setCurrentPrayer] = useState("");
    const [nextPrayer, setNextPrayer] = useState<NextPrayerInfo>({ name: "", time: null });
    const [timeToNextPrayer, setTimeToNextPrayer] = useState("");
    const [hijriDate, setHijriDate] = useState("");
    const [locationPermission, setLocationPermission] = useState<LocationPermissionState>("checking");

    // Fetch initial data
    const fetchLocationAndSchedule = useCallback(async () => {
        setLoading(true);
        setLocationError(null);
        try {
            const [latitude, longitude] = await getRealTimeCoordinates();
            setLocationPermission("granted");
            const { data: locationRes } = await geolocationApi.getByCoordinates(latitude, longitude);
            const locationData = locationRes.locationData;

            if (locationData?.city) {
                setCityName(locationData.city.name);
                setProvinceName(locationData.province.name);

                const { data: cityRes } = await geolocationApi.getCityId(locationData.city.name);
                const cityData = cityRes.data?.[0] as CityData | undefined;

                if (!cityData) {
                    console.warn("No matching city found for:", locationData.city.name);
                    setLocationError("Kota tidak ditemukan dalam database jadwal sholat.");
                    return;
                }

                setCity(cityData);

                if (cityData.id) {
                    const { data: scheduleRes } = await prayerApi.getDailySchedule(
                        cityData.id,
                        currentDateInfo.year,
                        currentDateInfo.month,
                        currentDateInfo.day
                    );
                    setDailySchedule(scheduleRes.data.data.jadwal);
                }
            }
        } catch (error: any) {
            console.error("Failed to load prayer schedule:", error);
            if (error?.code === 1) {
                setLocationPermission("denied");
                setLocationError("Akses lokasi ditolak. Silakan izinkan akses lokasi di pengaturan browser Anda.");
            } else if (error?.code === 2) {
                setLocationError("Lokasi tidak tersedia. Pastikan GPS aktif.");
            } else if (error?.code === 3) {
                setLocationError("Permintaan lokasi timeout. Silakan coba lagi.");
            } else {
                setLocationError("Gagal memuat jadwal sholat. Silakan coba lagi.");
            }
        } finally {
            setLoading(false);
        }
    }, [currentDateInfo.year, currentDateInfo.month, currentDateInfo.day]);

    // Check permission status on mount, only auto-fetch if already granted
    useEffect(() => {
        const checkPermission = async () => {
            try {
                if (navigator.permissions) {
                    const status = await navigator.permissions.query({ name: "geolocation" });
                    if (status.state === "granted") {
                        setLocationPermission("granted");
                        fetchLocationAndSchedule();
                    } else if (status.state === "denied") {
                        setLocationPermission("denied");
                        setLocationError("Akses lokasi ditolak. Silakan izinkan akses lokasi di pengaturan browser Anda.");
                        setLoading(false);
                    } else {
                        // "prompt" — wait for user action
                        setLocationPermission("prompt");
                        setLoading(false);
                    }

                    // Listen for permission changes
                    status.addEventListener("change", () => {
                        if (status.state === "granted") {
                            setLocationPermission("granted");
                            fetchLocationAndSchedule();
                        } else if (status.state === "denied") {
                            setLocationPermission("denied");
                            setLocationError("Akses lokasi ditolak. Silakan izinkan akses lokasi di pengaturan browser Anda.");
                        }
                    });
                } else {
                    // Fallback: Permissions API not supported, just request directly
                    setLocationPermission("prompt");
                    setLoading(false);
                }
            } catch {
                // Fallback if permissions query fails
                setLocationPermission("prompt");
                setLoading(false);
            }
        };

        checkPermission();
    }, [fetchLocationAndSchedule]);

    // Called when user clicks "Izinkan Lokasi" button
    const requestLocationPermission = useCallback(() => {
        setLocationPermission("checking");
        fetchLocationAndSchedule();
    }, [fetchLocationAndSchedule]);

    // Change schedule date
    const changeSchedule = async (date: Date) => {
        if (!city?.id) return;
        try {
            const { data } = await prayerApi.getDailySchedule(
                city.id,
                date.getFullYear(),
                date.getMonth() + 1,
                date.getDate()
            );
            setDailySchedule(data.data.data.jadwal);
        } catch (error) {
            console.error("Failed to change schedule:", error);
        } finally {
            setLoading(false);
        }
    };

    const tanggalStr = dailySchedule?.tanggal?.split(", ")[1];

    const handleDateChange = (direction: number) => {
        if (!tanggalStr) return;
        const [day, month, year] = tanggalStr.split("/");
        const currentDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        currentDate.setDate(currentDate.getDate() + direction);
        const newMonth = currentDate.getMonth() + 1;
        const dateStr = `${currentDate.getDate()}/${newMonth}/${currentDate.getFullYear()}`;
        fetchHijriDate(dateStr);
        changeSchedule(new Date(currentDate.getFullYear(), newMonth - 1, currentDate.getDate()));
        setLoading(true);
    };

    // Prayer time calculations
    const getTimeDate = (timeStr: string) => {
        const now = new Date();
        const [hours, minutes] = timeStr.split(":");
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(hours), parseInt(minutes));
    };

    const getCurrentPrayer = useCallback(() => {
        if (!dailySchedule) return { current: "", next: { name: "", time: null as Date | null }, timeToNext: 0 };

        const now = new Date();
        const prayerTimes = [
            { name: "Imsak", time: getTimeDate(dailySchedule.imsak) },
            { name: "Subuh", time: getTimeDate(dailySchedule.subuh) },
            { name: "Terbit", time: getTimeDate(dailySchedule.terbit) },
            { name: "Dhuha", time: getTimeDate(dailySchedule.dhuha) },
            { name: "Dzuhur", time: getTimeDate(dailySchedule.dzuhur) },
            { name: "Ashar", time: getTimeDate(dailySchedule.ashar) },
            { name: "Maghrib", time: getTimeDate(dailySchedule.maghrib) },
            { name: "Isya", time: getTimeDate(dailySchedule.isya) },
        ];

        const tomorrowImsak = getTimeDate(dailySchedule.imsak);
        tomorrowImsak.setDate(tomorrowImsak.getDate() + 1);
        prayerTimes.push({ name: "Imsak", time: tomorrowImsak });

        let current = "";
        let next: { name: string; time: Date | null } = { name: "", time: null };
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
            current = "Isya";
            const lastIdx = prayerTimes.length - 1;
            if (now >= prayerTimes[lastIdx - 1].time) {
                next = { name: "Imsak", time: prayerTimes[lastIdx].time };
                timeToNext = prayerTimes[lastIdx].time.getTime() - now.getTime();
            } else {
                next = { name: "Imsak", time: prayerTimes[0].time };
                timeToNext = prayerTimes[0].time.getTime() - now.getTime();
            }
        }

        return { current, next, timeToNext };
    }, [dailySchedule]);

    const formatTimeRemaining = (ms: number) => {
        if (ms <= 0) return "Waktu sholat telah tiba!";
        const hours = Math.floor(ms / 3_600_000);
        const minutes = Math.floor((ms % 3_600_000) / 60_000);
        const seconds = Math.floor((ms % 60_000) / 1_000);
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    useEffect(() => {
        const update = () => {
            const { current, next, timeToNext } = getCurrentPrayer();
            setCurrentPrayer(current);
            setNextPrayer(next);
            setTimeToNextPrayer(formatTimeRemaining(timeToNext));
        };

        const interval = setInterval(update, 1000);
        update();
        return () => clearInterval(interval);
    }, [getCurrentPrayer]);

    // Hijri date
    const fetchHijriDate = useCallback(async (dateStr: string) => {
        const result = await dateApi.getHijriDate(dateStr);
        setHijriDate(result ?? "");
    }, []);

    const defaultDateStr =
        tanggalStr ??
        `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;

    useEffect(() => {
        fetchHijriDate(defaultDateStr);
    }, [fetchHijriDate, defaultDateStr]);

    return {
        dailySchedule,
        formatDate,
        handleDateChange,
        cityName,
        provinceName,
        loading,
        locationError,
        locationPermission,
        requestLocationPermission,
        retryLocation: fetchLocationAndSchedule,
        tanggalStr,
        currentPrayer,
        nextPrayer,
        timeToNextPrayer,
        hijriDate,
    };
};
