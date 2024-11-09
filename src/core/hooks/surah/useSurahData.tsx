import { useCallback, useEffect, useState } from "react";
import SurahService from "./SurahService";

export async function retrieveDataSurah() {
    const DataSurah = await SurahService.getAllSurah();
    return DataSurah.data.data;
}

export async function retrieveDataDetailsSurah(SurahId: number) {
    const DataSurah = await SurahService.getDetailsSurah(SurahId);
    return DataSurah.data.data;
}

const useSurahData = () => {
    const [surah, setSurah] = useState<any[]>([]);
    const [loadedDataCount, setLoadedDataCount] = useState<number>(5);
    const [totalDataCount, setTotalDataCount] = useState<number>(0);
    const [searchParam, setSearchParam] = useState<string>('');
    const [loading, setLoading] = useState(true);


    const getAllSurah = useCallback(async () => {
        const responseSurah = await retrieveDataSurah();
        setTotalDataCount(responseSurah.length);
        setSurah(responseSurah.slice(0, loadedDataCount));
        setLoading(false);
    }, [loadedDataCount]);


    useEffect(() => {
        getAllSurah();
    }, [getAllSurah]);

    const loadMoreData = useCallback(() => {
        setLoadedDataCount((prevCount) => prevCount + 5);
    }, []);

    const handleScroll = useCallback(() => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight && loadedDataCount < totalDataCount) {
            loadMoreData();
        } else if (scrollTop === 0 && loadedDataCount > 5) {
            setLoadedDataCount(5);
        }
        setLoading(false);
    }, [loadedDataCount, totalDataCount, loadMoreData]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            setLoading(false);
        };
    }, [handleScroll]);

    const debouncedSearch = useCallback(
        (searchValue: string) => {
            const timeout = setTimeout(async () => {
                const responseSurah = await retrieveDataSurah();
                if (searchValue === '') {
                    setSurah(responseSurah.slice(0, loadedDataCount));
                    setLoading(false);
                } else {
                    setSurah(
                        responseSurah.filter((surah: any) =>
                            surah.namaLatin.toLowerCase().includes(searchValue.toLowerCase())
                        )
                    );
                    setLoading(false);
                }
            }, 300); // Adjust debounce delay as needed

            return () => clearTimeout(timeout);
        },
        [loadedDataCount]
    );

    const handleSearch = (searchValue: string) => {
        setSearchParam(searchValue);
        debouncedSearch(searchValue);
        setLoading(false);
    };



    return { surah, handleSearch, totalDataCount, loadedDataCount, debouncedSearch, searchParam, loading }

}

export default useSurahData