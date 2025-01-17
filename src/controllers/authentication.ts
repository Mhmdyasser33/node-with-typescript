import express from "express";
import {createUser, getUserByEmail} from "../db/user"
import { authentication, random } from "../helpers";

export const register = async(req : express.Request , res : express.Response) =>{
  try{
    const {email , password,username } = req.body ;
    if(!username ||!email || !password){
        return res.sendStatus(400).json({message : "all field are required"})
    }
    const existUser = await getUserByEmail(email) ;
    if(existUser){
        return res.sendStatus(400).json({message : "already exist user.!"})
    }

    const salt = random() ; 
    const user = await createUser({
        username,
        email, 
        authentication : {
         salt,
         password : authentication(salt , password),
        }
    })

    return res.status(200).json(user);
  }catch(error){
    console.log(`Error in register user ${error}`)
    return res.sendStatus(400)  
  }
}