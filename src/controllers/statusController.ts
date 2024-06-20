import { Request, Response } from "express";
import { getAllStatus } from "../models/statusModel";
import sendResponse from "../utils/sendResponse";

async function getAll(req: Request, res: Response) {
    let message;
    
    try {

        const status = await getAllStatus();

        if(status){
            message = `${status.length} status found.`;

            sendResponse({
                res,
                success: true,
                statusCode: 200,
                message: message,
                data: status
            })
        }else{
            message = 'No registered status.';

            sendResponse({
                res,
                success: true,
                statusCode:404,
                message: message
            })
        }
        
    } catch (err) {
        
        let errorMessage = 'An unknown error ocurred!';
        if(err instanceof Error){
            errorMessage = err.message;
        }

        message = 'Error when trying to list all status.';
        sendResponse({
            res,
            success: false,
            statusCode: 500,
            message: message,
            error: errorMessage
        })

    }
}

export { getAll };