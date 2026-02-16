import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface NavItemProps {
    href: string;
    icon: StaticImageData;
    activeIcon: StaticImageData;
    label: string;
    isActive: boolean;
}

const NavItem = ({ href, icon, activeIcon, label, isActive }: NavItemProps) => {
    return (
        <Link href={href}>
            <div className="flex flex-col items-center gap-1 py-1 transition-all duration-200">
                <div className="relative">
                    <Image
                        src={isActive ? activeIcon : icon}
                        width={28}
                        height={28}
                        alt={label}
                        className="transition-transform duration-200"
                    />
                </div>
                <span
                    className={`text-[10px] font-medium transition-colors duration-200 ${isActive ? "text-primary-400" : "text-surface-500"
                        }`}
                >
                    {label}
                </span>
                {isActive && (
                    <div className="w-1 h-1 rounded-full bg-primary-400 animate-scale-in" />
                )}
            </div>
        </Link>
    );
};

export default NavItem;
