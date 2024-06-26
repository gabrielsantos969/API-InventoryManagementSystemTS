import { Request, Response } from 'express';
import sendResponse from '../utils/sendResponse';
import { getAllCategories } from '../models/categoryModel';

async function getAll(req: Request, res: Response) {
    
    let message;

    try {

        const categories = await getAllCategories();

        if(categories){
            message = `${categories.length} categories found.`;
            sendResponse({
                res,
                success: true,
                statusCode: 200,
                message: message,
                data: categories
            });
        }else{
            message = 'No categories registred.';
            sendResponse({
                res,
                success: true,
                statusCode: 404,
                message: message
            })
        }
        
    } catch (err) {
        
        let errorMessage = 'An unknown error occurred';
        if(err instanceof Error){
            errorMessage = err.message;
        }

        message = 'Error when trying to list all categories.';
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