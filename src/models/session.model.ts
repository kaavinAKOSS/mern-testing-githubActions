import mongoose from  "mongoose"
import { UserDocument } from "./user.model"


export interface SessionDocument extends mongoose.Document{
    userId:UserDocument["_id"],
    valid:boolean,
    isValidSession():boolean
}

let SessionSchema = new mongoose.Schema<SessionDocument>({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    valid:{
        type:Boolean,
        default:true
    }
})
SessionSchema.methods.isValidSession=async function()
{
   let userDoc = this as SessionDocument
   return userDoc.valid
}
export let SessionModel=mongoose.model<SessionDocument>("Session",SessionSchema)
