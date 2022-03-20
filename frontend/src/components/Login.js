import React from "react";
import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import Api from "../../../common-components/Api";
// import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/pages/Login.module.scss";

const Login = () => {
  //   const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const signInWithCredentials = async (data) => {
    if (!/^[0-9]*$/.test(data.accountNumber)) {
      return setError("account-number", {
        type: "onSubmit",
        message: "Enter Valid Account Number",
      });
    }
    // const signInSession = await signIn("credentials", {
    //   email: data.email,
    //   password: data.password,
    //   redirect: true,
    //   callbackUrl: `${process.env.NEXT_PUBLIC_CALLBACK_URL}dashboard`,
    // });
    // console.log("signInSession", signInSession);
  };

  // const onSubmit = async (event) => {
  //   event.preventDefault();
  //   // if (
  //   //   !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.value.email)
  //   // ) {
  //   //   return setError("email", {
  //   //     type: "onsubmit",
  //   //     message: "Email Address must be valid",
  //   //   });
  //   // }
  //   console.log(event.target[0].value);
  //   console.log(event.target[1].value);
  //   const res = await fetch("/testAPI", {
  //     method: "GET",
  //   });
  //   // const res = await fetch("/login", {
  //   //   body: JSON.stringify({
  //   //     accountNumber: event.target[0].value,
  //   //     password: event.target[1].value,
  //   //   }),
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //     Accept: "application/json",
  //   //   },
  //   //   method: "POST",
  //   // });
  //   setUserInfo(res);
  // };

  const directUserOnForgotPassword = () => {
    //  Funtionality to be implmented
  };

  return (
    // <form onSubmit={onSubmit}>
    <form onSubmit={handleSubmit(signInWithCredentials)}>
      <h6 className={`${styles["heading-signin"]}`}>Sign in to your account</h6>
      <div className={styles["input-fields"]}>
        <div className={styles["input-fields-container"]}>
          <div className={styles["input-container"]}>
            <label
              htmlFor="accountNumber"
              className={`${errors?.accountNumber && styles["invalid"]}`}
            >
              <sup>*</sup>Account Number
            </label>
            <input
              type="number"
              id="accountNumber"
              className={`${errors?.accountNumber && styles["invalid"]}`}
              {...register("accountNumber", {
                required: "Account Number is Required",
              })}
            ></input>
          </div>
          {errors?.accountNumber && (
            <p className={styles["errorLabel"]}>
              {errors?.accountNumber.message}
            </p>
          )}
        </div>
        <div className={styles["input-fields-container"]}>
          <div className={styles["input-container"]}>
            <label
              htmlFor="password"
              className={`${errors?.password && styles["invalid"]}`}
            >
              <sup>*</sup> Password
            </label>
            <input
              type="password"
              id="password"
              className={`${errors?.password && styles["invalid"]}`}
              {...register("password", { required: "Password is Required" })}
            ></input>
          </div>
          {errors?.password && (
            <p className={styles["errorLabel"]}>{errors?.password.message}</p>
          )}
        </div>
      </div>
      <button className={styles["sign-in-button"]} type="submit">
        SIGN IN
      </button>
    </form>
  );
};

export default Login;
