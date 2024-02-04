

import { Button } from "@/components/ui/button"
import {
    Card,
 //   CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { deleteTaskMutationFunc } from "@/services/mutations/task.mutations"
import { useMutation, useQueryClient } from "@tanstack/react-query"
  
type TaskCardComponentProps={
    title:string,
    description:string,
    author:string,
    taskId:string
}

const TaskCard = ({title,description,author,taskId}:TaskCardComponentProps) => {
    const queryClient= useQueryClient()
    let {mutateAsync}=useMutation({
        mutationFn:(taskId:string)=>deleteTaskMutationFunc(taskId),
        onSuccess:(data)=>{
            queryClient.invalidateQueries({queryKey:["tasks"]})
            console.log("delted task ",data)
        },
        onError:(data)=>{
            console.log("error deleting task ")
        }
    })
    let deleteTask=async(taskId:string)=>{
   await mutateAsync(taskId)
    }
  return <>
  <Card>
  <CardHeader>
    <CardTitle>{title} </CardTitle>
    <CardDescription>{description}</CardDescription>
  </CardHeader>
   <Button onClick={()=>{deleteTask(taskId)}} >Delete Task </Button>
  <CardFooter>
    <p>{author}</p>
  </CardFooter>
</Card>
</>
}

export default TaskCard