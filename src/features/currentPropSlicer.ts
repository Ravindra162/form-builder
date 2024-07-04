import { createSlice } from "@reduxjs/toolkit";

interface propIdentfier{
    id:string
  
  } 
const initialState  = {
    id:""

}


export const currentPropSlice = createSlice({
    name:'currentProp',
    initialState:initialState,
    reducers:{
        
        setCurrentProp:(state,action)=>{
            state.id = action.payload.id
        }
    }

})

export const  {setCurrentProp} = currentPropSlice.actions

export default currentPropSlice.reducer

