import React, { useState, useEffect } from 'react'

const Timer = () => {
    const [time,setTime] = useState(120)
    useEffect(() => {
        const interval = setInterval(() => {
            if(time>0)
          setTime((prevTime) => prevTime - 1);
        }, 1000); // 1000 milliseconds = 1 second
    
        // Clear the interval when the component unmounts
        return () => clearInterval(interval);
      }, []);
    
  return (
    <div>
       otp expires in  {time} ... seconds
    </div>
  )
}

export default Timer
