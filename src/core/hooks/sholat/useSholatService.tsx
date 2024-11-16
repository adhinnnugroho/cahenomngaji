import instance from "@/core/libs/axios/instance";

const SholatServices = {
    getUserLocations: (latitude: number, longitude: number) =>
        instance.get(`/api/locations/Coordinats/locations/${latitude}/${longitude}`),

    getCityId: (city: string) =>
        instance.get(`/api/locations/City/city/${city}`),

    getScheduleSholatMonthly: (cityId: number, year: number, month: number) =>
        instance.get(`/api/jadwal/Monthly/jadwal/${cityId}/${year}/${month}`),

    getScheduleSholatDaily: (cityId: number, year: number, month: number, date: number) =>
        instance.get(`/api/jadwal/Daily/jadwal/${cityId}/${year}/${month}/${date}`)
};

export default SholatServices;
