import Badge from "../atoms/Badge";
import IconButton from "../atoms/IconButton";

interface SurahDetailCardProps {
    nomorAyat: number;
    teksArab: string;
    teksLatin: string;
    index: number;
    playingIndex: number;
    onToggleAudio: (index: number) => void;
    audioSrc: string;
}

const SurahDetailCard = ({
    nomorAyat,
    teksArab,
    teksLatin,
    index,
    playingIndex,
    onToggleAudio,
    audioSrc,
}: SurahDetailCardProps) => {
    const isPlaying = playingIndex === index;

    return (
        <div className="mb-6 animate-fade-in-up" style={{ animationDelay: `${index * 30}ms` }}>
            {/* Control bar */}
            <div className="flex items-center justify-between glass rounded-2xl p-3 mb-3">
                <Badge variant={isPlaying ? "primary" : "surface"} size="md">
                    {nomorAyat}
                </Badge>
                <div className="flex items-center gap-2">
                    <audio id={`audio-${index}`} src={audioSrc} className="hidden">
                        <track kind="captions" srcLang="ar" />
                    </audio>
                    <IconButton
                        icon={isPlaying ? "bx bx-pause" : "bx bx-play"}
                        size="md"
                        variant={isPlaying ? "filled" : "glass"}
                        onClick={() => onToggleAudio(index)}
                        className={isPlaying ? "gradient-primary text-white" : ""}
                    />
                </div>
            </div>

            {/* Arabic text */}
            <div className={`text-right font-arabic text-2xl leading-[2.4] px-2 mb-4 transition-colors duration-300 ${isPlaying ? "text-primary-400" : "text-white"
                }`}>
                {teksArab}
            </div>

            {/* Latin transliteration */}
            <p className="text-sm text-surface-400 leading-relaxed px-2 border-b border-surface-800/50 pb-6">
                {teksLatin}
            </p>
        </div>
    );
};

export default SurahDetailCard;
