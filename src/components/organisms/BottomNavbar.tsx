import { useRouter } from "next/router";
import NavItem from "../molecules/NavItem";
import {
    ActiveDoa,
    ActiveHome,
    ActiveSholat,
    DoaIcons,
    HomeIcons,
    SholatIcons,
} from "@/assets/icons/IconsManagement";

const navItems = [
    {
        href: "/home",
        label: "Quran",
        icon: HomeIcons,
        activeIcon: ActiveHome,
        matchPath: "/home",
    },
    {
        href: "/sholat",
        label: "Sholat",
        icon: SholatIcons,
        activeIcon: ActiveSholat,
        matchPath: "/sholat",
    },
    {
        href: "/doa",
        label: "Doa",
        icon: DoaIcons,
        activeIcon: ActiveDoa,
        matchPath: "/doa",
    },
];

const BottomNavbar = () => {
    const router = useRouter();

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-surface-800/50 safe-area-bottom">
            <div className="flex items-center justify-around px-4 py-2 max-w-lg mx-auto">
                {navItems.map((item) => (
                    <NavItem
                        key={item.href}
                        href={item.href}
                        icon={item.icon}
                        activeIcon={item.activeIcon}
                        label={item.label}
                        isActive={router.pathname.startsWith(item.matchPath)}
                    />
                ))}
            </div>
        </div>
    );
};

export default BottomNavbar;
