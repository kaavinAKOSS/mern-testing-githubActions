import {createSlice,PayloadAction} from "@reduxjs/toolkit"
type TaskType={
    title:string,
    description:string,
    taskId:string
}
let initialState:{
    tasks:TaskType[],
    fetched:boolean
}={
    tasks:[],
    fetched:false
}

export let taskSlice=createSlice({
    name:"task",
    initialState,
    reducers:{
      displayPostsAction:{
        reducer(state,action:PayloadAction<TaskType[]>){
            state.fetched=true
            state.tasks=action.payload
        },
        prepare(postsData:any[]) {
            console.log("prepare posts ",postsData)
            let tasks:TaskType[]=postsData.map((post)=>{
                return {
                    title:post.title,
                    description:post.description,
                    taskId:post["_id"]
                   
                }
            })
             return {
                payload:tasks
             }
        },
      }
    }
})
export let {displayPostsAction}=taskSlice.actions
export let taskReducer=taskSlice.reducer

