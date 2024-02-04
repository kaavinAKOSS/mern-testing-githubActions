import express,{Request,Response} from "express"
import { UserRegistrationInputType } from "../schemas/user.schema"
import { createUserService } from "../services/user.services"
import { UserSessionInputType } from "../schemas/session.schema"
import { isValidUser } from "../utils/validUserUtils"
import { createSession, getUserSessionsByQuery, logoutUserService } from "../services/session.services"
import { UserDocument } from "../models/user.model"
import { SessionDocument } from "../models/session.model"
import _ from "lodash"

export let  registerUserController=async(req:Request<{},{},UserRegistrationInputType["body"]>,res:Response)=>
{
 try{
   let createUser=await createUserService(req.body)
 //  console.log("created User ",createUser)
   return res.status(200).json({username:createUser.username,email:createUser.email})
 }catch(err:any){
    // console.log("error here ",err)
    return res.status(400).send(err.toString())
 }
}
export let loginUserController=async(req:Request<{},{},UserSessionInputType["body"]>,res:Response)=>
{
  try{
    let {user,error}=await isValidUser(req.body)
    console.log("error ",error)
    if(error){
      throw new Error(error)
    }
    if(!user){
      throw new Error("user is not valid")
    }
    let {accessToken,refreshToken,session}=await createSession(user)
    res.cookie("access-token",accessToken)
    res.cookie("refresh-token",refreshToken)
    return res.status(200).json(session)
 
  }catch(err:any){
    
    return res.status(400).send(err.toString())
  }
}
export let getUserSessions=async(req:Request,res:Response)=>
{
let user=res.locals.user
let sessions=await getUserSessionsByQuery({userId:user.id})
console.log("user sessions ",sessions,user)
return res.status(200).json({sessions:sessions})

}
export let logoutUserController=async(req:Request,res:Response)=>{
  try{
  let sessionId:SessionDocument["_id"]=res.locals.sessionId
  let logoutResult=await logoutUserService(sessionId)
  if(!logoutResult){
    return res.status(400).send("error logging out")
  }
  res.clearCookie("access-token")
  res.clearCookie("refresh-token")
  return res.status(200).send("user logged out")
  }catch(err:any){
    return res.status(400).send(err.toString())
  }
}

export let verifyUserController=(req:Request,res:Response)=>
{
try{
let user:UserDocument=res.locals.user
console.log(user," verify user1")
return res.status(200).json({userId:user._id,username:user.username,loggedIn:true})
}catch(err:any){
  console.log(err," verifyuser")
  return res.status(400).send(err.toString())
}
}