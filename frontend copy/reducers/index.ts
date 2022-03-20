import { combineReducers } from "redux";

import { userInfo, signUpUser, logoutUser } from "./users.reducer";

// const rootReducer = combineReducers({
//     user,
// });

const reducers = {
    userInfo,
    signUpUser,
    logoutUser,
};
export default combineReducers(reducers);

// export default rootReducer;
