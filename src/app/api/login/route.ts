"use server"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import prisma from "../../../../prisma/db";
import jwt from 'jsonwebtoken'
export async function POST(req: NextRequest){
    const {username,password} = await req.json()
        const user = await prisma.user.findFirst({
            where:{
                username
            }
        })
        if(user===null)return Response.json({
            msg:"Please register"
        },
    {
        status:400
    })
        const isCorrect = await bcrypt.compare(password, user?.password)
        
        if(isCorrect){
            const token = jwt.sign({user},"secret")
            console.log("Log in sxs")
            const response = NextResponse.json({msg:"Logged in"})
            response.cookies.set("authToken",token,{
                httpOnly:true,
                secure:process.env.NODE_ENV==="production",
                maxAge:5*60*600000
            })
            return response
        }
        console.log("Login failed")
        return Response.json({
            msg:"Login failed"
        })
        
}