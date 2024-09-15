<template>
    <form
        id="form"
        style="width: 300px"
        class="mx-auto text-center mt-3"
        novalidate
        @submit.prevent>
        <h4 class="mb-1">欢迎来到FDFZ城定社!!</h4>
        <h5 class="d-inline-block fw-normal">或</h5>
        <h5 class="d-inline-block fw-normal">
            <RouterLink to="/login" class="text-primary nav-link">登录</RouterLink>
        </h5>
        <p class="d-inline-block fw-normal fs-5">?</p>

        <div class="input-group has-validation mt-1 mb-1">
            <span class="input-group-text"
                ><FontAwesomeIcon icon="fa-solid fa-user" beat-fade
            /></span>
            <div class="form-floating">
                <input
                    v-model.trim="username"
                    type="text"
                    class="form-control"
                    placeholder="彩蛋彩蛋彩蛋"
                    required />
                <label>挑个喜欢的昵称吧</label>
            </div>
        </div>

        <div class="input-group has-validation mt-1 mb-1">
            <span class="input-group-text"><FontAwesomeIcon icon="fa-solid fa-lock" bounce /></span>
            <div class="form-floating">
                <input
                    v-model.trim="password"
                    type="password"
                    class="form-control"
                    placeholder="彩蛋彩蛋彩蛋"
                    required />
                <label>选个安全的密码哦</label>
            </div>
        </div>

        <div class="input-group has-validation mt-1 mb-1">
            <span class="input-group-text"
                ><FontAwesomeIcon icon="fa-solid fa-envelope" beat
            /></span>
            <div class="form-floating">
                <input
                    v-model.trim="email"
                    type="text"
                    class="form-control"
                    placeholder="彩蛋彩蛋彩蛋"
                    required />
                <label>邮箱用于重置密码</label>
            </div>
        </div>

        <div class="input-group has-validation mt-1 mb-1">
            <span class="input-group-text"><FontAwesomeIcon icon="fa-brands fa-qq" flip /></span>
            <div class="form-floating">
                <input
                    v-model.trim="qq"
                    type="text"
                    class="form-control"
                    placeholder="彩蛋彩蛋彩蛋"
                    required />
                <label>QQ，乐在沟通</label>
            </div>
        </div>

        <div class="input-group has-validation mt-1 mb-1">
            <span class="input-group-text"
                ><FontAwesomeIcon icon="fa-brands fa-weixin" spin-pulse
            /></span>
            <div class="form-floating">
                <input
                    v-model.trim="wechat"
                    type="text"
                    class="form-control"
                    placeholder="彩蛋彩蛋彩蛋"
                    required />
                <label>微信，是一种生活方式</label>
            </div>
        </div>

        <div class="form-check form-check-inline">
            <input
                v-model="gender"
                class="form-check-input"
                type="radio"
                name="RadioOptions"
                value="male"
                required />
            <label class="form-check-label text-primary"
                >男<FontAwesomeIcon icon="fa-solid fa-mars" class="ps-1"
            /></label>
        </div>
        <div class="form-check form-check-inline">
            <input
                v-model="gender"
                class="form-check-input"
                type="radio"
                name="RadioOptions"
                value="female"
                required />
            <label class="form-check-label text-danger"
                >女<FontAwesomeIcon icon="fa-solid fa-venus" class="ps-1"
            /></label>
        </div>

        <div class="form-check d-flex justify-content-center">
            <input
                id="flexCheck"
                v-model="isFDFZ"
                class="form-check-input me-1"
                type="checkbox"
                value="" />
            <label class="form-check-label" for="flexCheck">是FDFZ在校学生吗?</label>
        </div>
        <div v-if="isFDFZ">
            <div class="input-group has-validation">
                <span class="input-group-text"
                    ><FontAwesomeIcon icon="fa-solid fa-hashtag" spin
                /></span>
                <div class="form-floating">
                    <input
                        v-model.trim="stuNumber"
                        type="number"
                        class="form-control"
                        placeholder="彩蛋彩蛋彩蛋"
                        :required="isFDFZ" />
                    <label>请填写8位学号</label>
                </div>
            </div>
        </div>

        <!--提交按钮-->
        <div class="d-flex align-items-center justify-content-center">
            <FontAwesomeIcon
                role="button"
                icon="fa-solid fa-arrow-right"
                class="text-info"
                size="2xl"
                @click.stop.prevent="handleSignUp" />
            <div v-if="isLoading" class="spinner-border text-success ms-2" role="status"></div>
        </div>
    </form>
</template>
<script setup>
import { ref } from 'vue'
import { ID, Permission, Role } from 'appwrite'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { account, databases, database_id, users_collection_id } from '@/helper'
const router = useRouter()
const toast = useToast()

const username = ref('')
const password = ref('')
const qq = ref('')
const weixin = ref('')
const email = ref('')
const gender = ref('')
const isFDFZ = ref(false)
const stuNumber = ref()

const isLoading = ref(false)

function handleSignUp() {
    const form = document.getElementById('form')
    // 前端先检查有效性
    form.classList.add('was-validated')
    if (form.checkValidity()) {
        isLoading.value = true
        // 注册appwrite
        const tempID = ID.unique()
        account
            .create(tempID, email.value, password.value)
            .then(() => {
                return account.createEmailPasswordSession(email.value, password.value)
            })
            .then(() => {
                return databases.createDocument(
                    database_id,
                    users_collection_id,
                    ID.unique(),
                    {
                        user_id: tempID,
                        username: username.value,
                        QQ: qq.value,
                        weixin: weixin.value,
                        gender: gender.value,
                        isFDFZ: isFDFZ.value,
                        stuNumber: isFDFZ.value ? stuNumber.value : null
                    },
                    [Permission.write(Role.user(tempID))]
                )
            })
            .then(() => {
                toast.success('成功注册')
                router.push({ name: 'Home' })
            })
            .catch((error) => {
                isLoading.value = false
                toast.error(error.message, { timeout: false })
            })
    }
}
</script>
