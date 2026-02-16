import Link from "next/link";
import Badge from "../atoms/Badge";

interface SurahCardProps {
    surahNumber: number;
    surahNameLatin: string;
    tempatTurun: string;
    jumlahAyat: number;
    link?: string;
}

const SurahCard = ({
    surahNumber,
    surahNameLatin,
    tempatTurun,
    jumlahAyat,
    link,
}: SurahCardProps) => {
    return (
        <Link href={link ?? `/home/surah/${surahNumber}`}>
            <div className="flex items-center gap-4 p-3 rounded-2xl card-interactive group">
                <Badge variant="primary" size="md">
                    {surahNumber}
                </Badge>
                <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-white group-hover:text-primary-300 transition-colors">
                        {surahNameLatin}
                    </h3>
                    <p className="text-sm text-surface-500 mt-0.5">
                        {tempatTurun} • {jumlahAyat} Ayat
                    </p>
                </div>
                <i className="bx bx-chevron-right text-xl text-surface-600 group-hover:text-surface-400 transition-colors" />
            </div>
        </Link>
    );
};

export default SurahCard;
