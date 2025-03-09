import { jadwalSholatBg } from "@/assets/images/ImageManagement";
import Image from "next/image";
import { PropsWithChildren } from "react";

const PrayerScheduleBackground = ({ children }: PropsWithChildren) => {
    return (
        <>
            <div className="relative z-10">
                <Image src={jadwalSholatBg} alt="Last Read Background" className="w-full " />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-65"></div>
                {children}
            </div>
        </>
    )
}

export default PrayerScheduleBackground