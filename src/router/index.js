import { createRouter, createWebHistory } from 'vue-router'
import Parse from 'parse/dist/parse.min.js'
Parse.initialize('cityrun')
Parse.serverURL = 'https://parse.hijeremy.cn/parse'

const NotFoundComponent = () => import('@/views/NotFoundComponent.vue')
const HomePage = () => import('@/views/HomePage.vue')
const EventsList = () => import('@/views/EventsList.vue')
const UserProfile = () => import('@/views/UserProfile.vue')
const LoginPage = () => import('@/views/LoginPage.vue')

const routes = [
  { path: '/', component: HomePage, name: 'Home' },
  { path: '/events', component: EventsList, name: 'Events' },
  { path: '/login', component: LoginPage, name: 'Login' },
  {
    path: '/me',
    component: UserProfile,
    beforeEnter: (to, _from) => {
      // 个人主页跳转前逻辑 //
      const currentUser = Parse.User.current()
      // 如果没有登录，则跳转到登录页
      if (!currentUser && to.name !== 'Login') {
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
