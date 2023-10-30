// ToDoList.js
import ToDo from "./ToDo";

export default function ToDoList({ todos = [], dispatch }) {
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
          {...todo}
          key={todo.id}
          handleToggleComplete={() => handleToggleComplete(todo.id)}
          handleDeleteTodo={() => handleDeleteTodo(todo.id)}
        />
      ))}
    </div>
  );
}
