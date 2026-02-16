export interface Surah {
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
    tempatTurun: string;
    arti: string;
    deskripsi: string;
    audioFull: Record<string, string>;
}

export interface Ayat {
    nomorAyat: number;
    teksArab: string;
    teksLatin: string;
    teksIndonesia: string;
    audio: Record<string, string>;
}

export interface SurahDetail extends Surah {
    ayat: Ayat[];
    suratSelanjutnya: SurahNavigation | false;
    suratSebelumnya: SurahNavigation | false;
}

export interface SurahNavigation {
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
}
