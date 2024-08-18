<template>
    <form
        style="width: 300px"
        class="mx-auto text-center mt-3"
        @keyup.enter="handleLogin"
        id="form1"
        novalidate>
        <h4 class="d-inline-block">请登录或</h4>
        <h4 class="d-inline-block">
            <RouterLink to="/register" class="text-primary nav-link">注册</RouterLink>
        </h4>

        <div class="input-group has-validation mt-1 mb-1">
            <span class="input-group-text"
                ><font-awesome-icon icon="fa-solid fa-user" beat-fade
            /></span>
            <div class="form-floating">
                <input
                    type="text"
                    class="form-control"
                    placeholder="彩蛋彩蛋彩蛋"
                    required
                    v-model.trim="usernameToLogin" />
                <label>昵称</label>
            </div>
        </div>

        <div class="input-group has-validation">
            <span class="input-group-text"
                ><font-awesome-icon icon="fa-solid fa-lock" bounce
            /></span>
            <div class="form-floating">
                <input
                    type="password"
                    class="form-control"
                    placeholder="彩蛋彩蛋彩蛋"
                    required
                    v-model.trim="passwordToLogin" />
                <label>密码</label>
            </div>
        </div>
        <div>
            <font-awesome-icon
                role="button"
                icon="fa-solid fa-arrow-right"
                class="mt-1 text-info"
                size="2xl"
                @click.stop.prevent="handleLogin" />
        </div>
        <div>
            <font-awesome-icon
                v-if="loginProcessStatus == 1"
                icon="fa-solid fa-spinner"
                class="mt-1 text-secondary"
                size="2xl"
                spin />
            <font-awesome-icon
                v-else-if="loginProcessStatus == 2"
                class="mt-1 text-success"
                icon="fa-solid fa-check"
                size="2xl" />
            <font-awesome-icon
                v-else-if="loginProcessStatus == 3"
                class="mt-1 text-danger"
                icon="fa-solid fa-xmark"
                size="2xl" />
        </div>

        <button
            type="button"
            class="btn btn-outline-warning mt-3"
            @click="resetShowed = !resetShowed">
            忘记密码?
        </button>
    </form>

    <form
        style="width: 300px"
        class="mx-auto text-center mt-5"
        id="form2"
        novalidate
        v-if="resetShowed">
        <div class="input-group has-validation mt-1 mb-1">
            <span class="input-group-text"
                ><font-awesome-icon icon="fa-solid fa-envelope" flip
            /></span>
            <div class="form-floating">
                <input
                    type="text"
                    class="form-control"
                    id="resetemail"
                    placeholder="彩蛋彩蛋彩蛋"
                    required
                    v-model.trim="emailToBeSent" />
                <label>邮箱</label>
            </div>
        </div>

        <button type="button" class="btn btn-outline-success mt-1" @click="sendEmail">
            发送密码重置邮件
        </button>
    </form>
</template>
<script setup>
import { ref } from 'vue'
import delay from '@/helper'
import { useRouter } from 'vue-router'
const router = useRouter()
import Parse from 'parse/dist/parse.min.js'
Parse.initialize('cityrun')
Parse.serverURL = 'https://parse.hijeremy.cn/parse'

const resetShowed = ref(false)
const emailToBeSent = ref('')
const usernameToLogin = ref('')
const passwordToLogin = ref('')
const loginProcessStatus = ref(0) //0：（默认）不显示 1：请求中 2：成功 3：失败
function handleLogin() {
    const form = document.getElementById('form1')
    // 前端先检查有效性
    form.classList.add('was-validated')
    if (form.checkValidity()) {
        loginProcessStatus.value = 1
        // 请求登录
        Parse.User.logIn(usernameToLogin.value, passwordToLogin.value)
            .then(() => {
                loginProcessStatus.value = 2
                delay(700).then(() => {
                    router.push('/')
                })
            })
            .catch((error) => {
                loginProcessStatus.value = 3
                alert('Error: ' + error.code + ' ' + error.message)
            })
    }
}

function sendEmail() {
    const form = document.getElementById('form2')
    // 前端先检查有效性
    form.classList.add('was-validated')
    if (form.checkValidity()) {
        // 请求发送重置密码邮件
        Parse.User.requestPasswordReset(emailToBeSent.value)
            .then(() => {
                // Password reset request was sent successfully
                alert('Password reset request was sent successfully')
            })
            .catch((error) => {
                // Show the error message somewhere
                alert('Error: ' + error.code + ' ' + error.message)
            })
    }
}
</script>
