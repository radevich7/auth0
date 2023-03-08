import Login from "./pages/Login";
import Home from "./pages/Home";
import PostAuthenticate from "./features/authentication/components/PostAuthenticate";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/custom.scss";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/PostAuthenticate" element={<PostAuthenticate />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
