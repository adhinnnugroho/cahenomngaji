import instance from "@/core/libs/axios/instance";

const SholatServices = {
    getUserLocations: (latitude: number, longitude: number) => instance.get(`/api/geolocation/coordinates/${latitude}/${longitude}`),
    getCityId: (city: string) => instance.get(`/api/geolocation/city/${city}`),
    getScheduleSholatMonthly: (cityId: number, year: number, month: number) =>
        instance.get(`/api/jadwal/Monthly/jadwal/${cityId}/${year}/${month}`),

    getScheduleSholatDaily: (cityId: number, year: number, month: number, date: number) =>
        instance.get(`/api/jadwal/Daily/jadwal/${cityId}/${year}/${month}/${date}`)
};

export default SholatServices;
