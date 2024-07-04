import { createSlice } from "@reduxjs/toolkit";

interface preview{
    html:string
  
  } 
const initialState  = {
    html:"<p>Preview</p>"

}


export const previewSlice = createSlice({
    name:'previewSlice',
    initialState:initialState,
    reducers:{
        
        setPreview:(state,action)=>{
            state.html = action.payload.html
        }
    }

})

export const  {setPreview} = previewSlice.actions

export default previewSlice.reducer

