import jwt, { JsonWebTokenError, Jwt } from "jsonwebtoken"
import config from "config"
import { UserDocument } from "../models/user.model"
import { SessionDocument } from "../models/session.model"

type JWTUserPayload={
    sessionId:SessionDocument["_id"]
    user?:Pick<UserDocument,"username"|"email"> | undefined

}
type JWTAccessTokenPayload={
    sessionId:SessionDocument["_id"]
    user:Pick<UserDocument,"username"|"email"> 
}
type JWTRefreshTokenPayload={
    sessionId:SessionDocument["_id"]
}
type JWTOptions={
    expiresIn:string
}

 let signJWT=async(dataInfo:object,options:JWTOptions)=>
{
     try{
     let signedJWT =  jwt.sign(dataInfo,config.get<string>("secretToken"),options)
     return signedJWT
     }catch(err)
     {
       throw new Error("jwt sign error")
     }
}
export let verifyAcessTokenJWT=async(jwtPayload:string)=>
{
   try{
   let decoded=jwt.verify(jwtPayload,config.get<string>("secretToken")) as JWTAccessTokenPayload
  
   return {decoded,expired:false,valid:true}
   }catch(err:any){
    return {decoded:null,expired:err.message==="jwt expired",valid:false}
   }
}
export let verifyRefreshTokenJWT=async(jwtPayload:string)=>
{
   try{
   let decoded=jwt.verify(jwtPayload,config.get<string>("secretToken")) as JWTRefreshTokenPayload
  
   return {decoded,expired:false,valid:true}
   }catch(err:any){
    return {decoded:null,expired:err.message==="jwt expired",valid:false}
   }
}

export let createAccessToken=(sessionId:SessionDocument["_id"],userInfo:UserDocument)=>{
    try{
let accessToken=signJWT({sessionId:sessionId,user:{username:userInfo.username,email:userInfo.email}},{expiresIn:"1m"})
return accessToken
    }catch(err){
        throw new Error("access token creation error")
    }
}
export let createRefreshToken=(sessionId:SessionDocument["_id"])=>{
    try{
 let refresh=signJWT({sessionId:sessionId},{expiresIn:'1y'})
 return refresh
    }catch(err){
        throw new Error("refresh token creation error")
    }

}