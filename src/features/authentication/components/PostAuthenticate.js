import React, { useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import {
  getTokenWithAuthCode,
  setHttpOnlyCookie,
} from "../services/authService";

export default function PostAuthenticate() {
  // const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  useEffect(() => {
    try {
      if (!code) {
        return;
      }
      getTokenWithAuthCode(code)
        .then((response) => {
          console.log(response.data);
          setHttpOnlyCookie(response.data["access_token"]);
        })
        .catch((error) => {
          throw new Error(
            " PostAuthenticate component. getTokenWithAuthCode functionality error"
          );
        });
    } catch (error) {
      throw new Error(
        " PostAuthenticate component. getTokenWithAuthCode functionality error"
      );
    }
  }, [code]);

  return (
    <>
      <h1>POST AUTH</h1>
    </>
  );
}
