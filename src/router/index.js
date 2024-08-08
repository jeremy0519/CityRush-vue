import { createRouter, createWebHistory } from 'vue-router'
import Parse from 'parse/dist/parse.min.js'
Parse.initialize('cityrun')
Parse.serverURL = 'https://parse.hijeremy.cn/parse'

const NotFoundComponent = () => import('@/views/NotFoundComponent.vue')
const HomePage = () => import('@/views/HomePage.vue')
const EventsList = () => import('@/views/EventsList.vue')
const UserProfile = () => import('@/views/UserProfile.vue')
const LoginPage = () => import('@/views/LoginPage.vue')
const RegisterPage = () => import('@/views/RegisterPage.vue')

const routes = [
  { path: '/', component: HomePage, name: 'Home' },
  { path: '/events', component: EventsList, name: 'Events' },
  {
    path: '/login',
    component: LoginPage,
    name: 'Login',
    beforeEnter: (_to, _from) => {
      // 登录页跳转前逻辑 //
      const currentUser = Parse.User.current()
      // 如果已经登录，则跳转到首页
      if (currentUser) {
        return { name: 'Home' }
      }
    }
  },
  {
    path: '/register',
    component: RegisterPage,
    name: 'Register',
    beforeEnter: (_to, _from) => {
      // 注册页跳转前逻辑 //
      const currentUser = Parse.User.current()
      // 如果已经登录，则跳转到首页
      if (currentUser) {
        return { name: 'Home' }
      }
    }
  },
  {
    path: '/me',
    component: UserProfile,
    beforeEnter: (_to, _from) => {
      // 个人主页跳转前逻辑 //
      const currentUser = Parse.User.current()
      // 如果没有登录，则跳转到登录页
      if (!currentUser) {
        return { name: 'Login' }
      }
    }
  },
  { path: '/:pathMatch(.*)', component: NotFoundComponent }
]
const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
