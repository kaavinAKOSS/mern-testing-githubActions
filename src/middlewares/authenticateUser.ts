import express,{Request,Response,NextFunction} from "express"
import { verifyAcessTokenJWT } from "../utils/JWTUtils"
import { getUserFromSessionId } from "../services/user.services"
import { reIssueAccessToken } from "../services/session.services"


export let authenticateUser=async(req:Request,res:Response,next:NextFunction)=>
{
  try{
   
    let accessToken=req.cookies["access-token"]
  let refreshToken=req.cookies["refresh-token"]
  if(!accessToken){
    throw new Error("access token not found")
    return 
  }
   let {decoded,expired,valid}=await verifyAcessTokenJWT(accessToken)
   if(decoded){
    console.log("not reissuing")
     let user=await getUserFromSessionId(decoded.sessionId)
    
     res.locals.user=user
     res.locals.sessionId=decoded.sessionId
     return next()
     
   }
   if(expired && refreshToken){
    console.log("reissuing .... ")
let newAccessTokenInfo=await reIssueAccessToken(refreshToken)
if(!newAccessTokenInfo){
    return res.status(400).json({message:"login again"})
}
if(!newAccessTokenInfo?.newAccessToken || !newAccessTokenInfo){
    return res.status(400).json({message:"login again"})
}
res.locals.user=newAccessTokenInfo.user
res.locals.sessionId=newAccessTokenInfo.sessionId
res.cookie('access-token',newAccessTokenInfo.newAccessToken)
return next()
   }
   if(!valid){
    return res.status(400).json({message:"login again"})
   }


  }catch(err:any){
   return res.status(400).send(err.toString())
  }
}