<template>
  <form
    style="width: 300px"
    class="mx-auto text-center mt-3"
    @keyup.enter="handleLogin"
    @submit.prevent="handleLogin"
    needs-validation
  >
    <h4 class="d-inline-block">请登录或</h4>
    <h4 class="d-inline-block">
      <RouterLink to="/register" class="text-primary nav-link">注册</RouterLink>
    </h4>

    <div class="input-group has-validation mt-1">
      <span class="input-group-text"><font-awesome-icon icon="fa-solid fa-user" beat-fade /></span>
      <div class="form-floating">
        <input type="text" class="form-control" id="usrnme" placeholder="用户名" required />
        <label for="usrnme">挑个好昵称吧！</label>
      </div>
      <div class="invalid-feedback">请输入昵称</div>
    </div>

    <div class="input-group has-validation">
      <span class="input-group-text"><font-awesome-icon icon="fa-solid fa-lock" bounce /></span>
      <div class="form-floating">
        <input type="text" class="form-control" id="usrpwd" placeholder="密码" required />
        <label for="usrpwd">输入安全的密码哦！</label>
      </div>
      <div class="invalid-feedback">请输入密码</div>
    </div>

    <div class="input-group has-validation">
      <span class="input-group-text"><font-awesome-icon icon="fa-brands fa-qq" shake /></span>
      <div class="form-floating">
        <input type="text" class="form-control" id="usrpwd" placeholder="密码" required />
        <label for="usrpwd">用QQ，常联系</label>
      </div>
      <div class="invalid-feedback">请输入QQ号</div>
    </div>

    <font-awesome-icon
      icon="fa-solid fa-arrow-right"
      class="mt-1"
      size="2xl"
      style="color: #74c0fc"
      @click.stop.prevent="handleLogin"
    />
  </form>
</template>
<script setup>
import Parse from 'parse/dist/parse.min.js'
Parse.initialize('cityrun')
Parse.serverURL = 'https://parse.hijeremy.cn/parse'

function handleLogin() {
  alert('hello')
}
</script>
