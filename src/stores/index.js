import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import reducers from "./reducres";

const middleware = [thunk, createLogger()];
const store = createStore(reducers, applyMiddleware(...middleware));

if (module.hot) {
  module.hot.accept("./reducres.js", () => {
    console.log("reducer changed");
    store.replaceReducer(require("./reducres").default);
  });
}

export default store;
