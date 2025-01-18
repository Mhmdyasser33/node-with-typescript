import {deleteUserById, getUserById, getUsers,} from "../db/user";
import express from "express" ;



export const getAllUsers = async(req : express.Request , res : express.Response) => {
    try{
        const dbUsers = await getUsers() ; 
        return res.status(200).json(dbUsers);
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteUser = async(req : express.Request  , res : express.Response) => {
    try{
        const { id } = req.params ; 
        const deletedUser = await deleteUserById(id) ; 
        return res.status(200).json(deletedUser) ; 
    }catch(error){
        console.log(error);
        return res.sendStatus(400) ; 
    }
    
}
