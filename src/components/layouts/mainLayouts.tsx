import MobileNavigation from "@/components/navigations/MobileNavigation";
import Navigation from "../navigations/Navigation";
import BackNavigations from "../navigations/BackNavigations";

const MainLayouts = ({ children, NavigationType, linkNavigation, NavbarTitle, title }: any) => {
    return <>
        {NavigationType === "Back" ? <BackNavigations SurahName={NavbarTitle} link={linkNavigation} /> : <Navigation />}

        {children}
        <MobileNavigation />
    </>;
};

export default MainLayouts;