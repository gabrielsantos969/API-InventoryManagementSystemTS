import { Request, Response } from 'express';
import sendResponse from '../utils/sendResponse';
import { getAllCategories, getCategoreById, updateActiveCategory } from '../models/categoryModel';

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

async function getById(req: Request, res: Response) {
    
    let message;
    const {
        id
    } = req.params;

    try {

        const category = await getCategoreById(Number(id));

        if(category){
            message = `Category ID: ${id} found.`;
            sendResponse({
                res,
                success: true,
                statusCode: 200,
                message: message,
                data: category
            })
        }else{
            message = `Category ID: ${id} not found.`;
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

        message = 'Error when trying to list categories by ID.';
        sendResponse({
            res,
            success: false,
            statusCode: 500,
            message: message,
            error: errorMessage
        })
    }

}

async function updateActive(req: Request, res: Response) {
    
    let message;
    const {
        id
    } = req.params;
    const {
        sn_active
    } = req.body;

    try {

        const category = await getCategoreById(Number(id));

        if(category){

            if(sn_active == 'S' || sn_active == 's' || sn_active == 'N' || sn_active == 'n'){

                await updateActiveCategory(Number(id), sn_active);

                message = `Category ID: ${id} updated Active for '${sn_active.toUpperCase()}'.`;
                sendResponse({
                    res,
                    success: true,
                    statusCode: 200,
                    message: message
                })

            }else{
                message = `The value: '${sn_active}' is not accepted, only S or N`;
                sendResponse({
                    res,
                    success: true,
                    statusCode: 200,
                    message: message
                })
            }


        }else{
            message = `Category ID: ${id} not found.`;
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

        message = 'rror when trying to update active category.';
        sendResponse({
            res,
            success: false,
            statusCode: 500,
            message: message,
            error: errorMessage
        })
        
    }

}

export { getAll, getById, updateActive };