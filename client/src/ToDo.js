import React from "react";
import { useResource } from "react-request-hook";

export default function ToDo({
  id,
  title,
  description,
  author,
  dateCreated,
  complete,
  dateCompleted,
  handleToggleComplete,
  handleDeleteTodo,
}) {
  const [, deleteTodo] = useResource(({ id }) => ({
    url: `/todolist/${id}`,
    method: "delete",
  }));

  const [, toggleTodo] = useResource(({ id, dateCompleted }) => ({
    url: `/todolist/${id}`,
    method: "patch",
    data: { dateCompleted },
  }));

  const handleToggleCompleteLocal = () => {
    const currentDate = new Date().toISOString();
    toggleTodo({ id, dateCompleted: currentDate });
    // if (complete) toggleTodo({ id, dateCompleted: currentDate });
    // else toggleTodo({ id, dateCompleted: "" });
    handleToggleComplete();
  };

  const handleDeleteTodoLocal = () => {
    deleteTodo({ id });
    handleDeleteTodo();
  };

  return (
    <div>
      <h3>{title}</h3>
      <div>{description}</div>
      <div>Author: {author}</div>
      <div>Date Created: {new Date(dateCreated).toLocaleString()}</div>
      <div>
        Complete:{" "}
        <input
          type="checkbox"
          checked={complete}
          onChange={handleToggleCompleteLocal}
        />
      </div>
      {complete && (
        <div>Date Completed: {new Date(dateCreated).toLocaleString()}</div>
      )}
      <button onClick={handleDeleteTodoLocal}>Delete</button>
      <br />
    </div>
  );
}
