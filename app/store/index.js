import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import createRootReducer from "../reducers";

export default function (initialState = {}, serviceManager) {
  const middleware = [thunk.withExtraArgument(serviceManager)];

  const middlewareEnhancer = applyMiddleware(...middleware);
  const composedEnhancers = composeWithDevTools(middlewareEnhancer);

  const store = createStore(
    createRootReducer(),
    initialState,
    composedEnhancers
  );

  return store;
}
