// ToDo.js
import React from "react";

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
          onChange={handleToggleComplete}
        />
      </div>
      {complete && (
        <div>
          Date Completed: {new Date(dateCompleted).toLocaleString()}
        </div>
      )}
      <button onClick={handleDeleteTodo}>Delete</button>
      <br />
    </div>
  );
}
