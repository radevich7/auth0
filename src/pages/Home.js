import { logoutService } from "../features/authentication/services/authService";
export default function Home() {
  const logoutHandler = () => {
    logoutService();
  };
  return (
    <>
      <h1>HOME PAGE</h1>
      <button onClick={logoutHandler}>Logout</button>
    </>
  );
}
