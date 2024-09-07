<template>
    <form
        style="width: 300px"
        class="mx-auto text-center mt-3"
        @keyup.enter="handleSignUp"
        id="form"
        novalidate>
        <h4 class="mb-1">欢迎来到FDFZ城定社!!</h4>
        <p class="d-inline-block fw-normal fs-5">或</p>
        <p class="d-inline-block fw-normal fs-5">
            <RouterLink to="/login" class="text-primary nav-link">登录</RouterLink>
        </p>
        <p class="d-inline-block fw-normal fs-5">?</p>

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
                    v-model.trim="username" />
                <label>挑个喜欢的昵称吧</label>
            </div>
        </div>

        <div class="input-group has-validation mt-1 mb-1">
            <span class="input-group-text"
                ><font-awesome-icon icon="fa-solid fa-lock" bounce
            /></span>
            <div class="form-floating">
                <input
                    type="password"
                    class="form-control"
                    placeholder="彩蛋彩蛋彩蛋"
                    required
                    v-model.trim="password" />
                <label>选个安全的密码哦</label>
            </div>
        </div>

        <div class="input-group has-validation mt-1 mb-1">
            <span class="input-group-text"
                ><font-awesome-icon icon="fa-solid fa-envelope" beat
            /></span>
            <div class="form-floating">
                <input
                    type="text"
                    class="form-control"
                    placeholder="彩蛋彩蛋彩蛋"
                    required
                    v-model.trim="email" />
                <label>邮箱用于重置密码</label>
            </div>
        </div>

        <div class="input-group has-validation mt-1 mb-1">
            <span class="input-group-text"><font-awesome-icon icon="fa-brands fa-qq" flip /></span>
            <div class="form-floating">
                <input
                    type="text"
                    class="form-control"
                    placeholder="彩蛋彩蛋彩蛋"
                    required
                    v-model.trim="qq" />
                <label>QQ，乐在沟通</label>
            </div>
        </div>
        <!--endQQ-->

        <!--start性别-->
        <div class="form-check form-check-inline">
            <input
                class="form-check-input"
                type="radio"
                name="RadioOptions"
                value="male"
                required
                v-model="sex" />
            <label class="form-check-label text-primary"
                >男<font-awesome-icon icon="fa-solid fa-mars" class="ps-1"
            /></label>
        </div>
        <div class="form-check form-check-inline">
            <input
                class="form-check-input"
                type="radio"
                name="RadioOptions"
                value="female"
                v-model="sex"
                required />
            <label class="form-check-label text-danger"
                >女<font-awesome-icon icon="fa-solid fa-venus" class="ps-1"
            /></label>
        </div>
        <!--end性别-->

        <!--start是否本校及学号-->
        <div class="form-check d-flex justify-content-center">
            <input
                class="form-check-input me-1"
                type="checkbox"
                value=""
                id="flexCheck"
                v-model="isFDFZ" />
            <label class="form-check-label" for="flexCheck">是FDFZ在校学生吗?</label>
        </div>
        <div v-if="isFDFZ">
            <div class="input-group has-validation">
                <span class="input-group-text"
                    ><font-awesome-icon icon="fa-solid fa-hashtag" spin
                /></span>
                <div class="form-floating">
                    <input
                        type="number"
                        class="form-control"
                        placeholder="彩蛋彩蛋彩蛋"
                        :required="isFDFZ"
                        v-model.trim="stuNumber" />
                    <label>请填写8位学号</label>
                </div>
            </div>
        </div>

        <!--end是否本校及学号-->

        <!--提交按钮-->
        <div>
            <font-awesome-icon
                role="button"
                icon="fa-solid fa-arrow-right"
                class="mt-1 text-info"
                size="2xl"
                @click.stop.prevent="handleSignUp" />
        </div>
        <div>
            <font-awesome-icon
                v-if="signupProcessStatus == 1"
                icon="fa-solid fa-spinner"
                class="mt-1 text-secondary"
                size="2xl"
                spin />
            <font-awesome-icon
                v-else-if="signupProcessStatus == 2"
                class="mt-1 text-success"
                icon="fa-solid fa-check"
                size="2xl" />
            <font-awesome-icon
                v-else-if="signupProcessStatus == 3"
                class="mt-1 text-danger"
                icon="fa-solid fa-xmark"
                size="2xl" />
        </div>
    </form>
</template>
<script setup>
import { ref } from 'vue'
import delay from '@/helper'
import { useRouter } from 'vue-router'
const router = useRouter()

