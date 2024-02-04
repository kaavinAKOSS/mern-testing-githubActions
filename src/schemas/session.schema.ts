import {TypeOf, object,string} from "zod"

export let UserSessionSchema = object({
    body:object({
        username:string({required_error:"username required"}).min(3,"username should be more than 5").max(15),
        password:string({required_error:"password is required"}).min(5,"password should be larger").max(15)
    })
})

export type UserSessionInputType = TypeOf<typeof UserSessionSchema>