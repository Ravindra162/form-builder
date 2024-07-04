"use client"

import { getFormById, submitForm } from "@/actions/form";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Element from "@/components/ui/Element";
interface item{
    name:string,
    id : string,
    type: string,
    borderRadius?: string,
    backGroundColor?:string,
    placeholder?:string,
    label?:string
}
export default function Page(){
    const [items,setItems] = useState<item[]>([])
    const [isVerified,setIsVerified] = useState(true)
    const {id}:{id:string} = useParams()
    useEffect(()=>{
        getFormById(id).then((res:any)=>{
            console.log(res)
            setItems(res.items)
        })
    },[])

    const submitHandler = async(e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data: any = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        console.log(data);
        await submitForm(id,"tarakravindra242005@gmail.com",data)
    };
    

    return (
        <>

        {isVerified&&<form 
        method="post"
        onSubmit={submitHandler}
        className="h-screen w-full bg-black overflow-y-scroll flex flex-col justify-center items-center">
            {
                items.map((elem,index)=>{
                    return <Element key={index} elem={elem} />
                })
            }
        </form>}
        </>
    )
}