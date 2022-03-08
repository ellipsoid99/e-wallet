import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import Api from "../../../common-components/Api";
// import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/pages/Login.module.scss";

function LogIn() {
  //   const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });
  const [userInfo, setUserInfo] = useState();

  const onSubmit = (data: any) => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
      return setError("email", {
        type: "onsubmit",
        message: "Email Address must be valid",
      });
    }
    setUserInfo(data);

    // Api("post", "login", data).then((res) => {
    //   if (res) {
    //     if (res["data"]["context_code"] == 1000) {
    //       localStorage.setItem("jwt", res["data"]["data"].access);
    //       localStorage.setItem("email", data.email);
    //       toast.success(res["data"]["summary"], {
    //         theme: "colored",
    //       });
    //       navigate("/landing");
    //     } else if (
    //       res["data"]["context_code"] == 1100 ||
    //       res["data"]["context_code"] == 1200
    //     ) {
    //       toast.error(res["data"]["summary"], {
    //         theme: "colored",
    //       });
    //     }
    //   }
    // });
  };

  const directUserOnForgotPassword = () => {
    //  Funtionality to be implmented
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h6 className={`text-muted ${styles["heading-signin"]}`}>
        Sign in to your account
      </h6>
      <div className={styles["input-fields"]}>
        <div className={styles["input-fields-container"]}>
          <div className={styles["input-container"]}>
            <label
              htmlFor="email"
              className={`${errors?.email && styles["invalid"]}`}
            >
              <sup>*</sup>Email ID
            </label>
            <input
              type="text"
              id="email"
              className={`${errors?.email && styles["invalid"]}`}
              {...register("email", { required: "Email Address Required" })}
            ></input>
          </div>
          {errors?.email && (
            <p className={styles["errorLabel"]}>{errors?.email.message}</p>
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
      <div
        className={styles["forgot-password"]}
        onClick={directUserOnForgotPassword}
      >
        Forgot your password?
      </div>
      <button className={styles["sign-in-button"]} type="submit">
        SIGN IN
      </button>
    </form>
  );
}

export default LogIn;
