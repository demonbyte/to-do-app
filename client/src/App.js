import { useEffect, useReducer } from "react";

import CreateToDo from "./CreateToDo";
import { StateContext } from "./contexts";
import ToDoList from "./ToDoList";
import UserBar from "./Userbar";
import appReducer from "./reducers";
import { useResource } from "react-request-hook";

function App() {
  // Use the useResource hook to fetch todos
  const [todoData, getTodos] = useResource(() => ({
    url: "/todolist",
    method: "get",
  }));

  useEffect(getTodos, [getTodos]);

  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: [], // Initialize with an empty array since todos will be fetched dynamically
  });

  useEffect(() => {
    // Check if todoData.data exists and is an array
    if (Array.isArray(todoData.data)) {
      // Dispatch action to set todos in the state
      dispatch({ type: "SET_TODOS", todos: todoData.data });
    }
  }, [todoData]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <div>
        <UserBar />
        <CreateToDo />
        <ToDoList />
      </div>
    </StateContext.Provider>
  );
}

export default App;