import { createStore } from "redux";
import rootReducers from "../reducers/reducers.js";


const store = createStore(rootReducers);

export default store;