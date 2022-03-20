import { UserConstants } from "../constants";

export function userInfo(state = {}, { type, payload }) {
  console.log("userInfo action type >>>>> ", type);
  console.log("userInfo action payload >>>>> ", payload);
  switch (type) {
    case UserConstants.USER_INFO:
      return {
        user: payload,
      };
    default:
      return state;
  }
}

// export function userInfo(state: {} = null || {}, action) {
//     console.log("userInfo action >>>>> ", action);
//     switch (action.type) {
//         case UserConstants.LOGIN_REQUEST:
//             return {
//                 user: { loading: true },
//             };
//         case UserConstants.LOGIN_SUCCESS: {
//             return {
//                 ...action.user,
//                 loading: false,
//             };
//         }
//         case UserConstants.LOGIN_FAILURE: {
//             return {
//                 loading: false,
//                 error: action.error,
//             };
//         }
//         default:
//             return state;
//     }
// }

export function signUpUser(state = null || {}, action) {
  console.log("signUpUser action >>>>> ", action);
  switch (action.type) {
    case UserConstants.REGISTER_REQUEST:
      return {
        loading: true,
      };
    case UserConstants.REGISTER_SUCCESS: {
      return {
        ...action.user,
        loading: false,
      };
    }
    case UserConstants.REGISTER_FAILURE: {
      return {
        loading: false,
        error: action.error,
      };
    }
    default:
      return state;
  }
}
export function logoutUser(state = null || {}, action) {
  console.log("logoutUser action >>>>> ", action);
  switch (action.type) {
    case UserConstants.LOGOUT_REQUEST:
      return {
        user: { loading: true },
      };
    case UserConstants.LOGOUT_SUCCESS: {
      return {
        ...action.user,
        loading: false,
      };
    }
    case UserConstants.LOGOUT_FAILURE: {
      return {
        loading: false,
        error: action.error,
      };
    }
    default:
      return state;
  }
}
