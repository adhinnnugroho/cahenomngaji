import IconButton from "../atoms/IconButton";

interface DateNavigatorProps {
    dateLabel: string;
    subLabel?: string;
    onPrev: () => void;
    onNext: () => void;
    loading?: boolean;
}

const DateNavigator = ({
    dateLabel,
    subLabel,
    onPrev,
    onNext,
    loading = false,
}: DateNavigatorProps) => {
    return (
        <div className="glass-strong rounded-2xl p-3 flex items-center justify-between">
            <IconButton icon="bx bx-chevron-left" variant="glass" size="sm" onClick={onPrev} />
            <div className="text-center flex-1 px-2">
                <h2 className="text-lg font-bold text-white">
                    {loading ? "Memuat..." : dateLabel}
                </h2>
                {subLabel && (
                    <p className="text-xs text-surface-400 mt-0.5">{subLabel}</p>
                )}
            </div>
            <IconButton icon="bx bx-chevron-right" variant="glass" size="sm" onClick={onNext} />
        </div>
    );
};

export default DateNavigator;
