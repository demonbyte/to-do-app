import { v4 as uuidv4 } from "uuid";

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        username: action.username,
        access_token: action.access_token,
      };
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
      return [...state, newTodo];
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
    case "SET_TODOS":
      return action.todos;
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
}
export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    todos: todoReducer(state.todos, action),
  };
}
