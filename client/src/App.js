import { useEffect, useReducer } from "react";
import CreateToDo from "./CreateToDo";
import { StateContext } from "./contexts";
import ToDoList from "./ToDoList";
import UserBar from "./Userbar";
import appReducer from "./reducers";
import { useResource } from "react-request-hook";

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: [],
  });

  const { user, todos } = state;

  useEffect(() => {
    if (user) {
      document.title = `${user.username}'s Todos`;
    } else {
      document.title = "Todos";
    }
  }, [user]);

  const [todoResponse, getTodos] = useResource(() => ({
    url: "/post",
    method: "get",
    headers: { Authorization: `${state?.user?.access_token}` },
  }));

  useEffect(() => {
    if (state?.user?.access_token) {
      getTodos();
    }
  }, [state?.user?.access_token, getTodos]);
  useEffect(() => {
    if (todoResponse && todoResponse.isLoading === false && todoResponse.data) {
      dispatch({
        type: "SET_TODOS",
        todos: todoResponse.data.reverse(),
      });
    }
  }, [todoResponse]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <div>
        <UserBar />
        <CreateToDo />
        {/* Display todos if the user is logged in */}
        {user && (
          <div>
            <h2>{`${user}'s Todos`}</h2>
            <ToDoList todos={todos} />

            
          </div>
        )}
      </div>
    </StateContext.Provider>
  );
}

export default App;
