import httpClient from "./http-client";

export const geolocationApi = {
    /** Get location info from coordinates */
    getByCoordinates: (latitude: number, longitude: number) =>
        httpClient.get(`/api/geolocation/coordinates/${latitude}/${longitude}`),

    /** Get city ID for prayer schedule */
    getCityId: (cityName: string) =>
        httpClient.get(`/api/geolocation/city/${cityName}`),
};

/** Get real-time browser GPS coordinates */
export function getRealTimeCoordinates(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
        const options = { enableHighAccuracy: true };
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                resolve([latitude, longitude]);
            },
            (error) => {
                console.error(error.message);
                reject(error);
            },
            options
        );
    });
}
