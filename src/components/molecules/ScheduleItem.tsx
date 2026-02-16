interface ScheduleItemProps {
    title: string;
    time: string;
    isActive?: boolean;
}

const ScheduleItem = ({ title, time, isActive = false }: ScheduleItemProps) => {
    return (
        <div
            className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${isActive
                    ? "prayer-active glass-strong animate-pulse-glow"
                    : "glass hover:bg-white/[0.04]"
                }`}
        >
            <div className="flex items-center gap-3">
                <div
                    className={`w-2 h-2 rounded-full ${isActive ? "bg-primary-400" : "bg-surface-600"
                        }`}
                />
                <h5 className={`text-base font-semibold ${isActive ? "text-primary-400" : "text-white"}`}>
                    {title}
                </h5>
            </div>
            <div className="flex items-center gap-2">
                <i className={`bx bx-time-five text-lg ${isActive ? "text-primary-400" : "text-surface-500"}`} />
                <p className={`text-base font-medium tabular-nums ${isActive ? "text-primary-300" : "text-surface-300"}`}>
                    {time}
                </p>
            </div>
        </div>
    );
};

export default ScheduleItem;
