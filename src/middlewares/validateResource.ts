import express,{Request,Response,NextFunction} from "express"
import {AnyZodObject, object,string} from "zod"

export let validateResource=(schema:AnyZodObject)=>async(req:Request,res:Response,next:NextFunction)=>
{
  try{
     schema.parse({
        body:req.body,
        query:req.query,
        params:req.params
     })
     return next()
  }catch(Err:any)
  {
    
   return res.status(400).json({error:Err})
  }
}