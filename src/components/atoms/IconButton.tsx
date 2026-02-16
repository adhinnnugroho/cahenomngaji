import { type ButtonHTMLAttributes } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: string;
    size?: "sm" | "md" | "lg";
    variant?: "default" | "glass" | "filled";
}

const sizeClasses = {
    sm: "w-8 h-8 text-lg",
    md: "w-10 h-10 text-2xl",
    lg: "w-12 h-12 text-3xl",
};

const variantClasses = {
    default: "text-surface-400 hover:text-white hover:bg-surface-800",
    glass: "glass text-white hover:bg-white/10",
    filled: "bg-surface-800 text-white hover:bg-surface-700",
};

const IconButton = ({
    icon,
    size = "md",
    variant = "default",
    className = "",
    ...rest
}: IconButtonProps) => {
    return (
        <button
            type="button"
            className={`inline-flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 active:scale-90 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
            {...rest}
        >
            <i className={icon} />
        </button>
    );
};

export default IconButton;
