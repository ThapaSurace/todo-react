import React, { useState } from 'react'
import { useDispatch} from 'react-redux';
import "./App.css";
import { addTodo, updateTodo } from './reducer/TodoReducer';
import TodoLists from './TodoLists';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const [todo,setTodo] = useState('')
  const [updatedDataId,setUpdatedDataId] = useState('')
  const [isUpdating,setIsUpdating] = useState(false)
  const [completed] = useState(false)
  const dispatch = useDispatch()
  const onSubmit = (e) => {
    e.preventDefault()
    if(updatedDataId !== '' && todo){
      dispatch(updateTodo({id:updatedDataId,todo}))
      setIsUpdating(!isUpdating)
      setUpdatedDataId('')
      setTodo('')
    }else{
      dispatch(addTodo({id:Date.now(),todo:todo,completed:completed}))
      setTodo('')
    }
  }
  return (
    <>
    <ToastContainer />
     <div className=" max-w-2xl mt-10 mx-auto flex flex-col items-center shadow-lg rounded-md p-6 border-2 border-gray-500">
      <div>
        <h1 className="text-4xl text-gray-900 font-bold text-center mb-4">Todo list</h1>
      </div>
     <form onSubmit={onSubmit} className="w-full max-w-sm">
        <div className="flex items-center border-b-2 border-gray-800 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Add todo..."
            value={todo}
            onChange={e=>setTodo(e.target.value)}
          />
         {
          isUpdating === true ? (
            <button
            className="flex-shrink-0 bg-gray-700 hover:bg-gray-600 border-gray-700 hover:border-gray-600 text-sm border-4 text-white py-1 px-2 rounded font-bold tracking-wider"
            type="submit"
          >
           Update
          </button>
          ):(
            <button
            className="flex-shrink-0 bg-gray-700 hover:bg-gray-600 border-gray-700 hover:border-gray-600 text-sm border-4 text-white py-1 px-2 rounded font-bold tracking-wider"
            type="submit"
          >
            ADD
          </button>
          )
         }
        </div>
      </form>
      <div className=' mt-10 w-full flex flex-col gap-2'>
        <TodoLists setTodo={setTodo} setIsUpdating={setIsUpdating} setUpdatedDataId={setUpdatedDataId} />
      </div>
     </div>
    </>
  );
};

export default App;
