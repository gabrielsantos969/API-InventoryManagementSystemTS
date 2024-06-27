import { Request, Response } from "express";
import { getUserById } from "../models/userModel";
import sendResponse from "../utils/sendResponse";

async function getById(req: Request, res: Response) {
    
    let message;
    const {
        id
    } = req.params;

    try {

        const user = await getUserById(Number(id));

        if(!user){
            message = `User ID: ${id} not found!`;
            sendResponse({
                res,
                success: true,
                statusCode: 404,
                message: message
            })
        }

        if(user){
            message = `User ID: ${id} found.`;
            sendResponse({
                res,
                success: true,
                statusCode: 200,
                message: message,
                data: user
            })
        }
        
    } catch (err) {
        
        let errorMessage = 'An unknown error ocurred!';
        if(err instanceof Error){
            errorMessage = err.message;
        }

        message = 'Error when trying to list user ID.';
        sendResponse({
            res,
            success: true,
            statusCode: 500,
            message: message,
            error: errorMessage
        })

    }

}

export { getById };