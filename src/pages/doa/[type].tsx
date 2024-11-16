import MainLayouts from "@/components/layouts/mainLayouts"
// import { retrieveAllDoa } from "@/core/hooks/doa/useDoaData"
// import { useRouter } from "next/router"
// import { useCallback, useEffect, useMemo, useState } from "react"

const DoaPage = () => {
    // const router = useRouter();
    // const { type } = router.query;
    // const [searchParam] = useState<string>('');

    // const [getDoa, setgetDoa] = useState([])
    // const fetchAllDoa = useCallback(async () => {
    //     const response = await retrieveAllDoa(type as string);
    //     setgetDoa(response)
    // }, [type])

    // useEffect(() => {
    //     fetchAllDoa()
    // }, [fetchAllDoa])


    // const filteredSurahs = useMemo(() => {
    //     return getDoa.filter((DoaItem: any) =>
    //         DoaItem.judul.toLowerCase().includes(searchParam.toLowerCase())
    //     );
    // }, [getDoa, searchParam]);


    return (
        <MainLayouts NavigationType="none">
            teswt
            {/* <div className="w-full ">
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                        <Link href={"/doa"}>
                            <div className="flex items-center gap-2 p-3">
                                <i className="bx bx-chevron-left text-4xl font-bold"></i>
                                <h1 className="text-white text-2xl font-semibold  capitalize">
                                    {type}
                                </h1>
                            </div>
                        </Link>
                    </div>
                    <div className="col-span-1">

                    </div>
                </div>
            </div>
            <div className="fixed w-full bg-black">
                <div className="p-4">
                    <SearchInput placeholder="Search Doa" />
                </div>
            </div>
            <div className="p-4">
                <div className="mt-28 mb-24">
                    {filteredSurahs.map((doa: any) => (
                        <div className="flex items-center gap-2 p-3">
                            <h1 className="text-white text-2xl font-semibold  capitalize">
                                {doa.judul}
                            </h1>
                        </div>
                    ))}
                </div>
            </div> */}
        </MainLayouts>
    )
}

export default DoaPage