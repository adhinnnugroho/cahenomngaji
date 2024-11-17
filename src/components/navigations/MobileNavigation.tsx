import {
    ActiveDoa,
    ActiveHome,
    ActiveSholat,
    DoaIcons,
    HomeIcons,
    SholatIcons
} from '@/assets/icons/IconsManagement';
import { useRouter } from "next/router"
import NavigationCard from "./card/NavigationCard"

const MobileNavigation = () => {
    const route = useRouter()
    const ActiveHomeIcons = route.pathname.startsWith("/home") ? ActiveHome : HomeIcons;
    const ActiveDoaIcons = route.pathname.startsWith("/doa") ? ActiveDoa : DoaIcons;
    const ActiveSholatIcons = route.pathname.startsWith("/sholat") ? ActiveSholat : SholatIcons;


    return (
        <div className="fixed bottom-0 border border-transparent border-t-gray-200 w-full p-2 bg-black">
            <div className="grid grid-cols-3 gap-5">
                <div className="col-span-1">
                    <NavigationCard link="/home" icons={ActiveHomeIcons} />
                </div>
                <div className="col-span-1">
                    <NavigationCard link="/sholat" icons={ActiveSholatIcons} />
                </div>
                <div className="col-span-1">
                    <NavigationCard link="/doa" icons={ActiveDoaIcons} />
                </div>
            </div>
        </div>
    )
}

export default MobileNavigation