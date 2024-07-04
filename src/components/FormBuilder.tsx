import React, { useEffect, useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import Editor from './Editor';
import Toolbox from './ToolBox';
import { tools } from './ToolBox';
import { BiBorderRadius } from 'react-icons/bi';
import { getFormById } from '@/actions/form';
import { useParams } from 'next/navigation';
interface item{
    name:string,
    id : string,
    type: string,
    borderRadius?: string,
    backGroundColor?:string,
    placeholder?:string,
    label?:string
}
function FormBuilder() {
  const {id}:any = useParams()
  const [elements, setElements] = useState<item[]>([]);
  useEffect(()=>{
    getFormById(id).then((res:any)=>{
      if(!res.items){

      }
      else
      setElements(res.items)
    })
  },[id])
  const handleSort = (event : any) => {
    const { active, over } = event;
    if(!over)return
    console.log(active,over)
    if (active.id !== over.id) {

      setElements((items:item[]) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  // Helper function to move array items
function arrayMove(array : item[], from: number, to: number) {
    const newArray = array.slice();
    newArray.splice(to < 0 ? newArray.length + to : to, 0, newArray.splice(from, 1)[0]);
    return newArray;
  }
  const handleDragEnd = (event : any) => {
    const { active, over } = event;
    console.log(active,over)
    if (over && over.id === 'editor' && tools.includes(active.id)) {
      setElements([...elements, { id: Date.now().toString(), type: active.id,name:"", borderRadius:"", placeholder:"" }]);
    }
    else if(over && over.id!=="editor" && over.id!=="button" && over.id!=="input" && (active.id==="input" || active.id==="button")){
        console.log("Please drag into free space")
        alert("Please drag into free space")
        return
    }
    else handleSort(event)
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="h-full w-full flex justify-center items-center">
        <Editor elements={elements} />
        <Toolbox elements={elements} setElements={setElements} />
      </div>
    </DndContext>
  );
}

export default FormBuilder;