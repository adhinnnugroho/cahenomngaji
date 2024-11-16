import React, { useState, useEffect } from 'react';

export const UsePrayerTimeDetector = ({ dailyPrayerSchedule }: any) => {
    const [currentPrayer, setCurrentPrayer] = useState('');
    const [nextPrayer, setNextPrayer] = useState('');
    const [timeToNextPrayer, setTimeToNextPrayer] = useState('');
    const [timePrayer, settimePrayer] = useState('');

    const getTimeDate = (timeStr: any) => {
        const now = new Date();
        const [hours, minutes] = timeStr.split(':');
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(),
            parseInt(hours), parseInt(minutes), 0);
    };

    const getCurrentPrayer = () => {
        if (!dailyPrayerSchedule) return { current: '', next: '', timeToNext: 0 };

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

        // Tambahkan waktu Imsak untuk besok
        const tomorrowImsak = getTimeDate(dailyPrayerSchedule.imsak);
        tomorrowImsak.setDate(tomorrowImsak.getDate() + 1);
        prayerTimes.push({ name: 'Imsak', time: tomorrowImsak });

        let current = '';
        let next = '';
        let timeToNext = 0;

        // Cari waktu sholat saat ini dan selanjutnya
        for (let i = 0; i < prayerTimes.length - 1; i++) {
            if (now >= prayerTimes[i].time && now < prayerTimes[i + 1].time) {
                current = prayerTimes[i].name;
                next = prayerTimes[i + 1].name;
                timeToNext = prayerTimes[i + 1].time.getTime() - now.getTime();
                break;
            }
        }

        // Handle kasus di mana waktu sekarang setelah Isya
        if (!current) {
            if (now >= prayerTimes[prayerTimes.length - 2].time) {
                current = 'Isya';
                next = 'Imsak';
                timeToNext = prayerTimes[prayerTimes.length - 1].time.getTime() - now.getTime();
            } else {
                current = 'Isya';
                next = 'Imsak';
                timeToNext = prayerTimes[0].time.getTime() - now.getTime();
            }
        }

        return { current, next, timeToNext };
    };

    const formatTimeRemaining = (ms: any) => {
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
    }, [dailyPrayerSchedule]);

    if (!dailyPrayerSchedule) {
        return <div>Loading...</div>;
    }

    return { currentPrayer, nextPrayer, timeToNextPrayer };
}