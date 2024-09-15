import { createRouter, createWebHistory } from 'vue-router'
const NotFoundComponent = () => import('@/views/NotFoundComponent.vue')
const HomePage = () => import('@/views/HomePage.vue')
const EventsList = () => import('@/views/EventsList.vue')
const UserProfile = () => import('@/views/UserProfile.vue')
const LoginPage = () => import('@/views/LoginPage.vue')
const RegisterPage = () => import('@/views/RegisterPage.vue')
const ResetPassword = () => import('@/views/ResetPassword.vue')
const MatchPlayer = () => import('@/views/match/MatchPlayer.vue')
const MatchNPC = () => import('@/views/match/MatchNPC.vue')
const MatchHome = () => import('@/views/match/MatchHome.vue')
const AdminTask = () => import('@/views/admin/AdminTask.vue')
const AdminEvent = () => import('@/views/admin/AdminEvent.vue')
const AdminHome = () => import('@/views/admin/AdminHome.vue')

import { account } from '@/helper'

const routes = [
    { path: '/', component: HomePage, name: 'Home' },
    { path: '/events', component: EventsList, name: 'Events' },
    {
        path: '/login',
        component: LoginPage,
        name: 'Login',
        meta: {
            require: 'guest'
        }
    },
    {
        path: '/register',
        component: RegisterPage,
        name: 'Register',
        meta: {
            require: 'guest'
        }
    },
    {
        path: '/me',
        component: UserProfile,
        meta: {
            require: 'login'
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
router.beforeEach(async (to, _from) => {
    let isLoggedIn = false
    try {
        const currentUser = await account.get()
        if (!currentUser) {
            isLoggedIn = false
        } else {
            isLoggedIn = true
        }
    } catch {
        isLoggedIn = false
    }
    if (to.meta.require == 'login' && !isLoggedIn) {
        // 此路由需要授权，请检查是否已登录
        // 如果没有，则重定向到登录页面
        return {
            name: 'Login'
        }
    }
    if (to.meta.require == 'guest' && isLoggedIn) {
        return { name: 'Home' }
    }
})
export default router
