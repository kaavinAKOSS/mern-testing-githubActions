import {configureStore} from "@reduxjs/toolkit"
import { authReducer } from "./authSlice/slice"
import {taskReducer} from "./taskSlice/slice"

export let appStore=configureStore({
    reducer:{
        auth:authReducer,
        task:taskReducer
    }
})
export type RootAppStateType=ReturnType<typeof appStore.getState>
export type RootDispatchType=typeof appStore.dispatch