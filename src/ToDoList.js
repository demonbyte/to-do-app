import { v4 as uuidv4 } from "uuid";
import ToDo from "./ToDo";

export default function ToDoList({ todos = [], dispatchPost }) {
  const handleToggleComplete = (id) => {
    dispatchPost({
      type: "TOGGLE_COMPLETE",
      id,
    });
  };

  return (
    <div>
      {todos.map((todo) => (
        <ToDo
          {...todo}
          key={todo.id}
          handleToggleComplete={() => handleToggleComplete(todo.id)}
        />
      ))}
    </div>
  );
}
