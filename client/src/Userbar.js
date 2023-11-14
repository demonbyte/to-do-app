
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import { useStateContext } from "./contexts";

export default function UserBar() {
  const { state, dispatch } = useStateContext();
  const { user } = state;

  if (user) {
    return <Logout user={user} dispatch={dispatch} />;
  } else {
    return (
      <>
        <Login dispatch={dispatch} />
        <Register dispatch={dispatch} />
      </>
    );
  }
}