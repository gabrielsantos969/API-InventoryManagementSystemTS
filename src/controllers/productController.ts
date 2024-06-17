import { Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import { getAllProducts, getProductById } from "../models/productModel";

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

async function getProductId(req: Request, res: Response): Promise<void> {

    let message;
    const {
        id
    } = req.params;
    try {

        const product = await getProductById(Number(id));

        if(product) {
            message = `Product ID: ${id} found.`;
            sendResponse({
                res, 
                success: true,
                statusCode: 200,
                message: message,
                data: product
            });
        }else {
            message = `Product ID: ${id} not found.`;
            sendResponse({
                res, 
                success: true,
                statusCode: 404,
                message: message
            });
        }
        
    } catch (err) {
        
        let errorMessage = 'An unknown error occurred';
        if(err instanceof Error) {
            errorMessage = err.message;
        }

        message = 'Error trying to list ny ID.';

        sendResponse({
            res,
            success: false,
            statusCode: 500,
            message: message,
            error: errorMessage
        });

    }

}

export { getProducts, getProductId };