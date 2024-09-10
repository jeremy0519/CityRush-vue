<template>
    <form style="width: 300px" class="mx-auto text-center mt-3" id="form1" novalidate>
        <h4 class="d-inline-block">请登录或</h4>
        <h4 class="d-inline-block">
            <RouterLink to="/register" class="text-primary nav-link">注册</RouterLink>
        </h4>

        <div class="input-group has-validation mt-1 mb-1">
            <span class="input-group-text"
                ><font-awesome-icon icon="fa-solid fa-envelope" beat-fade
            /></span>
            <div class="form-floating">
                <input
                    type="email"
                    class="form-control"
                    placeholder="彩蛋彩蛋彩蛋"
                    required
                    v-model.trim="emailToLogin" />
                <label>邮箱</label>
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
        <div class="mt-1 d-flex align-items-center justify-content-center">
            <font-awesome-icon
                role="button"
                icon="fa-solid fa-arrow-right"
                class="text-info"
                size="2xl"
                @click.stop.prevent="handleLogin" />
            <div v-if="isLoading" class="spinner-border text-success ms-2" role="status"></div>
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
                    type="email"
                    class="form-control"
                    id="resetemail"
                    placeholder="彩蛋彩蛋彩蛋"
                    required
                    v-model.trim="emailToBeSent" />
                <label>邮箱</label>
            </div>
        </div>

        <button type="button" class="btn btn-outline-success mt-1" @click.stop.prevent="sendEmail">
            发送密码重置邮件
        </button>
    </form>
</template>
<script setup>
import Swal from 'sweetalert2'
import { ref } from 'vue'
import { Toast, reset_password_url } from '@/helper'
import { useRouter } from 'vue-router'
import { account } from '@/helper'
const router = useRouter()

const resetShowed = ref(false)
const emailToBeSent = ref('')
const emailToLogin = ref('')
const passwordToLogin = ref('')

const isLoading = ref(false)

function handleLogin() {
    const form = document.getElementById('form1')
    // 前端先检查有效性
    form.classList.add('was-validated')
    if (form.checkValidity()) {
        isLoading.value = true
        // 请求登录
        account
            .createEmailPasswordSession(emailToLogin.value, passwordToLogin.value)
            .then((response) => {
                isLoading.value = false
                console.log(response)
                Toast.fire({ icon: 'success', title: '成功登录' })
                router.push({ name: 'Home' })
            })
            .catch((error) => {
                isLoading.value = false
                Swal.fire({
                    icon: 'error',
                    title: '登录失败...',
                    text: error.message
                })
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
            .then((response) => {
                console.log(response)
                Toast.fire({ icon: 'success', title: '成功发送密码重置邮件' })
                router.push({ name: 'Home' })
            })
            .catch((error) => {
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: '发送密码重置邮件失败...',
                    text: error.message
                })
            })
    }
}
</script>
