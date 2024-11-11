import SearchInput from "@/components/input/SearchInput"
import MainLayouts from "@/components/layouts/mainLayouts"
import Link from "next/link"
import { useRouter } from "next/router"

const DoaPage = () => {

    const router = useRouter();
    const { type } = router.query;
    return (
        <MainLayouts NavigationType="none">
            <div className="w-full ">
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
                </div>
            </div>
        </MainLayouts>
    )
}

export default DoaPage