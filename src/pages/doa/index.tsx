import MainLayouts from "@/components/layouts/mainLayouts"
import { retrieveAllDoa, retrieveAllTypeDoa } from "@/core/hooks/doa/useDoaData"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { loadingSearchAnimations } from "@/assets/loading"
import { jadwalSholatBg } from "@/assets/images/ImageManagement";
import SearchInput from "@/components/input/SearchInput"
import Link from "next/link"

const DoaPage = () => {
    const [doaData, setDoaData] = useState([])
    const [loading, setLoading] = useState(true)
    const [typeDoa, setTypeDoa] = useState('quran')
    const [getDoaByType, setGetDoaByType] = useState<any[]>([]);
    const [indexDoa, setIndexDoa] = useState(0);


    const fetchAllDoaByType = useCallback(async (typeDoa: String) => {
        const response = await retrieveAllDoa(typeDoa as string);
        setGetDoaByType(response)
    }, [])

    const getTypeDoa = useCallback(async () => {
        const response = await retrieveAllTypeDoa()
        setDoaData(response)
        setLoading(false)
    }, [])

    useEffect(() => {
        getTypeDoa()
        fetchAllDoaByType(typeDoa)
    }, [getTypeDoa, fetchAllDoaByType, typeDoa])


    const fetchTotalDataDoa = useCallback(async (typeDoa: string) => {
        const response = await retrieveAllDoa(typeDoa);
        return response.length;
    }, []);

    const HandleChangeTypeDoa = async (typeDoa: string) => {
        setTypeDoa(typeDoa);

        const doaTypes = ['quran', 'hadits', 'pilihan', 'harian', 'ibadah', 'haji', 'lainnya'];
        const typeIndex = doaTypes.indexOf(typeDoa);
        if (typeIndex === 0) {
            setIndexDoa(0);
        } else if (typeIndex > 0) {
            const totalData = await Promise.all(
                doaTypes.slice(0, typeIndex).map(fetchTotalDataDoa)
            );

            // Hitung total data
            const totalSum = totalData.reduce((sum, current) => sum + current, 0);
            setIndexDoa(totalSum);
        }


        fetchAllDoaByType(typeDoa);
    };

    return (
        <MainLayouts NavigationType="none">
            <div className="relative z-10">
                <Image src={jadwalSholatBg} alt="Last Read Background" className="w-full " />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-65"></div>
                <div className="absolute top-0 left-0 w-full h-full p-5">
                    <div className="text-left">
                        <div className="mb-5">
                            <h2 className="capitalize text-xl mb-1 text-gray-400">
                                Collection
                            </h2>
                            <h1 className="text-3xl font-bold">
                                Prayers
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative -mt-14 z-20">
                <div className="bg-gray-900 p-3 -bottom-5 rounded-t-2xl">
                    <SearchInput placeholder="Find a Prayer" />
                </div>
            </div>
            <div className="p-4">
                <div className="flex  gap-3 overflow-y-auto">
                    {loading ? (
                        <Image
                            src={loadingSearchAnimations}
                            width={330}
                            height={60}
                            alt="ramadhan"
                            className="mx-auto"
                            priority
                        />
                    ) : (
                        doaData.map((item, index) => (
                            <button key={'button-' + index} className={`py-2 px-3 rounded-lg ${typeDoa === item ? 'bg-purple-600 text-white' : 'bg-white text-black'}`}
                                onClick={() => HandleChangeTypeDoa(item)}>
                                <h2 className="text-xl font-semibold capitalize ">
                                    {item}
                                </h2>
                            </button>
                        ))
                    )}
                </div>


                <div className="grid grid-cols-1 gap-3 mt-7 mb-20">
                    {getDoaByType?.map((DoaByType, index) => (
                        <div className="col-span-1" key={'doa-' + index}>
                            <Link href={"doa-detail/" + (indexDoa + index + 1)}>
                                <div className="flex capitalize text-left bg-gray-600 p-3 gap-2 rounded-lg">
                                    <p>
                                        {DoaByType.judul}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </MainLayouts>
    )
}

export default DoaPage