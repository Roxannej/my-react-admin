import React, { Component } from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// 导入自己创建的页面组件
import Home from "../pages/Home/index";
// https://segmentfault.com/q/1010000012366028

class MyRoute extends Component {
  render() {
    return (
      <Router>
        <Route path="/home" component={Home}></Route>
      </Router>
    );
  }
}

export default MyRoute;
