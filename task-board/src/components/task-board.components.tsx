import ColumnContainerComponent from "./column-container.components";
import { useMemo, useState, useEffect } from "react";

import { Column, Task } from "../types";

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCardComponent from "./task-card.components";

const TaskBoard = () => {
  const [column, setColumn] = useState<Column[]>([
    {
      id: "1",
      title: "TODO",
    },
    {
      id: "2",
      title: "In Progress",
    },
    {
      id: "3",
      title: "Completed",
    },
  ]);

  const [tasks, setTasks] = useState<Task[]>(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const columnId = useMemo(() => column.map((col) => col.id), [column]);

  const createTask = (columnId: string) => {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task`,
    };

    const updatedTasks = [...tasks, newTask];

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    setTasks(updatedTasks);
  };

  const deleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);

    setTasks(updatedTasks);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const updateTask = (id: string, content: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });

    setTasks(newTasks);

    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const generateId = () => {
    return Date.now() + "-" + Math.floor(Math.random() * 1001);
  };

  const onDragStart = (event: DragStartEvent) => {
    console.log("DRAG START", event);
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumn((column) => {
      const activeColumnIndex = column.findIndex(
        (col) => col.id === activeColumnId
      );

      const overColumnIndex = column.findIndex(
        (col) => col.id === overColumnId
      );
      return arrayMove(column, activeColumnIndex, overColumnIndex);
    });
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";
    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeColumnId);
        const overIndex = tasks.findIndex((t) => t.id === overColumnId);

        tasks[activeIndex].columnId = tasks[overIndex].columnId;

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeColumnId);

        tasks[activeIndex].columnId = overColumnId;

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 3 } })
  );
  return (
    <>
      <div className="m-auto bg-slate-300 flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
          <div className="m-auto flex gap-4">
            <div className=" flex flex-col gap-10 lg:flex-row">
              <SortableContext items={columnId}>
                {column.map((col) => (
                  <ColumnContainerComponent
                    key={col.id}
                    column={col}
                    createTask={createTask}
                    updateTask={updateTask}
                    tasks={tasks.filter((task) => task.columnId === col.id)}
                    deleteTask={deleteTask}
                  />
                ))}
              </SortableContext>
            </div>
          </div>
          {createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnContainerComponent
                  column={activeColumn}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  tasks={tasks.filter(
                    (task) => task.columnId === activeColumn.id
                  )}
                />
              )}
              {activeTask && (
                <TaskCardComponent
                  task={activeTask}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              )}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    </>
  );
};

export default TaskBoard;
