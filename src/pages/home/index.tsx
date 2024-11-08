import MainLayouts from "@/components/layouts/mainLayouts"
import { LastReadBackground } from "@/assets/images/ImageManagement"
import Image from "next/image"

const HomePage = () => {
    return (
        <MainLayouts>
            <div className="p-3">
                <div className="relative">
                    <Image src={LastReadBackground} alt="Last Read Background" className="w-full" />
                    <div className="absolute top-0 left-0 flex flex-wrap gap-1 ml-3 mt-3 items-center">
                        <i className="bx bx-book-open text-3xl" />
                        <h5 className="text-white font-semibold text-2xl">Last Read</h5>
                    </div>
                </div>


                <div className="mt-10">
                    <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-1">
                            <h1 className="text-3xl  text-purple-600 font-bold">
                                Surah
                            </h1>
                        </div>
                        <div className="col-span-2">
                            {/* <div className="flex justify-end items-center">
                                <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

        </MainLayouts>
    )
}

export default HomePage