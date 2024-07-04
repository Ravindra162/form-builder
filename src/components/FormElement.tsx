import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentProp } from '@/features/currentPropSlicer';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Heading from '../components/ui/Heading';

function FormElement({ elem, id, type }:{elem:any, id : string, type: string}) {
  const dispatch = useDispatch()
  const [isSelected, setIsSelected] = useState(false)
  const ID = useSelector((state: any)=> state.currentProp)
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  

  return (
    <div 
    onMouseDown={
      ()=>{

        if(ID.id===id){
          dispatch(setCurrentProp({id:""}))
        }
        else{
        dispatch(setCurrentProp({id:id}))}

      }
    }
    ref={setNodeRef} style={style} {...attributes} {...listeners}
    className={`h-[65px] w-[90%] flex justify-center items-center mt-5 ${ID.id===id?"border-[1px] p-2 border-green-400":""} hover:bg-[#2e2e2e]`}>
     {type==="input"&&<Input elem={elem} />}
     {type==="button"&&<Button elem={elem}/>}
     {type[0]==="H"&&<Heading elem={elem} size={type[1]}/>}
    </div>
  );
}

export default FormElement;