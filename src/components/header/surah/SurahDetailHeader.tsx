import Image from "next/image";
import { surahDetailsBackground, Bismillah } from "@/assets/images/ImageManagement"

type SurahDetailHeaderProps = {
    nameSurah: string,
    ayat: number,
    arti: string,
    tempatTurun: string
}

const SurahDetailHeader = ({ nameSurah, ayat, arti, tempatTurun }: SurahDetailHeaderProps) => {
    return (
        <div className="text-center mt-4 bg-cover bg-center h-auto rounded-xl p-9" style={{ backgroundImage: `url(${surahDetailsBackground.src})` }} >
            <h1 className="text-4xl font-bold">
                {nameSurah}
            </h1>
            <h2 className="text-2xl mt-5 font-bold">
                {arti}
            </h2>
            <div className="border-b-4 border-white w-1/2 mx-auto mt-2 mb-2"></div>
            <h1 className="text-xl font-bold mt-3">
                {tempatTurun} - {ayat} Ayat
            </h1>
            <Image src={Bismillah} width={250} height={60} alt="ramadhan" className="mx-auto mt-10" />
        </div>
    )
}


export default SurahDetailHeader