<template>
  <div class="common-layout">
    <el-container>
      <!-- 头部导航栏 -->
      <el-header class="common-header flex-flaot">
        <div class="flex">
          <img class="logo" src="../../assets/logo.png" alt="">
          <h1 class="title">商店后台管理系统</h1>
        </div>
        <el-button type="danger" @click="loginOut">退出</el-button>
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <el-aside class="common-aside" width="200px">
          <el-menu
            background-color="none"
            text-color="#FFF"
            :router="true"
          >
            <el-sub-menu index="1">
              <template #title>
                <el-icon><Avatar /></el-icon>
                <span>账号管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/user">账号列表</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon><Box /></el-icon>
                <span>角色管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/roles">角色列表</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <el-icon><location /></el-icon>
                <span>商品管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/goods">商品列表</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main>
          <!-- 内容 -->
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script type="text/javascript">
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: "layout",
  setup() {
    const store = useStore()
    const router = useRouter()
    // 方法
    // 退出登录
    const loginOut = () => {
      localStorage.removeItem('loginData')
      store.commit('userInfoState/setUserInfo', {})
      // 跳转到/login
      router.push({
            path: "/login"
        })
    }
    return {
      loginOut
    }
  },
}
</script>

<style lang="less">
  .el-container{
    height: 100vh;
    overflow: hidden;
  }
  .common-header{
    display: flex;
    background: rgb(37, 42, 49);
  }
  .common-aside{
    background: rgb(48, 55, 65);
  }
  .logo{
    width: 80px;
  }
  .title{
    color: #FFF;
  }
  .el-main{
    background: #efefef;
  }
</style>
