import { Signup } from "./Signup";
import { Login } from "./Login";
import { LogoutLink } from "./LogoutLink";

export function Content() {
  return (
    <div>
      <h1>Movie App</h1>
      <Login />
      <LogoutLink />
      <Signup />
    </div>
  );
}
