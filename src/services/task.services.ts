import { CreateTaskInputSchemaType } from "../schemas/task.schema"
import { TaskDocument, TaskModel } from "../models/task.model"
import { UserDocument } from "../models/user.model";

export let createTaskService=async(taskData:CreateTaskInputSchemaType["body"],authorId:UserDocument["_id"])=>
{
  try{
   let task=await TaskModel.create({title:taskData["title"],description:taskData["description"],author:authorId})
   if(!task)return null;
   return task;
  }catch(err:any){
    throw new Error(err)
  }
}
export let getAllTasksByUserService=async(userId:UserDocument["_id"])=>{
 try{
   let tasks=await TaskModel.find({author:userId})
   return tasks
 }catch(err:any){
    throw new Error(err)
 }
}
export let getTaskByIdService=async(taskId:TaskDocument["_id"],userId:UserDocument["_id"])=>{
    try{
      let task = await TaskModel.findOne({_id:taskId,author:userId})
      console.log("task ",task,taskId,userId)
      if(!task)return null
      return task
    }catch(err:any){
        throw new Error(err)
    }
}
export let deleteTaskByIdService=async(taskId:TaskDocument["_id"],userId:UserDocument["_id"])=>{
    try{
    let deleted= await TaskModel.findOneAndDelete({_id:taskId,author:userId})
    if(!deleted)return null;
    return deleted
    }catch(err:any){
        throw new Error(err)
    }
}