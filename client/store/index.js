import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
// import user from "./user";
import tripReducer from "../store/trips";
import userReducer from "../store/users";

const reducer = combineReducers({
  // user,
  trips: tripReducer,
  user: userReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
// export * from "./user";
