import { jadwalSholatBg } from "@/assets/images/ImageManagement";
import Image from "next/image"

interface MosqueHeaderInterface {
    title: string,
    subTitle?: string
}
const MosqueHeader = ({ title, subTitle }: MosqueHeaderInterface) => {
    return (
        <div className="relative z-10" >
            <Image src={jadwalSholatBg} alt="Last Read Background" className="w-full " />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-65"></div>
            <div className="absolute top-0 left-0 w-full h-full p-5">
                <div className="text-left">
                    <div className="mb-5">
                        <h2 className="capitalize text-xl mb-1 text-gray-400">
                            {title}
                        </h2>
                        {subTitle && <h1 className="text-3xl font-bold">{subTitle}</h1>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MosqueHeader