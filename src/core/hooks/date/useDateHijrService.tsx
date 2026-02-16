const DateHijrService = {
    getDateInHijr: async (date: string) => {
        const normalizedDate = date.replace(/-/g, "/");

        try {
            const response = await fetch(`/api/date/${normalizedDate}`);

            if (!response.ok) {
                console.error("Error response from /api/date:", response.status);
                return { data: { data: null } } as any;
            }

            const body = await response.json();
            return { data: body } as any;
        } catch (error) {
            console.error("Error calling /api/date:", error);
            return { data: { data: null } } as any;
        }
    },
};

export default DateHijrService;
