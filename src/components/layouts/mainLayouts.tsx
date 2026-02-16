import MobileNavigation from "@/components/navigations/MobileNavigation";
import Navigation from "../navigations/Navigation";
import BackNavigations from "../navigations/BackNavigations";
import Link from "next/link";
import { useRouter } from "next/router";

const MainLayouts = ({ children, NavigationType, linkNavigation, NavbarTitle }: any) => {
    const router = useRouter();

    const navItems = [
        { href: "/home", label: "Home" },
        { href: "/sholat", label: "Sholat" },
        { href: "/doa", label: "Doa" }
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="hidden lg:flex lg:min-h-screen">
                <div className="w-72 border-r border-gray-800 flex flex-col">
                    <div className="px-6 pt-6 pb-4">
                        <h1 className="text-2xl font-bold">
                            Cahenomngaji
                        </h1>
                        <p className="text-sm text-gray-400 mt-1">
                            Baca Qur'an dan doa harian
                        </p>
                    </div>
                    <nav className="mt-4 flex-1 flex flex-col gap-2 px-2">
                        {navItems.map((item) => {
                            const isActive = router.pathname.startsWith(item.href);

                            return (
                                <Link key={item.href} href={item.href}>
                                    <div
                                        className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition text-sm font-medium ${isActive ? "bg-gray-800" : "hover:bg-gray-900"}`}
                                    >
                                        <span>
                                            {item.label}
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <div className="flex-1 flex flex-col">
                    {NavigationType !== "none" && (
                        NavigationType === "Back"
                            ? <BackNavigations SurahName={NavbarTitle} link={linkNavigation} />
                            : <Navigation />
                    )}
                    <div className="w-full flex justify-center">
                        <div className="w-full max-w-4xl px-8 py-6">
                            {children}
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:hidden min-h-screen flex flex-col">
                {NavigationType !== "none" && (
                    NavigationType === "Back"
                        ? <BackNavigations SurahName={NavbarTitle} link={linkNavigation} />
                        : <Navigation />
                )}
                <div className="flex-1 w-full flex justify-center">
                    <div className="w-full max-w-3xl px-4 pb-24">
                        {children}
                    </div>
                </div>
                <MobileNavigation />
            </div>
        </div>
    );
};

export default MainLayouts;
