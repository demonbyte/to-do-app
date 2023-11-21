export default function Logout({ user, dispatch }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "LOGOUT" });
      }}
    >
      <input type="submit" value="Logout" />
    </form>
  );
}