import { useState } from "react";


export function useDateData() {

    const [currentDate] = useState(new Date());

    const currentDateInfo = {
        day: currentDate.getDate(),
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear()
    };

    return {
        currentDate,
        currentDateInfo
    };
}