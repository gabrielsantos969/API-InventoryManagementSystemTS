import { Request, Response } from "express";
import { addCategoryInProduct } from "../models/productCategoryModel";
import sendResponse from "../utils/sendResponse";
import { getProductById } from "../models/productModel";
import { getCategoryById } from "../models/categoryModel";

async function addCategoryProduct(req: Request, res: Response) {
    
    let message;
    const {
        id_product
    } = req.params;
    const {
        categoryIds
    } = req.body;

    try {
        let nmCategoryAdd = [];
        let idCategoryRefused = [];
        const product = await getProductById(Number(id_product));

        if(product){

            for(let x:number = 0; x < categoryIds.length; x++){

                const category = await getCategoryById(categoryIds[x]);
                console.log(category);
                

                if(category){
                    await addCategoryInProduct(Number(id_product), categoryIds[x]);
                    nmCategoryAdd.push(category[0].nm_category);
                }else{
                    console.log('oi');
                    
                    idCategoryRefused.push(categoryIds[x]);
                }

            }
            console.log(idCategoryRefused);
            
            if(idCategoryRefused.length > 0 && nmCategoryAdd.length > 0){
                message = `Categories: ${nmCategoryAdd.join(", ")} adder in product '${product[0].nm_product}' and categories with ID: ${idCategoryRefused.join(", ")} not registered.`
                sendResponse({
                    res,
                    success: true,
                    statusCode: 201,
                    message: message
                })
            }else{
                if(nmCategoryAdd.length == 0){
                    message = `Categories with IDs: ${idCategoryRefused.join(", ")} not registered.`;
                    sendResponse({
                        res,
                        success: true,
                        statusCode: 404,
                        message: message
                    })
                }else{
                    message = `Categories: ${nmCategoryAdd.join(", ")} adder in product '${product[0].nm_product}'.`;
                    sendResponse({
                        res,
                        success: true,
                        statusCode: 201,
                        message: message
                    })
                }
            }

        }else{
            message = `Product ID: ${id_product} not found.`;
            sendResponse({
                res, 
                success: true,
                statusCode: 404,
                message: message
            });
        }

        
    } catch (err) {
        console.error(err);
        
        let errorMessage = 'An unknown error occurred';
        let errorCode:string | undefined;
        if(err instanceof Error){
            errorMessage = err.message;
            if('code' in err){
                errorCode = (err as any).code;
            }
        }

        if(errorCode === 'ER_DUP_ENTRY') {
            message = 'Duplication error when registering the category in product.';
            sendResponse({
                res,
                success: false,
                statusCode: 500,
                message: message,
                error: errorMessage
            })
        }else{
            message = 'Error when trying to list create category in product.';

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

export { addCategoryProduct };