import { type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import BottomNavbar from "../organisms/BottomNavbar";
import IconButton from "../atoms/IconButton";

interface MainLayoutProps {
    children: ReactNode;
    showNavbar?: boolean;
    backHref?: string;
    backTitle?: string;
}

const sidebarItems = [
    { href: "/home", label: "Quran", icon: "bx bx-book-open" },
    { href: "/sholat", label: "Sholat", icon: "bx bx-time" },
    { href: "/doa", label: "Doa", icon: "bx bx-heart" },
];

const MainLayout = ({
    children,
    showNavbar = true,
    backHref,
    backTitle,
}: MainLayoutProps) => {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-surface-950 text-white">
            {/* ── Desktop sidebar ── */}
            <div className="hidden lg:flex lg:min-h-screen">
                <aside className="w-64 border-r border-surface-800/50 flex flex-col bg-surface-950">
                    <div className="px-6 pt-8 pb-6">
                        <h1 className="text-xl font-bold gradient-text">Cahenomngaji</h1>
                        <p className="text-xs text-surface-500 mt-1">
                            Baca Qur&apos;an dan doa harian
                        </p>
                    </div>
                    <nav className="flex-1 flex flex-col gap-1 px-3">
                        {sidebarItems.map((item) => {
                            const isActive = router.pathname.startsWith(item.href);
                            return (
                                <Link key={item.href} href={item.href}>
                                    <div
                                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200 text-sm font-medium ${isActive
                                                ? "glass-strong text-primary-400"
                                                : "text-surface-400 hover:text-white hover:bg-surface-800/40"
                                            }`}
                                    >
                                        <i className={`${item.icon} text-lg`} />
                                        <span>{item.label}</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                <main className="flex-1 flex flex-col">
                    {/* Desktop back nav */}
                    {backHref && (
                        <div className="border-b border-surface-800/50 px-6 py-3">
                            <Link href={backHref} className="flex items-center gap-2 text-surface-400 hover:text-white transition-colors">
                                <i className="bx bx-chevron-left text-2xl" />
                                <span className="text-sm font-semibold">{backTitle}</span>
                            </Link>
                        </div>
                    )}
                    <div className="w-full flex justify-center">
                        <div className="w-full max-w-4xl px-8 py-6">{children}</div>
                    </div>
                </main>
            </div>

            {/* ── Mobile layout ── */}
            <div className="lg:hidden min-h-screen flex flex-col">
                {/* Mobile back nav */}
                {backHref && (
                    <div className="sticky top-0 z-40 glass-strong border-b border-surface-800/30 px-4 py-3">
                        <Link href={backHref} className="flex items-center gap-2">
                            <IconButton icon="bx bx-chevron-left" size="sm" variant="glass" />
                            <span className="text-base font-semibold text-white">{backTitle}</span>
                        </Link>
                    </div>
                )}

                <main className="flex-1 w-full">
                    <div className="w-full max-w-lg mx-auto pb-24">{children}</div>
                </main>

                {showNavbar && <BottomNavbar />}
            </div>
        </div>
    );
};

export default MainLayout;
