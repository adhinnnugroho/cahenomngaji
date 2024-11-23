import Link from "next/link"

export const SimpleDoaCard = ({ Doa, index, StartIndex }: any) => {
    return (
        <Link href={"doa-detail/" + (StartIndex + index + 1)}>
            <div className="flex capitalize text-left bg-gray-600 p-3 gap-2 rounded-lg">
                <p>
                    {Doa}
                </p>
            </div>
        </Link>
    )
}