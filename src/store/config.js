import { combineReducers, createStore } from "redux";

import { chairReducer } from "./reducers/chairReducer";

//rootReducer: reducer tổng
const rootReducer = combineReducers({
  chairReducer,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
