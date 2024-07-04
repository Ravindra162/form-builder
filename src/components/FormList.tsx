"use client"

import { getUserForms } from "@/actions/form"
import { useEffect, useState } from "react"

function FormList() {
  const [forms,setForms] = useState([])
  useEffect(()=>{
        getUserForms().then((forms:any)=>{
            console.log(forms)
            setForms(forms)
        })
  },[])
  return (
    <div className="h-1/2 w-full bg-black border-[1px] border-gray-300 rounded-md overflow-y-scroll">
  <div className="grid grid-cols-2 gap-4 p-4">
    {forms.length?forms.map((elem:any,index)=>{
        return <div key={index} className="bg-white p-4 rounded-md shadow-md">
            <div>
            {elem.name}
            </div>
            <button onClick={()=>window.location.href=`/user/editForm/${elem.id}`} className="h-[30px] w-[60px] bg-green-500">
                edit
            </button>
            <button className="h-[30px] w-[60px] bg-red-500">
                delete
            </button>
            </div>
    
    }):<p className="text-white">No forms</p>}
    
  </div>
</div>
  )
}

export default FormList
