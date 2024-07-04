

export default function Input({elem}:any){
    return <input
    name={elem.name}
    placeholder={elem.placeholder}
    className={`h-[70%] w-ful rounded-${elem.borderRadius} l p-5 bg-white`} type='text'/> 
        
  }