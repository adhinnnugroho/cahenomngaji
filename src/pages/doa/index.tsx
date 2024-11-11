import MainLayouts from "@/components/layouts/mainLayouts"
import { retrieveAllDoa, retrieveAllTypeDoa } from "@/core/hooks/doa/useDoaData"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { loadingSearchAnimations } from "@/assets/loading"
import Link from "next/link"

interface DoaWithCount {
    type: string;
    count: number;
}

const DoaPage = () => {
    const [doaData, setDoaData] = useState<DoaWithCount[]>([])
    const [loading, setLoading] = useState(true)

    // 1. Implementasi caching dengan localStorage
    const CACHE_KEY = 'doa-data-cache'
    const CACHE_DURATION = 1000 * 60 * 60 // 1 jam

    const getCachedData = () => {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
            const { data, timestamp } = JSON.parse(cached)
            if (Date.now() - timestamp < CACHE_DURATION) {
                return data
            }
        }
        return null
    }

    const setCachedData = (data: DoaWithCount[]) => {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
            data,
            timestamp: Date.now()
        }))
    }

    // 2. Optimasi fetch data dengan batching
    const getAllData = useCallback(async () => {
        try {
            // Check cache first
            const cachedData = getCachedData()
            if (cachedData) {
                setDoaData(cachedData)
                setLoading(false)
                return
            }

            const types = await retrieveAllTypeDoa()

            // Batch requests in groups of 5
            const batchSize = 5
            const results: DoaWithCount[] = []

            for (let i = 0; i < types.length; i += batchSize) {
                const batch = types.slice(i, i + batchSize)
                const batchPromises = batch.map(async (type: string) => {
                    const doas = await retrieveAllDoa(type)
                    return {
                        type,
                        count: doas.length
                    }
                })

                const batchResults = await Promise.all(batchPromises)
                results.push(...batchResults)

                // Update state progressively as batches complete
                setDoaData(prevData => [...prevData, ...batchResults])
            }

            // Cache the final results
            setCachedData(results)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error)
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        getAllData()
    }, [getAllData])

    // 3. Implementasi lazy loading untuk list items
    const DoaItem = ({ item, index }: { item: DoaWithCount; index: number }) => (
        <div
            key={`Doa${index}`}
            className="border border-gray-900 mb-4 p-3 rounded-lg bg-gray-900"
        >
            <div>
                <h1 className="capitalize text-xl font-bold">
                    {item.type}
                </h1>
                <span className="text-gray-400">
                    {item.count} Bacaan
                </span>
            </div>
        </div>
    )

    return (
        <MainLayouts NavigationType="none">
            <div className="p-4">
                <h1 className="text-3xl font-bold text-purple-600">
                    Doa
                </h1>
            </div>
            <div className="p-4">
                <div className=" mb-24">
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
                            <Link href={`/doa/${item.type}`} key={index}>
                                <DoaItem key={index} item={item} index={index} />
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </MainLayouts>
    )
}

export default DoaPage