import express,{Request,Response} from "express"
import { UserDocument } from "../models/user.model";
import { createTaskService, deleteTaskByIdService, getAllTasksByUserService, getTaskByIdService } from "../services/task.services";
import { CreateTaskInputSchemaType, getTaskByIdSchemaType } from "../schemas/task.schema";


export let createTaskController=async(req:Request<{},{},CreateTaskInputSchemaType["body"]>,res:Response)=>
{
    try{
        let user:UserDocument=res.locals.user;
        
        let task=await createTaskService(req.body,user.id)
        return res.status(200).json({task:task})
    }catch(err:any){
        return res.status(400).send(err.toString())
    }
  

}
export let getAllTasksByUserController=async(req:Request,res:Response)=>{
    try{
       let user:UserDocument=res.locals.user
       let tasks=await getAllTasksByUserService(user["_id"])
       return res.status(200).json({tasks:tasks})
    }catch(err:any){
        return res.status(400).send(err.toString())
    }
}
export let getTaskByIdController=async(req:Request<getTaskByIdSchemaType["params"],{},{}>,res:Response)=>{
try{
let user:UserDocument=res.locals.user
console.log(req.params,req.query)
let task=await getTaskByIdService(req.params.taskId,user["_id"])
if(!task)
{
    return res.status(400).json({message:"unauthorized taskid"})
}
return res.status(200).json({task:task})
}catch(err:any){
    return res.status(400).send(err.toString())
}
}
export let deleteTaskById=async(req:Request<getTaskByIdSchemaType["params"]>,res:Response)=>
{
    try{
       let user:UserDocument=res.locals.user
       let deletedTask=await deleteTaskByIdService(req.params.taskId,user["_id"])
       if(!deletedTask){
        return res.status(400).send("no task to delete")
       }
       return res.status(200).json({taskId:deletedTask["_id"]})
    }catch(err:any){
        return res.status(400).send(err.toString())
    }
}