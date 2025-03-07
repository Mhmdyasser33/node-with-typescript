import mongoose from "mongoose" ; 


const UserSchema = new mongoose.Schema({
    username : {type : String ,  required : true},
    email : {type : String , required : true},
    authentication : {
        password : {type : String , required : true , select : false},
        salt : {type  :String , select : false},
        sessionToken : {type : String , select : false}
    }
},{timestamps : true},)

export const UserModel = mongoose.model("User" , UserSchema) ; 
// create all actions 
export const getUsers = ()=> UserModel.find({}) ;
export const getUserByEmail = (email : string)=> UserModel.findOne({email}) ; 
export const getUserBySessionToken =  (sessionToken : string) => UserModel.findOne({"authentication.sessionToken" : sessionToken});
export const getUserById = (id : string) => UserModel.findById({id}) ; 
export const createUser = (userInfo:Record<string,any>) => new UserModel(userInfo).save().then((user)=> user.toObject()) ; 
export const deleteUserById = (id : string)=> UserModel.findOneAndDelete({_id :id}); 
export const updateUserById = (id : string , userInfo:Record<string,any>) => UserModel.findByIdAndUpdate(id , userInfo) ; 