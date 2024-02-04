import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
let URL="http://localhost:5000/api/auth/verifyUser"
type AuthSliceStateType={
    loginStatus:boolean,
    fetching:boolean,
    userId:string,
    username:string
}
type ApiResponseType={
    userId:string,
    username:string,
    loggedIn:true
}
let initialState:AuthSliceStateType={
    loginStatus:false,
    fetching:true,
    userId:"",
    username:""
}

export let fetchUserLoginStatus=createAsyncThunk("auth/fetchLoginStatus",async()=>
{
    try{
    let {data,status}:{data:ApiResponseType,status:number}=await axios.get(URL,{withCredentials:true})
    if (status==400)return {loggedIn:false}
    return data
    }catch(err:any){
        return err.message
    }
})
export let authSlice=createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
          
    },
    extraReducers(builder){
   builder.addCase(fetchUserLoginStatus.pending,(state,_)=>
   {
    console.log("pending")
    state.fetching=true
    state.loginStatus=false
    state.userId=""
    state.username=""
   }).addCase(fetchUserLoginStatus.fulfilled,(state,action)=>
   {
    if(action.payload.loggedIn){
        console.log("succes")
        state.fetching=false
        state.loginStatus=true
        state.userId=action.payload.userId
        state.username=action.payload.username    
    }else{
        console.log("failure")
        state.fetching=false
        state.loginStatus=false
        state.userId=""
        state.username=""  
    }
   }).addCase(fetchUserLoginStatus.rejected,(state,_)=>
   {
    console.log("rejected")
    state.fetching=false
        state.loginStatus=false
        state.userId=""
        state.username=""  
   })
    }
})
export let authReducer=authSlice.reducer

