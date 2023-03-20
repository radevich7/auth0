import { useEffect } from "react";
import { logoutService } from "../features/authentication/services/authService";
import axios from "axios";
export default function Home() {
  const logoutHandler = () => {
    logoutService();
  };

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };
    axios("http://localhost:5251/api/employees", { headers })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  });
  return (
    <>
      <h1>HOME PAGE</h1>
      <button onClick={logoutHandler}>Logout</button>
    </>
  );
}
