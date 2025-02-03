import { FaDotCircle, FaPlus } from "react-icons/fa";
import { Column, Task } from "../types";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import TaskCardComponent from "./task-card.components";

interface props {
  column: Column;

  createTask: any;
  tasks: Task[];
  deleteTask: any;
  updateTask: any;
}

const ColumnContainerComponent = ({
  column,

  createTask,
  tasks,
  deleteTask,
  updateTask,
}: props) => {
  const [editMode, setEditMode] = useState(false);
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className=" opacity-40 border-2 border-slate-500 w-[350px] h-[500px] max-h-[500px] rounded-lg flex flex-col"
      ></div>
    );
  }
  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className="bg-slate-200 -5 w-[350px] h-[500px] max-h-[500px] rounded-lg flex flex-col "
      >
        <div
          onClick={() => {
            setEditMode(true);
          }}
          {...attributes}
          {...listeners}
          className="bg-slate-400 text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold  border-columnBackgroundColor border-4 flex items-center justify-between"
        >
          <div className="flex gap-2">
            <div className="flex justify-center items-center bg-columnBackgroundColor px-2 py-1 text-sm rounded-full ">
              <FaDotCircle />
            </div>

            {column.title}
          </div>
        </div>
        <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
          <SortableContext items={tasksIds}>
            {tasks.map((task) => (
              <TaskCardComponent
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ))}
          </SortableContext>
        </div>
        <button
          className="flex gap-2 items-center border-columnBackgroundColor justify-center border-2 rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:text-teal-700 active:bg-slate-300 "
          onClick={() => {
            createTask(column.id);
          }}
        >
          <FaPlus className="my-auto" /> Add Task
        </button>
      </div>
    </>
  );
};

export default ColumnContainerComponent;
