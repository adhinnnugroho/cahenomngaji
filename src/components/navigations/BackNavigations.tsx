import Link from "next/link";


const BackNavigations = ({ SurahName, link }: any) => {
    return (
        <Link href={link ? link.toString() : '/'}>
            <div className="border  border-transparent border-b-gray-600 w-full mb-3 p-3">
                <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-1">
                        <div className="flex items-center gap-2">
                            <i className="bx bx-chevron-left text-3xl font-bold" />
                            <h1 className="text-xl font-semibold">
                                {SurahName}
                            </h1>
                        </div>
                    </div>
                    <div className="col-span-1">
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default BackNavigations