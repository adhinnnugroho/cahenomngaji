import MainLayouts from "@/components/layouts/mainLayouts"
import { LastReadBackground } from "@/assets/images/ImageManagement"
import { loadingSearchAnimations } from "@/assets/loading"
import Image from "next/image"
import { useMemo, useState } from "react";
import useSurahData from "@/core/hooks/surah/useSurahData";
import SurahCard from "@/components/card/SurahCard";
import SearchInput from "@/components/input/SearchInput";
import { FixedSizeList as List } from 'react-window';
import { jadwalSholatBg } from "@/assets/images/ImageManagement";


const HomePage = () => {
    const { surah, handleSearch, loading, searchParam } = useSurahData();
    const filteredSurahs = useMemo(() => {
        return surah.filter((surahItem: any) =>
            surahItem.namaLatin.toLowerCase().includes(searchParam.toLowerCase())
        );
    }, [surah, searchParam]);

    const Row = ({ index, style }: { index: number, style: React.CSSProperties }) => {
        const surah = filteredSurahs[index];
        return (
            <div style={style} key={index}>
                <SurahCard
                    SurahNumber={surah.nomor}
                    SurahNameLatin={surah.namaLatin}
                    tempatTurun={surah.tempatTurun}
                    link={`/home/surah/${surah.nomor}`}
                    jumlahAyat={surah.jumlahAyat}
                />
            </div>
        );
    };

    return (
        <MainLayouts NavigationType="none">
            <div className="relative z-10">
                <Image src={jadwalSholatBg} alt="Last Read Background" className="w-full " />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-65"></div>
                <div className="absolute top-0 left-0 w-full h-full p-5">
                    <div className="text-left">
                        <div className="mb-5">
                            <h2 className="capitalize text-xl mb-1 text-gray-400">
                                assalamualaikum,
                            </h2>
                            <h1 className="text-3xl font-bold">
                                Akhi/Ukhti
                            </h1>
                        </div>
                    </div>

                    <div className="relative">
                        <Image src={LastReadBackground} alt="Last Read Background" className="w-full" />
                        <div className="absolute top-0 left-0 flex flex-wrap gap-1 ml-3 mt-3 items-center">
                            <i className="bx bx-book-reader text-3xl" />
                            <h5 className="text-white font-semibold text-2xl">Last Read</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative -mt-14 z-20">
                <div className="bg-gray-900 p-3 -bottom-5 rounded-t-2xl">
                    <SearchInput onChange={(e) => handleSearch(e.target.value)} />
                </div>
            </div>

            <div className="bg-gray-900  p-3 -mt-3 h-full">
                <div className="mt-5">
                    {loading ? (
                        <Image src={loadingSearchAnimations} width={330} height={60} alt="loading" className="mx-auto" />
                    ) : (
                        filteredSurahs.map((surah: any, index: number) => (
                            <div key={index}>
                                <SurahCard
                                    SurahNumber={surah.nomor}
                                    SurahNameLatin={surah.namaLatin}
                                    tempatTurun={surah.tempatTurun}
                                    link={`/home/surah/${surah.nomor}`}
                                    jumlahAyat={surah.jumlahAyat}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>



            {/* <div className="p-4">
                <div className="mb-10">
                    <h2 className="capitalize text-xl mb-1 text-gray-400">
                        assalamualaikum,
                    </h2>
                    <h1 className="text-3xl font-bold">
                        Akhi/ukhti
                    </h1>
                </div>



                <div className="relative mb-10">
                    <Image src={LastReadBackground} alt="Last Read Background" className="w-full" />
                    <div className="absolute top-0 left-0 flex flex-wrap gap-1 ml-3 mt-3 items-center">
                        <i className="bx bx-book-open text-3xl" />
                        <h5 className="text-white font-semibold text-2xl">Last Read</h5>
                    </div>
                </div>

                <div className="mt-5">
                    <div className="mb-5">
                        <SearchInput onChange={(e) => handleSearch(e.target.value)} />
                    </div>

                    <div className="mb-20 mt-5 p-2">
                        {loading ? (
                            <Image src={loadingSearchAnimations} width={330} height={60} alt="loading" className="mx-auto" />
                        ) : (
                            <List
                                height={600}
                                itemCount={filteredSurahs.length}
                                itemSize={100}
                                width="100%"
                            >
                                {Row}
                            </List>
                        )}
                    </div>
                </div>
            </div> */}
        </MainLayouts>
    )
}

export default HomePage;
