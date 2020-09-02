//  store只是一个库，它没有管理能力, 它会把接收到的action自动转发给reducer
/**
 * reducer暴露出去的就是一个方法函数，有两个参数：state 和 action
 * state: 是整个项目需要管理的数据信息
 */

/**
 * 一定要注意：reducer里只能接收state，不能改变state
 * 不要认为把业务逻辑写在了reducer中，那改变state值的一定是reducer
 * 其实不然，reducer只是返回了更改的数据，操作的是newState，
 * 但是并没有更改store中的state数据，
 * store拿到了reducer的数据，自己对自己进行了更新
 */

import { ADD_ITEM } from "./actionType";
import { combineReducers } from "redux";
import { user } from "./redux/user.redux";
import { user } from "";
const defaultState = {
  inputValue: "Write Something",
  list: [], // 默认数据
};

export default (state = defaultState, action) => {
  if (action.type === ADD_ITEM) {
    let newState = JSON.parse(JSON.stringify(state)); // 深拷贝
    newState.list.push(newState.inputValue); // push新的内容到列表中去
    newState.inputValue = "";
    return newState;
  }
  return state;
};

export default combineReducers({ user });
