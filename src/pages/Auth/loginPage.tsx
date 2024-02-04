//import React from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { UserLoginInputSchema, UserLoginInputType } from "../../schema/authSchema"
import AuthWrapper from "./authWrapper"
//import {} from "@tanstack/react-query"
import {SubmitHandler, useForm} from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { loginUserMutationFunc } from "../../services/mutations/authMutations"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
const LoginPage = () => {
  let {register,handleSubmit,formState:{errors,isSubmitting}}=useForm<UserLoginInputType>({
    resolver:zodResolver(UserLoginInputSchema)
  })
  let navigate = useNavigate()
  let {mutateAsync} = useMutation({
    mutationFn:(formData:UserLoginInputType)=>{return loginUserMutationFunc(formData)},
    onSuccess:()=>
    {
      
   navigate("/")
    },
    onError:(data)=>
    {
      console.log("error inside ",data)
    }
  })
  let loginSubmit:SubmitHandler<UserLoginInputType>=async(formData)=>
  {
     await mutateAsync(formData)
  }
  return <>
  <h1>Login Page</h1>
  <form onSubmit={handleSubmit(loginSubmit)}> 
    <Input placeholder="enter username" {...register("username")}  />
    {errors.username && errors.username.message}
    <Input placeholder="enter password" {...register("password")}/>
    {errors.password && errors.password.message}
  <Button type="submit" disabled={isSubmitting}>Login Button</Button>
  </form>
  </>
}

export default ()=>{
    return <AuthWrapper>
        <LoginPage/>
    </AuthWrapper>
}