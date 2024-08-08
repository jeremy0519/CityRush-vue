<template>
  <form
    style="width: 300px"
    class="mx-auto text-center mt-3"
    @keyup.enter="handleSignUp"
    id="form"
    novalidate
  >
    <h4>欢迎来到FDFZ城定社!!</h4>

    <div class="input-group has-validation mt-1 mb-1">
      <span class="input-group-text"><font-awesome-icon icon="fa-solid fa-user" beat-fade /></span>
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="usrnme"
          placeholder="彩蛋彩蛋彩蛋"
          required
          v-model.trim="username"
        />
        <label for="usrnme">挑个喜欢的昵称吧</label>
      </div>
    </div>

    <div class="input-group has-validation mt-1 mb-1">
      <span class="input-group-text"><font-awesome-icon icon="fa-solid fa-lock" bounce /></span>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="usrpwd"
          placeholder="彩蛋彩蛋彩蛋"
          required
          v-model.trim="password"
        />
        <label for="usrpwd">选个安全的密码哦</label>
      </div>
    </div>

    <div class="input-group has-validation mt-1 mb-1">
      <span class="input-group-text"><font-awesome-icon icon="fa-solid fa-envelope" beat /></span>
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="usremail"
          placeholder="彩蛋彩蛋彩蛋"
          required
          v-model.trim="email"
        />
        <label for="usremail">最好填真实的邮箱</label>
      </div>
    </div>

    <div class="input-group has-validation mt-1 mb-1">
      <span class="input-group-text"><font-awesome-icon icon="fa-brands fa-qq" flip /></span>
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="usrqq"
          placeholder="彩蛋彩蛋彩蛋"
          required
          v-model.trim="qq"
        />
        <label for="usrqq">用QQ，常联系</label>
      </div>
    </div>

    <div>
      <font-awesome-icon
        role="button"
        icon="fa-solid fa-arrow-right"
        class="mt-1 text-info"
        size="2xl"
        @click.stop.prevent="handleSignUp"
      />
    </div>
    <div>
      <font-awesome-icon
        v-if="signupProcessStatus == 1"
        icon="fa-solid fa-spinner"
        class="mt-1 text-secondary"
        size="2xl"
        spin
      />
      <font-awesome-icon
        v-else-if="signupProcessStatus == 2"
        class="mt-1 text-success"
        icon="fa-solid fa-check"
        size="2xl"
      />
      <font-awesome-icon
        v-else-if="signupProcessStatus == 3"
        class="mt-1 text-danger"
        icon="fa-solid fa-xmark"
        size="2xl"
      />
    </div>
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

const username = ref('')
const password = ref('')
const qq = ref('')
const email = ref('')
const signupProcessStatus = ref(0) //0：（默认）不显示 1：请求中 2：成功 3：失败
function handleSignUp() {
  const form = document.getElementById('form')
  // 前端先检查有效性
  form.classList.add('was-validated')
  if (form.checkValidity()) {
    const user = new Parse.User()
    user.set('username', username.value)
    user.set('password', password.value)
    user.set('email', email.value)
    user.set('QQ', qq.value)
    signupProcessStatus.value = 1
    // 请求注册
    user
      .signUp()
      .then(() => {
        signupProcessStatus.value = 2
        delay(700).then(() => {
          router.push('/')
        })
      })
      .catch((error) => {
        signupProcessStatus.value = 3
        alert('Error: ' + error.code + ' ' + error.message)
      })
  }
}
</script>
