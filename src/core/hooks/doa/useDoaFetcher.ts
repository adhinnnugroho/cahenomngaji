import { useCallback, useEffect, useMemo, useState } from "react";
import { getDoa, getTypeDoa } from "@/core/modulesApi/doa/InternalApiCall";

export const useDoaFetcher = () => {
    const [DoaCategory, setDoaCategory] = useState([])
    const [loading, setLoading] = useState(true)
    const [CategoryDoa, setCategoryDoa] = useState('quran')
    const [DoaByCategory, setDoaByCategory] = useState<any[]>([]);
    const [StartIndex, setStartIndex] = useState(0);

    const fetchDoaByCategory = useCallback(async (typeDoa: String) => {
        const { data } = await getDoa(typeDoa as string);
        setDoaByCategory(data)
    }, [])

    const fetchDoaCategory = useCallback(async () => {
        const response = await getTypeDoa()
        setDoaCategory(response)
        setLoading(false)
    }, [])

    useEffect(() => {
        fetchDoaCategory()
        fetchDoaByCategory(CategoryDoa)
    }, [fetchDoaCategory, fetchDoaByCategory, CategoryDoa])


    const calculateTotalDoasByCategory = useCallback(async (typeDoa: string) => {
        const { data } = await getDoa(typeDoa);
        return data.length;
    }, []);

    const HandleChangeTypeDoa = async (typeDoa: string) => {
        setCategoryDoa(typeDoa);

        const doaTypes = ['quran', 'hadits', 'pilihan', 'harian', 'ibadah', 'haji', 'lainnya'];
        const typeIndex = doaTypes.indexOf(typeDoa);
        if (typeIndex === 0) {
            setStartIndex(0);
        } else if (typeIndex > 0) {
            const totalData = await Promise.all(
                doaTypes.slice(0, typeIndex).map(calculateTotalDoasByCategory)
            );
            const totalSum = totalData.reduce((sum, current) => sum + current, 0);
            setStartIndex(totalSum);
        }

        fetchDoaByCategory(typeDoa);
    };

    const handleSearch = (searchValue: string) => {
        const timeout = setTimeout(async () => {
            const { data } = await getDoa(CategoryDoa);
            if (searchValue === '') {
                setLoading(false);
            } else {
                setDoaByCategory(
                    data.filter((doa: any) =>
                        doa.judul.toLowerCase().includes(searchValue.toLowerCase())
                    )
                );
                setLoading(false);
            }
        }, 300);
        return () => clearTimeout(timeout);
    }

    return {
        DoaCategory,
        loading,
        CategoryDoa,
        DoaByCategory,
        StartIndex,
        handleSearch,
        HandleChangeTypeDoa
    }
}