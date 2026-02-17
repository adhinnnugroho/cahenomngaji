import { MainLayout, SearchBar, HeroHeader, Button, Skeleton } from "@/components/index";
import Head from "next/head";
import Link from "next/link";
import { useDoaFetcher } from "@/core/hooks/doa/useDoaFetcher";

/* ────────────────────────────────────────────
   Desktop Doa Card
   ──────────────────────────────────────────── */
const DesktopDoaCard = ({
    title,
    index,
    startIndex,
}: {
    title: string;
    index: number;
    startIndex: number;
}) => {
    const number = startIndex + index + 1;
    return (
        <Link href={`doa/detail/${number}`}>
            <div className="glass rounded-2xl p-5 card-interactive group flex items-center gap-5 border-l-3 border-primary-600/30 hover:border-primary-400">
                {/* Number badge */}
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-surface-800/80 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary-400">{number}</span>
                </div>
                {/* Title */}
                <p className="text-base font-medium text-surface-200 capitalize group-hover:text-white transition-colors flex-1">
                    {title}
                </p>
                {/* Arrow */}
                <i className="bx bx-chevron-right text-xl text-surface-600 group-hover:text-primary-400 transition-colors" />
            </div>
        </Link>
    );
};

/* ────────────────────────────────────────────
   Mobile Doa Card
   ──────────────────────────────────────────── */
const MobileDoaCard = ({
    title,
    index,
    startIndex,
}: {
    title: string;
    index: number;
    startIndex: number;
}) => {
    const number = startIndex + index + 1;
    return (
        <Link href={`doa/detail/${number}`}>
            <div className="glass rounded-2xl p-4 card-interactive group flex items-center gap-3">
                {/* Number circle */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600/15 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-400">{number}</span>
                </div>
                {/* Title */}
                <p className="text-sm font-medium text-surface-200 capitalize group-hover:text-white transition-colors flex-1 truncate">
                    {title}
                </p>
                <i className="bx bx-chevron-right text-lg text-surface-600 group-hover:text-surface-300 transition-colors" />
            </div>
        </Link>
    );
};

/* ────────────────────────────────────────────
   Desktop Layout
   ──────────────────────────────────────────── */
const DesktopView = ({
    doaCategories,
    activeCategory,
    doaList,
    startIndex,
    loading,
    handleSearch,
    handleChangeCategory,
}: ReturnType<typeof useDoaFetcher>) => (
    <div className="hidden lg:block animate-fade-in">
        {/* Page header */}
        <div className="mb-8">
            <span className="section-label text-primary-400">Koleksi</span>
            <h1 className="text-3xl font-bold text-white mt-1">Doa & Dzikir</h1>
            <p className="text-surface-400 text-sm mt-2">
                Kumpulan doa sehari-hari dari berbagai sumber terpercaya
            </p>
        </div>

        {/* Search + category row */}
        <div className="flex items-start gap-4 mb-8">
            <div className="w-80">
                <SearchBar
                    placeholder="Cari doa..."
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mb-8">
            {loading ? (
                <Skeleton className="h-10 w-full" />
            ) : (
                doaCategories.map((cat, idx) => (
                    <Button
                        key={`cat-${idx}`}
                        variant="chip"
                        isActive={activeCategory === cat}
                        onClick={() => handleChangeCategory(cat)}
                    >
                        {cat}
                    </Button>
                ))
            )}
        </div>

        {/* Doa grid — two columns on desktop */}
        <div className="grid grid-cols-2 gap-3 stagger-children">
            {doaList?.map((doa, index) => (
                <DesktopDoaCard
                    key={`doa-${index}`}
                    title={doa.judul}
                    index={index}
                    startIndex={startIndex}
                />
            ))}
        </div>
    </div>
);

/* ────────────────────────────────────────────
   Mobile Layout
   ──────────────────────────────────────────── */
const MobileView = ({
    doaCategories,
    activeCategory,
    doaList,
    startIndex,
    loading,
    handleSearch,
    handleChangeCategory,
}: ReturnType<typeof useDoaFetcher>) => (
    <div className="lg:hidden">
        <HeroHeader title="Kumpulan" subtitle="Doa & Dzikir" size="sm" />

        {/* Search bar overlapping hero */}
        <div className="relative -mt-6 z-20 px-4">
            <SearchBar
                placeholder="Cari doa..."
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>

        <div className="px-4 pt-4">
            {/* Category scrollable chips */}
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

            {/* Doa list — single column on mobile */}
            <div className="space-y-2 mt-5 mb-20 stagger-children">
                {doaList?.map((doa, index) => (
                    <MobileDoaCard
                        key={`doa-${index}`}
                        title={doa.judul}
                        index={index}
                        startIndex={startIndex}
                    />
                ))}
            </div>
        </div>
    </div>
);

/* ────────────────────────────────────────────
   Page
   ──────────────────────────────────────────── */
const DoaPage = () => {
    const fetcher = useDoaFetcher();

    return (
        <>
            <Head>
                <title>Doa & Dzikir — Cahenomngaji</title>
                <meta
                    name="description"
                    content="Kumpulan doa dan dzikir sehari-hari dari Al-Quran, Hadits, dan sumber terpercaya lainnya."
                />
            </Head>
            <MainLayout>
                <DesktopView {...fetcher} />
                <MobileView {...fetcher} />
            </MainLayout>
        </>
    );
};

export default DoaPage;