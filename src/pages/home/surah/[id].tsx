import { MainLayout, SurahDetailCard } from "@/components/index";
import useSurahDetail from "@/core/hooks/surah/useSurahDetail";
import Image from "next/image";
import Head from "next/head";
import { surahDetailsBackground, Bismillah } from "@/assets/images/ImageManagement";

const SurahDetailPage = () => {
    const { ayatList, surah, playingIndex, handleAudioPlayback } = useSurahDetail();

    return (
        <>
            <Head>
                <title>{surah.namaLatin ?? "Surah"} — Cahenomngaji</title>
            </Head>
            <MainLayout backHref="/home" backTitle={surah.namaLatin}>
                <div className="px-4 pt-4">
                    {/* Surah header card */}
                    <div
                        className="text-center rounded-2xl p-8 bg-cover bg-center relative overflow-hidden"
                        style={{ backgroundImage: `url(${surahDetailsBackground.src})` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/30 to-surface-950/60" />
                        <div className="relative z-10">
                            <h1 className="text-3xl font-bold text-white">{surah.namaLatin}</h1>
                            <h2 className="text-lg text-primary-300 mt-2 font-semibold">{surah.arti}</h2>
                            <div className="w-16 h-0.5 bg-white/30 mx-auto my-3" />
                            <p className="text-sm text-surface-300">
                                {surah.tempatTurun} • {surah.jumlahAyat} Ayat
                            </p>
                            <Image
                                src={Bismillah}
                                width={200}
                                height={50}
                                alt="Bismillah"
                                className="mx-auto mt-6 opacity-90"
                            />
                        </div>
                    </div>

                    {/* Ayat list */}
                    <div className="mt-8 mb-16">
                        {ayatList?.map((ayat: any, index: number) => (
                            <SurahDetailCard
                                key={ayat.nomorAyat}
                                nomorAyat={ayat.nomorAyat}
                                teksArab={ayat.teksArab}
                                teksLatin={ayat.teksLatin}
                                index={index}
                                playingIndex={playingIndex}
                                onToggleAudio={handleAudioPlayback}
                                audioSrc={ayat.audio["02"]}
                            />
                        ))}
                    </div>
                </div>
            </MainLayout>
        </>
    );
};

export default SurahDetailPage;