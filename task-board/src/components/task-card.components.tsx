import { FaTrash } from "react-icons/fa";
import { Task } from "../types";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: Task;
  deleteTask: any;
  updateTask: any;
}

const TaskCardComponent = ({ task, deleteTask, updateTask }: Props) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-50  p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-teal-700 cursor-grab relative"
      />
    );
  }

  if (editMode) {
    return (
      <>
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          className=" p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-teal-500 cursor-grab relative"
        >
          <textarea
            className="h-[90%] w-full resize-none border-none rounded bg-transparent text-slate-700 focus:outline-none"
            value={task.content}
            autoFocus
            placeholder="Task Content Here"
            onBlur={toggleEditMode}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.shiftKey) toggleEditMode();
            }}
            onChange={(e) => updateTask(task.id, e.target.value)}
          ></textarea>
        </div>
      </>
    );
  }
  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={toggleEditMode}
        className="bg-slate-300 text-slate-700 p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-teal-500 cursor-grab relative task"
        onMouseEnter={() => {
          setMouseIsOver(true);
        }}
        onMouseLeave={() => {
          setMouseIsOver(false);
        }}
      >
        <p className="my-auto text-slate-700 h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
          {task.content}
        </p>
        {mouseIsOver && (
          <button
            onClick={() => {
              deleteTask(task.id);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded opacity-50 hover:opacity-100 "
          >
            <FaTrash />
          </button>
        )}
      </div>
    </>
  );
};

export default TaskCardComponent;
