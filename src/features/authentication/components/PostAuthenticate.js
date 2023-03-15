import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
// import { processHash } from "../services/authService";
import axios from "axios";

export default function PostAuthenticate() {
  const navigate = useNavigate();

  const memoizedValue = useMemo(() => {
    const getToken = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        if (!code) {
          return;
        }
        var options = {
          method: "POST",
          url: "https://dev-v5-wnznu.us.auth0.com/oauth/token",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: new URLSearchParams({
            grant_type: "authorization_code",
            client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
            code_verifier: localStorage.getItem("verifier"),
            code: code,
            redirect_uri: process.env.REACT_APP_AUTH0_REDIRECT_URI,
          }),
        };
        const response = await axios
          .request(options)
          .then(function (response) {
            console.log(response.data);
            navigate("/");
          })
          .catch(function (error) {
            console.error(error);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getToken();
    return true;
  }, [navigate]);

  useEffect(() => {
    console.log(memoizedValue);
  }, [memoizedValue]);

  return (
    <>
      <h1>POST AUTH</h1>
    </>
  );
}
