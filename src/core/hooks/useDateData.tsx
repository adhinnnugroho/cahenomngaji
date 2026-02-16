import { useState } from "react";


export function useDateData() {
    const [currentDate] = useState(new Date());
    const currentDateInfo = {
        day: currentDate.getDate(),
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear()
    };

    const formatDate = (date?: string | null) => {
        if (!date) {
            return "";
        }

        const normalizedDate = date.replace(/-/g, "/");
        const parts = normalizedDate.split("/");

        if (parts.length !== 3) {
            return date;
        }

        const [dayString, monthString, yearString] = parts;
        const day = parseInt(dayString, 10);
        const month = parseInt(monthString, 10);
        const year = parseInt(yearString, 10);

        if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) {
            return date;
        }

        const parsedDate = new Date(year, month - 1, day);

        if (Number.isNaN(parsedDate.getTime())) {
            return date;
        }

        return new Intl.DateTimeFormat("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(parsedDate);
    };


    return {
        currentDate,
        currentDateInfo,
        formatDate,
    };
}
