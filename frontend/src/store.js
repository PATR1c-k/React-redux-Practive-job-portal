import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";

import { authReducer } from "./reducers/authReducer";
import {
  jobCreateReducer,
  jobListReducer,
  jobDeleteReducer,
} from "./reducers/jobReducer";

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  jobCreate: jobCreateReducer,
  jobList: jobListReducer,
  jobDelete: jobDeleteReducer,
});

// Get user info from localStorage (for persisting login)
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// Initial state to load into store
const initialState = {
  auth: { userInfo: userInfoFromStorage },
};

// Middleware
const middleware = [thunk];

// Redux DevTools support
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create store
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
