import React, { useContext, useEffect, useState } from "react";

import { StateContext } from "./contexts";
import { useResource } from "react-request-hook";

const CreateToDo = ({ refreshList }) => {
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;
  const [todo, createToDo] = useResource(
    ({
      title,
      description,
      author,
      dateCreated,
      completed,
      dateCompleted,
    }) => ({
      url: "/post",
      method: "post",
      headers: { Authorization: `${state.user.access_token}` },
      data: {
        title,
        description,
        author,
        dateCreated,
        completed,
        dateCompleted,
      },
    })
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);

  function handleTitle(evt) {
    setTitle(evt.target.value);
  }
  function handleDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleCreate() {
    const newTodo = { title, description, author: user.username };
    createToDo(newTodo, ({ data, error }) => {
      if (error) {
        console.error("Error adding post:", error);
      } else {
        setSuccessMessage("Post Added Successfully");
        setTimeout(() => setSuccessMessage(null), 3000); // Clear message after 3 seconds
      }
    });
    setTitle("");
    setDescription("");
    setTimeout(() => {
      refreshList();
    }, [400]);
  }

  useEffect(() => {
    if ((todo.isLoading = false && todo.data)) {
      dispatch({
        type: "CREATE_TODO",
        title: todo.data.title,
        description: todo.data.description,
        author: user.username,
      });
    }
  }, [todo, dispatch]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCreate();
      }}
    >
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
      <div>
        Author: <b>{user.username}</b>
      </div>
      <div>
        <label htmlFor="create-title">Title:</label>
        <input
          type="text"
          value={title}
          onChange={handleTitle}
          name="create-title"
          id="create-title"
          required
        />
      </div>
      <div>
        <label htmlFor="create-description">Description:</label>
        <textarea
          value={description}
          onChange={handleDescription}
          name="create-description"
          id="create-description"
        />
      </div>
      <input type="submit" value="Create" />
    </form>
  );
};

export default CreateToDo;