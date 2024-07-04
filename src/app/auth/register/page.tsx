"use client";
import axios from "axios";
import { eyeClose, eyeOpen } from "../../../../public/eye";
import Image from "next/image";
import { useState } from "react";
import {sendOtp, verifyOtp} from "@/actions/auth"
import Timer from "../../../components/Timer"
export default function Register() {
  // gradient bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%
  const [showPass, setShowPass] = useState(true);
  const [showOtpBox,setOtpShowBox] = useState(false)
  const [user, setUser] = useState({
    username: "",
    password: "",
    email:"",
    otp:""
  });
  return (
    <div className="h-screen w-full bg-slate-200 flex justify-center items-center">
      <form
        method="post"
        className="h-1/2 w-[95%] flex flex-col justify-center items-center gap-8 bg-[#30303053] hover:shadow-lg shadow-slate-600 rounded-md ease-in-out delay-200 px-10"
      >
        {!showOtpBox&&<><input
          onChange={(e) => {
            setUser((prev) => {
              return { ...prev, username: e.target.value };
            });
          }}
          className="h-[40px] w-full bg-white rounded-md px-3"
          name="username"
          type="text"
          placeholder="username"
        />
        <input
          onChange={(e) => {
            setUser((prev) => {
              return { ...prev, email: e.target.value };
            });
          }}
          className="h-[40px] w-full bg-white rounded-md px-3"
          name="email"
          type="email"
          placeholder="email"
        />
        <label className="h-[40px] w-full bg-white rounded-md relative">
          <input
            onChange={(e) => {
              setUser((prev) => {
                return { ...prev, password: e.target.value };
              });
            }}
            className="h-[40px] w-full bg-white rounded-md px-3"
            name="password"
            type={showPass ? "password" : "text"}
            placeholder="password"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600">
            {showPass && (
              <Image
                className="cursor-pointer"
                onClick={() => setShowPass(!showPass)}
                src={eyeOpen}
                alt="eye"
              />
            )}
            {!showPass && (
              <Image
                className="cursor-pointer"
                onClick={() => setShowPass(!showPass)}
                src={eyeClose}
                alt="eye"
              />
            )}
          </span>
          <span
            onClick={() => alert("get otp from mail")}
            className="text-sm relative left-[50%]"
          >
            <u> Forgot password</u>?
          </span>
        </label></>}
        {showOtpBox&&<input
          onChange={(e) => {
            setUser((prev) => {
              return { ...prev, otp: e.target.value };
            });
          }}
          className="h-[40px] w-full bg-white rounded-md px-3"
          name="otp"
          type="otp"
          placeholder="otp"
        />}
        {showOtpBox?<button
          onClick={async(e) => {
            e.preventDefault() 
            const response = await verifyOtp(user.email,user.username, user.password, user.otp)
            console.log(response)
    
        }}
          type="submit"
          className="h-[36px] w-1/3 bg-green-500 rounded-md active:scale-105 ease-linear delay-100"
        >
          Verify OTP
        </button>:
        <button
          onClick={async(e) => {
            e.preventDefault() 
            const response = await sendOtp(user.username,user.email, user.password)
            console.log(response)
            if(response.msg==="Otp sent to mail, please enter to verify" || response.msg==="OTP sent to your mail successfully"){
                setOtpShowBox(true)
            }
        }}
          type="submit"
          className="h-[36px] w-1/3 bg-green-500 rounded-md active:scale-105 ease-linear delay-100"
        >
          Get OTP
        </button>}{
          showOtpBox&&<Timer/>
        }
      </form>
    </div>
  );
}
