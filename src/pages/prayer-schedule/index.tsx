import { MainLayout } from "@/components";
import Head from "next/head";

const PrayerSchedulePage = () => {
    return (
        <>
            <Head>
                <title>Prayer Schedule — Cahenomngaji</title>
            </Head>
            <MainLayout>
                <div className="px-4 py-8 text-center">
                    <p className="text-surface-400">
                        Halaman ini sudah dipindahkan ke{" "}
                        <a href="/sholat" className="text-primary-400 underline">
                            /sholat
                        </a>
                    </p>
                </div>
            </MainLayout>
        </>
    );
};

export default PrayerSchedulePage;