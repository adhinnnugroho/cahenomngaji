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
            const categories = data.data;
            setDoaCategories(Array.isArray(categories) ? categories : []);
        } catch (error) {
            console.error("Failed to fetch doa categories:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchDoaByCategory = useCallback(async (category: string) => {
        try {
            const { data } = await doaApi.getBySumber(category);
            const list = data.data;
            setDoaList(Array.isArray(list) ? list : []);
        } catch (error) {
            console.error("Failed to fetch doa list:", error);
        }
    }, []);

    const [categoriesReady, setCategoriesReady] = useState(false);

    // Initial load: categories first, then doa list (sequential)
    useEffect(() => {
        const init = async () => {
            await fetchCategories();
            // small delay to avoid external API rate-limit
            await new Promise((r) => setTimeout(r, 300));
            await fetchDoaByCategory(activeCategory);
            setCategoriesReady(true);
        };
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Subsequent category changes (only after initial load is done)
    useEffect(() => {
        if (categoriesReady) {
            fetchDoaByCategory(activeCategory);
        }
    }, [categoriesReady, activeCategory, fetchDoaByCategory]);

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
                        const items = data.data;
                        return (Array.isArray(items) ? items : []).length;
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