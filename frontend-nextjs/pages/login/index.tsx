import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import SessionService from "../../services/Session";
// import { userActions } from "@/actions";
import WelcomeContainer from "../../components/Welcome";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../styles/Auth.module.scss";
import Link from "next/link";
type FormInputs = {
  email: string;
  password: string;
};
const Login = () => {
  const router = useRouter();
  const sessionObj: any = SessionService();
  const dispatch = useDispatch();
  // const userInfo = useSelector((state: any = {}) => state.users.items);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormInputs>({
    mode: "onSubmit",
  });

  const directUserOnForgotPassword = () => {
    toast.info("Please Contact Your Administrator!", {
      theme: "colored",
    });
  };
  const signInWithCredentials = async (data: any) => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
      return setError("email", {
        type: "onSubmit",
        message: "Email Address must be valid",
      });
    }
    const signInSession = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: `${process.env.NEXT_PUBLIC_CALLBACK_URL}dashboard`,
    });
    console.log("signInSession", signInSession);
  };

  useEffect(() => {
    if (router.query && router.query.error && router.query.error.length > 0) {
      const error: string = router.query.error?.toString();
      if (error.includes("Password is incorrect")) {
        router.push("/login");
        return setError("password", {
          type: "onsubmit",
          message: error,
        });
      } else {
        router.push("/login");
        return setError("email", {
          type: "onsubmit",
          message: error,
        });
      }
    }
  }, [router, setError]);
  // useEffect(() => {
  //     if (
  //         sessionObj.sessionStatus === "authenticated" &&
  //         sessionObj?.user?.email &&
  //         sessionObj?.accessToken &&
  //         !userInfo
  //     ) {
  //         dispatch(userActions.userInfo(sessionObj));
  //     }
  //     if (
  //         sessionObj &&
  //         sessionObj.sessionStatus === "authenticated" &&
  //         userInfo
  //     ) {
  //         router.push("/user-management");
  //     }
  // }, [sessionObj, dispatch, userInfo, router]);

  return (
    <div className="formContent">
      <WelcomeContainer />
      <Form onSubmit={handleSubmit(signInWithCredentials)}>
        <div className={styles.message}></div>
        <div className={styles.formContainer}>
          <h6>Sign in to your account</h6>
          <div className={styles.inputFields}>
            <div className={styles.inputFieldsContainer}>
              <div className={styles.inputContainer}>
                <Label
                  htmlFor="email"
                  className={`${errors?.email && styles.invalid}`}
                >
                  Email ID <sup>*</sup>
                </Label>
                <input
                  type="text"
                  id="email"
                  className={`${errors?.email && styles.invalid}`}
                  {...register("email", {
                    required: "Email Address Required",
                  })}
                />
              </div>
              {errors?.email && (
                <p className={styles.errorLabel}>{errors?.email.message}</p>
              )}
            </div>
            <div className={styles.inputFieldsContainer}>
              <div className={styles.inputContainer}>
                <Label
                  htmlFor="password"
                  className={`${errors?.password && styles.invalid}`}
                >
                  Password <sup>*</sup>
                </Label>
                <input
                  type="password"
                  id="password"
                  className={`${errors?.password && styles.invalid}`}
                  {...register("password", {
                    required: "Password is Required",
                  })}
                />
              </div>
              {errors?.password && (
                <p className={styles.errorLabel}>{errors?.password.message}</p>
              )}
            </div>
          </div>
          <div
            className={styles.forgotPassword}
            onClick={directUserOnForgotPassword}
          >
            Forgot your password?
            <ToastContainer />
          </div>
          <button type="submit">SIGN IN</button>
          <div className={styles.signupRequired}>
            <span className={styles.signupText}>Not registered yet?</span>
            <Link href="/signup">
              <a className={styles.linkStyle}>Sign up</a>
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Login;
