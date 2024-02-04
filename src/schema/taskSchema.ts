import {TypeOf, object,string} from "zod"

export let CreateTaskInputSchema=object({
        title:string({required_error:"title is required for task"}).min(5),
        description:string({required_error:"description is required"}).min(5)
    })

export type CreateTaskInputType=TypeOf<typeof CreateTaskInputSchema>