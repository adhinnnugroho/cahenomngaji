import Link from "next/link";


type PropsType = {
    'type': "button" | "submit" | "reset" | undefined,
    'children': React.ReactNode,
    'className'?: string,
    'bg_color'?: string,
    'link'?: string | URL,
    'rounded'?: string
}

const SimpleButton = (prop: PropsType) => {
    const { type, children, bg_color = "bg-blue-500", className, link, rounded = "rounded-lg" } = prop
    if (type === "submit") {
        return (
            <button type={type} className={`text-white font-medium cursor-pointer py-2 px-4 ${rounded}  ${bg_color} ${className}`}>
                {children}
            </button>
        )
    }
    return (
        <Link href={link ? link.toString() : ''} >
            <button type={type} className={`text-white font-medium cursor-pointer py-2 px-4 ${rounded}  ${bg_color} ${className}`}>
                {children}
            </button>
        </Link>
    )
}

export default SimpleButton;