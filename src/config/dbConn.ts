import mongoose  from "mongoose";

export const connectDb = ()=>{
    try{
        const dbUrl:string = process.env.DATABASE_URL; 
        mongoose.connect(dbUrl) ;
        mongoose.connection.on("connected" , ()=>{
        console.log(`database connected successfully`) ; 
        })
        mongoose.connection.on("disconnected" , ()=>{
            console.log("database disconnected") ; 
        })

        mongoose.connection.on("error" , (error : Error)=>{
            console.log(`Error in connecting database ${error}`)
        })

    }catch(error){
        console.log(error);
    }
}