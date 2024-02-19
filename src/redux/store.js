import { createStore } from "redux";
import letterReducer from "./reducer";

const store = createStore(letterReducer);

export default store;
