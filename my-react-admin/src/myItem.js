import React, { Component } from "react";
import { addItemAction } from "./store/actionCreator";
import store from "./store/index";
// import

class List extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    store.subscribe(this.storeChange);
  }

  storeChange = () => {
    this.setState(store.getState());
  };

  clickBtn = () => {
    let action = addItemAction(); // 返回一个对象{type: ADD_ITEM}
    store.dispatch(action); // 通过dispatch()方法将action传递给store
  };

  render() {
    return (
      <div>
        <button onClick={this.clickBtn}>++++++</button>
      </div>
    );
  }
}

export default List;
