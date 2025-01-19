import dotenv from "dotenv" ;
dotenv.config() ; 
import express from "express";
import mongoose, { Promise } from "mongoose" ; 
import cors from "cors";
import http from "http" ;
import bodyParser from "body-parser";
import cookieParse from "cookie-parser"
import compression from "compression" 
import router from "./routes"
import { connectDb } from "./config/dbConn";

 
const app = express() ; 

app.use(cors({credentials:true}))
app.use(compression()) ;
app.use(cookieParse()) ; 
app.use(bodyParser.json()) ;

const server = http.createServer(app) ; 
connectDb();
app.use("/" , router()) ; 
server.listen(8000 , ()=>{
    console.log("Server running on http://localhost:8000") ; 
})

