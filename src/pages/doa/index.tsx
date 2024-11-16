import MainLayouts from "@/components/layouts/mainLayouts"
import { retrieveAllTypeDoa } from "@/core/hooks/doa/useDoaData"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { loadingSearchAnimations } from "@/assets/loading"
import Link from "next/link"

const DoaPage = () => {
    const [doaData, setDoaData] = useState([])
    const [loading, setLoading] = useState(true)


    const getTypeDoa = useCallback(async () => {
        const response = await retrieveAllTypeDoa()
        setDoaData(response)
        setLoading(false)
    }, [])

    useEffect(() => {
        getTypeDoa()
    }, [getTypeDoa])



    return (
        <MainLayouts NavigationType="none">
            <div className="p-4">
                <h1 className="text-3xl font-bold text-purple-600">
                    Doa
                </h1>
            </div>
            <div className="p-4">
                <div className="grid grid-cols-1 gap-4 w-full">
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
                            <Link href={`/doa/${item}`} key={index}>
                                <div className="col-span-1 bg-gray-900 p-3 rounded-lg">
                                    {item}
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </MainLayouts>
    )
}

export default DoaPage