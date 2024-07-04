export default function Button({elem}:any){
    return <button
    className={`h-1/2 w-[1/3] bg-green-500 text-nowrap rounded-${elem.borderRadius} p-5 flex justify-center items-center`}>{elem.placeholder?elem.placeholder:"Button"}</button>
        
  }