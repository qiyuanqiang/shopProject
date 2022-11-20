import { createStore } from 'vuex'
// 用户列表
import userInfoState from './state/userinfo.state.js'
// 角色列表
import rolesState from './state/roles.state.js'

export default createStore({
  // 全局的状态初始值
  state: {
  },
  // 计算state，获取对应的值
  getters: {
  },
  // 更新状态的方法-更新state的唯一方法，commit mutations
  mutations: {
  },
  // 可以异步操作，可以返回promise，更改数据还是传递到mutations去更改
  actions: {
  },
  // 数据比较多，分模块
  modules: {
    // 用户列表
    userInfoState,
    // 角色列表
    rolesState
  }
})
