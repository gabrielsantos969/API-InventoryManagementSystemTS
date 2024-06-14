import { Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import { getAllProducts } from "../models/productModel";

async function getProducts(req: Request, res: Response): Promise<void> {
  
    let message;

    try {
        
        const products = await getAllProducts();

        if(products){
            message = `${products.length} products found.`;
            
            return sendResponse({res, success: true, statusCode: 200, message: message, data: products});
        }else{
            message = 'No products registred!'
            sendResponse({res, success: true, statusCode: 404, message: message});
        }

    } catch (err) {
        
        let errorMessage = 'An unknown error occurred';
        if (err instanceof Error) {
            errorMessage = err.message;
        }

        message = 'Error when trying to list all products.';
        
        sendResponse({
            res, 
            success: false, 
            statusCode: 500, 
            message: message, 
            error: errorMessage
        });
    }
}

export { getProducts };