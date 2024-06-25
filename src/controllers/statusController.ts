import { Request, Response } from "express";
import { createStatus, getAllStatus, getStatusById } from "../models/statusModel";
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

async function getById(req: Request, res: Response) {
    
    let message;
    const {
        id
    } = req.params;

    try {

        const status = await getStatusById(Number(id));

        if(status){
            message = `Status ID: ${id} found!`;
            sendResponse({
                res,
                success: true,
                statusCode: 200,
                message: message,
                data: status
            })
        }else{
            message = `Status ID: ${id} not found.`;
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

        message = 'Error when trying to list status by ID.';
        sendResponse({
            res, 
            success: false,
            statusCode: 500,
            message: message,
            error: errorMessage
        })

    }

}

async function create(req: Request, res: Response) {
    
    let message;

    try {

        await createStatus(req.body);

        message = `Status: '${req.body.nm_status}' registred.`;
        sendResponse({
            res,
            success: true,
            statusCode: 201,
            message: message
        })
        
    } catch (err) {
        
        let errorMessage = 'An unknown error ocurred!';
        let errorCode:string | undefined;

        if(err instanceof Error){
            errorMessage = err.message;
            
            if('code' in err){
                errorCode = (err as any).code;
            }
        }

        if(errorCode === 'ER_DUP_ENTRY') {
            message = 'Duplication error when registering the status.';
            sendResponse({
                res,
                success: false,
                statusCode: 500,
                message: message,
                error: errorMessage
            })
        }else{
        message = 'Error when trying to create status.';
            sendResponse({
                res, 
                success: false,
                statusCode: 500,
                message: message,
                error: errorMessage
            })
        }

    }

}

export { getAll, getById, create };