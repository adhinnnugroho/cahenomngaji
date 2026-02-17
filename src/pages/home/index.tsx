import { MainLayout, SearchBar, SurahCard, Skeleton, HeroHeader, Badge } from "@/components/index";
import { LastReadBackground } from "@/assets/index";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import useSurahList from "@/core/hooks/surah/useSurahList";

/* ────────────────────────────────────────────
   Desktop Surah Row — richer than the default SurahCard
   ──────────────────────────────────────────── */
const DesktopSurahRow = ({
    nomor,
    namaLatin,
    tempatTurun,
    jumlahAyat,
}: {
    nomor: number;
    namaLatin: string;
    tempatTurun: string;
    jumlahAyat: number;
}) => (
    <Link href={`/home/surah/${nomor}`}>
        <div className="flex items-center gap-5 p-4 rounded-2xl card-interactive group border border-surface-800/40 hover:border-surface-700/60">
            <Badge variant="primary" size="md">{nomor}</Badge>
            <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-white group-hover:text-primary-300 transition-colors">
                    {namaLatin}
                </h3>
                <p className="text-sm text-surface-500 mt-0.5">
                    {tempatTurun} • {jumlahAyat} Ayat
                </p>
            </div>
            <i className="bx bx-chevron-right text-xl text-surface-600 group-hover:text-primary-400 transition-colors" />
        </div>
    </Link>
);

/* ────────────────────────────────────────────
   Desktop Layout
   ──────────────────────────────────────────── */
const DesktopView = ({
    surahList,
    handleSearch,
    loading,
}: ReturnType<typeof useSurahList>) => (
    <div className="hidden lg:block animate-fade-in">
        {/* Header row */}
        <div className="flex items-start justify-between gap-8 mb-8">
            <div>
                <span className="section-label text-primary-400">Al-Quran</span>
                <h1 className="text-3xl font-bold text-white mt-1">Assalamualaikum, Akhi/Ukhti</h1>
                <p className="text-surface-400 text-sm mt-2">
                    Baca dan pelajari Al-Quran dengan mudah
                </p>
            </div>
            {/* Last read card — compact */}
            <div className="relative rounded-2xl overflow-hidden w-72 shrink-0">
                <Image
                    src={LastReadBackground}
                    alt="Last Read"
                    className="w-full h-24 object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-900/60 to-transparent" />
                <div className="absolute inset-0 flex items-center gap-2 px-5">
                    <i className="bx bx-book-reader text-2xl text-primary-300" />
                    <span className="text-sm font-semibold text-white">Terakhir Dibaca</span>
                </div>
            </div>
        </div>

        {/* Search */}
        <div className="w-80 mb-8">
            <SearchBar
                placeholder="Cari surah..."
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>

        {/* Surah counter */}
        <p className="text-xs text-surface-500 mb-4 font-medium uppercase tracking-wider">
            {surahList.length} Surah ditemukan
        </p>

        {/* Two-column grid */}
        {loading ? (
            <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="skeleton h-16 rounded-2xl" />
                ))}
            </div>
        ) : (
            <div className="grid grid-cols-2 gap-3 stagger-children">
                {surahList.map((surah) => (
                    <DesktopSurahRow
                        key={surah.nomor}
                        nomor={surah.nomor}
                        namaLatin={surah.namaLatin}
                        tempatTurun={surah.tempatTurun}
                        jumlahAyat={surah.jumlahAyat}
                    />
                ))}
            </div>
        )}
    </div>
);

/* ────────────────────────────────────────────
   Mobile Layout
   ──────────────────────────────────────────── */
const MobileView = ({
    surahList,
    handleSearch,
    loading,
}: ReturnType<typeof useSurahList>) => (
    <div className="lg:hidden">
        {/* Hero with last-read card */}
        <HeroHeader title="Assalamualaikum" subtitle="Akhi/Ukhti" size="md">
            <div className="mt-auto">
                <div className="relative rounded-2xl overflow-hidden">
                    <Image
                        src={LastReadBackground}
                        alt="Last Read"
                        className="w-full object-cover rounded-2xl opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-900/60 to-transparent" />
                    <div className="absolute top-0 left-0 flex items-center gap-2 p-4">
                        <i className="bx bx-book-reader text-2xl text-primary-300" />
                        <span className="text-base font-semibold text-white">Terakhir Dibaca</span>
                    </div>
                </div>
            </div>
        </HeroHeader>

        {/* Search overlapping hero */}
        <div className="relative -mt-6 z-20 px-4">
            <SearchBar
                placeholder="Cari surah..."
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>

        {/* Surah list — single column */}
        <div className="px-4 pt-6 pb-4">
            {loading ? (
                <div className="space-y-3">
                    <Skeleton lines={8} />
                </div>
            ) : (
                <div className="stagger-children space-y-1">
                    {surahList.map((surah) => (
                        <SurahCard
                            key={surah.nomor}
                            surahNumber={surah.nomor}
                            surahNameLatin={surah.namaLatin}
                            tempatTurun={surah.tempatTurun}
                            jumlahAyat={surah.jumlahAyat}
                            link={`/home/surah/${surah.nomor}`}
                        />
                    ))}
                </div>
            )}
        </div>
    </div>
);

/* ────────────────────────────────────────────
   Page
   ──────────────────────────────────────────── */
const HomePage = () => {
    const fetcher = useSurahList();

    return (
        <>
            <Head>
                <title>Quran — Cahenomngaji</title>
                <meta
                    name="description"
                    content="Baca dan pelajari Al-Quran dengan mudah. Kumpulan 114 surah lengkap dengan terjemahan."
                />
            </Head>
            <MainLayout>
                <DesktopView {...fetcher} />
                <MobileView {...fetcher} />
            </MainLayout>
        </>
    );
};

export default HomePage;
