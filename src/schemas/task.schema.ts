import {TypeOf, object,string} from "zod"

export let CreateTaskInputSchema=object({
    body:object({
        title:string({required_error:"title is required for task"}).min(5),
        description:string({required_error:"description is required"}).min(5)
    })
})

export let GetTaskByIdSchema=object({
    params:object({
        taskId:string({required_error:"no taskid provided"})
    })
})
export type CreateTaskInputSchemaType= TypeOf<typeof CreateTaskInputSchema>
export type getTaskByIdSchemaType=TypeOf<typeof GetTaskByIdSchema>