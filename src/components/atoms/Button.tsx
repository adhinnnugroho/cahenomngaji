import Link from "next/link";
import { type ReactNode, type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "chip";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    href?: string;
    isActive?: boolean;
    children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        "gradient-primary text-white font-semibold shadow-lg shadow-emerald-900/30 hover:shadow-emerald-800/40 active:scale-[0.97]",
    secondary:
        "bg-surface-800 text-white font-medium border border-surface-700 hover:bg-surface-700 active:scale-[0.97]",
    ghost:
        "text-surface-300 hover:text-white hover:bg-surface-800/60 active:scale-[0.97]",
    chip: "text-sm font-semibold capitalize transition-all duration-200",
};

const Button = ({
    variant = "primary",
    href,
    isActive = false,
    children,
    className = "",
    ...rest
}: ButtonProps) => {
    const chipActiveClass = isActive
        ? "gradient-primary text-white shadow-md shadow-emerald-900/20"
        : "glass text-surface-300 hover:text-white";

    const classes = [
        "inline-flex items-center justify-center rounded-xl px-5 py-2.5 cursor-pointer transition-all duration-200",
        variant === "chip" ? chipActiveClass : variantClasses[variant],
        className,
    ]
        .filter(Boolean)
        .join(" ");

    if (href) {
        return (
            <Link href={href}>
                <button type="button" className={classes} {...rest}>
                    {children}
                </button>
            </Link>
        );
    }

    return (
        <button type="button" className={classes} {...rest}>
            {children}
        </button>
    );
};

export default Button;
