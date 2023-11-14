import React, { useContext, useState } from "react";
import { StateContext } from "./contexts";
import { useResource } from "react-request-hook";

const CreateToDo = () => {
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;
  const [, createToDo] = useResource(({ title, description, author, dateCreated, completed, dateCompleted }) => ({
    url: '/todolist',
    method: 'post',
    data: { title, description, author, dateCreated, completed, dateCompleted }
  }));

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);

  function handleTitle(evt) { setTitle(evt.target.value); }
  function handleDescription(evt) { setDescription(evt.target.value); }

  function handleCreate() {
    const date = new Date();
    const formattedDate = date.toISOString(); // Format date to ISO format
    const newTodo = {
      title,
      description,
      author: user,
      dateCreated: formattedDate,
      completed: false,
      dateCompleted: ''
    };
    createToDo(newTodo, ({ data, error }) => {
      if (error) {
        console.error('Error adding post:', error);
      } else {
        setSuccessMessage('Post Added Successfully');
        setTimeout(() => setSuccessMessage(null), 3000); // Clear message after 3 seconds
      }
    });
    dispatch({ type: 'CREATE_TODO', title, description, author: user });
  }

 return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCreate();
      }}
    >
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
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
};

export default CreateToDo;

