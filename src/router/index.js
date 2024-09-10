import { createRouter, createWebHistory } from 'vue-router'
const NotFoundComponent = () => import('@/views/NotFoundComponent.vue')
const HomePage = () => import('@/views/HomePage.vue')
const EventsList = () => import('@/views/EventsList.vue')
const UserProfile = () => import('@/views/UserProfile.vue')
const LoginPage = () => import('@/views/LoginPage.vue')
const RegisterPage = () => import('@/views/RegisterPage.vue')
const ResetPassword = () => import('@/views/ResetPassword.vue')

import { account } from '@/helper'

const routes = [
    { path: '/', component: HomePage, name: 'Home' },
    { path: '/events', component: EventsList, name: 'Events' },
    {
        path: '/login',
        component: LoginPage,
        name: 'Login',
        beforeEnter: async () => {
            // 登录页跳转前逻辑 //
            try {
                const currentUser = await account.get()
                // 如果已经登录，则跳转到首页
                if (currentUser) {
                    return { name: 'Home' }
                }
            } catch (e) {
                return true
            }
        }
    },
    {
        path: '/register',
        component: RegisterPage,
        name: 'Register',
        beforeEnter: async () => {
            // 注册页跳转前逻辑 //
            try {
                const currentUser = await account.get()
                // 如果已经登录，则跳转到首页
                if (currentUser) {
                    return { name: 'Home' }
                }
            } catch (e) {
                return true
            }
        }
    },
    {
        path: '/me',
        component: UserProfile,
        beforeEnter: async (_to, _from) => {
            try {
                // 个人主页跳转前逻辑 //
                const currentUser = await account.get()
                // 如果没有登录，则跳转到登录页
                if (!currentUser) {
                    return { name: 'Login' }
                }
            } catch (e) {
                return { name: 'Login' }
            }
        },
        name: 'Profile'
    },
    {
        path: '/resetpassword',
        component: ResetPassword,
        beforeEnter: async (to) => {
            if (!to.query.userId || !to.query.secret) {
                return { name: 'Home' }
            }
        },
        name: 'ResetPassword'
    },
    { path: '/:pathMatch(.*)', component: NotFoundComponent }
]
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router
