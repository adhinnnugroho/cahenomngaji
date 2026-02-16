interface SkeletonProps {
    className?: string;
    lines?: number;
}

const Skeleton = ({ className = "", lines = 1 }: SkeletonProps) => {
    if (lines > 1) {
        return (
            <div className="space-y-3">
                {Array.from({ length: lines }).map((_, i) => (
                    <div
                        key={i}
                        className={`skeleton h-12 ${i === lines - 1 ? "w-3/4" : "w-full"} ${className}`}
                    />
                ))}
            </div>
        );
    }

    return <div className={`skeleton h-12 w-full ${className}`} />;
};

export default Skeleton;