const username = ref('')
const password = ref('')
const qq = ref('')
const email = ref('')
const signupProcessStatus = ref(0) //0：（默认）不显示 1：请求中 2：成功 3：失败
const sex = ref('')
const isFDFZ = ref()
const stuNumber = ref()
function handleSignUp() {
    const form = document.getElementById('form')
    // 前端先检查有效性
    form.classList.add('was-validated')
    if (form.checkValidity()) {
        signupProcessStatus.value = 1
        // 注册parse
        const user = new Parse.User()
        user.set('username', username.value)
        user.set('password', password.value)
        user.set('email', email.value)
        user.set('QQ', qq.value)
        user.set('totalEventEnrolledTimes', 0)
        user.set('bestRank', 0)
        user.set('intro', 'TA很懒，没有填写个人简介')
        user.set('sex', sex.value)
        user.set('isFDFZ', isFDFZ.value)
        user.set(
            'avatarUrl',
            'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDggNTEyIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIDYuNi4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjQgRm9udGljb25zLCBJbmMuLS0+PHBhdGggZmlsbD0iI2M0YzZkMSIgZD0iTTIyNCAxNmMtNi43IDAtMTAuOC0yLjgtMTUuNS02LjFDMjAxLjkgNS40IDE5NCAwIDE3NiAwYy0zMC41IDAtNTIgNDMuNy02NiA4OS40QzYyLjcgOTguMSAzMiAxMTIuMiAzMiAxMjhjMCAxNC4zIDI1IDI3LjEgNjQuNiAzNS45Yy0uNCA0LS42IDgtLjYgMTIuMWMwIDE3IDMuMyAzMy4yIDkuMyA0OGwtNTkuOSAwQzM4IDIyNCAzMiAyMzAgMzIgMjM3LjRjMCAxLjcgLjMgMy40IDEgNWwzOC44IDk2LjlDMjguMiAzNzEuOCAwIDQyMy44IDAgNDgyLjNDMCA0OTguNyAxMy4zIDUxMiAyOS43IDUxMmwzODguNiAwYzE2LjQgMCAyOS43LTEzLjMgMjkuNy0yOS43YzAtNTguNS0yOC4yLTExMC40LTcxLjctMTQzTDQxNSAyNDIuNGMuNi0xLjYgMS0zLjMgMS01YzAtNy40LTYtMTMuNC0xMy40LTEzLjRsLTU5LjkgMGM2LTE0LjggOS4zLTMxIDkuMy00OGMwLTQuMS0uMi04LjEtLjYtMTIuMUMzOTEgMTU1LjEgNDE2IDE0Mi4zIDQxNiAxMjhjMC0xNS44LTMwLjctMjkuOS03OC0zOC42QzMyNCA0My43IDMwMi41IDAgMjcyIDBjLTE4IDAtMjUuOSA1LjQtMzIuNSA5LjljLTQuOCAzLjMtOC44IDYuMS0xNS41IDYuMXptNTYgMjA4bC0xMi40IDBjLTE2LjUgMC0zMS4xLTEwLjYtMzYuMy0yNi4yYy0yLjMtNy0xMi4yLTctMTQuNSAwYy01LjIgMTUuNi0xOS45IDI2LjItMzYuMyAyNi4yTDE2OCAyMjRjLTIyLjEgMC00MC0xNy45LTQwLTQwbDAtMTQuNGMyOC4yIDQuMSA2MSA2LjQgOTYgNi40czY3LjgtMi4zIDk2LTYuNGwwIDE0LjRjMCAyMi4xLTE3LjkgNDAtNDAgNDB6bS04OCA5NmwxNiAzMkwxNzYgNDgwIDEyOCAyODhsNjQgMzJ6bTEyOC0zMkwyNzIgNDgwIDI0MCAzNTJsMTYtMzIgNjQtMzJ6Ii8+PC9zdmc+'
        )
        user.set('stuNumber', isFDFZ.value ? stuNumber.value : undefined)
        // 请求注册
        return (
            user
                .signUp()
                //})
                .then(() => {
                    signupProcessStatus.value = 2
                    delay(600).then(() => {
                        router.push('/')
                    })
                })
                .catch((error) => {
                    signupProcessStatus.value = 3
                    if (error.message) {
                        alert(error.message)
                    } else {
                        console.log(error)
                        alert('遇到未知错误:(')
                    }
                })
        )
    }
}
</script>
