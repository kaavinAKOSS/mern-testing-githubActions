import React from 'react'
import ReactDOM from 'react-dom/client'
import {appRouter} from './Router.tsx'
import './index.css'
import {Provider} from "react-redux"
import {appStore} from "../redux/store.ts"
import {RouterProvider} from "react-router-dom"
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"
let queryClient = new QueryClient({
defaultOptions:{
  queries:{
    refetchOnWindowFocus:false
  }
}
})
//appStore.dispatch(fetchUserLoginStatus())

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <Provider store={appStore}>
    <RouterProvider router={appRouter}/>
    </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
