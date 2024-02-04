
import { axiosInstance } from "../axiosInstance"

export let getUserTasksQueryFunc=async()=>
{
  try{
     let {data}=await axiosInstance.get("/api/app/task")
     console.log("axios "+data)
     return data.tasks
  }
  catch(err:any){
   throw new Error(err.toString())
  }
}