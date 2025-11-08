export class LizyApiResponse<T>{
    message: string;
    notification: any;
    statuscode: number;
    success: boolean;
    value: T;
}

