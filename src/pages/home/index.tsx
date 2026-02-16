import { MainLayout, SearchBar, SurahCard, Skeleton, HeroHeader } from "@/components/index";
import { LastReadBackground } from "@/assets/index";
import Image from "next/image";
import Head from "next/head";
import useSurahList from "@/core/hooks/surah/useSurahList";

const HomePage = () => {
    const { surahList, handleSearch, loading } = useSurahList();

    return (
        <>
            <Head>
                <title>Quran — Cahenomngaji</title>
            </Head>
            <MainLayout>
                {/* Hero */}
                <HeroHeader title="Assalamualaikum" subtitle="Akhi/Ukhti" size="md">
                    <div className="mt-auto">
                        <div className="relative rounded-2xl overflow-hidden">
                            <Image
                                src={LastReadBackground}
                                alt="Last Read"
                                className="w-full object-cover rounded-2xl opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/60 to-transparent" />
                            <div className="absolute top-0 left-0 flex items-center gap-2 p-4">
                                <i className="bx bx-book-reader text-2xl text-primary-300" />
                                <span className="text-base font-semibold text-white">Last Read</span>
                            </div>
                        </div>
                    </div>
                </HeroHeader>

                {/* Search */}
                <div className="relative -mt-6 z-20 px-4">
                    <SearchBar
                        placeholder="Cari surah..."
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>

                {/* Surah list */}
                <div className="px-4 pt-6 pb-4">
                    {loading ? (
                        <div className="space-y-3">
                            <Skeleton lines={8} />
                        </div>
                    ) : (
                        <div className="stagger-children space-y-1">
                            {surahList.map((surah) => (
                                <SurahCard
                                    key={surah.nomor}
                                    surahNumber={surah.nomor}
                                    surahNameLatin={surah.namaLatin}
                                    tempatTurun={surah.tempatTurun}
                                    jumlahAyat={surah.jumlahAyat}
                                    link={`/home/surah/${surah.nomor}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </MainLayout>
        </>
    );
};

export default HomePage;
