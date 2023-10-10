import { useState, useReducer } from "react";
import CreateToDo from "./CreateToDo";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import UserBar from "./Userbar";
import ToDoList from "./ToDoList";
import { v4 as uuidv4 } from "uuid";

function App() {
  function userReducer(state, action) {
    switch (action.type) {
      case "LOGIN":
      case "REGISTER":
        return action.username;
      case "LOGOUT":
        return "";
      default:
        return state;
    }
  }

  const [user, dispatchUser] = useReducer(userReducer, "");

  function postReducer(state, action) {
    switch (action.type) {
      case "CREATE_POST":
        const newPost = {
          id: uuidv4(),
          title: action.title,
          description: action.description,
          author: action.author,
          dateCreated: Date.now(),
          complete: false,
          dateCompleted: null,
        };
        return [newPost, ...state];
      case "TOGGLE_COMPLETE":
        return state.map((todo) =>
          todo.id === action.id
            ? {
                ...todo,
                complete: !todo.complete,
                dateCompleted: todo.complete ? null : Date.now(),
              }
            : todo
        );
      default:
        return state;
    }
  }

  const initialPosts = [
    {
      id: uuidv4(),
      title: "React Hooks",
      description: "Complete Chapter One",
      author: "Daniel Bugl",
      dateCreated: Date.now(),
      complete: false,
      dateCompleted: null,
    },
    {
      id: uuidv4(),
      title: "Learn JavaScript",
      description: "Work on basic JavaScript concepts",
      author: "Alice",
      dateCreated: Date.now(),
      complete: false,
      dateCompleted: null,
    },
    {
      id: uuidv4(),
      title: "Build a Project",
      description: "Create a small project using React",
      author: "Bob",
      dateCreated: Date.now(),
      complete: false,
      dateCompleted: null,
    },
    {
      id: uuidv4(),
      title: "CSS Styling",
      description: "Apply styles to React components",
      author: "Eve",
      dateCreated: Date.now(),
      complete: false,
      dateCompleted: null,
    },
    {
      id: uuidv4(),
      title: "Redux Integration",
      description: "Integrate Redux into React application",
      author: "John Doe",
      dateCreated: Date.now(),
      complete: false,
      dateCompleted: null,
    },



    // Add more initial Todo items as needed
  ];

  const [todos, dispatchPost] = useReducer(postReducer, initialPosts);

  const handleAddPost = (newPost) => {
    dispatchPost({ type: "CREATE_POST", ...newPost });
  };

  return (
    <div>
      <UserBar user={user} dispatchUser={dispatchUser} />
      <CreateToDo user={user} handleAddPost={handleAddPost} />
      <ToDoList todos={todos} dispatchPost={dispatchPost} />
    </div>
  );
}

export default App;
