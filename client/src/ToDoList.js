
import ToDo from "./ToDo";
import { useStateContext } from "./contexts";

export default function ToDoList() {
  const { state, dispatch } = useStateContext();
  const { todos } = state;

  const handleToggleComplete = (id) => {
    dispatch({
      type: "TOGGLE_TODO",
      id,
    });
  };

  const handleDeleteTodo = (id) => {
    dispatch({
      type: "DELETE_TODO",
      id,
    });
  };

  return (
    <div>
      {todos.map((todo) => (
        <ToDo
          key={todo.id}
          handleToggleComplete={() => handleToggleComplete(todo.id)}
          handleDeleteTodo={() => handleDeleteTodo(todo.id)}
          {...todo}  // Pass all todo properties as props to ToDo component
        />
      ))}
    </div>
  );
}