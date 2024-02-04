//import { useState } from 'react'
import {createBrowserRouter} from "react-router-dom"
import './App.css'
export let appRouter=createBrowserRouter([{
  path:"/",
  async lazy(){
    let HomePage=await import("./pages/App/homePage")
    return {Component:HomePage.default}
  }},{
  path:'/login',
 async lazy(){
  let LoginPage=await import("./pages/Auth/loginPage")
  return {Component:LoginPage.default}
 }
},{
  path:"/register",
  async lazy(){
    let RegisterPage=await import("./pages/Auth/registerPage")
    return {Component:RegisterPage.default}
  }
},{
  path:"/createTask",
  async lazy(){
    let CreateTaskPage=await import("./pages/App/createTask")
    return {Component:CreateTaskPage.default}
  }
}])






