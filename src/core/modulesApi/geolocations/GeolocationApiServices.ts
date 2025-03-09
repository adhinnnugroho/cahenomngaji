import instance from "@/core/libs/axios/instance";

const GeolocationApiServices = {
    getLocation: (latitude: number, longitude: number) => instance.get(`/api/geolocation/coordinates/${latitude}/${longitude}`),
    getCityId: (city: string) => instance.get(`/api/geolocation/city/${city}`),
};

export default GeolocationApiServices;
