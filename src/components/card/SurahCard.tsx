import Image from "next/image"
import { IconsNumber } from "@/assets/images/ImageManagement"
import Link from "next/link"

type SurahPropsType = {
    'SurahNumber': any,
    'SurahNameLatin': any,
    'tempatTurun': any,
    'jumlahAyat': any,
    'link'?: string | URL,
    'SurahNameTransliteration': any
}


const SurahCard = ({ SurahNumber, SurahNameLatin, tempatTurun, SurahNameTransliteration, link, jumlahAyat }: SurahPropsType) => {
    return (
        <Link href={link ? link.toString() : `/Surah/${SurahNumber}`}>
            <div className="flex flex-wrap gap-3 mb-4 border border-transparent border-b-gray-600">
                <div className="relative text-2xl mb-4 flex-shrink-0">
                    <Image src={IconsNumber} width={330} height={60} alt="ramadhan" className="w-12" />
                    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                        <h1 className="text-xl font-bold text-white">{SurahNumber}</h1>
                    </div>
                </div>

                <div className="flex flex-col justify-between flex-grow">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <h2 className="text-xl font-bold">{SurahNameLatin}</h2>
                            <p>{tempatTurun} - {jumlahAyat} Ayat</p>
                        </div>
                        <div className="col-span-1 flex justify-end items-center">
                            <h2 className="text-2xl text-purple-700 font-bold">{SurahNameTransliteration}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default SurahCard