import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
    items: localStorage.getItem('todoItems') ? JSON.parse(localStorage.getItem('todoItems')) : []
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers:{
        addTodo: (state,action) => {
          if( action.payload.todo === ''){
            toast.error('Please enter data', {
                position: "bottom-left",
              });
          }else{
        state.items.push(action.payload)
          localStorage.setItem('todoItems',JSON.stringify(state.items))
          toast.success('New todo added', {
            position: "bottom-left",
          });
          }
        },
        removeTodo: (state,action) => {
            const newTodos = state.items.filter(item=> item.id !== action.payload)
            state.items = newTodos
            localStorage.setItem('todoItems',JSON.stringify(state.items))
            toast.error('Todo removed', {
                position: "bottom-left",
              });
        },
        updateTodo: (state,action) => {
            const index = state.items.findIndex( item => item.id === action.payload.id)
            state.items[index].todo = action.payload.todo
            toast.success('Todo updated', {
                position: "bottom-left",
              });
            localStorage.setItem('todoItems',JSON.stringify(state.items))
        },
        toogleComplete: (state,action) => {
            const index = state.items.findIndex( item => item.id === action.payload.id)
            state.items[index].completed = !action.payload.completed
            
            if(state.items[index].completed === true){
                toast.success('Todo Completed',{
                    position: 'bottom-left'
                })
            }else{
                toast.error('Unchecked Completed todo',{
                    position: 'bottom-left',
                    icon: "🟢"
                    
                })
            }
            localStorage.setItem('todoItems',JSON.stringify(state.items))
        },
        clearTodo: (state,action) => {
            state.items = []
            localStorage.setItem('todoItems',JSON.stringify(state.items))
        }
    }
})

export const {addTodo, removeTodo, toogleComplete, updateTodo,clearTodo} = todoSlice.actions

export default todoSlice.reducer