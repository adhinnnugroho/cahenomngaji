import Link from "next/link";

interface DoaCardProps {
    title: string;
    index: number;
    startIndex: number;
}

const DoaCard = ({ title, index, startIndex }: DoaCardProps) => {
    return (
        <Link href={`doa/detail/${startIndex + index + 1}`}>
            <div className="glass rounded-2xl p-4 card-interactive group border-l-2 border-primary-600/40 hover:border-primary-400">
                <p className="text-sm font-medium text-surface-200 capitalize group-hover:text-white transition-colors">
                    {title}
                </p>
            </div>
        </Link>
    );
};

export default DoaCard;
