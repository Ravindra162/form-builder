"use server"
import prisma from "../../prisma/db"
import transporter from "@/utils/nodemailer"
import {generateOtp} from "@/utils/generateOtp"
import bcrypt from "bcryptjs"
export async function register(email:string,username:string,password:string){
    const existingUser = await prisma.user.findFirst({
        where:{
                email:email
        }
    })
    console.log(existingUser)
    if(existingUser?.isVerified) return {msg:"Already registered"}
    var salt = await bcrypt.genSaltSync(10);
    var hash = await bcrypt.hashSync(password, salt);

    await prisma.user.create({
        data:{
            email:email,
            password:hash,
            username:username,
            isVerified:true
        }
    })

    return {
        msg:"User created successfully"
    }

}

export async function sendOtp(username:string,email:string,password:string){
    const existingUser = await prisma.user.findFirst({
        where:{
            OR:[{
                username:username
            },{
                email:email
            }]
        }
    })
    console.log(existingUser)
    if(existingUser?.isVerified) return {msg:"Already registered"}
    const existingOtp = await prisma.otp.findFirst({
        where:{
            email:email
        }
    })
    console.log(existingOtp?.expiryDate)
    console.log(new Date(Date.now()))
    console.log(existingOtp!=undefined && existingOtp?.expiryDate < new Date(Date.now()))
    if(existingOtp){
    if(existingOtp?.expiryDate > new Date(Date.now())){
        console.log("Enter existing otp broo")
        return {
            msg:"Otp sent to mail, please enter to verify"
        }
    }
    await prisma.otp.delete({
        where:{
            id:existingOtp.id
        }
    })
    return {
        msg:"OTP expired, please signup again or click resend otp"
    }
    }
    let otp:string = generateOtp()

        await prisma.otp.create({
            data:{
                email:email,
                otp:otp,
                expiryDate:new Date(Date.now()+60*2*1000),
                type:"REGISTER"
            }
        })
    let message = {
        from: 'company.com', // listed in rfc822 message header
        to: email, // listed in rfc822 message header,
        subject:"OTP Verification from ChatWave",
        html: `otp is ${otp} `,
    }
    transporter.sendMail(message,(err : any,info: any)=>{
        if(err)console.log(err)
        else console.log("Email sent bro")
    })
    return {
        msg:"OTP sent to your mail successfully"
    }

}

export async function verifyOtp(email:string, username:string, password:string, otp:string){
    const existingOtp = await prisma.otp.findFirst({
        where:{
            email:email
        }
    })
    console.log(existingOtp)
    if(existingOtp?.otp!==otp){
        return {msg:"Incorrect otp"}
    }

    const response = await register(email,username,password)
    if(response.msg==="User created successfully"){

        await prisma.otp.delete({
            where:{
                id:existingOtp.id
            }
        })

        return {
            msg:"User Registered successfully"
        }
    }

    return {
        msg:"Some error occurred"
    }


    
}