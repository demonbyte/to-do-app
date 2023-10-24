import { useState, useReducer } from "react";
import CreateToDo from "./CreateToDo";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import UserBar from "./Userbar";
import ToDoList from "./ToDoList";
import { v4 as uuidv4 } from "uuid";

function App() {
  // User Reducer
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

  // Todo Reducer
  function todoReducer(state, action) {
    switch (action.type) {
      case "CREATE_TODO":
        const newTodo = {
          id: uuidv4(),
          title: action.title,
          description: action.description,
          author: action.author,
          dateCreated: Date.now(),
          complete: false,
          dateCompleted: null,
        };
        return [newTodo, ...state];
      case "TOGGLE_TODO":
        return state.map((todo) =>
          todo.id === action.id
            ? {
                ...todo,
                complete: !todo.complete,
                dateCompleted: todo.complete ? null : Date.now(),
              }
            : todo
        );
      case "DELETE_TODO":
        return state.filter((todo) => todo.id !== action.id);
      default:
        return state;
    }
  }

  const [user, dispatchUser] = useReducer(userReducer, "");

  const initialTodos = [
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
    // Add more initial todos as needed
  ];
  const [todos, dispatchTodo] = useReducer(todoReducer, initialTodos);

  const handleAddTodo = (newTodo) => {
    dispatchTodo({ type: "CREATE_TODO", ...newTodo });
  };

  return (
    <div>
      <UserBar user={user} dispatchUser={dispatchUser} />
      {user && <CreateToDo user={user} handleAddTodo={handleAddTodo} />}
      <ToDoList todos={todos} dispatchTodo={dispatchTodo} />
    </div>
  );
}

export default App;
