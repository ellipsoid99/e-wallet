import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// Register User
export const registerUser = (userData, callback) => (dispatch) => {
    axios
        .post("/api/users/register", userData)
        .then((res) => {
            callback(res.data.accountnumber);
        })
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        );
};

// Login - get user token
export const loginUser = (userData) => (dispatch) => {
    axios
        .post("/api/users/login", userData)
        .then((res) => {
            // Set token to localStorage
            const { token, accountnumber } = res.data;
            localStorage.setItem("jwtToken", token);
            localStorage.setItem("accountnumber", accountnumber);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        );
};

// Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
    };
};

// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING,
    };
};

// Log user out
export const logoutUser = () => (dispatch) => {
    //  Call logout API
    const accNo = localStorage.getItem("accountnumber");
    axios.post("/api/users/logout", accNo).catch((err) =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
        })
    );
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};
