import { MainLayout, HeroHeader } from "@/components/index";
import IconButton from "@/components/atoms/IconButton";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { doaApi } from "@/core/api/doa.api";
import type { DoaDetail } from "@/core/api/types/doa.types";
import Skeleton from "@/components/atoms/Skeleton";

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

    return (
        <>
            <Head>
                <title>{doa?.judul ?? "Doa"} — Cahenomngaji</title>
            </Head>
            <MainLayout showNavbar={false}>
                <HeroHeader size="md">
                    {/* Back button */}
                    <Link href="/doa">
                        <IconButton icon="bx bx-chevron-left" variant="glass" size="md" />
                    </Link>

                    {/* Title centered */}
                    <div className="flex-1 flex items-center justify-center">
                        <h3 className="text-2xl font-bold text-center px-4 leading-snug">
                            {loading ? "" : doa?.judul}
                        </h3>
                    </div>
                </HeroHeader>

                {/* Content */}
                <div className="relative -mt-6 z-20">
                    <div className="glass-strong rounded-t-3xl p-6 min-h-[60vh]">
                        {loading ? (
                            <Skeleton lines={4} className="h-8" />
                        ) : (
                            <>
                                {/* Arabic text */}
                                <h3 className="font-arabic text-3xl font-bold leading-[2.4] text-right text-white">
                                    {doa?.arab}
                                </h3>

                                {/* Divider */}
                                <div className="w-12 h-0.5 bg-primary-500/30 my-8" />

                                {/* Translation */}
                                <p className="text-base text-surface-300 leading-relaxed font-medium">
                                    {doa?.indo}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </MainLayout>
        </>
    );
};

export default DoaDetailPage;