import axios from "axios"
// 引入Loading 加载
import { ElLoading } from 'element-plus'
// 引入Message 消息提示
import { ElMessage } from 'element-plus'
// 引入store
import store from '../store'
// Loading 加载
let loadingObj = null
// 使用create创建axios实例
// console.log('token', store.state.userInfoState.userInfo.token)
const Service = axios.create({
    timeout: 8000,
    baseURL: "http://127.0.0.1:8888/api/private/v1/",
    headers: {
        "Content-type": "application/josn;charset=utf-8",
        "Authorization": store.state.userInfoState.userInfo.token
    }
})
// 请求拦截-增加loading，对请求做统一处理
Service.interceptors.request.use(config => {
    config.headers['Authorization'] = store.state.userInfoState.userInfo.token
    // 开启Loading 加载
    loadingObj = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    return config
})
// 响应拦截-对返回值做统一处理
Service.interceptors.response.use(response => {
    // 关闭Loading 加载
    loadingObj.close()
    // 判断请求出错
    if(response.data.meta.status != 200 && response.data.meta.status != 201) {
        ElMessage.error(response.data.meta.msg || "服务器出错")
        return response.data
    }
    return response.data
}, error => {
    console.log(error)
    // 关闭Loading 加载
    loadingObj.close()
    // Message 消息提示
    ElMessage({
        message: "服务器错误",
        type: "error",
        duration: 2000
    })
})
// post请求
export const post = config => {
    return Service({
        ...config,
        method: "post",
        params: config.data
    })
}
// get请求
export const get = config => {
    return Service({
        ...config,
        method: "get",
        params: config.data
    })
}
// put请求
export const put = config => {
    return Service({
        ...config,
        method: "put",
        params: config.data
    })
}
// delete请求
export const reqDelete = config => {
    return Service({
        ...config,
        method: "delete",
        params: config.data
    })
}