import React, { useState, useEffect } from "react";
import InputField from "./components/InputField";
import SingleTodo from "./components/SingleTodo";
import TodoList from "./components/TodoList";
import { Todo } from "../types";

const App = () => {
  const [text, setText] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>(() => {
    // @ts-ignore
    const todos = JSON.parse(localStorage.getItem("todos"));
    return todos ? todos : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="py-6 px-4 font-openSans space-y-4">
      {/* logo */}
      <h3 className="font-kaushan capitalize text-4xl md:text-5xl bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 p-3 font-bold bg-clip-text text-transparent w-fit mx-auto">
        todofy
      </h3>

      {/* input field */}
      <InputField
        text={text}
        setText={setText}
        todos={todos}
        setTodos={setTodos}
      />

      {/* todo list */}
      {/* <TodoList /> */}
      {todos.map((value) => (
        <SingleTodo
          key={value.id}
          todo={value}
          todos={todos}
          setTodos={setTodos}
        />
      ))}
    </div>
  );
};

export default App;
