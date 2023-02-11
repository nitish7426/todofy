import React, { useState } from "react";
import { BiPencil, BiTrash, BiCheck } from "react-icons/bi";
import { Todo } from "../../types";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [text, setText] = useState<string>(todo.todo);
  const [edit, setEdit] = useState<boolean>(false);

  function formatDate(date: number) {
    const d = new Date(date);
    let hours = d.getHours();
    let minutes: string | number = d.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  const handleDelete = () => {
    setTodos(todos.filter((value) => value.id != todo.id));
  };

  const markCompleted = () => {
    const updatedTodos = todos.map((value) => {
      if (value.id == todo.id) {
        return {
          ...value,
          isCompleted: true,
        };
      }
      return value;
    });
    setTodos(updatedTodos);
  };

  const handleEdit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text) {
      const updatedTodos = todos.map((value) => {
        if (value.id == todo.id) {
          return {
            ...value,
            todo: text,
          };
        }
        return value;
      });
      setTodos(updatedTodos);
      setEdit(false);
    }
  };

  return (
    <div className=" p-2 border border-orange-500/50 rounded-xl gap-2 text-orange-500 duration-150 ease-in hover:bg-orange-500 hover:text-white max-w-lg mx-auto fadein">
      {edit && !todo.isCompleted ? (
        <form onSubmit={handleEdit}>
          <input
            className="bg-orange-400 text-white rounded w-full px-2 outline-none"
            type="text"
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </form>
      ) : (
        <div className={`font-medium ${todo.isCompleted && "line-through"}`}>
          {todo.todo}
        </div>
      )}
      <div className="flex items-center justify-between">
        <div className="text-sm">{formatDate(todo.id)}</div>
        <div className="flex gap-1 items-center">
          <button title="mark as complete" onClick={markCompleted}>
            <BiCheck size={25} />
          </button>
          <button title="edit" onClick={() => setEdit(!edit)}>
            <BiPencil size={20} />
          </button>
          <button title="delete" onClick={handleDelete}>
            <BiTrash size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleTodo;
