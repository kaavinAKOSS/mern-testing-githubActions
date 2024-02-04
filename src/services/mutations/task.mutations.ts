
import { CreateTaskInputType } from "../../schema/taskSchema"
import { axiosInstance } from "../axiosInstance"

export let createTaskMutationFunc=async(formData:CreateTaskInputType)=>{
try{
  let {data}=await axiosInstance.post("/api/app/task",formData)
  return data
}catch(err:any){
    throw new Error(err.toString())
}
}
export let deleteTaskMutationFunc=async(taskId:string)=>{
    try{
       let {data}=await axiosInstance.delete("/api/app/task/"+taskId)
       return data
    }catch(err:any){
        throw new Error(err.toString())
    }
}