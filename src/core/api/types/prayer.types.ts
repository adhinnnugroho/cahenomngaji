export interface PrayerSchedule {
    tanggal: string;
    imsak: string;
    subuh: string;
    terbit: string;
    dhuha: string;
    dzuhur: string;
    ashar: string;
    maghrib: string;
    isya: string;
    date: string;
}

export interface PrayerScheduleResponse {
    id: number;
    lokasi: string;
    daerah: string;
    jadwal: PrayerSchedule;
}

export type PrayerName =
    | 'imsak'
    | 'subuh'
    | 'terbit'
    | 'dhuha'
    | 'dzuhur'
    | 'ashar'
    | 'maghrib'
    | 'isya';

export interface NextPrayerInfo {
    name: string;
    time: Date | null;
}
