
import ToDo from "./ToDo";
import { useStateContext } from "./contexts";

export default function ToDoList({ refreshList }) {
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
      {}

      {todos.length === 0 && <h2>No posts found.</h2>}
      {todos.length > 0 &&
        todos.map((p, i) => (
          <ToDo {...p} key={p._id || p.id} refreshList={refreshList} />
        ))}
    </div>
  );
}