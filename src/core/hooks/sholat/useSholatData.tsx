import instance from "@/core/libs/axios/instance";
import SholatServices from "./useSholatService";


export async function retrieveUserLocations(latitude: number, longitude: number) {
    try {
        const UserLocationResponse = await SholatServices.getUserLocations(latitude, longitude);
        const payload = UserLocationResponse.data;

        if (!payload?.status || !payload.locationData) {
            console.warn('No location data found for given coordinates');
            return null;
        }

        return payload.locationData;
    } catch (error) {
        console.error('Error retrieving city data:', error);
        throw new Error('Failed to retrieve city data');
    }
}

export async function retrieveSpecificCityData(city: string) {
    try {
        const cityDataResponse = await SholatServices.getCityId(city);
        const cityData = cityDataResponse.data.data[0];

        return cityData;
    } catch (error) {
        console.error('Error retrieving city data:', error);
        throw new Error('Failed to retrieve city data');
    }
}


export async function retrieveScheduleSholatDaily(cityId: number, year: number, month: number, date: number) {

    try {
        const scheduleSholatResponse = await SholatServices.getScheduleSholatDaily(cityId, year, month, date);
        const GetDataDailyScheduleSholat = scheduleSholatResponse.data.data.data;
        return GetDataDailyScheduleSholat;
    } catch (error) {
        console.error('Error retrieving daily prayer schedule:', error);
        throw new Error('Failed to retrieve daily prayer schedule');
    }
}


export async function retrieveDataSpecificNameCity(latitude: number, longitude: number) {
    const SpecificCityName = await instance.get(`${process.env.REST_API_URL_CITY}?latitude=${latitude}&longitude=${longitude}`);
    return SpecificCityName;
}

export async function retrieveDataScheduleSholatMonthly(CityId: number, Year: number, Month: number) {
    const ScheduleSholat = await instance.get(`${process.env.REST_API_URL_SCHEDULE}/sholat/jadwal/${CityId}/${Year}/${Month}`);
    return ScheduleSholat;
}

export async function retrieveDataScheduleSholatDaily(CityId: number, Year: number, Month: number, date: number) {
    const ScheduleSholat = await instance.get(`${process.env.REST_API_URL_SCHEDULE}/sholat/jadwal/${CityId}/${Year}/${Month}/${date}`);
    return ScheduleSholat;
}

export async function retrieveDataCity(CityName: String) {
    const SpecificCity = await instance.get(`${process.env.REST_API_URL_SCHEDULE}/sholat/kota/cari/${CityName}`);
    return SpecificCity;
}
