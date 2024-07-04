"use client"

import { useState } from "react"
import { addForm } from "@/actions/form"
import FormList from "@/components/FormList"
export default function Page(){
    const [showConf,setShowConf] = useState(false)
    const [formData,setFormData] = useState({name:"",description:""})
    async function submitHandler(e : any){
        e.preventDefault()
        if(formData.name===""){
            return alert("name can't be empty")
            
        }
        const res = await addForm(formData)
        alert(res.msg)
        setShowConf(false)

    }
    return <div className="h-screen w-full bg-black">
        <p className="text-white">Home Page</p>
        <button className="text-white" onClick={()=>setShowConf(!showConf)}>
            create new form
        </button>
        {showConf&&<div className="absolute h-screen w-full flex justify-center items-center bg-[#17171789]">
            <form className="h-1/2 w-[95%] bg-black border-2 border-white rounded-lg flex flex-col justify-center items-center gap-10 ">
                <div className="h-[20px] w-full mt-[-10px]">
                    <div onClick={()=>setShowConf(!showConf)} className="cursor-pointer float-right mx-10 text-white">X</div>
                </div>
                <input
                name="name"
                onChange={(e)=>setFormData((prevData)=>{return {...prevData,name:e.target.value}})}
                className="h-[40px] w-2/3 rounded-sm p-2" type="text" placeholder="* name or title"/>
                <input
                name="description"
                onChange={(e)=>setFormData((prevData)=>{return {...prevData,description:e.target.value}})}
                className="h-[70px] w-2/3 rounded-sm p-2" type="text" placeholder="decription"/>
                <button onClick={submitHandler} className="h-[35px] w-1/4 bg-green-500 rounded-md active:scale-105">Submit</button>
            </form>

        </div>}
        <FormList/>
    </div>
}