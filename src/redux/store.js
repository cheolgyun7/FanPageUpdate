import letter from "./reducer";
import auth from "./authSlice";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({ auth, letter });

const store = configureStore({
  reducer: rootReducer,
});

export default store;
