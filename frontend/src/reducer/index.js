//

import { combineReducers, createStore } from "redux";

import loginReducer from "../reducer/login/index";
import casesReducer from "../reducer/cases/index";
import donationReducer from "../reducer/donation/index"
import imagesReducer from "../reducer/image/index";
import usersReducer from "../reducer/users/index"
const reducers = combineReducers({ loginReducer, casesReducer,donationReducer,imagesReducer ,usersReducer});

const store = createStore(reducers);

export default store;
