//import React from 'react'

import { UserRegistrationInputSchema, UserRegistrationInputType } from "../../schema/authSchema"
import AuthWrapper from "./authWrapper"
import {SubmitHandler, useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {useMutation} from "@tanstack/react-query"
import { registerUserMutationFunc } from "../../services/mutations/authMutations"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const RegisterPage = () => {
  let navigate=useNavigate()
  let {register,handleSubmit,formState:{errors,isSubmitting}}=useForm<UserRegistrationInputType>({
    resolver:zodResolver(UserRegistrationInputSchema)
  })
  
   let {mutateAsync}=useMutation({
    mutationFn:(formData:UserRegistrationInputType)=>{return registerUserMutationFunc(formData)},
    onSuccess:(data:any)=>{
      console.log(data+" inside")
      navigate("/login")
    },
    onError:(data)=>{
      console.log("one error ",data)
    }
  })

  let registerSubmit:SubmitHandler<UserRegistrationInputType>=async(formData)=>{
  await mutateAsync(formData)
     
  }
  return <>
  <h1>Register Page</h1>
  
  <form onSubmit={handleSubmit(registerSubmit)} >
    <Input placeholder="enter username" {...register("username")} />
    {errors.username && errors.username.message }
    <Input placeholder="enter email" {...register("email")}/>
    {errors.email && errors.email.message }
    <Input placeholder="enter password" {...register("password")} />
    {errors.password && errors.password.message }
    <Input placeholder="enter confirmPassword" {...register("confirmPassword")} />
    {errors.confirmPassword && errors.confirmPassword.message }
    <Button  type="submit" disabled={isSubmitting}>Register User</Button>
    {errors.root && errors.root.message}
  </form>
 
  
  </>
}

export default ()=>{
    return <>
    <AuthWrapper>
        <RegisterPage/>
    </AuthWrapper>
    </>
}