import { useState } from "react";
import "./styles.css";

export default function DragDropTodo() {
  const [blogs, setBlogs] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setBlogs([...blogs, newTodo]);
      setNewTodo("");
    }
  };

  const handleDragStart = (e, task, sourceColumn) => {
    e.dataTransfer.setData("task", task);
    e.dataTransfer.setData("sourceColumn", sourceColumn);
  };

  const handleDrop = (e, targetColumn) => {
    const task = e.dataTransfer.getData("task");
    const sourceColumn = e.dataTransfer.getData("sourceColumn");

    if (targetColumn !== sourceColumn) {
      if (targetColumn === "Blogs") {
        setBlogs([...blogs, task]);
      } else if (targetColumn === "InProgress") {
        setInProgress([...inProgress, task]);
      } else if (targetColumn === "Completed") {
        setCompleted([...completed, task]);
      }

      if (sourceColumn === "Blogs") {
        setBlogs(blogs.filter((t) => t !== task));
      } else if (sourceColumn === "InProgress") {
        setInProgress(inProgress.filter((t) => t !== task));
      } else if (sourceColumn === "Completed") {
        setCompleted(completed.filter((t) => t !== task));
      }
    }
  };

  const handleDelete = (task, sourceColumn) => {
    if (sourceColumn === "Blogs") {
      setBlogs(blogs.filter((t) => t !== task));
    } else if (sourceColumn === "InProgress") {
      setInProgress(inProgress.filter((t) => t !== task));
    } else if (sourceColumn === "Completed") {
      setCompleted(completed.filter((t) => t !== task));
    }
  };

  return (
    <div className="app">
      <form className="add-ticket" onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>

      <div className="kanban-board">
        <Column
          title="Blogs"
          tasks={blogs}
          onDrop={(e) => handleDrop(e, "Blogs")}
          onDragStart={handleDragStart}
          onDelete={handleDelete}
        />
        <Column
          title="InProgress"
          tasks={inProgress}
          onDrop={(e) => handleDrop(e, "InProgress")}
          onDragStart={handleDragStart}
          onDelete={handleDelete}
        />
        <Column
          title="Completed"
          tasks={completed}
          onDrop={(e) => handleDrop(e, "Completed")}
          onDragStart={handleDragStart}
          onDelete={handleDelete}
        />
        <DeleteColumn onDrop={(e) => handleDrop(e, "Delete")} />
      </div>
    </div>
  );
}

const Column = ({ title, tasks, onDrop, onDragStart, onDelete }) => {
  return (
    <div
      className="column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <h3>{title}</h3>
      {tasks.map((task, index) => (
        <div
          className="task"
          key={index}
          draggable
          onDragStart={(e) => onDragStart(e, task, title)}
        >
          {task}
        </div>
      ))}
    </div>
  );
};
const DeleteColumn = ({ onDrop }) => {
  return (
    <div
      className="column delete-column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <h3>Delete</h3>
      <div className="delete-area">Drop here to delete</div>
    </div>
  );
};
