import Image from "next/image"
import Link from "next/link"

const NavigationCard = ({ link, icons }: any) => {
    return (
        <Link href={link}>
            <div className="flex justify-center items-center">
                <Image src={icons} width={40} height={40} alt="Home" />
            </div>
        </Link>
    )
}
export default NavigationCard