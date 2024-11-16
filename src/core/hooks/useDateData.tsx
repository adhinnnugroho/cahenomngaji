import { useState } from "react";


export function useDateData() {
    const [currentDate] = useState(new Date());
    const currentDateInfo = {
        day: currentDate.getDate(),
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear()
    };

    const formatDate = (date: string) => {
        const [day, month, year] = date.split("/");
        const formattedDate = new Intl.DateTimeFormat("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(new Date(`${year}-${month}-${day}`));

        return formattedDate;
    };


    return {
        currentDate,
        currentDateInfo,
        formatDate,
    };
}