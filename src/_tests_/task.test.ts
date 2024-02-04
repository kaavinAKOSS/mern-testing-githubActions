import supertest from "supertest"
import app from "../app"
import * as taskService from "../services/task.services"
import * as jwtUtils from "../utils/JWTUtils"
import * as userServices from "../services/user.services"
describe("tasks route",()=>{
    beforeEach(async()=>
    {
   //@ts-ignore
   jest.spyOn(jwtUtils,'verifyAcessTokenJWT').mockReturnValueOnce({decoded:{
    sessionId:"12345"
     },
expired:false,
valid:true
})
//@ts-ignore
jest.spyOn(userServices,'getUserFromSessionId').mockReturnValueOnce({username:"kaavinak",
email:"kaavinak@gmail.com",
_id:"1234"
})
    })
    describe("create task",()=>
    {
        it("valid task created ... ",async()=>
        {
     //@ts-ignore
     jest.spyOn(taskService,'createTaskService').mockReturnValue({title:"title-1",
        description:"description-1"
     })

    let {status,body}=await supertest(app).post("/api/app/task").set("Cookie",["access-token=1234","refresh-token=1234"]).send({
        title:"title-1",
        description:"description-1"
    })
    expect(status).toBe(200)
    expect(body.task).toEqual({
        title:"title-1",
        description:"description-1"
    })
        
})
    })
    describe("get all tasks",()=>
    {
        it("get all tasks success",async()=>
        {
            let tasks=[{title:"title-1",description:"des-1"},{title:"title-2",description:"des-2"}]
            //@ts-ignore
            jest.spyOn(taskService,'getAllTasksByUserService').mockReturnValueOnce(tasks)
            let {status,body}=await supertest(app).get("/api/app/task").set("Cookie",["access-token=1234","refresh-token=1234"])
            expect(status).toBe(200)
            expect(body.tasks).toEqual(tasks)
            expect(taskService.getAllTasksByUserService).toHaveBeenCalledWith("1234")
        })
    })
    describe("delete a task",()=>
    {
        it("delete a task successfully ",async()=>
        {
            //@ts-ignore
            jest.spyOn(taskService,'deleteTaskByIdService').mockReturnValueOnce({title:"deleted-1",description:"des-1",
        _id:"1"})
            let {status,body}=await supertest(app).delete("/api/app/task/1").set("Cookie",["access-token=1234","refresh-token=1234"])
            
            expect(status).toBe(200)
            expect(body.taskId).toEqual("1")
            expect(taskService.deleteTaskByIdService).toHaveBeenCalledWith("1","1234")
            
        })
    })
})