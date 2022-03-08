import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import Api from "../../../common-components/Api";
// import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/pages/SignUp.module.scss";

function SignUp() {
  //   const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  const [userInfo, setUserInfo] = useState();
  const [passwordState, changeState] = useState(false);

  const onSubmit = (data: any) => {
    setUserInfo(data);
    const body = {
      first_name: data.firstname,
      last_name: data.lastname,
      username: data.username,
      email: data.email,
      password: data.password,
      contact: data.countrycode + data.phone,
    };
    // Api("post", "user", body).then((res) => {
    //   if (res) {
    //     if (res.data["context_code"] == 1000) {
    //       toast.success(res.data["summary"], {
    //         theme: "colored",
    //       });
    //       navigate("/login");
    //     } else if (
    //       res.data["context_code"] == 1100 ||
    //       res.data["context_code"] == 1200
    //     ) {
    //       toast.error(res.data["summary"], {
    //         theme: "colored",
    //       });
    //     }
    //   }
    // });
  };

  const changePasswordState = () => {
    changeState(!passwordState);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles["form-container"]}>
        <h6>Sign up</h6>
        <div className={styles["input-fields"]}>
          <div className={styles["input-fields-container"]}>
            <div className={styles["input-container"]}>
              <label
                htmlFor="firstname"
                className={`${errors?.firstname && styles["invalid"]}`}
              >
                First Name <sup>*</sup>
              </label>
              <input
                type="text"
                id="firstname"
                className={`${errors?.firstname && styles["invalid"]}`}
                {...register("firstname", {
                  required: "First Name Required",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "First Name should contain only alphabets",
                  },
                  maxLength: { value: 150, message: "Max Length 150 Exceeded" },
                })}
              ></input>
            </div>
            {errors?.firstname && (
              <p className={styles["errorLabel"]}>
                {errors?.firstname.message}
              </p>
            )}
          </div>
          <div className={styles["input-fields-container"]}>
            <div className={styles["input-container"]}>
              <label
                htmlFor="lastname"
                className={`${errors?.lastname && styles["invalid"]}`}
              >
                Last Name <sup>*</sup>
              </label>
              <input
                type="text"
                id="lastname"
                className={`${errors?.lastname && styles["invalid"]}`}
                {...register("lastname", {
                  required: "Last Name Required",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Last Name should contain only alphabets",
                  },
                  maxLength: { value: 150, message: "Max Length 150 Exceeded" },
                })}
              ></input>
            </div>
            {errors?.lastname && (
              <p className={styles["errorLabel"]}>{errors?.lastname.message}</p>
            )}
          </div>
          <div className={styles["input-fields-container"]}>
            <div className={styles["input-container"]}>
              <label
                htmlFor="email"
                className={`${errors?.email && styles["invalid"]}`}
              >
                Email ID <sup>*</sup>
              </label>
              <input
                type="email"
                id="email"
                className={`${errors?.email && styles["invalid"]}`}
                {...register("email", {
                  required: "Email Address Required",
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Email must be a valid email address",
                  },
                })}
              ></input>
            </div>
            {errors?.email && (
              <p className={styles["errorLabel"]}>{errors?.email.message}</p>
            )}
          </div>
          <div className={styles["input-fields-container"]}>
            <div className={styles["input-container"]}>
              <label
                htmlFor="phone"
                className={`${styles["phoneLabel"]} ${
                  (errors?.phone || errors.countrycode) && styles["invalid"]
                }`}
              >
                <span>
                  Phone<sup>*</sup>
                </span>
                <span className={styles["plus"]}>+</span>
              </label>
              <input
                type="text"
                id="countrycode"
                className={`${styles["countrycode"]} ${
                  (errors?.countrycode || errors?.phone) && styles["invalid"]
                }`}
                {...register("countrycode", {
                  required: "Enter Valid Number",
                  pattern: {
                    value: /(?=^(\d{2,3})?$)(?!^(.*000).*$)/,
                    message:
                      "Use valid country code and valid 10 digit phone number",
                  },
                })}
              ></input>
              <input
                type="text"
                id="phone"
                className={`${
                  (errors?.phone || errors.countrycode) && styles["invalid"]
                }`}
                {...register("phone", {
                  required: "Enter Valid Number",
                  pattern: {
                    value: /(?=^(\d{10})?$)(?!^(.*0000000000).*$)/,
                    message:
                      "Use valid country code and valid 10 digit phone number",
                  },
                })}
              ></input>
            </div>
            {(errors?.phone || errors.countrycode) && (
              <p className={styles["errorLabel"]}>
                {errors?.phone?.message || errors?.countrycode?.message}
              </p>
            )}
          </div>
          <div className={styles["input-fields-container"]}>
            <div className={styles["input-container"]}>
              <label
                htmlFor="password"
                className={`${errors?.password && styles["invalid"]}`}
              >
                Password <sup>*</sup>
              </label>
              <input
                type={`${!passwordState ? "password" : "text"}`}
                id="password"
                className={`${errors?.password && styles["invalid"]}`}
                {...register("password", {
                  required: "Password is Required",
                  pattern: {
                    value:
                      /^(?=.*?[A-Z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-+()`~=]).{8,}$/,
                    message:
                      "Password should have minimum 8 characters, atleast one alphabet, one number, one capital alphabet and one special character",
                  },
                })}
              ></input>
              <div
                className={styles["passwordState"]}
                onClick={changePasswordState}
              >
                <i className="icon icon-Eye"></i>
              </div>
            </div>
            {errors?.password && (
              <p className={styles["errorLabel"]}>{errors?.password.message}</p>
            )}
          </div>
        </div>
        <button type="submit">SIGN UP</button>
        <div className={styles["signup-required"]}>
          <span className={styles["signup-text"]}>Already Registered?</span>
          {/* <Link to="/login" className={styles["link-style"]}>
            Sign in
          </Link> */}
        </div>
      </div>
    </form>
  );
}

export default SignUp;
