"use client";

import Attribution from "@/components/attribution";
import FilterButton from "@/components/filterButton";
import ThemeButton from "@/components/themeButton";
import TodoList from "@/components/todoList";
import { useThemeContext } from "@/context/ThemeContext";
import { useTodosContext } from "@/context/TodosContext";
import { Todo } from "@/types/Todo";
import { v4 as uuidv4 } from "uuid";
import { KeyboardEventHandler, useState } from "react";
import Filters from "@/components/filters";

export default function Home() {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [inputTodo, setInputTodo] = useState<string>("");
  const { todos, addTodo, clearCompletedTodos } = useTodosContext();
  const { theme } = useThemeContext();
  let filtered: Todo[] = [];

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      if (inputTodo.trim() === "") return;

      const newTodo = {
        id: uuidv4(),
        title: inputTodo,
        completed: false,
      };

      addTodo(newTodo);
      setInputTodo("");
    }
  };

  if (filter === "all") {
    filtered = [...todos];
  } else if (filter === "active") {
    filtered = todos.filter((todo) => !todo.completed);
  } else if (filter === "completed") {
    filtered = todos.filter((todo) => todo.completed);
  }

  return (
    <div className={theme}>
      <main
        className={
          "dark:bg-dark-very-dark-blue bg-[url(/images/bg-mobile-light.jpg)] dark:bg-[url(/images/bg-mobile-dark.jpg)] sm:dark:bg-[url(/images/bg-desktop-dark.jpg)] sm:bg-[url(/images/bg-desktop-light.jpg)] bg-contain bg-no-repeat min-h-screen"
        }
      >
        <div className="mx-auto px-4 py-12 sm:py-20 max-w-2xl min-h-screen">
          <div className="flex justify-between mb-8">
            <h2 className="text-white text-3xl font-bold tracking-[0.5em]">
              TODO
            </h2>
            <ThemeButton />
          </div>

          <div className="bg-white dark:bg-dark-very-dark-desaturated-blue text-light-very-dark-grayish-blue dark:text-dark-light-grayish-blue py-4 px-4 w-full rounded mb-4 flex gap-4 shadow-lg">
            <div>
              <span className="rounded-full w-5 h-5 flex-grow border-2 dark:border-dark-very-dark-grayish-blue inline-block"></span>
            </div>
            <input
              type="text"
              name="todo"
              placeholder="Create a new todo..."
              className="bg-inherit focus:outline-none w-full"
              onChange={(event) => setInputTodo(event.currentTarget.value)}
              value={inputTodo}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="bg-white shadow-2xl dark:bg-dark-very-dark-desaturated-blue dark:text-dark-dark-grayish-blue w-full rounded mb-4">
            <TodoList todos={filtered} />

            <div className="flex justify-between p-4">
              <div className="text-light-dark-grayish-blue">
                {filtered.length} items left
              </div>
              <div className="space-x-4 hidden sm:block">
                <Filters filter={filter} setFilter={setFilter} />
              </div>
              <div className="space-x-2">
                <button
                  onClick={clearCompletedTodos}
                  className="dark:hover:text-dark-light-grayish-blue-hover text-light-dark-grayish-blue hover:text-light-very-dark-grayish-blue"
                >
                  Clear Completed
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-dark-very-dark-desaturated-blue text-light-very-dark-grayish-blue dark:text-dark-light-grayish-blue p-4 px-8 w-full rounded mb-4 flex gap-4 shadow-lg sm:hidden justify-center">
            <Filters filter={filter} setFilter={setFilter} />
          </div>

          <div className="text-center text-light-dark-grayish-blue dark:text-dark-dark-grayish-blue mt-10">
            Drag and Drop to reorder list
          </div>

          <Attribution />
        </div>
      </main>
    </div>
  );
}
