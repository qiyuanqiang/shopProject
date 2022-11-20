<template>
    <div class="login_wrap">
        <div class="form_wrap">
            <el-form
                ref="formRef"
                :model="loginData"
                label-width="100px"
                class="demo-dynamic"
            >
                <el-form-item
                prop="username"
                label="用户名"
                :rules="[
                    {
                    required: true,
                    message: '此项为必填项',
                    trigger: 'blur',
                    },
                ]"
                >
                    <el-input v-model="loginData.username" />
                </el-form-item>
                <el-form-item
                prop="password"
                label="密码"
                :rules="[
                    {
                    required: true,
                    message: '此项为必填项',
                    trigger: 'blur',
                    },
                ]"
                >
                    <el-input type="password" v-model="loginData.password" />
                </el-form-item>
            </el-form>
            <el-button type="primary" class="login_btn" @click="handleLogin">登录</el-button>
        </div>
    </div>
</template>

<script type="text/javascript">
import { reactive, toRefs } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { loginApi } from '../../util/request'

export default {
  name: "login",
  setup() {
    const store = useStore()
    const router = useRouter()
    // 数据
    const data = reactive({
        loginData: {
            username: '',
            password: ''
        }
    })
    // 方法
    // 登录
    const handleLogin = () => {
        loginApi(data.loginData).then(res => {
            if(res.data) {
                store.commit('userInfoState/setUserInfo', res.data)
                localStorage.setItem('loginData', JSON.stringify(res.data))
                // 跳转到/user
                router.push({
                    path: "/"
                })
            }
        })
    }
    return {
        ...toRefs(data),
        handleLogin,
        store,
        router
    }
  }
}
</script>

<style lang="less" scoped>
    .login_wrap{
        position: relative;
        width: 100%;
        height: 100vh;
        background: rgb(56, 86, 139);
    }
    .form_wrap{
        position: fixed;
        top: 50%;
        left: 50%;
        padding: 30px 50px;
        border-radius: 5px;
        transform: translate(-50%, -50%);
        background: #fff;
    }
    .login_btn{
        display: block;
        margin: 10px auto;
    }
</style>
