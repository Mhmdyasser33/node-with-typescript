import express from "express";
import {createUser, getUserByEmail} from "../db/user"
import { authentication, random } from "../helpers";

export const register = async(req : express.Request , res : express.Response) =>{
  try{
    const {email , password,username } = req.body ;
    if(!username ||!email || !password){
        return res.sendStatus(400).json({message : "all field are required"})
    }
    const foundUser = await getUserByEmail(email) ;
    if(foundUser){
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
    return res.sendStatus(400)  ;
  }
}

export const login = async(req :express.Request , res : express.Response)=>{
  try{
    const {email , password} = req.body ;
    if(!email || !password){
      return res.sendStatus(400) ; 
    } 

   // Retrieve the user by email and include the authentication salt and password in the query result for further validation.
   const foundUser = await getUserByEmail(email).select("+authentication.salt +authentication.password");
    if(!foundUser){
      return res.sendStatus(404);
    }
    const salt = random() ; 
    const expectedHashedPassword = authentication(foundUser.authentication.salt , password) ;
    if(foundUser.authentication.password !== expectedHashedPassword){
      return res.sendStatus(400) ; 
    }
    foundUser.authentication.sessionToken = authentication(salt , foundUser._id.toString()) ;
    await foundUser.save() ; 
    res.cookie("authSessionToken" , foundUser.authentication.sessionToken , {domain : "localhost" , path : "/"}) ; 
    return res.status(200).json(foundUser) ; 
  }catch(error){
    console.log(error) ; 
    return res.sendStatus(400) ; 
  }

}

