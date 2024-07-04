
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import FormElement from './FormElement';
import { SetStateAction, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPreview } from '@/features/previewSlicer';
function Editor({ elements }:{elements:{id:string,type:string}[]}) {
  const dispatch = useDispatch()
  const { setNodeRef } = useDroppable({ id: 'editor' });
  const previewRef = useRef(null)
    useEffect(()=>{
        const html:any = previewRef.current
        dispatch(setPreview({html:html.innerHTML}))
        console.log(previewRef.current)
    },[elements, dispatch])
  

  return (
    <div ref={setNodeRef} id='' className="h-full w-1/2 text-white bg-[#1e1b1b]">
    <div
     ref={previewRef}
    className='h-[674px] w-full flex flex-col items-center gap-5  overflow-y-scroll p-2'>
      <SortableContext items={elements} strategy={verticalListSortingStrategy}>
        {elements.map((element) => (
          <FormElement elem={element} key={element.id} id={element.id} type={element.type} />
        ))}
      </SortableContext>
      <div className="h-20 flex-shrink-0"></div>
    </div>
  </div>
  );
}

export default Editor;

