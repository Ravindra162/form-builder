"use client"

import { getFormById, submitForm } from "@/actions/form";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Element from "@/components/ui/Element";
export default function page(){
    const [items,setItems] = useState([])
    const [isVerified,setIsVerified] = useState(true)
    const {id} = useParams()
    useEffect(()=>{
        getFormById(id).then((res)=>{
            console.log(res)
            setItems(res.items)
        })
    },[])

    const submitHandler = async(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {};
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
                    return <Element key={elem.id} elem={elem} />
                })
            }
        </form>}
        </>
    )
}