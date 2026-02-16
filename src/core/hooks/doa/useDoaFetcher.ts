import { useCallback, useEffect, useState } from "react";
import { doaApi } from "@/core/api/doa.api";
import type { DoaDetail, DoaCategory } from "@/core/api/types/doa.types";

export const useDoaFetcher = () => {
    const [doaCategories, setDoaCategories] = useState<DoaCategory[]>([]);
    const [activeCategory, setActiveCategory] = useState("quran");
    const [doaList, setDoaList] = useState<DoaDetail[]>([]);
    const [startIndex, setStartIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchCategories = useCallback(async () => {
        try {
            const { data } = await doaApi.getTypes();
            setDoaCategories(data.data ?? []);
        } catch (error) {
            console.error("Failed to fetch doa categories:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchDoaByCategory = useCallback(async (category: string) => {
        try {
            const { data } = await doaApi.getBySumber(category);
            setDoaList(data.data ?? []);
        } catch (error) {
            console.error("Failed to fetch doa list:", error);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
        fetchDoaByCategory(activeCategory);
    }, [fetchCategories, fetchDoaByCategory, activeCategory]);

    const handleChangeCategory = async (category: string) => {
        setActiveCategory(category);

        const doaTypes = ["quran", "hadits", "pilihan", "harian", "ibadah", "haji", "lainnya"];
        const typeIndex = doaTypes.indexOf(category);

        if (typeIndex <= 0) {
            setStartIndex(0);
        } else {
            try {
                const totals = await Promise.all(
                    doaTypes.slice(0, typeIndex).map(async (type) => {
                        const { data } = await doaApi.getBySumber(type);
                        return (data.data ?? []).length;
                    })
                );
                setStartIndex(totals.reduce((sum, count) => sum + count, 0));
            } catch {
                setStartIndex(0);
            }
        }

        fetchDoaByCategory(category);
    };

    const handleSearch = (searchValue: string) => {
        if (!searchValue.trim()) {
            fetchDoaByCategory(activeCategory);
            return;
        }
        setDoaList((prev) =>
            prev.filter((doa) =>
                doa.judul?.toLowerCase().includes(searchValue.toLowerCase())
            )
        );
    };

    return {
        doaCategories,
        activeCategory,
        doaList,
        startIndex,
        loading,
        handleSearch,
        handleChangeCategory,
    };
};