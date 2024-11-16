import MainLayouts from "@/components/layouts/mainLayouts"
import useSurahDetail from "@/core/hooks/surah/useSurahDetail";
import SurahDetailHeader from "@/components/header/surah/SurahDetailHeader";
import SurahDetailsCard from "@/components/card/SurahDetailsCard";
const SurahDetailPage = () => {
    const {
        detailSurah,
        surah,
        playingIndex,
        handleAudioPlayback,
    } = useSurahDetail();

    return (
        <MainLayouts NavigationType="Back" linkNavigation="/home" NavbarTitle={surah.namaLatin}>
            <div className="p-3">
                <SurahDetailHeader nameSurah={surah.namaLatin} ayat={surah.jumlahAyat} arti={surah.arti} tempatTurun={surah.tempatTurun} />
                <div className="mt-16 mb-16">
                    {detailSurah?.map((surah: any, index: number) => {
                        return (
                            <div key={'surahDetails' + index}>
                                <SurahDetailsCard surah={surah} index={index} playingIndex={playingIndex}
                                    handleAudioPlayback={handleAudioPlayback} audio={surah.audio["02"]} teksArab={surah.teksArab}
                                    teksLatin={surah.teksLatin} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </MainLayouts>
    )
}

export default SurahDetailPage