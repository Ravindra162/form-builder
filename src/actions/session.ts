"use server"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
export async function getSessionInfo(){
    let data : any = cookies().get('authToken')
    console.log(data)
    const token: any = await data.value



    const {user} : any = jwt.verify(token,"secret")
    
    return user

}