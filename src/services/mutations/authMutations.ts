import { UserLoginInputType, UserRegistrationInputType } from "../../schema/authSchema";
import { axiosInstance } from "../axiosInstance";

export let registerUserMutationFunc=async(formData:UserRegistrationInputType)=>{
    try{
        let {data}=await axiosInstance.post("/api/auth/register",formData)
        console.log(data)
        return "returned data"
    }catch(err:any){
throw new Error(err.toString())
    }
}
export let loginUserMutationFunc=async(formData:UserLoginInputType)=>
{
  try{
     let {data}=await axiosInstance.post("/api/auth/login",formData)
     console.log("login Data",data)
     return data
  }catch(err:any){
    throw new Error(err.toString())
  }
}