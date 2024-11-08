import MainLayouts from "@/components/layouts/mainLayouts"
import { LastReadBackground } from "@/assets/images/ImageManagement"
import Image from "next/image"
import { useMemo, useState } from "react";
import useSurahData from "@/core/hooks/surah/useSurahData";
import SurahCard from "@/components/card/SurahCard";
import SearchInput from "@/components/input/SearchInput";

const HomePage = () => {

    const [animationSearchInput, setAnimationSearchInput] = useState(false);
    const [searchParam, setSearchParam] = useState<string>('');
    const { surah, handleSearch, debouncedSearch } = useSurahData();


    const handleAnimationSearchInput = () => {
        setAnimationSearchInput(!animationSearchInput);
        if (animationSearchInput) {
            setSearchParam('');
            debouncedSearch(searchParam);
        }
    }



    const filteredSurahs = useMemo(() => {
        return surah.filter((surahItem: any) =>
            surahItem.namaLatin.toLowerCase().includes(searchParam.toLowerCase())
        );
    }, [surah, searchParam]);

    return (
        <MainLayouts>
            <div className="p-3">
                <div className="relative">
                    <Image src={LastReadBackground} alt="Last Read Background" className="w-full" />
                    <div className="absolute top-0 left-0 flex flex-wrap gap-1 ml-3 mt-3 items-center">
                        <i className="bx bx-book-open text-3xl" />
                        <h5 className="text-white font-semibold text-2xl">Last Read</h5>
                    </div>
                </div>

                <div className="mt-10">
                    <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-1 flex items-center justify-start">
                            <h1 className="text-3xl text-purple-600 font-bold">
                                Surah
                            </h1>
                        </div>
                        <div className="col-span-2">
                            <div className="flex justify-end items-center">
                                {!animationSearchInput ? (
                                    <button onClick={handleAnimationSearchInput} >
                                        <i className="bx bx-search text-3xl bg-gray-500 rounded-full flex justify-center items-center h-11 w-11 p-2" />
                                    </button>
                                ) : (
                                    <SearchInput handleAnimationSearchInput={handleAnimationSearchInput} onChange={(e) => handleSearch(e.target.value)} />
                                )}
                            </div>
                        </div>
                    </div>


                    <div className="w-full mb-20 mt-10">
                        {filteredSurahs.map((surah: any, index: number) =>
                            <SurahCard SurahNumber={surah.nomor} SurahNameLatin={surah.namaLatin} tempatTurun={surah.tempatTurun}
                                SurahNameTransliteration={surah.nama} link={`/home/surah/${surah.nomor}`} jumlahAyat={surah.jumlahAyat} key={index} />
                        )}
                    </div>
                </div>
            </div>

        </MainLayouts>
    )
}

export default HomePage