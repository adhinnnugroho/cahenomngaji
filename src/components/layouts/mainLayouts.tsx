import MobileNavigation from "@/components/navigations/MobileNavigation";
import Navigation from "../navigations/Navigation";
import BackNavigations from "../navigations/BackNavigations";
import Image from "next/image";

const MainLayouts = ({ children, NavigationType, linkNavigation, NavbarTitle }: any) => {
    return <div className="lg:max-w-full md:max-w-full sm:max-w-full bg-black text-white">
        {NavigationType !== "none" && (
            NavigationType === "Back"
                ? <BackNavigations SurahName={NavbarTitle} link={linkNavigation} />
                : <Navigation />
        )}


        <div className="lg:block hidden">
            <div className="flex justify-center  items-center  min-h-screen">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
                    <div className="text-2xl font-bold text-gray-800 mb-4">
                        Versi PC Belum Tersedia
                    </div>
                    <div className="mb-6">
                        <p className="text-gray-600">
                            Kami mohon maaf, saat ini versi PC dari aplikasi kami belum tersedia. Silakan gunakan versi
                            seluler
                            untuk pengalaman terbaik.
                        </p>
                    </div>
                    <div className="mb-6">
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                        Kami sedang bekerja keras untuk menyediakan versi PC secepat mungkin. Terima kasih atas
                        pengertian
                        Anda.
                    </div>
                </div>
            </div>
        </div>
        <div className="lg:hidden block bg-black">
            {children}
            <MobileNavigation />
        </div>
    </div>;
};

export default MainLayouts;