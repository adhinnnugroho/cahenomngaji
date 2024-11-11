import SearchInput from "@/components/input/SearchInput"
import MainLayouts from "@/components/layouts/mainLayouts"
import { retrieveAllTypeDoa } from "@/core/hooks/doa/useDoaData"
import { useCallback, useEffect, useState } from "react"

const DoaPage = () => {

    const [typeDoa, setTypeDoa] = useState([])
    const [SearchParam, setSearchParam] = useState('');
    const getAllTypeDoa = useCallback(async () => {
        const getResponseTypeDoa = await retrieveAllTypeDoa();
        setTypeDoa(getResponseTypeDoa);
    }, []);

    useEffect(() => {
        getAllTypeDoa();
    }, [getAllTypeDoa]);



    return (
        <MainLayouts NavigationType="none">
            <div className="fixed w-full bg-black">
                <div className="p-4">
                    <SearchInput placeholder="Search Doa" />
                </div>
            </div>
            <div className="p-4">

                <div className="mt-28">
                    {typeDoa.map((Doa: any, index: number) => {
                        return (
                            <div key={"Doa" + index} className="border border-gray-900 mb-4 p-3 rounded-lg bg-gray-900 ">
                                <h1>
                                    {Doa}
                                </h1>
                            </div>
                        )
                    })}
                </div>
            </div>
        </MainLayouts >
    )
}

export default DoaPage