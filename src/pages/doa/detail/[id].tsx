import { MainLayout } from "@/components/index";
import IconButton from "@/components/atoms/IconButton";
import Skeleton from "@/components/atoms/Skeleton";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { doaApi } from "@/core/api/doa.api";
import type { DoaDetail } from "@/core/api/types/doa.types";

/* ────────────────────────────────────────────
   Desktop‑only skeleton
   ──────────────────────────────────────────── */
const DesktopSkeleton = () => (
    <div className="hidden lg:block animate-fade-in">
        <div className="skeleton h-8 w-64 mb-8 rounded-lg" />
        <div className="doa-panel p-8 mb-6">
            <Skeleton lines={3} className="h-10" />
        </div>
        <div className="grid grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-6">
                <Skeleton lines={3} className="h-6" />
            </div>
            <div className="glass rounded-2xl p-6">
                <Skeleton lines={3} className="h-6" />
            </div>
        </div>
    </div>
);

/* ────────────────────────────────────────────
   Mobile‑only skeleton
   ──────────────────────────────────────────── */
const MobileSkeleton = () => (
    <div className="lg:hidden animate-fade-in p-4 space-y-4">
        <div className="skeleton h-7 w-48 rounded-lg" />
        <div className="glass rounded-2xl p-5">
            <Skeleton lines={3} className="h-9" />
        </div>
        <div className="glass rounded-2xl p-5">
            <Skeleton lines={2} className="h-5" />
        </div>
        <div className="glass rounded-2xl p-5">
            <Skeleton lines={2} className="h-5" />
        </div>
    </div>
);

/* ────────────────────────────────────────────
   Desktop layout
   ──────────────────────────────────────────── */
const DesktopView = ({ doa }: { doa: DoaDetail }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        const text = doa.arab || doa.doa || "";
        if (!text) return;
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="hidden lg:block animate-fade-in-up">
            {/* ── Title bar ── */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <span className="section-label text-primary-400">Doa Harian</span>
                    <h1 className="text-3xl font-bold text-white mt-1">{doa.judul}</h1>
                </div>
                <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm font-medium text-surface-300 hover:text-white transition-colors cursor-pointer"
                >
                    <i className={`bx ${copied ? "bx-check" : "bx-copy"} text-lg`} />
                    {copied ? "Tersalin" : "Salin Arab"}
                </button>
            </div>

            {/* ── Arabic panel ── */}
            <div className="doa-panel p-8 mb-8">
                <span className="section-label text-accent-500 mb-4 block">Teks Arab</span>
                <p className="font-arabic text-[2rem] font-bold leading-[2.6] text-white text-right">
                    {doa.arab || doa.doa}
                </p>
            </div>

            {/* ── Latin & Translation side‑by‑side ── */}
            <div className="grid grid-cols-2 gap-6 mb-8">
                {/* Latin */}
                <div className="glass rounded-2xl p-6">
                    <span className="section-label text-primary-400 mb-3 block">Latin</span>
                    <p className="text-surface-200 leading-relaxed text-[0.95rem] italic">
                        {doa.latin || "—"}
                    </p>
                </div>

                {/* Indonesian translation */}
                <div className="glass rounded-2xl p-6">
                    <span className="section-label text-primary-400 mb-3 block">Artinya</span>
                    <p className="text-surface-200 leading-relaxed text-[0.95rem]">
                        {doa.indo || doa.artinya || "—"}
                    </p>
                </div>
            </div>

            {/* ── Full meaning section (if separate artinya exists) ── */}
            {doa.indo && doa.artinya && doa.indo !== doa.artinya && (
                <div className="glass rounded-2xl p-6">
                    <span className="section-label text-accent-500 mb-3 block">Keterangan</span>
                    <p className="text-surface-300 leading-relaxed text-[0.95rem]">
                        {doa.artinya}
                    </p>
                </div>
            )}
        </div>
    );
};

