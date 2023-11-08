"use client";

import { Config } from "@/config";
import { Todo } from "@/types/Todo";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface TodosContextType {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  clearCompletedTodos: () => void;
  moveTodo: (id: string, to: number) => void;
}

const TodosContext = createContext<TodosContextType>({
  todos: [],
  addTodo: () => {},
  toggleTodo: () => {},
  deleteTodo: () => {},
  clearCompletedTodos: () => {},
  moveTodo: () => {},
});

export const TodosProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadedTodos, setLoadedTodos] = useState(false);

  useEffect(() => {
    const localStorageString =
      typeof window !== "undefined" &&
      localStorage.getItem(Config.todosLocalStorageKey);
    const localStorageTodos = JSON.parse(localStorageString || "[]");
    setTodos(localStorageTodos);
    setLoadedTodos(true);
  }, []);

  useEffect(() => {
    if(!loadedTodos) return;
    localStorage.setItem(Config.todosLocalStorageKey, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo: Todo) => {
    setTodos((todos) => [...todos, todo]);
  };

  const toggleTodo = (id: string) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const clearCompletedTodos = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const moveTodo = (id: string, to: number) => {
    setTodos((todos) => {
      const from = todos.findIndex((todo) => todo.id === id);
      const newTodos = [...todos];
      newTodos.splice(to, 0, newTodos.splice(from, 1)[0]);
      return newTodos;
    });
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        clearCompletedTodos,
        moveTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodosContext = () => useContext(TodosContext);
