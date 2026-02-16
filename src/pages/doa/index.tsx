import { MainLayout, SearchBar, HeroHeader, DoaCard, Button, Skeleton } from "@/components/index";
import Head from "next/head";
import { useDoaFetcher } from "@/core/hooks/doa/useDoaFetcher";

const DoaPage = () => {
    const {
        doaCategories,
        activeCategory,
        doaList,
        startIndex,
        loading,
        handleSearch,
        handleChangeCategory,
    } = useDoaFetcher();

    return (
        <>
            <Head>
                <title>Doa — Cahenomngaji</title>
            </Head>
            <MainLayout>
                <HeroHeader title="Kumpulan" subtitle="Doa & Dzikir" size="sm" />

                {/* Search */}
                <div className="relative -mt-6 z-20 px-4">
                    <SearchBar
                        placeholder="Cari doa..."
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>

                <div className="px-4 pt-4">
                    {/* Category chips */}
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide py-2">
                        {loading ? (
                            <Skeleton className="h-10 w-full" />
                        ) : (
                            doaCategories.map((cat, idx) => (
                                <Button
                                    key={`cat-${idx}`}
                                    variant="chip"
                                    isActive={activeCategory === cat}
                                    onClick={() => handleChangeCategory(cat)}
                                    className="shrink-0"
                                >
                                    {cat}
                                </Button>
                            ))
                        )}
                    </div>

                    {/* Doa list */}
                    <div className="space-y-2 mt-5 mb-20 stagger-children">
                        {doaList?.map((doa, index) => (
                            <DoaCard
                                key={`doa-${index}`}
                                title={doa.judul}
                                index={index}
                                startIndex={startIndex}
                            />
                        ))}
                    </div>
                </div>
            </MainLayout>
        </>
    );
};

export default DoaPage;