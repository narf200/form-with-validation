import React, { useContext, useEffect, useReducer, useState } from "react";
import AuthContext from "../../store/authContext";

import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";
import classes from "./Login.module.css";

const checkEmailValidity = (email) => {
  return email.includes("@");
};
const checkPasswordValidity = (password) => {
  return password.trim().length > 5;
};

const emailReduser = (state, action) => {
  switch (action.type) {
    case "EMAIL_INPUT":
      return {
        value: action.payload,
        isValid: checkEmailValidity(action.payload),
      };
    case "EMAIL_BLUR":
      return { value: state.value, isValid: checkEmailValidity(state.value) };

    default:
      return { value: "", isValid: false };
  }
};

const passwordReduser = (state, action) => {
  switch (action.type) {
    case "PASSWORD_INPUT":
      return {
        value: action.payload,
        isValid: checkPasswordValidity(action.payload),
      };
    case "PASSWORD_BLUR":
      return {
        value: state.value,
        isValid: checkPasswordValidity(state.value),
      };

    default:
      return { value: "", isValid: false };
  }
};

const Login = () => {
  const { onLogin } = useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReduser, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReduser, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    setFormIsValid(
      checkEmailValidity(emailState.value) &&
        checkPasswordValidity(passwordState.value)
    );
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "EMAIL_INPUT", payload: event.target.value });
  };
  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "PASSWORD_INPUT", payload: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "EMAIL_BLUR" });
  };
  const validatePasswordHandler = () => {
    dispatchPassword({ type: "PASSWORD_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          labelName={"E-Mail"}
          type={"email"}
          id={"email"}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          labelName={"Password"}
          type={"password"}
          id={"password"}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
