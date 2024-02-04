import mongoose from "mongoose"
import { UserDocument } from "./user.model"

export interface TaskDocument extends mongoose.Document{
    title:string,
    description:string,
    author:UserDocument["_id"]
}
let taskSchema=new mongoose.Schema<TaskDocument>({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Types.ObjectId,
        required:true
    }
})
export let TaskModel = mongoose.model<TaskDocument>("Task",taskSchema)