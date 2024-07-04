"use server"

import transporter from "@/utils/nodemailer"
import prisma from "../../prisma/db"
import { getSessionInfo } from "./session"
import { generateOtp } from "@/utils/generateOtp"

export async function addForm(data:{name:string,description:string}){
    console.log(data)
    const user = await getSessionInfo()
    console.log(user)
    await prisma.form.create({
        data:{
            userId:user.id,
            name:data.name,
            description:data.description
        }
    })
    return {
        msg:"Form initialised success"
    }
}

export async function getUserForms(){
    const user = await getSessionInfo()

    const results = await prisma.form.findMany({
        where:{
            userId:user.id
        }
    })
    console.log(results)

    return results
}

export async function publishForm(id: string,items: any){
    console.log(id,items)
    await prisma.form.update({
        where:{
            id:id
        },
        data:{
            data:items
        }
    })
    return {
        msg:"Publish success"
    }
}

export async function getFormById(id:string){
    console.log(id)
    const form = await prisma.form.findFirst({
        where:{
            id:id
        }
    })
    if(!form)return {msg:"No form found"}
    return {
        items:form.data
    }
} 

export async function sendMail(email: string){
    
    let otp:string = generateOtp()

    await prisma.otp.create({
        data:{
            email:email,
            otp:otp,
            type:"FORM",
            expiryDate:new Date(Date.now()+60*2*1000)
        }
    })
    let message = {
        from: 'company.com', // listed in rfc822 message header
        to: email, // listed in rfc822 message header,
        subject:"OTP Verification from ChatWave",
        html: `otp is ${otp} `,
    }
    transporter.sendMail(message,(err,info)=>{
        if(err)console.log(err)
        else console.log("Email sent bro")
    })

    return {
        msg:"OTP sent"
    }
}

export async function verifyOtp(email,otp){
    const exOTP = await prisma.otp.findFirst({
        where:{
            type:"FORM",
            email:email
        }
    })
    if(!exOTP){
        console.log("Not found")
        return {msg:"Not found"}
    }
    if(exOTP.otp===otp){
        return {msg:"Verified"}
    }
}


export async function submitForm(id:string, email: string, response: any){
    console.log(id,email,response)
}