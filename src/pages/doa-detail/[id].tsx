import { MainLayouts } from "@/components/index";
import { useRouter } from "next/router";
import { jadwalSholatBg } from "@/assets/index";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { retrieveOnlyDoa } from "@/core/hooks/doa/useDoaData";

const DoaDetailPage = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };

    const [onlyDoa, setOnlyDoa] = useState<any>(null);


    const getOnlyDoa = useCallback(async () => {
        if (id !== undefined) {
            const response = await retrieveOnlyDoa(id);
            setOnlyDoa(response);
        }
    }, [id])

    useEffect(() => {
        getOnlyDoa();
    }, [getOnlyDoa])

    return (
        <MainLayouts NavigationType="none">
            <div className="relative z-10">
                <Image src={jadwalSholatBg} alt="Last Read Background" className="w-full" />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-65"></div>

                <div className="absolute top-0 left-0 w-full h-full p-5 flex flex-col">
                    <div className="text-left">
                        <div className="mb-5">
                            <Link href={`/doa`}>
                                <h2 className="capitalize text-xl mb-1 bg-gray-300 w-8 h-8 flex items-center justify-center rounded-full">
                                    <i className="bx bx-chevron-left text-3xl font-semibold text-black"></i>
                                </h2>
                            </Link>
                        </div>
                    </div>

                    <div className="flex-grow flex items-center justify-center">
                        <h3 className="text-3xl font-bold text-center">
                            {onlyDoa?.judul}
                        </h3>
                    </div>
                </div>
            </div>

            <div className="relative -mt-14 z-20 ">
                <div className="bg-gray-900 p-3 -bottom-5 rounded-t-2xl">
                    <div className="p-4">
                        <h3 className="text-3xl  font-bold leading-[60px] ">
                            {onlyDoa?.arab}
                        </h3>
                        <p className="text-gray-300 font-semibold text-lg mt-10">
                            {onlyDoa?.indo}
                        </p>
                    </div>
                </div>
            </div>
        </MainLayouts>
    )
};

export default DoaDetailPage