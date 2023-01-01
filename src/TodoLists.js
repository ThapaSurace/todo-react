import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { removeTodo, toogleComplete, clearTodo } from "./reducer/TodoReducer";

const TodoLists = ({ setTodo, setIsUpdating, setUpdatedDataId }) => {
  const { items } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const handleCompletedTodo = (id, completed) => {
    dispatch(toogleComplete({ id: id, completed: completed }));
  };

  const handleUpdate = (text, id) => {
    setTodo(text);
    setUpdatedDataId(id);
    setIsUpdating(true);
    console.log(id);
  };

  const handleDelete = (id) => {
    dispatch(removeTodo(id));
  };

  const removeAllTodo = () => {
    dispatch(clearTodo());
  };

  const filterCompletedTodo = items.filter((item) => item.completed === true);
  return (
    <>
      {items?.map((item) => (
        <div
          key={item.id}
          className="py-4 bg-slate-800 text-white font-semibold tracking-wide rounded-md px-6 flex justify-between items-center"
        >
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleCompletedTodo(item.id, item.completed)}
            />
            {item.completed === true ? (
              <p className="line-through">{item.todo}</p>
            ) : (
              <p>{item.todo}</p>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <AiFillDelete
              onClick={() => handleDelete(item.id)}
              size={25}
              className="cursor-pointer"
            />
            <FaEdit
              size={25}
              className="cursor-pointer"
              onClick={() => {
                handleUpdate(item.todo, item.id);
              }}
            />
          </div>
        </div>
      ))}
      {items.length > 0 && (
        <div className="flex justify-between items-center mt-4">
          <p className="font-bold text-xl mt-4 text-gray-600">
            Completed:
            <span className=" ml-1">
              {filterCompletedTodo.length}/{items.length}
            </span>
          </p>

          <div>
            <button
              className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-bold tracking-wide rounded-md"
              onClick={removeAllTodo}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoLists;
