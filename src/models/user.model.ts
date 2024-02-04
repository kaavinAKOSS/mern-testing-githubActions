import mongoose from "mongoose"
//import jwt from "jsonwebtoken"
//let Schema = mongoose.Schema
import bcryptjs from "bcrypt"
export interface UserDocument extends mongoose.Document{
    username:string,
    password:string,
    email:string,
    comparePassword(password:string):Promise<boolean>
}  
let userSchema = new mongoose.Schema<UserDocument>({
    username:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
},{timestamps:true})
userSchema.pre("save",async function(next){
    let userDoc = this as UserDocument
    if(!userDoc.isModified("password")){
        return next()
    }

 
    let salt  =await  bcryptjs.genSalt(10)
    let encryptedPassword= await bcryptjs.hash(userDoc.password,salt)
    userDoc.password=encryptedPassword
    return next()
})
userSchema.methods.comparePassword=async function(password:string):Promise<boolean>{
 let userDoc = this as UserDocument
 
 return bcryptjs.compare(password,userDoc.password)

}
export let User=mongoose.model<UserDocument>("User",userSchema)