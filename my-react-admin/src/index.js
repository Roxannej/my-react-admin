import React from "react";
import ReactDOM from "react-dom";
import MyRoute from "./routers/index";
import "amfe-flexible";
import { ConfigProvider } from "antd";
import "./App.less";
// import "antd/dist/antd.less";
// import { ConfigProvider } from "antd";
// import "./styles/main.less";
// import './index.css';
// import App from "./App.js";
// import * as serviceWorker from './serviceWorker';
const App = () => (
  <ConfigProvider>
    <MyRoute />
  </ConfigProvider>
);
ReactDOM.render(<App className="app" />, document.getElementById("app"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// 目前没有使用PWA，所以先不使用它
// serviceWorker.unregister();
