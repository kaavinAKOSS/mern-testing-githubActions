import supertest from "supertest";
import app from "../app";
import * as userServices from "../services/user.services"
import { createSessionServiceReturn, createUserServiceInputPayload, createUserServiceReturnPayload, isValidUserServiceReturnPayload } from "./testConstants/auth";
import _ from "lodash"
import   * as  validUserUtils from "../utils/validUserUtils" 
import * as sessionServices from "../services/session.services"
import * as jwtUtils from "../utils/JWTUtils"

describe("api testing",()=>{
    describe("auth routes testing",()=>{
        describe("register route testing",()=>{
          it("when  request body provided",async()=>
          {
            //@ts-ignore
             jest.spyOn(userServices,'createUserService').mockReturnValueOnce(createUserServiceReturnPayload)
             let {body,status}=await supertest(app).post("/api/auth/register").send(createUserServiceInputPayload)
             console.log(body,status)
             expect(status).toBe(200)
             expect(body).toEqual({
                username:createUserServiceReturnPayload.username,
                email:createUserServiceReturnPayload.email,
                
             })
          })
          it("when wrong req body field is missing",async()=>
          {
             //@ts-ignore
            jest.spyOn(userServices,'createUserService').mockReturnValueOnce(createUserServiceReturnPayload)
            let userInput=_.omit(createUserServiceInputPayload,"username")
            let {body,status}=await supertest(app).post("/api/auth/register").send(userInput)
            console.log(body,status)
            expect(status).toBe(400)
           
          })
          it("when user already exists",async()=>{
             //@ts-ignore
             jest.spyOn(userServices,'createUserService').mockRejectedValueOnce("user already exists")
             let {status,body}=await supertest(app).post("/api/auth/register").send(createUserServiceInputPayload)
             
             expect(status).toBe(400)
            
          })
          
        })
        describe("login route testing",()=>
        {
            it("when user logs in",async()=>{
                //@ts-ignore
                jest.spyOn(validUserUtils,"isValidUser").mockReturnValueOnce(isValidUserServiceReturnPayload)
                //@ts-ignore
                jest.spyOn(sessionServices,'createSession').mockReturnValueOnce(createSessionServiceReturn)
                let {status,body}=await supertest(app).post("/api/auth/login").send({username:"kaavinak",password:"12345"})
                console.log("body login",body)
                expect(status).toBe(200)
                expect(body).toEqual({_id:'12345'})
                 expect(validUserUtils.isValidUser).toHaveBeenCalledWith({username:"kaavinak",password:"12345"})
                 expect(sessionServices.createSession).toHaveBeenCalledWith(isValidUserServiceReturnPayload.user)
            })
            it("when user creds dont match ",async()=>
            {
                let input1={...isValidUserServiceReturnPayload}
                input1.error=true
                  //@ts-ignore
                  jest.spyOn(validUserUtils,"isValidUser").mockReturnValueOnce(input1)
                  //@ts-ignore
                  jest.spyOn(sessionServices,'createSession').mockReturnValueOnce(createSessionServiceReturn)
                  let {status,body}=await supertest(app).post("/api/auth/login").send({
                    username:"kaavinak",
                    password:"12345"
                  })
                  expect(status).toBe(400)
                  expect(validUserUtils.isValidUser).toHaveBeenCalledWith({
                    username:"kaavinak",
                    password:"12345"
                  })
                  expect(sessionServices.createSession).not.toHaveBeenCalled()

            })
            it("when req body for login is wrong",async()=>
            {
                //@ts-ignore
                jest.spyOn(validUserUtils,"isValidUser").mockReturnValueOnce(isValidUserServiceReturnPayload)
                //@ts-ignore
                jest.spyOn(sessionServices,'createSession').mockReturnValueOnce(createSessionServiceReturn)
                let {status,body}=await supertest(app).post("/api/auth/login").send({username:"kaavinak"})
                console.log("body login",body)
                expect(status).toBe(400)
                 expect(validUserUtils.isValidUser).not.toHaveBeenCalled()
                 expect(sessionServices.createSession).not.toHaveBeenCalled()
            })
        })
        describe("verify user ",()=>
        {
           it("valid logged in user",async()=>
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
                email:"kaavinak@gmail.com"
             })
             let {status,body}=await supertest(app).get("/api/auth/verifyUser").set("Cookie",["access-token=1234","refresh-token=1234"])
             expect(status).toBe(200)
             expect(body.username).toEqual("kaavinak")
           })
           it("not logged in user",async()=>{
            //@ts-ignore
            jest.spyOn(jwtUtils,'verifyAcessTokenJWT').mockReturnValueOnce({decoded:false,
            expired:false,
            valid:false
         })
         //@ts-ignore
         jest.spyOn(userServices,'getUserFromSessionId').mockReturnValueOnce({username:"kaavinak",
            email:"kaavinak@gmail.com"
         })
         let {status,body}=await supertest(app).get("/api/auth/verifyUser").set("Cookie",["access-token=1234","refresh-token=1234"])
         expect(status).toBe(400)
         //expect(body.username).toEqual("kaavinak")
         expect(jwtUtils.verifyAcessTokenJWT).toHaveBeenCalledWith('1234')
         expect(userServices.getUserFromSessionId).not.toHaveBeenCalled()
        })
      
        })
    })
})