import Badge from "../atoms/Badge";
import IconButton from "../atoms/IconButton";

interface SurahDetailCardProps {
    nomorAyat: number;
    teksArab: string;
    teksLatin: string;
    teksIndonesia?: string;
    index: number;
    playingIndex: number;
    onToggleAudio: (index: number) => void;
    /** @deprecated audio is now managed by the hook */
    audioSrc?: string;
    compact?: boolean;
}

const SurahDetailCard = ({
    nomorAyat,
    teksArab,
    teksLatin,
    teksIndonesia,
    index,
    playingIndex,
    onToggleAudio,
    compact = false,
}: SurahDetailCardProps) => {
    const isPlaying = playingIndex === index;

    return (
        <div
            className={`mb-6 animate-fade-in-up ${isPlaying ? "ayat-playing" : ""}`}
            style={{ animationDelay: `${Math.min(index, 8) * 30}ms` }}
        >
            {/* Control bar */}
            <div className="flex items-center justify-between glass rounded-2xl p-3 mb-3">
                <Badge variant={isPlaying ? "primary" : "surface"} size="md">
                    {nomorAyat}
                </Badge>
                <div className="flex items-center gap-2">
                    <IconButton
                        icon={isPlaying ? "bx bx-pause" : "bx bx-play"}
                        size="md"
                        variant={isPlaying ? "filled" : "glass"}
                        onClick={() => onToggleAudio(index)}
                        className={isPlaying ? "gradient-primary text-white animate-pulse-glow" : ""}
                    />
                </div>
            </div>

            {/* Arabic text — highlights when this ayat is playing */}
            <div
                className={`text-right font-arabic leading-[2.4] px-2 mb-4 transition-all duration-500 ${compact ? "text-xl" : "text-2xl"
                    } ${isPlaying ? "text-primary-400 scale-[1.01]" : "text-white"}`}
            >
                {teksArab}
            </div>

            {/* Latin transliteration */}
            <p className={`text-surface-400 leading-relaxed px-2 italic ${compact ? "text-xs" : "text-sm"} ${isPlaying ? "text-surface-300" : ""
                }`}>
                {teksLatin}
            </p>

            {/* Indonesian translation (if provided) */}
            {teksIndonesia && (
                <p className={`text-surface-500 leading-relaxed px-2 mt-2 ${compact ? "text-xs" : "text-sm"} ${isPlaying ? "text-surface-400" : ""
                    }`}>
                    {teksIndonesia}
                </p>
            )}

            {/* Divider */}
            <div className="border-b border-surface-800/50 mt-6" />
        </div>
    );
};

export default SurahDetailCard;
