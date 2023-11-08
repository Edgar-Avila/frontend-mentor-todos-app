"use client";

import { Todo } from "@/types/Todo";
import TodoItem from "./todoItem";
import {
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DndProvider from "@/context/DndContext";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useTodosContext } from "@/context/TodosContext";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  todos: Todo[];
}

const TodoList: React.FC<Props> = ({ todos }) => {
  const { moveTodo } = useTodosContext();
  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;
    if(!over) return;
    
    if (active.id !== over.id) {
      const newIndex = todos.findIndex((item) => item.id === over.id);
      const id = active.id.toString();
      moveTodo(id, newIndex);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  return (
    <DndProvider
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToWindowEdges]}
    >
      <div>
        <SortableContext items={todos} strategy={verticalListSortingStrategy}>
          {todos.map((todo) => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </SortableContext>
      </div>
    </DndProvider>
  );
};

export default TodoList;
