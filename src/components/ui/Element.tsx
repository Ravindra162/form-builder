import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import Heading from './Heading';
export default function Element({ elem }:{ elem:{id : string, type: string}}) {
 

  return (
    <div 
    className={`h-[65px] w-[90%] flex justify-center items-center mt-5`}>
     {elem.type==="input"&&<Input elem={elem} />}
     {elem.type==="button"&&<Button elem={elem}/>}
     {elem.type[0]==="H"&&<Heading elem={elem} size={elem.type[1]}/>}
    </div>
  );
}
