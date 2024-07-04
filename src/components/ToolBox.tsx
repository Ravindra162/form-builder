import React, { useEffect, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import Preview from './Preview';
import { useSelector } from 'react-redux';
import { publishForm } from '@/actions/form';
import { useParams } from 'next/navigation';
export const tools = ['input', 'button','H1','H2','H3','H4','H5']
function Toolbox({elements, setElements}:any) {
  const url: any = useParams()
  const tools = ['input', 'button','H1','H2','H3','H4','H5'];
  const [showPreview,setShowPreview] = useState<boolean>(false)
  const {id} = useSelector((state: any)=>state.currentProp)
  const borderRadiusHandler = (e: any) => {
      const index = elements.findIndex((elem:any)=>elem.id===id)
      console.log(elements[index])
      elements[index].borderRadius=e.target.value
      setElements(()=>[...elements])
  }
  const placeholderHandler = (e: any) => {
      const index = elements.findIndex((elem:any)=>elem.id===id)
      console.log(elements[index])
      elements[index].placeholder=e.target.value
      setElements(()=>[...elements])
  }
  const nameHandler = (e: any) => {
    const index = elements.findIndex((elem:any)=>elem.id===id)
      console.log(elements[index])
      elements[index].name=e.target.value
      setElements(()=>[...elements])
  }
  const publishHandler = async() => {
    
   const res = await publishForm(url.id,elements)
   console.log(res)
   alert(res.msg)
  }
  return (
    <div className="h-full w-1/2">
        <div className='navigation w-full h-[55px] bg-black flex flex-row-reverse items-center gap-5'>
            <button 
            onClick={publishHandler}
            className='h-2/3 w-[10%] bg-green-500 mx-3 rounded-lg flex justify-center items-center'>
                Publish
            </button>
            <button 
            onClick={()=>setShowPreview(!showPreview)}
            className='h-2/3 w-[10%] bg-green-500 rounded-lg flex justify-center items-center'>
                Preview
            </button>
        </div>
        <div className='h-1/2 w-full bg-emerald-400'>
        {tools.map((element) => (
        <DraggableItem key={element} id={element} />
      ))}
    {showPreview&&<Preview onClose={setShowPreview}/>}
        </div>
        <div className='h-[41.7%] w-full bg-emerald-200'>
          {id===""?"select any element to customize":
          <div className='h-2/3 w-2/3 bg-slate-700 flex flex-col justify-center items-center'>
              <div className='h-1/5 w-full flex justify-center items-center gap-5'>
                  <div>
                    borderRadius
                  </div>
                  <select
                  onChange={borderRadiusHandler}
                  className='h-2/3 w-1/3 rounded-md'
                  >
                    <option value={""}>
                      none
                    </option>
                    <option value={"sm"}>
                      small
                    </option>
                    <option value={"md"}>
                      medium
                    </option>
                    <option value={"lg"}>
                      large
                    </option>
                  </select>
              </div>
              <div className='h-1/5 w-full flex justify-center items-center gap-5'>
                  <div>
                    backgroundColor
                  </div>
                  <input
                  className='h-2/3 w-1/3 rounded-md p-2' placeholder='in #' type='name'/>
              </div>
              <div className='h-1/5 w-full flex justify-center items-center gap-5'>
                  <div>
                    placeHolder
                  </div>
                  <input
                  onChange={placeholderHandler}
                  className='h-2/3 w-1/3 rounded-md p-2' placeholder='any thing' type='name'/>
              </div>
              <div className='h-1/5 w-full flex justify-center items-center gap-5'>
                  <div>
                    name for response
                  </div>
                  <input
                  onChange={nameHandler}
                  className='h-2/3 w-1/3 rounded-md p-2' placeholder='choose name for input' type='name'/>
              </div>

          </div>}
        </div>
     
    </div>
  );
}

function DraggableItem({ id }:{ id: string}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="draggable-item">
      {id}
    </div>
  );
}

export default Toolbox;