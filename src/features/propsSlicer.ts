import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    props:[{id:1,type:"Input"},{id:2,type:"A"},{id:3,type:"B"},{id:4,type:"C"}],
    // props:[]
}
 interface props{
    id:"",
    height?:"",
    width?:"",
    type:"",
    borderRadius?:"",
    backgroundColor?:""
  }

export const propsSlice = createSlice({
    name:'todoSlice',
    initialState:initialState,
    reducers:{
        addProp:(state,action: PayloadAction<props>)=>{
            const prop : any = {
                id:action.payload.id,
                type:action.payload.type
            } 
            state.props.push(prop)
        },
        setProps:(state,action)=>{
            state.props = action.payload.props
        }
    }

})

export const  {addProp, setProps} = propsSlice.actions

export default propsSlice.reducer

