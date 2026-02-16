import { PropsWithChildren } from "react";
import { jadwalSholatBg } from "@/assets/images/ImageManagement";
import Image from "next/image";

interface HeroHeaderProps extends PropsWithChildren {
    title?: string;
    subtitle?: string;
    size?: "sm" | "md" | "lg";
}

const sizeClasses = {
    sm: "min-h-[180px]",
    md: "min-h-[240px]",
    lg: "min-h-[300px]",
};

const HeroHeader = ({
    title,
    subtitle,
    size = "md",
    children,
}: HeroHeaderProps) => {
    return (
        <div className={`relative z-10 ${sizeClasses[size]}`}>
            {/* Background image */}
            <Image
                src={jadwalSholatBg}
                alt=""
                className="w-full h-full object-cover absolute inset-0"
                fill
                priority
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-surface-950" />

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full p-5">
                {title && (
                    <div className="mb-4">
                        <h2 className="text-sm font-medium uppercase tracking-wider text-primary-400 mb-1">
                            {title}
                        </h2>
                        {subtitle && (
                            <h1 className="text-2xl font-bold text-white">{subtitle}</h1>
                        )}
                    </div>
                )}
                {children}
            </div>
        </div>
    );
};

export default HeroHeader;
