
export default function Logout({ user, dispatch }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "LOGOUT" });
        localStorage.clear();
      }}
    >
      <input type="submit" value="Logout" />
    </form>
  );
}