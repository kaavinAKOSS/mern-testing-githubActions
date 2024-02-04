import {object,string, TypeOf} from "zod"


export let UserRegistrationInputSchema=object({
    username:string({
        required_error:"username is required"
    }).min(3,"username should be more than 3 characters"),
    password:string({
        required_error:"password is required"
    }).min(4,"minimum of 4 characters ").max(15,"maximum of 15 characters"),
    email:string({
        required_error:"email is required"
    }).email("not a valid email"),
    confirmPassword:string({
        required_error:"password is required"
    }).min(4,"minimum of 4 characters ").max(15,"maximum of 15 characters")
}).refine((data)=>data.password===data.confirmPassword,{message:"confirm password and password do not match"})

export let UserLoginInputSchema = object({
        username:string({required_error:"username required"}).min(3,"username should be more than 5").max(15),
        password:string({required_error:"password is required"}).min(5,"password should be larger").max(15)
    })

export type UserLoginInputType = TypeOf<typeof UserLoginInputSchema>
export type UserRegistrationInputType= TypeOf<typeof UserRegistrationInputSchema>