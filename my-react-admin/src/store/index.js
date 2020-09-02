import { createStore, applyMiddleware } from "redux"; // 引入createStore方法
import thunk from "redux-thunk";
import reducer from "./reducer"; // 引入reducer
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(
  // 创建数据存储的仓库
  reducer,
  enhancer
);
export default store;
