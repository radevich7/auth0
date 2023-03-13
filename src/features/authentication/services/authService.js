import auth0 from "auth0-js";
import crypto from "crypto-browserify";
const webAuth = new auth0.WebAuth({
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
  scope: process.env.REACT_APP_AUTH0_SCOPE,
  redirect_uri: process.env.REACT_APP_AUTH0_REDIRECT_URI,
  responseType: process.env.REACT_APP_AUTH0_LOGIN_RESPONSE_TYPE,
});

const auth = new auth0.WebAuth({
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
  redirectUri: process.env.REACT_APP_AUTH0_REDIRECT_URI,
  responseType: "code",
  scope: "openid profile email",
});


// const codeVerifier = crypto
//   .randomBytes(32)
//   .toString("base64")
//   .replace(/=/g, "")
//   .replace(/\+/g, "-")
//   .replace(/\//g, "_");

// const codeChallenge = crypto
//   .createHash("sha256")
//   .update(codeVerifier)
//   .digest("base64")
//   .replace(/=/g, "")
//   .replace(/\+/g, "-")
//   .replace(/\//g, "_");

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

export const loginService = (values, setloginStatus) => {
  console.log("codeChallenge");
  auth.authorize({
    code_challenge: "codeChallenge",
    code_challenge_method: "S256",
  });
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

const setHttpOnlyCookie = (authResult) => {
  // const expiresAt = JSON.stringify(
  //   authResult.expiresIn * 1000 + new Date().getTime()
  // );
  // console.log("cookie added");
  // document.cookie = `access_token=${authResult.accessToken}; HttpOnly`;
  // document.cookie = `id_token=${authResult.idToken}; HttpOnly`;
  console.log("local storage added");
  localStorage.setItem("access_token", authResult.accessToken);
  localStorage.setItem("id_token", authResult.idToken);
};
