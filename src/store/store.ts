import { configureStore } from "@reduxjs/toolkit";
import propsSlicer from "../features/propsSlicer";
import previewSlicer from "@/features/previewSlicer";
import currentPropSlicer from "@/features/currentPropSlicer";
export const store = configureStore({
    reducer:{
        props:propsSlicer,
        preview: previewSlicer,
        currentProp: currentPropSlicer
    }
})