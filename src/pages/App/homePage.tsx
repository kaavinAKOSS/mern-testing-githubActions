import {useEffect} from 'react'

import { Link } from "react-router-dom"
import { getUserTasksQueryFunc } from "../../services/queries/taskQueries"
import AppWrapper from "./appWrapper"
import {useQuery} from "@tanstack/react-query"
import { useDispatch, useSelector } from "react-redux"
import { RootAppStateType } from "../../../redux/store"
import { displayPostsAction } from "../../../redux/taskSlice/slice"
import TaskCard from '@/customComponents/taskCard'
const HomePage = () => {
  let {isError,isPending,data,isFetching}=useQuery({
    queryKey:["tasks"],
    queryFn: getUserTasksQueryFunc
  })
  let taskState=useSelector((state:RootAppStateType)=>state.task)
  let authState=useSelector((state:RootAppStateType)=>state.auth)
  let dispatch=useDispatch()
  useEffect(()=>
  {
    if(data && !isFetching){
      dispatch(displayPostsAction(data))
   }
  },[data])
  
  if(isPending){
    return <>Tasks Are Getting Fetched ...</>
  }
  if(isError){
    return <>Error occured fetching tasks </>
  }
 
  console.log("react query ",data)
  
  
  console.log("react redux ",taskState.tasks)
  return <>
    <div>HomePage</div>
    <Link to="createTask">create Task Page</Link>
    <h1>Tasks : </h1>
    {taskState.tasks.map((task)=>{
     return <>
    <TaskCard title={task.title} description={task.description} author={authState.username} taskId={task.taskId}/>
     </>
    })}
    </>
}

export default ()=>{
  return <>
  <AppWrapper>
    <HomePage/>
  </AppWrapper>
  </>
}