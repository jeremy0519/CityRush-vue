import { ref } from 'vue'
import { account } from '@/helper'
import { useToast } from 'vue-toastification'
const toast = useToast()

//目前想法是缓存isLoggedIn和userId
export const store = ref({
    /** @type {?boolean}*/
    isLoggedIn: null,

    /** @type {?string}*/
    userId: null,

    /**
     * 用户登录
     * @param {string} id - userid.
     */
    local_login(id) {
        this.isLoggedIn = true
        this.userId = id
    },

    /**用户登出*/
    local_logout() {
        this.isLoggedIn = null
        this.userId = null
    },

    /**获取用户信息*/
    async fetchUser() {
        console.log('should appear once')
        await account
            .get()
            .then((response) => {
                this.userId = response.$id
                this.isLoggedIn = true
            })
            .catch((error) => {
                if (error.type != 'general_unauthorized_scope') {
                    toast.error('无法确定登录状态')
                }
            })
    }
})
