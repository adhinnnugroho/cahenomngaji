import GeolocationApiServices from "./GeolocationApiServices";

export async function getLocations(latitude: number, longitude: number) {
    try {
        const { data } = await GeolocationApiServices.getLocation(latitude, longitude);
        return data.locationData;
    } catch (error) {
        console.error('Error retrieving city data:', error);
        throw new Error('Failed to retrieve city data');
    }
}

export async function getSpesificDataCity(city: string) {
    try {
        const { data } = await GeolocationApiServices.getCityId(city);
        return data.data[0];
    } catch (error) {
        console.error('Error retrieving city data:', error);
        throw new Error('Failed to retrieve city data');
    }
}