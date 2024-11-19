import MainLayouts from "@/components/layouts/mainLayouts";
import { useRouter } from "next/router";
import { jadwalSholatBg } from "@/assets/images/ImageManagement";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { retrieveOnlyDoa } from "@/core/hooks/doa/useDoaData";


const DoaPage = () => {
    const router = useRouter();
    const [OnlyDoa, setOnlyDoa] = useState<any[]>([]);
    const { number } = router.query;

    const getOnlyDoa = useCallback(async () => {
        const response = await retrieveOnlyDoa(1);
        setOnlyDoa(response);
    }, [])

    useEffect(() => {
        getOnlyDoa();
    }, [getOnlyDoa])

    return (
        <MainLayouts NavigationType="none">
            <div className="relative z-10">
                <Image src={jadwalSholatBg} alt="Last Read Background" className="w-full " />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-65"></div>
                <div className="absolute top-0 left-0 w-full h-full p-5">
                    <div className="text-left">
                        <div className="mb-5">
                            <Link href={`/doa`}>
                                <h2 className="capitalize text-xl mb-1 bg-gray-300 w-8 h-8 flex items-center justify-center rounded-full">
                                    <i className="bx bx-chevron-left text-3xl font-semibold text-black"></i>
                                </h2>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative -mt-14 z-20">
                <div className="bg-gray-900 p-3 -bottom-5 rounded-t-2xl">
                    <h3 className="text-3xl font-bold">
                        {OnlyDoa.judul}
                    </h3>
                </div>

                <div className="p-4">
                    <h1 className="text-3xl font-bold">
                        {OnlyDoa?.arab}
                    </h1>
                    <h2 className="text-3xl font-semibold mt-10 mb-44">
                        {OnlyDoa?.indo}
                    </h2>
                </div>

            </div>
        </MainLayouts>
    )
}

export default DoaPage                                                                                                                                                                                                                                                                                                                                                                                                                                                             