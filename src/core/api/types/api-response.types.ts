/** Common API response wrapper */
export interface ApiResponse<T> {
    status: boolean;
    statusCode: number;
    message: string;
    data: T;
}
