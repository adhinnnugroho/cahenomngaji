import MobileNavigation from "@/components/navigations/MobileNavigation";

const MainLayouts = ({ children }: any) => {
    return <>
        {children}
        <MobileNavigation />
    </>;
};

export default MainLayouts;