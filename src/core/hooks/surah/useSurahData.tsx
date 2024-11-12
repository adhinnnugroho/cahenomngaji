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
    const [searchParam, setSearchParam] = useState<string>('');
    const [loading, setLoading] = useState(true);


    const getAllSurah = useCallback(async () => {
        const responseSurah = await retrieveDataSurah();
        setSurah(responseSurah);
        setLoading(false);
    }, []);


    useEffect(() => {
        getAllSurah();
    }, [getAllSurah]);


    const debouncedSearch = useCallback(
        (searchValue: string) => {
            const timeout = setTimeout(async () => {
                const responseSurah = await retrieveDataSurah();
                if (searchValue === '') {
                    setSurah(responseSurah);
                    setLoading(false);
                } else {
                    setSurah(
                        responseSurah.filter((surah: any) =>
                            surah.namaLatin.toLowerCase().includes(searchValue.toLowerCase())
                        )
                    );
                    setLoading(false);
                }
            }, 300);

            return () => clearTimeout(timeout);
        },
        []
    );

    const handleSearch = (searchValue: string) => {
        setSearchParam(searchValue);
        debouncedSearch(searchValue);
        setLoading(false);
    };

    return { surah, handleSearch, debouncedSearch, searchParam, loading }

}

export default useSurahData