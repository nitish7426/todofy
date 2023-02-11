import React from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { Todo } from "../../types";

interface Props {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const InputField = ({ text, setText, todos, setTodos }: Props) => {
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text) {
      setTodos([
        {
          id: Date.now(),
          todo: text,
          isCompleted: false,
        },
        ...todos,
      ]);
      setText("");
    }
  };
  return (
    <form
      className=" max-w-lg border rounded-full flex items-center mx-auto"
      onSubmit={handleSubmit}
    >
      <input
        className=" py-2 px-4 w-full rounded-full outline-none"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add your todo"
      />
      <button className="m-1 text-orange-600 hover:text-orange-500 duration-150 ease-in">
        <BsFillPlusCircleFill size={35} />
      </button>
    </form>
  );
};

export default InputField;
