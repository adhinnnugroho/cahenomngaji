export const dateApi = {
    /** Get Hijri date from Gregorian date string (DD/MM/YYYY) */
    getHijriDate: async (dateStr: string) => {
        const normalizedDate = dateStr.replace(/-/g, "/");
        try {
            const response = await fetch(`/api/date/${normalizedDate}`);
            if (!response.ok) {
                console.error("Error response from /api/date:", response.status);
                return null;
            }
            const body = await response.json();
            return body.data ?? null;
        } catch (error) {
            console.error("Error calling /api/date:", error);
            return null;
        }
    },
};
