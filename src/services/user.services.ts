import mongoose from "mongoose"
import { UserDocument } from "../models/user.model"
import { User } from "../models/user.model"
import { SessionDocument, SessionModel } from "../models/session.model"


export let createUserService=async(userInput:Pick<UserDocument,"username"|"password"|"email">)=>{
  try{
   let insertedUser = await User.create(userInput)
   return insertedUser
  }catch(Err:any){
    throw new Error("error upon user creation ... ")
  }
}
export let getUserFromSessionId=async(sessionId:SessionDocument["_id"])=>
{
  try{
    let sessionObject=await SessionModel.findById(sessionId)
    if(!sessionObject) return null;
    let userObject = await User.findById(sessionObject.userId)
    if(!userObject) return null;
    return userObject
  }catch(Err:any){
    throw new Error(Err)
  }
}

