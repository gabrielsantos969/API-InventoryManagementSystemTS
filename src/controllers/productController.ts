import { Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import { createProduct, deleteProduct, getAllProducts, getProductByCode, getProductById, getProductByName, getTotalProducts, updateCategoriesProduct, updateProduct } from "../models/productModel";

async function getProducts(req: Request, res: Response): Promise<void> {
  
    let message;
    const page = parseInt(req.query.page as string) || 1;
    const limit = 50; 

    try {
        
        const products = await getAllProducts(page, limit);
        const total = await getTotalProducts();

        const totalPages = Math.ceil(total / limit);
        const nextPage = page < totalPages ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null;

        if(products){
            message = `${products.length} products found teste.`;
            
            return sendResponse({
                res, 
                success: true, 
                statusCode: 200, 
                message: message, 
                data: products, 
                page: page, 
                nextPage: nextPage ? `/v1/getAll?page=${nextPage}` : null, 
                prevPage: prevPage ? `/v1/getAll?page=${prevPage}` : null
            });
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

        message = 'Error when trying to list ny ID.';

        sendResponse({
            res,
            success: false,
            statusCode: 500,
            message: message,
            error: errorMessage
        });

    }

}

async function getProductCode(req:Request, res:Response) {
    
    let message;
    const {
        code
    } = req.params;

    try {

        if(code.length == 0 || code == null){
            message = "It is necessary to enter a value other than null.";
            sendResponse({
                res,
                success: true,
                statusCode: 422,
                message: message
            })
        }

        const product = await getProductByCode(code);

        if(product){
            message = `Product Code: ${code} found.`;
            sendResponse({
                res,
                success: true,
                statusCode: 200,
                message: message,
                data: product
            });
        }else{
            message = `Product Code: '${code}' not found!`;
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
  
        message = 'Error when trying to list to Code Product.';

        sendResponse({
            res,
            success: false,
            statusCode: 500,
            message: message,
            error: errorMessage
        })
        

    }

}

async function getProductName(req:Request, res: Response) {
    
    let message;
    const {
        name
    } = req.params;

    try {

        const product = await getProductByName(name);

        if(product){
            message = `Product Name: '${name}' found.`;
            sendResponse({
                res,
                success: true,
                statusCode: 200,
                message: message,
                data: product
            })
        }else{
            message = `Product Name: '${name}' not found.`;
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

        message = 'Error when trying to list to product by name.'

        sendResponse({
            res,
            success: false,
            statusCode: 500,
            message: message,
            error: errorMessage
        })

    }

}

async function productCreate(req:Request, res:Response) {
    
    let message;
    const {
        data,
        categoryIds
    } = req.body;

    try {

        await createProduct(data, categoryIds);

        message = `Product: ${data.nm_product} registred successfully!`;
        sendResponse({
            res,
            success: true,
            statusCode: 201,
            message: message 
        })
        
    } catch (err) {
        
        let errorMessage = 'An unknown error occurred';
        let errorCode:string | undefined;

        if(err instanceof Error){
            errorMessage = err.message;

            if('code' in err){
                errorCode = (err as any).code;
            }
        }

        if(errorCode === 'ER_DUP_ENTRY') {
            message = 'Duplication error when registering the product.';
            sendResponse({
                res,
                success: false,
                statusCode: 500,
                message: message,
                error: errorMessage
            })
        }else{
            message = 'Error when trying to create Product.';

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

async function productUpdate(req: Request, res: Response) {

    let message = '';
    const {
        data,
        categoryIds
    } = req.body;

    const {id} = req.params;

    try {

        const product = await getProductById(Number(id));

        if(!product){
            message = `Product ID: ${id} not found.`;
            sendResponse({
                res, 
                success: true,
                statusCode: 404,
                message: message
            });
        }

        if (!data && !categoryIds) {
            throw new Error('No data provided to update.');
        }

        if(data && categoryIds){
            await updateProduct(Number(id), data);
            await updateCategoriesProduct(Number(id), categoryIds);
            message = `Product ID: ${id} updated product and category.`;
        }else if(categoryIds){
            await updateCategoriesProduct(Number(id), categoryIds);
            message = `Product ID: ${id} updated category product.`;
        }else if(data){
            await updateProduct(Number(id), data);
            message = `Product ID: ${id} updated product.`;
        }

        sendResponse({
            res,
            success: true,
            statusCode: 200,
            message: message
          });

        
        
    } catch (err) {
        let errorMessage = 'An unknown error occurred';
        let errorCode:string | undefined;

        if(err instanceof Error){
            errorMessage = err.message;
            if('code' in err){
                errorCode = (err as any).code;
            }
        }

        if(errorCode === 'ER_DUP_ENTRY') {
            message = 'Duplication error when registering the product.';
            sendResponse({
                res,
                success: false,
                statusCode: 500,
                message: message,
                error: errorMessage
            })
        }else{
            message = 'Error when trying to update Product.';

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

async function productDelete(req: Request, res: Response) {

    let message;
    const {
        id
    } = req.params;

    try {

        const product = await getProductById(Number(id));

        if(product) {
            await deleteProduct(Number(id));

            message = `Product ID: ${id} deleted.`;
            sendResponse({
                res,
                success: true,
                statusCode: 200,
                message: message
            })
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

        if(err instanceof Error){
            errorMessage = err.message;
        }

        message = 'Error when trying to delete Product.';

        sendResponse({
            res,
            success: false,
            statusCode: 500,
            message: message,
            error: errorMessage
        })
        
    }

}

export { getProducts, getProductId, getProductCode, getProductName, productCreate, productUpdate, productDelete };