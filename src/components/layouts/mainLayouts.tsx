import MobileNavigation from "@/components/navigations/MobileNavigation";
import Navigation from "../navigations/Navigation";

const MainLayouts = ({ children }: any) => {
    return <>
        <Navigation />
        {children}
        <MobileNavigation />
    </>;
};

export default MainLayouts;