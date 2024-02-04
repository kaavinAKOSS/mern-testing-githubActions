export let createUserServiceReturnPayload={
    username:"kaavinak",
    password:"12345",
    email:"kaavinak@gmail.com",
    toJSON:()=>{
        return {
            username:"kaavinak",
            password:"12345",
            email:"kaavinak@gmail.com"
        }
    }
}

export let createUserServiceInputPayload={
    username:"kaavinak",
    password:"12345",
    email:"kaavinak@gmail.com",
    confirmPassword:"12345"
}

export let isValidUserServiceReturnPayload={
    user:{
        username:"kaavinak",
        password:"12345"
    },
    error:false
}
export let isValidUserServiceInputPayload={
username:"kaavinak",
password:"12345"  
}
export let createSessionServiceReturn={
    accessToken:"accessToken",
    refreshToken:"refreshToken",
    session:{
        _id:"12345"
    }
}