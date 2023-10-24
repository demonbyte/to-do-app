import { useState } from "react";

export default function CreateToDo({ user, handleAddTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleTitle(evt) {
    setTitle(evt.target.value);
  }

  function handleDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleCreate() {
    const newTodo = { title, description, author: user };
    handleAddTodo(newTodo);
    setTitle("");
    setDescription("");
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCreate();
      }}
    >
      <div>
        Author: <b>{user}</b>
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
}
