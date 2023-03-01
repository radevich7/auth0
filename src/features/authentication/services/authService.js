import auth0 from "auth0-js";
const webAuth = new auth0.WebAuth({
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
  scope: process.env.REACT_APP_AUTH0_SCOPE,
});
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
  webAuth.login(
    {
      username: values.email,
      password: values.password,
      realm: process.env.REACT_APP_AUTH0_REALM,
      redirectUri: process.env.REACT_APP_AUTH0_REDIRECT_URI,
      responseType: process.env.REACT_APP_AUTH0_LOGIN_RESPONSE_TYPE,
    },
    function (err) {
      setloginStatus({
        isError: true,
        message: err.description,
      });
    }
  );
};
