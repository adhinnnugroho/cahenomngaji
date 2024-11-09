import MobileNavigation from "@/components/navigations/MobileNavigation";
import Navigation from "../navigations/Navigation";
import BackNavigations from "../navigations/BackNavigations";

const MainLayouts = ({ children, NavigationType, linkNavigation, NavbarTitle }: any) => {
    return <div className="lg:max-w-[44rem] md:max-w-full sm:max-w-full">
        {NavigationType !== "none" && (
            NavigationType === "Back"
                ? <BackNavigations SurahName={NavbarTitle} link={linkNavigation} />
                : <Navigation />
        )}

        {children}
        <MobileNavigation />
    </div>;
};

export default MainLayouts;