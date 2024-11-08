import SearchInput from "@/components/input/SearchInput"
import MainLayouts from "@/components/layouts/mainLayouts"
import { retrieveAllDoa } from "@/core/hooks/doa/useDoaData";
import { useCallback, useEffect, useState } from "react";

const DoaPage = () => {
    const [animationSearchInput, setAnimationSearchInput] = useState(false);
    const [searchParam, setSearchParam] = useState<string>('');


    const handleAnimationSearchInput = () => {
        setAnimationSearchInput(!animationSearchInput);
    }
    return (
        <MainLayouts NavigationType="none">
            <div className="mt-5 ml-4 mr-4 mb-5">
                <div className="grid grid-cols-3 gap-7">
                    <div
                        className="col-span-1 text-2xl text-purple-600 font-bold">
                        Doa
                    </div>
                    <div className="col-span-2 text-3xl text-right mr-3 relative">
                        {!animationSearchInput ? (
                            <button onClick={handleAnimationSearchInput} >
                                <i className="bx bx-search text-3xl bg-gray-500 rounded-full flex justify-center items-center h-11 w-11 p-2" />
                            </button>
                        ) : (
                            <SearchInput handleAnimationSearchInput={handleAnimationSearchInput} />
                        )}
                    </div>
                </div>
            </div>
        </MainLayouts>
    )
}

export default DoaPage