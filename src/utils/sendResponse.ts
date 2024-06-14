import { Response } from "express";

interface SendResponseParams {
    res: Response;
    success: boolean;
    statusCode: number;
    message: string;
    data?: any;
    error?: any;
}

function sendResponse({res, success, statusCode, message, data, error}: SendResponseParams):void {

    const result: {
        message: string;
        success: boolean;
        status: number;
        data?: any;
        error?: any;
    } = {
        message,
        success,
        status: statusCode
    };

    if(data) result.data = data;
    if(error) result.error = error;

    res.header('Access-Control-Allow-Origin', '*');
    res.status(statusCode).json(result);

}

export default sendResponse;