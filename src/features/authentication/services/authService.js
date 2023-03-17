import auth0 from "auth0-js";
import cryptoBrowserify from "crypto-browserify";
import Cookies from "universal-cookie";
import axios from "axios";

const webAuth = new auth0.WebAuth({
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
  scope: process.env.REACT_APP_AUTH0_SCOPE,
  redirect_uri: process.env.REACT_APP_AUTH0_REDIRECT_URI,
  responseType: process.env.REACT_APP_AUTH0_LOGIN_RESPONSE_TYPE,
});

export const setHttpOnlyCookie = (accessToken) => {
  const cookies = new Cookies();
  cookies.set("access_token", accessToken, {
    path: "/",
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  console.log("local storage added");
  localStorage.setItem("access_token", accessToken);
};

export const getTokenWithAuthCode = async (authCode) => {
  var options = {
    method: "POST",
    url: "https://dev-v5-wnznu.us.auth0.com/oauth/token",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
      code_verifier: localStorage.getItem("verifier"),
      code: authCode,
      redirect_uri: process.env.REACT_APP_AUTH0_REDIRECT_URI,
    }),
  };
  return await axios.request(options);
};

export const changePasswordService = (
  enteredEmail,
  setPasswordResetStatus,
  setEmail
) => {
  webAuth.changePassword(
    {
      connection: "Username-Password-Authentication",
      email: enteredEmail,
    },
    function (err, resp) {
      if (err) {
        setPasswordResetStatus({
          isSuccess: false,
          isError: true,
          message: err,
        });
        setEmail("");
      } else {
        setPasswordResetStatus({
          isSuccess: true,
          isError: false,
          message: resp,
        });
        setEmail("");
      }
    }
  );
};

export const logoutService = () => {
  webAuth.logout({
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    returnTo: process.env.REACT_APP_AUTH0_REDIRECT_LOGOUT_URI,
  });
  localStorage.removeItem("access_token");
  localStorage.removeItem("id_token");
};

export const signUpService = (values, setSignUpStatus) => {
  const { firstName, lastName, email, phone, password, birthDate } = values;
  webAuth.signup(
    {
      email,
      password,
      user_metadata: {
        name: `${firstName} ${lastName}`,
        phone,
        birthDate,
      },
      connection: process.env.REACT_APP_AUTH0_REALM,
    },
    function (err, result) {
      if (err) {
        setSignUpStatus({
          isError: true,
          message: `${err.description}. Please contact administrator.`,
        });
        return;
      }
      console.log("User signed up successfully!");
      console.log(result);
    }
  );
};

export const processHash = (hashToken) => {
  webAuth.parseHash({ hash: hashToken }, function (err, authResult) {
    console.log("parseHash");
    if (err) {
      console.log(err);
    } else {
      console.log(authResult);
      setHttpOnlyCookie(authResult);
      return;
    }
  });
};

export const loginServiceWithoutPKCE = (values, setloginStatus) => {
  // auth.parseHash((err, authResult) => {
  //   if (authResult && authResult.code) {
  //     console.log(authResult);
  //   } else if (err) {
  //     console.error(err);
  //   }
  // });
  // webAuth.login(
  //   {
  //     username: values.email,
  //     password: values.password,
  //     realm: process.env.REACT_APP_AUTH0_REALM,
  //     redirect_uri: process.env.REACT_APP_AUTH0_REDIRECT_URI,
  //     responseType: process.env.REACT_APP_AUTH0_LOGIN_RESPONSE_TYPE,
  //   },
  //   function (err) {
  //     setloginStatus({
  //       isError: true,
  //       message: err.description,
  //     });
  //   }
  // );
};
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

export const getAuthCodeHref = () => {
  let verifier = window.localStorage.getItem("verifier");
  if (verifier === null) {
    const newVerifier = base64URLEncode(cryptoBrowserify.randomBytes(32));

    window.localStorage.setItem("verifier", newVerifier);
    verifier = newVerifier;
  }

  const hrefParameters = {
    authorizeUrl: "https://dev-v5-wnznu.us.auth0.com/authorize",
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
    redirectUri: process.env.REACT_APP_AUTH0_REDIRECT_URI,
    responseType: "code",
    codeChallengeMethod: "S256",
  };

  const challenge = base64URLEncode(sha256(verifier));

  const pkceParams = {
    code_challenge: challenge,
    code_challenge_method: hrefParameters.codeChallengeMethod,
  };

  const authUrl = new URL(hrefParameters.authorizeUrl);
  authUrl.searchParams.set("client_id", hrefParameters.clientId);
  authUrl.searchParams.set("redirect_uri", hrefParameters.redirectUri);
  authUrl.searchParams.set("response_type", hrefParameters.responseType);
  authUrl.searchParams.set("scope", "openid email profile");
  authUrl.searchParams.set("state", "xyzABC123");

  Object.entries(pkceParams).forEach(([key, value]) => {
    authUrl.searchParams.set(key, value);
  });
  return authUrl;
};
