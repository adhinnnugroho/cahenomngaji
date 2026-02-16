import MobileNavigation from "@/components/navigations/MobileNavigation";
import Navigation from "../navigations/Navigation";
import BackNavigations from "../navigations/BackNavigations";

const MainLayouts = ({ children, NavigationType, linkNavigation, NavbarTitle }: any) => {
    return (
        <div className="min-h-screen bg-black text-white">
            {NavigationType !== "none" && (
                NavigationType === "Back"
                    ? <BackNavigations SurahName={NavbarTitle} link={linkNavigation} />
                    : <Navigation />
            )}
            <div className="w-full flex justify-center">
                <div className="w-full max-w-3xl px-4 pb-24">
                    {children}
                </div>
            </div>
            <MobileNavigation />
        </div>
    );
};

export default MainLayouts;
