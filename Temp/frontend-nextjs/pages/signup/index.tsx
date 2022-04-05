import Link from "next/link";
import Router, { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WelcomeContainer from "../../components/Welcome";
import { postAPI } from "../../services/APIService";
import SessionService from "../../services/Session";
import { userActions } from "../../actions";
import styles from "../../styles/Auth.module.scss";
type FormInputs = {
  firstname: any;
  lastname: any;
  password: any;
  phone: number;
  countrycode: number;
};
function SignUp() {
  // const navigate = useNavigate();
  const signUpUserInfo = useSelector((state: any = {}) => state.signUpUser);
  console.log("signUpUserInfo in signup", signUpUserInfo);
  // const {
  //     register,
  //     handleSubmit,
  //     setError,
  //     formState: { errors },
  // } = useForm({ mode: "all" });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormInputs>({
    mode: "all",
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const sessionObj: any = SessionService();
  // const [userInfo, setUserInfo] = useState();
  const [passwordState, changeState] = useState(false);

  const onSubmit = (data: any) => {
    // setUserInfo(data);
    const body = {
      first_name: data.firstname,
      last_name: data.lastname,
      password: data.password,
      contact: data.countrycode + data.phone,
    };
    dispatch(userActions.signUpUser("/auth/signup", body, false));
  };

  const changePasswordState = () => {
    changeState(!passwordState);
  };

  useEffect(() => {
    console.log("signUpUserInfo in useEffect", signUpUserInfo);
    // setFormErrors(signUpUserInfo);
    const { error, context_code, data, summary } = signUpUserInfo;
    if (error && Object.keys(error).length > 0) {
      for (const key in error) {
        if (Object.prototype.hasOwnProperty.call(error, key)) {
          const errorMessage = error[key];
          console.log("errorMessage", errorMessage[0]);
          if (key === "contact") {
            setError("phone", {
              type: "onSubmit",
              message: errorMessage[0],
            });
          } else {
            setError("password", {
              type: "onSubmit",
              message: errorMessage[0],
            });
          }
        }
      }
    }
    if (context_code === 1000 && data !== null) {
      toast.success(summary, {
        theme: "colored",
      });
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
  }, [signUpUserInfo, setError, router, dispatch]);

  return (
    <div className="formContent">
      <WelcomeContainer />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formContainer}>
          <h6>Sign up</h6>
          <div className={styles.inputFields}>
            <div className={styles.inputFieldsContainer}>
              <div className={styles.inputContainer}>
                <label
                  htmlFor="firstname"
                  className={`${errors?.firstname && styles.invalid}`}
                >
                  First Name <sup>*</sup>
                </label>
                <input
                  type="text"
                  id="firstname"
                  className={`${errors?.firstname && styles.invalid}`}
                  {...register("firstname", {
                    required: "First Name Required",
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: "First Name should contain only alphabets",
                    },
                    maxLength: {
                      value: 150,
                      message: "Max Length 150 Exceeded",
                    },
                  })}
                ></input>
              </div>
              {errors?.firstname && (
                <p className={styles.errorLabel}>{errors?.firstname.message}</p>
              )}
            </div>
            <div className={styles.inputFieldsContainer}>
              <div className={styles.inputContainer}>
                <label
                  htmlFor="lastname"
                  className={`${errors?.lastname && styles.invalid}`}
                >
                  Last Name <sup>*</sup>
                </label>
                <input
                  type="text"
                  id="lastname"
                  className={`${errors?.lastname && styles.invalid}`}
                  {...register("lastname", {
                    required: "Last Name Required",
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: "Last Name should contain only alphabets",
                    },
                    maxLength: {
                      value: 150,
                      message: "Max Length 150 Exceeded",
                    },
                  })}
                ></input>
              </div>
              {errors?.lastname && (
                <p className={styles.errorLabel}>{errors?.lastname.message}</p>
              )}
            </div>
            <div className={styles.inputFieldsContainer}>
              <div className={styles.inputContainer}>
                <label
                  htmlFor="phone"
                  className={`${styles.phoneLabel} ${
                    (errors?.phone || errors.countrycode) && styles.invalid
                  }`}
                >
                  <span>
                    Phone<sup>*</sup>
                  </span>
                  <span className={styles.plus}>+</span>
                </label>
                <input
                  type="text"
                  id="countrycode"
                  maxLength={3}
                  className={`${styles.countrycode} ${
                    (errors?.countrycode || errors?.phone) && styles.invalid
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
                  maxLength={10}
                  className={`${
                    (errors?.phone || errors.countrycode) && styles.invalid
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
                <p className={styles.errorLabel}>
                  {errors?.phone?.message || errors?.countrycode?.message}
                </p>
              )}
            </div>
            <div className={styles.inputFieldsContainer}>
              <div className={styles.inputContainer}>
                <label
                  htmlFor="password"
                  className={`${errors?.password && styles.invalid}`}
                >
                  Password <sup>*</sup>
                </label>
                <input
                  type={`${!passwordState ? "password" : "text"}`}
                  id="password"
                  className={`${errors?.password && styles.invalid}`}
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
                  className={styles.passwordState}
                  onClick={changePasswordState}
                >
                  <i className="icon icon-Eye"></i>
                </div>
              </div>
              {errors?.password && (
                <p className={styles.errorLabel}>{errors?.password.message}</p>
              )}
            </div>
          </div>
          <button type="submit">SIGN UP</button>
          <div className={styles.signupRequired}>
            <span className={styles.signupText}>Already Registered?</span>
            <Link href="/login">
              <a className={styles.linkStyle}>
                Sign in
                <ToastContainer />
              </a>
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default SignUp;
