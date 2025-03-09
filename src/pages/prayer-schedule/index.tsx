import { MainLayouts } from "@/components"
import { PrayerScheduleBackground } from "@/components"
import GeolocationHooks from "@/core/modulesApi/geolocations/GeolocationHooks";
const SchedulePage = () => {
    const { userCityLocations, userProvinceLocations } = GeolocationHooks();

    return (
        <MainLayouts NavigationType="none">
            <PrayerScheduleBackground>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
                    <div className="text-center">
                        <h2 className="drop-shadow-2xl text-xl font-semibold">
                            {userCityLocations}, {userProvinceLocations}
                        </h2>
                        <h1 className="text-7xl font-bold capitalize mb-3 mt-3">
                            Test
                        </h1>
                        <p className="text-xl font-semibold">
                            test
                        </p>
                    </div>
                </div>
            </PrayerScheduleBackground>
            <div className="w-screen bg-screen bg-black p-5">
                hanya test

            </div>
        </MainLayouts>
    )
}

export default SchedulePage