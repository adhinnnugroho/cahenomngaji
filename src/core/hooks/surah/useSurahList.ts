import { useCallback, useEffect, useState } from "react";
import { surahApi } from "@/core/api/surah.api";
import type { Surah } from "@/core/api/types/surah.types";

const useSurahList = () => {
    const [surahList, setSurahList] = useState<Surah[]>([]);
    const [searchParam, setSearchParam] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchSurahList = useCallback(async () => {
        try {
            const { data } = await surahApi.getAll();
            setSurahList(data.data);
        } catch (error) {
            console.error("Failed to fetch surah list:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSurahList();
    }, [fetchSurahList]);

    const handleSearch = (value: string) => {
        setSearchParam(value);
    };

    const filteredSurahList = surahList.filter((s) =>
        s.namaLatin.toLowerCase().includes(searchParam.toLowerCase())
    );

    return { surahList: filteredSurahList, handleSearch, searchParam, loading };
};

export default useSurahList;
