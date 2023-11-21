import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "./contexts";
import { useResource } from "react-request-hook";

export default function ToDo({
  _id,
  title,
  description,
  author,
  dateCreated,
  complete,
  dateCompleted,
  handleDeleteTodo,
  refreshList,
}) {
  const { state, dispatch } = useContext(StateContext);
  const [, deleteTodo] = useResource(({ _id }) => ({
    url: `/post/${_id}`,
    method: "delete",
    headers: { Authorization: `${state.user.access_token}` },
  }));

  const [, toggleTodo] = useResource(({ _id, complete }) => ({
    url: `/post/${_id}`,
    method: "patch",
    data: { complete },
    headers: { Authorization: `${state?.user?.access_token}` },
  }));

  const handleToggleComplete = async () => {
    try {
      const currentDate = new Date().toISOString();
      // Toggle the complete property
      await toggleTodo({
        _id,
        complete: !complete,
        dateCompleted: !complete ? currentDate : null,
      });
      setTimeout(() => {
        refreshList();
      }, [800]);
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  useEffect(() => {
    // Check if the deleteTodo hook has completed and handleDeleteTodo function is provided
    if (deleteTodo && deleteTodo.isLoading === false && deleteTodo.data) {
      // Call the handleDeleteTodo function provided by the parent component
      handleDeleteTodo();
    }
  }, [deleteTodo, handleDeleteTodo]);

  const handleDeleteTodoLocal = () => {
    deleteTodo({ _id });
    setTimeout(() => {
      refreshList();
    }, [400]);
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
          onChange={handleToggleComplete}
        />
      </div>
      {complete && (
        <div>Date Completed: {new Date(dateCompleted).toLocaleString()}</div>
      )}
      <button onClick={handleDeleteTodoLocal}>Delete</button>
      <br />
    </div>
  );
}
