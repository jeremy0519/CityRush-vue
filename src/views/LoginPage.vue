<template>
    <form
        id="form1"
        style="width: 300px"
        class="mx-auto mt-3 text-center"
        novalidate
        @submit.prevent>
        <h4 class="d-inline-block">请登录或</h4>
        <h4 class="d-inline-block">
            <RouterLink to="/register" class="nav-link text-primary">注册</RouterLink>
        </h4>

        <div class="input-group has-validation mb-1 mt-1">
            <span class="input-group-text"
                ><FontAwesomeIcon icon="fa-solid fa-envelope" beat-fade
            /></span>
            <div class="form-floating">
                <input
                    v-model.trim="emailToLogin"
                    type="email"
                    class="form-control"
                    placeholder="彩蛋彩蛋彩蛋"
                    required />
                <label>邮箱</label>
            </div>
        </div>

        <div class="input-group has-validation">
            <span class="input-group-text"><FontAwesomeIcon icon="fa-solid fa-lock" bounce /></span>
            <div class="form-floating">
                <input
                    v-model.trim="passwordToLogin"
                    type="password"
                    class="form-control"
                    placeholder="彩蛋彩蛋彩蛋"
                    required />
                <label>密码</label>
            </div>
        </div>
        <div class="d-flex align-items-center justify-content-center mt-1">
            <FontAwesomeIcon
                role="button"
                icon="fa-solid fa-arrow-right"
                class="text-info"
                size="2xl"
                @click.stop.prevent="handleLogin" />
        </div>

        <button
            type="button"
            class="btn-outline-warning btn mt-3"
            @click="resetShowed = !resetShowed">
            忘记密码?
        </button>
    </form>

    <form
        v-if="resetShowed"
        id="form2"
        style="width: 300px"
        class="mx-auto mt-5 text-center"
        novalidate
        @submit.prevent>
        <div class="input-group has-validation mb-1 mt-1">
            <span class="input-group-text"
                ><FontAwesomeIcon icon="fa-solid fa-envelope" flip
            /></span>
            <div class="form-floating">
                <input
                    id="resetemail"
                    v-model.trim="emailToBeSent"
                    type="email"
                    class="form-control"
                    placeholder="彩蛋彩蛋彩蛋"
                    required />
                <label>邮箱</label>
            </div>
        </div>

        <button type="button" class="btn-outline-success btn mt-1" @click.stop.prevent="sendEmail">
            发送密码重置邮件
        </button>
    </form>
</template>
<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { reset_password_url } from '@/helper'
import { useRouter } from 'vue-router'
import { account } from '@/helper'
import { store } from '@/store/store'
const router = useRouter()
const toast = useToast()

const resetShowed = ref(false)
const emailToBeSent = ref('')
const emailToLogin = ref('')
const passwordToLogin = ref('')

function handleLogin() {
    const form = document.getElementById('form1')
    // 前端先检查有效性
    form.classList.add('was-validated')
    if (form.checkValidity()) {
        // 请求登录
        account
            .createEmailPasswordSession(emailToLogin.value, passwordToLogin.value)
            .then((response) => {
                store.value.local_login(response.userId)
                toast.success('成功登录')
                router.push({ name: 'Home' })
            })
            .catch((error) => {
                toast.error(error.message, { timeout: false })
            })
    }
}

function sendEmail() {
    const form = document.getElementById('form2')
    // 前端先检查有效性
    form.classList.add('was-validated')
    if (form.checkValidity()) {
        // 请求发送重置密码邮件
        account
            .createRecovery(emailToBeSent.value, reset_password_url)
            .then(() => {
                toast.success('成功发送密码重置邮件')
                router.push({ name: 'Home' })
            })
            .catch((error) => {
                toast.error(error.message, { timeout: false })
            })
    }
}
</script>
