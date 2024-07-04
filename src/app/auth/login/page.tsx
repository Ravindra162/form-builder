"use client"
import axios from 'axios'
import { eyeClose,eyeOpen } from "../../../../public/eye";
import {  useState } from "react";
import Image from 'next/image';


export default function Login() {
    // gradient bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%
    const [showPass,setShowPass] = useState(true)
    const [user,setUser] = useState({
        username:"",
        password:""
    })
    return (
        <div className="h-screen w-full bg-slate-200 flex justify-center items-center">
            <form method="post" className="h-1/2 w-[95%] flex flex-col justify-center items-center gap-8 bg-[#30303053] hover:shadow-lg shadow-slate-600 rounded-md ease-in-out delay-200 px-10">
                <input
                onChange={(e)=>{
                    setUser((prev)=>{return {...prev,username:e.target.value}})
                }}
                className="h-[40px] w-full bg-white rounded-md px-3" name="username" type="text" placeholder="username"/>
                <label className="h-[40px] w-full bg-white rounded-md relative">
                <input
                onChange={(e)=>{
                    setUser((prev)=>{return {...prev,password:e.target.value}})
                }} className="h-[40px] w-full bg-white rounded-md px-3" name="password" type={showPass?"password":"text"} placeholder="password"/>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600">
                   {showPass&& <Image className="cursor-pointer" onClick={()=>setShowPass(!showPass)} src={eyeOpen} alt='any'/>}
                   {!showPass&& <Image className="cursor-pointer" onClick={()=>setShowPass(!showPass)} src={eyeClose} alt='any'/>}
                </span>
                <span onClick={()=>alert("get otp from mail")} className="text-sm relative left-[50%]">
                   <u> Forgot password</u>?
                </span>
                </label>
                <button onClick={async(e)=>{
                    e.preventDefault()
                   axios.post("https://form-builder-trio.vercel.app/api/login",{username:user.username,password:user.password})
                   .then(response=>{
                    console.log(response)
                    if(response.data.msg==="Logged in")window.location.href="/user/home"
                   })
                    }} type="submit" className="h-[36px] w-1/3 bg-green-500 rounded-md active:scale-105 ease-linear delay-100">
                    Login
                </button>
            </form>
        </div>
    );
}
