import  { ReactNode,useEffect } from 'react'
import {useSelector,useDispatch} from "react-redux"
import { RootAppStateType, RootDispatchType } from '../../../redux/store'
import { useNavigate } from 'react-router-dom'
import { fetchUserLoginStatus } from '../../../redux/authSlice/slice'
type AppWrapperProps={
    children:ReactNode
}
const AppWrapper = ({children}:AppWrapperProps) => {
   let navigate=useNavigate()
    let authState=useSelector((state:RootAppStateType)=>state.auth)
    //console.log("authState ",authState)
    let dispatch:RootDispatchType=useDispatch()
    useEffect(()=>
    {
     dispatch(fetchUserLoginStatus())
    },[])
    useEffect(()=>{
      if(authState.fetching == false && authState.loginStatus==false){
        navigate("/login")
      }
    },[authState])
    console.log(authState)
if(authState.fetching || authState.loginStatus==false){
    //console.log("fetcinh loading ")
    return <div>Loading ....</div>
}


  return (
    <>
    {children}
    </>
  )
}

export default AppWrapper