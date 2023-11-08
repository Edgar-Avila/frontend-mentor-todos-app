'use client';

import { useTodosContext } from "@/context/TodosContext";
import { Todo } from "@/types/Todo";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  todo: Todo
}

const TodoItem: React.FC<Props> = ({ todo }) => {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
    id: todo.id,
    data: todo,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const { toggleTodo, deleteTodo } = useTodosContext();
  return (
    <div
      className="p-4 border-b dark:border-b-dark-very-dark-grayish-blue dark:text-dark-light-grayish-blue flex gap-4 group"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <button onClick={() => toggleTodo(todo.id)}>
        {todo.completed && (
          <span className="rounded-full w-5 h-5 bg-gradient-to-br from-primary-check-from to-primary-check-to grid place-content-center">
            <img src="/images/icon-check.svg" alt="check" />
          </span>
        )}
        {!todo.completed && (
          <span className="rounded-full w-5 h-5 border-2 -mb-[4px] dark:border-dark-very-dark-grayish-blue inline-block"></span>
        )}
      </button>
      <span
        className={clsx({
          "line-through": todo.completed,
          "text-dark-dark-grayish-blue": todo.completed,
        })}
      >
        {todo.title}
      </span>
      <button
        className="sm:hidden sm:group-hover:inline-block ml-auto"
        onClick={() => deleteTodo(todo.id)}
      >
        <img src="/images/icon-cross.svg" alt="cross" />
      </button>
    </div>
  );
};

export default TodoItem;
