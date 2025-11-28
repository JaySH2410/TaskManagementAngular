export interface ApiResponse<T> {
    statusCode: number;
    isSuccess: boolean;
    message?: string;
    detail?: string;
    object: T;
    timestamp?: string;
}
