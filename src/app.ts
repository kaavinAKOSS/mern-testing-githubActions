import express from "express"
import authRouter from "./routers/auth.routes"
import taskRouter from "./routers/task.routes"
import cookieParser from "cookie-parser"
import cors from "cors"
let app=express()
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/app",taskRouter)

//export let app  = express()
export default app;


