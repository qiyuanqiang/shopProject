import { post, get, put, reqDelete } from './service.js'

// 登录
export const loginApi = data => {
    return post({
        url: "/login",
        data
    })
}
// 获取用户
export const userListApi = data => {
    return get({
        url: "/users",
        data
    })
}
// 新增用户
export const userAddApi = data => {
    return post({
        url: "/users",
        data
    })
}
// 修改用户状态
export const userChangeStateApi = data => {
    return put({
        url: `users/${data.id}/state/${data.mg_state}`,
        data
    })
}
// 编辑用户提交
export const userChangeInfoApi = data => {
    return put({
        url: `users/${data.id}`,
        data
    })
}
// 删除用户
export const userDeleteApi = data => {
    return reqDelete({
        url: `users/${data.id}`,
        data
    })
}
// 获取用户
export const getRolesApi = data => {
    return get({
        url: "/roles",
        data
    })
}
// 新增角色
export const rolesAddApi = data => {
    return post({
        url: "/roles",
        data
    })
}
// 编辑角色提交
export const rolesChangeInfoApi = data => {
    return put({
        url: `roles/${data.id}`,
        data
    })
}
// 删除角色
export const rolesDeleteApi = data => {
    return reqDelete({
        url: `roles/${data.id}`,
        data
    })
}
// 获取用户
export const getGoodsApi = data => {
    return get({
        url: "/goods",
        data
    })
}