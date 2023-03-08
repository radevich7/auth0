import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { processHash } from "../services/authService";

export default function PostAuthenticate() {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(window.location.hash);
    if (/access_token|id_token|error/.test(window.location.hash)) {
      processHash(window.location.hash);
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <h1>POST AUTH</h1>
    </>
  );
}
