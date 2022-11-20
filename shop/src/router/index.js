import { createRouter, createWebHashHistory } from 'vue-router'
import LayOut from '../views/LayOut/LayOut.vue'
import store from '../store/index'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Pages/login.vue')
  },
  {
    path: '/',
    name: 'layOut',
    component: LayOut,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('../views/Pages/index.vue')
      },
      {
        path: '/roles',
        name: 'roles',
        component: () => import('../views/Pages/rolesList.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/Pages/usersList.vue')
      },
      {
        path: '/goods',
        name: 'goods',
        component: () => import('../views/Pages/goodsList.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach((to, form, next) => {
  /*
  *to:从哪个页面
  *from:到哪个页面
  *next:只有执行next()页面才会跳转
  */
  //  判断是否登录
  const userInfoState = store.state.userInfoState.userInfo
  
  if(!userInfoState.username) {
    // 未登录，跳转到login
    if(to.path === '/login'){
      next()
      return
    }
    next('/login')
  }else {
    next()
  }
})

export default router
