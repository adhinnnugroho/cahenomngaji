import { useEffect, useState } from "react";
import { getRealTimeCoordinates } from "./GeolocationServices";
import { getLocations, getSpesificDataCity } from "./InternalApiCallLocations";

const GeolocationHooks = () => {
    const [userCityLocations, setUserCityLocations] = useState([]);
    const [userProvinceLocations, setUserProvinceLocations] = useState([]);
    const [City, setCity] = useState<any>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const coordinates = await getRealTimeCoordinates() as [number, number];
                const [latitude, longitude] = coordinates;
                const locationResponse = await getLocations(latitude, longitude);
                if (locationResponse.city) {
                    setUserCityLocations(locationResponse.city.name);
                    setUserProvinceLocations(locationResponse.province.name);
                    const getCityResponse = await getSpesificDataCity(locationResponse.city.name);
                    setCity(getCityResponse);
                }
            } catch (error) {
                console.error('Error retrieving data:', error);
            }
        }

        fetchData();
    }, [])

    return {
        userCityLocations,
        userProvinceLocations,
        City
    };
};


export default GeolocationHooks;