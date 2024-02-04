//import React from 'react'
import AppWrapper from './appWrapper'
import {SubmitHandler, useForm} from "react-hook-form"
import { useSelector } from 'react-redux'
import { RootAppStateType } from '../../../redux/store'
import { CreateTaskInputSchema, CreateTaskInputType } from '../../schema/taskSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { createTaskMutationFunc } from '../../services/mutations/task.mutations'
import { useNavigate } from 'react-router-dom'

const CreateTask = () => {
  let {register,handleSubmit,formState:{
    errors,isSubmitting
  }} = useForm<CreateTaskInputType>({
    resolver:zodResolver(CreateTaskInputSchema)
  })
  let navigate=useNavigate()
  let {mutateAsync} = useMutation({
    mutationFn: (formData:CreateTaskInputType)=>{return createTaskMutationFunc(formData)},
    onSuccess:(data)=>{
        console.log("success ",data)
     navigate("/")
    },
    onError:(data)=>{
   console.log("error ",data)
    }
  })

  let userState=useSelector((state:RootAppStateType)=>state.auth)
  let createTaskSubmit:SubmitHandler<CreateTaskInputType>=async(formData)=>{
   await mutateAsync(formData)
  }
  return <>
  <h1>Create Your Task Pls {userState.username}</h1>
  <form onSubmit={handleSubmit(createTaskSubmit)}>
    <input placeholder="enter task title" {...register("title")} />
    {errors.title && errors.title.message}
    <input placeholder="enter task description " {...register("description")} />
    {errors.description && errors.description.message}
    <button type="submit" disabled={isSubmitting}>Create Task</button>
  </form>
  </>
}

export default ()=>{
    return <AppWrapper>
        <CreateTask/>
    </AppWrapper>
}