import { UserConstants } from "../constants";
import { getAPI, postAPI } from "../services/APIService";
import Router from "next/router";
export const userActions = {
  signUpUser,
  // userInfo,
  logoutUser,
};

const SUCCESS_CODE = 1000;
const ERROR_CODE = 1100;
const TOKEN_NOT_VALID = "token_not_valid";

function signUpUser(endpoint, data, tokenRequired) {
  return (dispatch) => {
    dispatch(request(data.username));
    if (
      data &&
      data.first_name &&
      data.last_name &&
      data.password &&
      data.contact
    ) {
      const signUpAPI = endpoint;
      postAPI(signUpAPI, "", data).then(
        (user) => {
          if (user?.data?.context_code === SUCCESS_CODE) {
            console.log("user", user);
          }
          return dispatch(success(user?.data));
        },
        (error) => {
          if (
            error &&
            error?.response?.data?.context_code === ERROR_CODE &&
            error?.response?.data?.data &&
            Router.asPath === "/signup"
          ) {
            return dispatch(failure(error?.response?.data?.data));
          }
        },
      );
    }
  };
  function request(user) {
    return {
      type: UserConstants.REGISTER_REQUEST,
      user,
    };
  }
  function success(user) {
    return {
      type: UserConstants.REGISTER_SUCCESS,
      user,
    };
  }
  function failure(error) {
    return {
      type: UserConstants.REGISTER_FAILURE,
      error,
    };
  }
}

export const setUser = (payload) => ({
  type: UserConstants.USER_INFO,
  payload,
});

export const getUser = (sessionObj) => (dispatch, getState) => {
  const state = getState();
  if (state) {
    console.log("state in users action", state);
    // return;
  }
  const userInfoAPI = `/user/${sessionObj?.user?.accountNumber}`;
  //   const accessToken = sessionObj?.accessToken;
  getAPI(userInfoAPI).then(
    (user) => {
      // return dispatch(success(user?.data?.data));
      dispatch(setUser(user?.data?.data));
    },
    (error) => {
      if (error && error?.response?.data?.code === TOKEN_NOT_VALID) {
        if (Router.asPath === "/signup") {
          return;
        } else {
          return Router.push("/login");
        }
      }
      return Router.push("/login");
    },
  );
  //   getAPI(userInfoAPI, accessToken).then(
  //     (user) => {
  //       // return dispatch(success(user?.data?.data));
  //       dispatch(setUser(user?.data?.data));
  //     },
  //     (error) => {
  //       if (error && error?.response?.data?.code === TOKEN_NOT_VALID) {
  //         if (Router.asPath === "/signup") {
  //           return;
  //         } else {
  //           return Router.push("/login");
  //         }
  //       }
  //       return Router.push("/login");
  //     },
  //   );
};

// function userInfo(sessionObj) {
//     return (dispatch, getState) => {
//         const state = getState();
//         if (state) {
//             console.log("state in users action", state);
//             // return;
//         }
//         if (
//             sessionObj.sessionStatus === "authenticated" &&
//             sessionObj?.user?.email &&
//             sessionObj?.accessToken
//         ) {
//             dispatch(request(sessionObj?.user?.email));
//             const userInfoAPI = `/user/${sessionObj?.user?.email}`;
//             const accessToken = sessionObj?.accessToken;
//             getAPI(userInfoAPI, accessToken).then(
//                 (user) => {
//                     return dispatch(success(user?.data?.data));
//                 },
//                 (error) => {
//                     if (
//                         error &&
//                         error?.response?.data?.code === TOKEN_NOT_VALID
//                     ) {
//                         if (Router.asPath === "/signup") {
//                             return;
//                         } else {
//                             return Router.push("/login");
//                         }
//                     }
//                     dispatch(failure(error));
//                     return Router.push("/login");
//                 }
//             );
//         }
//     };
//     function request(user) {
//         return {
//             type: UserConstants.LOGIN_REQUEST,
//             user,
//         };
//     }
//     function success(user) {
//         return {
//             type: UserConstants.LOGIN_SUCCESS,
//             user,
//         };
//     }
//     function failure(error) {
//         return {
//             type: UserConstants.LOGIN_FAILURE,
//             error,
//         };
//     }
// }

function logoutUser(sessionObj) {
  return (dispatch) => {
    if (
      sessionObj.sessionStatus === "authenticated" &&
      sessionObj?.user?.accountNumber &&
      sessionObj?.accessToken
    ) {
      dispatch(request(sessionObj?.user?.accountNumber));
      const userInfoAPI = `/logout`;
      const accessToken = sessionObj?.accessToken;
      getAPI(userInfoAPI, accessToken).then(
        (response) => {
          if (
            response?.data?.context_code === SUCCESS_CODE &&
            response?.data?.data === null
          ) {
            return dispatch(success(response?.data?.summary));
          }
        },
        (error) => {
          if (
            error &&
            error?.response?.data?.code === TOKEN_NOT_VALID &&
            Router.asPath !== "/login"
          ) {
            Router.push("/login");
          }
          dispatch(failure(error));
        },
      );
    }
  };
  function request(user) {
    return {
      type: UserConstants.LOGOUT_REQUEST,
      user,
    };
  }
  function success(user) {
    return {
      type: UserConstants.LOGOUT_SUCCESS,
      user,
    };
  }
  function failure(error) {
    return {
      type: UserConstants.LOGOUT_FAILURE,
      error,
    };
  }
}
