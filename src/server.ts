import express from "express"

import mongoose from "mongoose"
import config from "config"

import app  from "./app"

mongoose.connect(config.get<string>("dbUrl")).then(()=>
{
   app.listen(config.get<number>("port"),()=>
   {
    console.log("server started in ",config.get<number>("port"))
   })
}).catch((err)=>
{
    console.log(err)
})