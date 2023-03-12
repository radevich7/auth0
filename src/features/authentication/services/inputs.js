export const signInInputs = [
  {
    id: "1s",
    name: "email",
    type: "email",
    placeholder: "Email",
    errorMessage: "It should be a valid email address!",
    label: "Email",
    required: true,
  },
  {
    id: "2s",
    name: "password",
    type: "password",
    placeholder: "Password",
    errorMessage:
      "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
    label: "Password",
    pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    required: true,
  },
];
export const forgotPasswordInputs = [
  {
    id: "1f",
    name: "email",
    type: "email",
    placeholder: "Email",
    errorMessage: "It should be a valid email address!",
    label: "Email",
    required: true,
  },
];

export const registrationInputs = [
  {
    id: "1r",
    name: "firstName",
    type: "text",
    placeholder: "First Name",
    label: "First Name",
    pattern: `^([a-zA-Z]){1,20}$`,
    errorMessage: "Please enter a valid first name",
    required: true,
  },
  {
    id: "2r",
    name: "lastName",
    type: "text",
    placeholder: "Last Name",
    label: "Last Name",
    pattern: `^([a-zA-Z]){1,20}([-'][A-Za-z]{1,20})?$`,
    errorMessage: "Please enter a valid last name",
    required: true,
  },
  {
    id: "3r",
    name: "email",
    type: "email",
    placeholder: "Email",
    errorMessage: "It should be a valid email address!",
    label: "Email",
    required: true,
  },
  {
    id: "4r",
    name: "phone",
    type: "tel",
    placeholder: "Phone",
    errorMessage:
      "Please enter a valid phone number in the format XXX-XXX-XXXX",
    pattern: `^([0-9]{3}[0-9]{3}[0-9]{4})$`,
    label: "Phone",
    required: true,
  },
  {
    id: "5r",
    name: "birthday",
    type: "date",
    placeholder: "Birthday",
    label: "Birthday",
  },
  {
    id: "6r",
    name: "password",
    type: "password",
    placeholder: "Password",
    errorMessage:
      "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
    label: "Password",
    pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    required: true,
  },
  {
    id: "7r",
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password",
    errorMessage: "Passwords don't match!",
    label: "Confirm Password",
    // pattern: values.password,
    required: true,
  },
];
