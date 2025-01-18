import { getUserBySessionToken } from "../db/user";
import {get , merge} from "lodash"
import express from "express" ;



export const isAuthenticated = async(req : express.Request , res : express.Response , next : express.NextFunction) =>{
try{
    const sessionToken = req.cookies["authSessionToken"] ; 
    if(!sessionToken){
        return res.sendStatus(403);
    }
    const existUser = await getUserBySessionToken(sessionToken) ; 
    if(!existUser){
        return res.sendStatus(403) ; 
    }
    merge(req , {userIdentity : existUser}) ; 
    return next(); 
}catch(error){
    console.log(error);
    return res.sendStatus(400);
}
}

export const isOwner = async(req : express.Request , res:express.Response , next : express.NextFunction) =>{
    try{
        const { id } = req.params;
        const currentUserId = get(req, 'userIdentity._id') as string;
        if(!currentUserId){
            return res.sendStatus(403);
        }
        if(currentUserId.toString() !== id ){
            return res.sendStatus(403) ; 
        }
       next() ; 
    }catch(error){
        console.log(error) ; 
        return res.sendStatus(400);
    }
}

