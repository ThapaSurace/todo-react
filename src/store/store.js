import { configureStore } from "@reduxjs/toolkit";
import  todoReducer  from "../reducer/TodoReducer";

export const store = configureStore({
    reducer : {
       todo: todoReducer
    }
})

