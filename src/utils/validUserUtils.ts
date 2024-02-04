
import { UserSessionInputType } from "../schemas/session.schema"
import { User } from "../models/user.model"
export let isValidUser=async(userInput:UserSessionInputType["body"])=>{
 try{
  let user=await User.findOne({username:userInput.username})
  if(!user){
    return {user:null,error:"no user with given username"}
  }
  let validUser=await user.comparePassword(userInput.password)
  if(!validUser){
    console.log("cred not mathcing")
    return {user:null,error:"creds not matching"}
  }
  return {user:user,error:null}
  
 }catch(err:any){
    return {user:null,error:err}
 }
}