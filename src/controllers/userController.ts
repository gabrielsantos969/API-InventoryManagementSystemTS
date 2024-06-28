import { Request, Response } from "express";
import { createUser, deleteUser, getAllUsers, getTotalUsers, getUserByEmail, getUserById, getUserByName, getUserByUsername, updateUser } from "../models/userModel";
import sendResponse from "../utils/sendResponse";

async function getAll(req: Request, res: Response) {
    
    let message;
    const page = parseInt(req.query.page as string) || 1;
    const limit = 50;

    try {

        const users = await getAllUsers(page, limit, req.query);

        const total = await getTotalUsers();
        const totalPages = (total / limit);

        const nextPage = page < totalPages ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null;

        if(!users){
            message = `No users registered in the system.`;
            sendResponse({
                res,
                success: true,
                statusCode: 404,
                message: message
            })
        }

        if(users){
            message = `${users.length} users found.`;
            sendResponse({
                res,
                success: true,
                statusCode: 200,
                message: message,
                data: users,
                page: page,
                nextPage: nextPage ? `/v1/getAll?page=${nextPage}` : null,
                prevPage: prevPage ? `/v1/getAll?page=${prevPage}` : null
            })
        }
        
    } catch (err) {
        
        let errorMessage = 'An unknown error ocurred!';
        if(err instanceof Error){
            errorMessage = err.message;
        }

        message = 'Error when trying to list all user.';
        sendResponse({
            res,
            success: true,
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

async function getByName(req: Request, res: Response) {
    
    let message;
    const {
        name
    } = req.params;

    try {

        const user = await getUserByName(name);

        if(!user){
            message = `User NAME: '${name}' not found!`;
            sendResponse({
                res,
                success: true,
                statusCode: 404,
                message: message
            })
        }

        if(user){
            message = `User NAME: '${name}' found.`;
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

        message = 'Error when trying to list user name.';
        sendResponse({
            res,
            success: true,
            statusCode: 500,
            message: message,
            error: errorMessage
        })

    }

}

async function getByUsername(req: Request, res: Response) {
    
    let message;
    const {
        username
    } = req.params;

    try {

        const user = await getUserByUsername(username);

        if(!user){
            message = `User USERNAME: '${username}' not found!`;
            sendResponse({
                res,
                success: true,
                statusCode: 404,
                message: message
            })
        }

        if(user){
            message = `User USERNAME: '${username}' found.`;
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

        message = 'Error when trying to list user username.';
        sendResponse({
            res,
            success: true,
            statusCode: 500,
            message: message,
            error: errorMessage
        })

    }

}

async function getByEmail(req: Request, res: Response) {
    
    let message;
    const {
        email
    } = req.params;

    try {

        const user = await getUserByEmail(email);

        if(!user){
            message = `User EMAIL: ${email} not found!`;
            sendResponse({
                res,
                success: true,
                statusCode: 404,
                message: message
            })
        }

        if(user){
            message = `User EMAIL: '${email}' found.`;
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

        message = 'Error when trying to list user email.';
        sendResponse({
            res,
            success: true,
            statusCode: 500,
            message: message,
            error: errorMessage
        })

    }

}

async function create(req: Request, res: Response) {
    
    let message = '';
    const {
        data
    } = req.body;

    try {

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!data.name || data.name == null || data.name == undefined || data.name.length == 0){
            message = "The 'name' field is required.";
            sendResponse({
                res,
                success: true,
                statusCode: 422,
                message: message
            })
        }else if(!data.email || data.email == null || data.email == undefined || data.email.length == 0){
            message = "The 'email' field is required.";
            sendResponse({
                res,
                success: true,
                statusCode: 422,
                message: message
            })
        }else if(!data.username || data.username == null || data.username == undefined || data.username.length == 0){
            message = "The 'username' field is required.";
            sendResponse({
                res,
                success: true,
                statusCode: 422,
                message: message
            })
        }else if(!data.password || data.password == null || data.password == undefined || data.password.length == 0){
            message = "The 'passsword' field is required.";
            sendResponse({
                res,
                success: true,
                statusCode: 422,
                message: message
            })
        }else if(!emailRegex.test(data.email)){
            message = "Enter a valid email address";
            sendResponse({
                res,
                success: true,
                statusCode: 422,
                message: message
            })
        }else{

            await createUser(data);
            
            message = 'User created successfully!'        
            sendResponse({
                res,
                success: true,
                statusCode: 201,
                message: message
            })

        }
        
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
            message = 'Duplication error when registering the user.';
            sendResponse({
                res,
                success: false,
                statusCode: 500,
                message: message,
                error: errorMessage
            })
        }else{
            message = 'Error when trying to create user.';

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

async function update(req: Request, res: Response) {
    
    let message;
    const { id } = req.params;
    const {
        data
    } = req.body;

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
            await updateUser(Number(id), data);

            message = `User updated successfully.`;
            sendResponse({
                res,
                success: true,
                statusCode: 200,
                message: message
            })
        }        
        
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
            message = 'Duplication error when update the user.';
            sendResponse({
                res,
                success: false,
                statusCode: 500,
                message: message,
                error: errorMessage
            })
        }else{
            message = 'Error when trying to update user.';

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

async function userDelete(req: Request, res: Response) {
    
    let message;
    const {
        id
    } = req.params;

    try {

        const user = await getUserById(Number(id));

        if(!user){
            message = `User id: ${id} not found!`;
            sendResponse({
                res,
                success: true,
                statusCode: 404,
                message: message
            })
        }

        if(user){
            await deleteUser(Number(id));

            message = `User ID: '${id}' deleted.`;
            sendResponse({
                res,
                success: true,
                statusCode: 200,
                message: message
            })
        }
        
    } catch (err) {
        
        let errorMessage = 'An unknown error ocurred!';
        if(err instanceof Error){
            errorMessage = err.message;
        }

        message = 'Error when trying to delete user.';
        sendResponse({
            res,
            success: true,
            statusCode: 500,
            message: message,
            error: errorMessage
        })

    }

}

export { getAll, getById, getByName, getByUsername, getByEmail, create, update, deleteUser };