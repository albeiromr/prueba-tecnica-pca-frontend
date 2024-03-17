export interface BaseResponseModel<TData> {
    data: TData;
    success: boolean;
    error: Error;
}

export interface Error {
    name: string;
    message: string;
}