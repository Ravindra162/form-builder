export default function Heading({size,elem}:{size: string, elem:any}){
    const headingLists = {
      1:"text-5xl",
      2:"text-4xl",
      3:"text-3xl",
      4:"text-2xl",
      5:"text-xl",
    }
    return <p className={`${headingLists[size]} text-white`}>{elem.placeholder?elem.placeholder:`Heading ${size}`}</p>
  }
  