import  { ReactNode,useEffect } from 'react'
import {useSelector,useDispatch} from "react-redux"
import { RootAppStateType, RootDispatchType } from '../../../redux/store'
import { fetchUserLoginStatus } from '../../../redux/authSlice/slice'
import { useNavigate } from 'react-router-dom'
type AuthWrapperProps={
    children:ReactNode
}
const AuthWrapper = ({children}:AuthWrapperProps) => {
    let authState=useSelector((state:RootAppStateType)=>state.auth)
    let dispatch:RootDispatchType=useDispatch()
    let navigate=useNavigate()

    useEffect(()=>
    {
     dispatch(fetchUserLoginStatus())
    },[])
    useEffect(()=>{
      if(authState.fetching == false && authState.loginStatus==true){
        navigate("/")
      }
    },[authState])
if(authState.fetching){
    return <div>Loading ....</div>
}


  return (
    <>
    {children}
    </>
  )
}

export default AuthWrapper