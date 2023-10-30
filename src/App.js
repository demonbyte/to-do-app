import { useReducer } from "react";
import CreateToDo from "./CreateToDo";
import UserBar from "./Userbar";
import ToDoList from "./ToDoList";
import { v4 as uuidv4 } from "uuid";
import appReducer from "./reducers";

function App() {

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
    
  ];
 
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: initialTodos,
  });
  //const [user, dispatchUser] = useReducer(userReducer, "");
  //const [todos, dispatchTodo] = useReducer(todoReducer, initialTodos);
  const {user, todos} = state;

  const handleAddTodo = (newTodo) => {
    dispatch({ type: "CREATE_TODO", ...newTodo });
  };

  return (
    <div>
      <UserBar user={user} dispatch={dispatch} />
      <CreateToDo user={user} handleAddTodo={handleAddTodo} />
      <ToDoList todos={todos} dispatch={dispatch} />
    </div>
  );
}

export default App;
