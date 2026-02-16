interface BadgeProps {
    children: React.ReactNode;
    variant?: "primary" | "accent" | "surface";
    size?: "sm" | "md";
}

const variantClasses = {
    primary: "gradient-primary text-white",
    accent: "gradient-accent text-surface-900",
    surface: "bg-surface-800 text-surface-300",
};

const sizeClasses = {
    sm: "w-7 h-7 text-xs",
    md: "w-10 h-10 text-base",
};

const Badge = ({ children, variant = "primary", size = "md" }: BadgeProps) => {
    return (
        <div
            className={`inline-flex items-center justify-center rounded-full font-bold shrink-0 ${variantClasses[variant]} ${sizeClasses[size]}`}
        >
            {children}
        </div>
    );
};

export default Badge;
