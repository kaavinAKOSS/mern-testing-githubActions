import { FilterQuery } from "mongoose";
import { SessionDocument, SessionModel } from "../models/session.model";
import { UserDocument } from "../models/user.model";
import { createAccessToken, createRefreshToken, verifyRefreshTokenJWT } from "../utils/JWTUtils";
import { getUserFromSessionId } from "./user.services";

export let createSession=async(user:UserDocument)=>
{
   try{
     let session=await SessionModel.create({userId:user["_id"]})
     let accessToken=await createAccessToken(session["_id"],user)
     let refreshToken=await createRefreshToken(session["_id"])
     return {accessToken,refreshToken,session}
   }catch(err:any){
    throw new Error(err)
   }
}


export let getUserSessionsByQuery=async(query:FilterQuery<SessionDocument>)=>
{
    return SessionModel.find(query).lean()
}

export let reIssueAccessToken=async(refreshToken:string)=>
{
  try{
    let {decoded,expired,valid}=await verifyRefreshTokenJWT(refreshToken)
    if(decoded){
      let userObject= await getUserFromSessionId(decoded.sessionId)
      if(!userObject){
        return null;
      }
      let newAccessToken= await createAccessToken(decoded.sessionId,userObject)
      return {newAccessToken:newAccessToken,user:userObject,sessionId:decoded.sessionId}
    }
    if(expired){

      return null
    }
    if(!expired && !valid){
return null;
    }
  }catch(err){
return null
  }  
}

export let logoutUserService=async(sessionId:SessionDocument["_id"])=>
{
  try{
     let deletedSession=await SessionModel.deleteOne({_id:sessionId})
     if(!deletedSession)return null;
     return deletedSession
  }catch(err:any){
    throw new Error(err)
  }
}