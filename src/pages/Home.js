import axios from "axios";
import React, { useEffect } from "react";
import {
  loginService,
  // logoutService,
} from "../features/authentication/services/authService";
import cryptoBrowserify from "crypto-browserify";
export default function Home() {
  const base64URLEncode = (str) => {
    return str
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
  };
  const sha256 = (buffer) => {
    return cryptoBrowserify.createHash("sha256").update(buffer).digest();
  };
  let storedVerifier = window.localStorage.getItem("verifier");
  if (storedVerifier === null) {
    const newVerifier = base64URLEncode(cryptoBrowserify.randomBytes(32));
    window.localStorage.setItem("verifier", newVerifier);
    storedVerifier = newVerifier;
  }
  // const verifier = storedVerifier;
  // const challenge = base64URLEncode(sha256(storedVerifier));

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5251/api/employees?pageSize=1`)
  //     .then((res) => {
  //       console.log(res);
  //       console.log(res.headers["x-pagination"]);
  //     })
  //     .catch((res) => {
  //       console.log(res);
  //     });
  // }, []);
  const authorizeUrl = "https://dev-v5-wnznu.us.auth0.com/authorize";
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_AUTH0_REDIRECT_URI;
  const responseType = "code";
  const codeChallengeMethod = "S256";
  const verifier = storedVerifier;
  const challenge = base64URLEncode(sha256(storedVerifier));

  const pkceParams = {
    code_challenge: verifier,
    code_challenge_method: codeChallengeMethod,
  };

  const authUrl = new URL(authorizeUrl);
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", responseType);
  Object.entries(pkceParams).forEach(([key, value]) => {
    authUrl.searchParams.set(key, value);
  });
  console.log(authUrl.toString());

  const logoutHandler = () => {
    // logoutService();
    // loginService();
  };
  return (
    <>
      <h1>HOME PAGE</h1>
      <a
        href="https://dev-v5-wnznu.us.auth0.com/authorize?
  response_type=code&
  client_id=7jBRzwiy2f0tWFG4Jd6JqKdxSlaPcxSQ&
  code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM&
  code_challenge_method=S256&
  redirect_uri={http://localhost:3000/PostAuthenticate}&
  scope=appointments%20contacts&
  audience=appointments:api&
  state=xyzABC123"
        // onClick={logoutHandler}
      >
        Logout
      </a>
    </>
  );
}