/* ────────────────────────────────────────────
   Mobile layout
   ──────────────────────────────────────────── */
const MobileView = ({ doa }: { doa: DoaDetail }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        const text = doa.arab || doa.doa || "";
        if (!text) return;
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="lg:hidden animate-fade-in-up">
            {/* ── Sticky mobile header ── */}
            <div className="sticky top-0 z-40 backdrop-blur-xl bg-surface-950/80 border-b border-surface-800/40 px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <a href="/doa">
                            <IconButton icon="bx bx-chevron-left" variant="glass" size="sm" />
                        </a>
                        <h1 className="text-base font-semibold text-white truncate">
                            {doa.judul}
                        </h1>
                    </div>
                    <button
                        type="button"
                        onClick={handleCopy}
                        className="flex items-center justify-center w-8 h-8 rounded-full glass text-surface-300 active:scale-90 transition-all cursor-pointer"
                    >
                        <i className={`bx ${copied ? "bx-check text-primary-400" : "bx-copy"} text-lg`} />
                    </button>
                </div>
            </div>

            {/* ── Content cards ── */}
            <div className="p-4 space-y-4 pb-28 stagger-children">
                {/* Category badge */}
                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-600/15 text-primary-400 text-xs font-semibold tracking-wide uppercase">
                        <i className="bx bx-heart text-sm" />
                        Doa Harian
                    </span>
                </div>

                {/* Arabic card */}
                <div className="doa-panel-mobile p-5">
                    <span className="section-label text-accent-500 mb-3 block">Teks Arab</span>
                    <p className="font-arabic text-[1.65rem] font-bold leading-[2.4] text-white text-right">
                        {doa.arab || doa.doa}
                    </p>
                </div>

                {/* Latin card */}
                <div className="glass rounded-2xl p-5">
                    <span className="section-label text-primary-400 mb-2 block">Latin</span>
                    <p className="text-surface-200 leading-relaxed text-sm italic">
                        {doa.latin || "—"}
                    </p>
                </div>

                {/* Translation card */}
                <div className="glass rounded-2xl p-5">
                    <span className="section-label text-primary-400 mb-2 block">Artinya</span>
                    <p className="text-surface-200 leading-relaxed text-sm">
                        {doa.indo || doa.artinya || "—"}
                    </p>
                </div>

                {/* Additional meaning (if both indo & artinya exist and differ) */}
                {doa.indo && doa.artinya && doa.indo !== doa.artinya && (
                    <div className="glass rounded-2xl p-5">
                        <span className="section-label text-accent-500 mb-2 block">Keterangan</span>
                        <p className="text-surface-300 leading-relaxed text-sm">
                            {doa.artinya}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

/* ────────────────────────────────────────────
   Page
   ──────────────────────────────────────────── */
const DoaDetailPage = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };
    const [doa, setDoa] = useState<DoaDetail | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchDoa = useCallback(async () => {
        if (!id) return;
        try {
            const { data } = await doaApi.getById(id);
            setDoa(data.data);
        } catch (error) {
            console.error("Failed to fetch doa detail:", error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchDoa();
    }, [fetchDoa]);

    const pageTitle = doa ? `${doa.judul} — Cahenomngaji` : "Detail Doa — Cahenomngaji";

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={doa?.indo || doa?.artinya || "Detail doa harian"} />
            </Head>

            {/* ── Desktop uses MainLayout with sidebar ── */}
            <div className="hidden lg:block">
                <MainLayout showNavbar={false} backHref="/doa" backTitle="Kembali ke Doa">
                    {loading ? <DesktopSkeleton /> : doa && <DesktopView doa={doa} />}
                </MainLayout>
            </div>

            {/* ── Mobile uses minimal chrome ── */}
            <div className="lg:hidden min-h-screen bg-surface-950 text-white">
                {loading ? <MobileSkeleton /> : doa && <MobileView doa={doa} />}
            </div>
        </>
    );
};

export default DoaDetailPage;