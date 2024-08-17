<template>
  <!--编辑信息的modal-->
  <div class="modal fade" id="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modalodalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">...</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>

  <!--个人信息展示卡-->
  <div class="p-4 mx-auto border border-0" style="width: 350px">
    <div class="image d-flex flex-column justify-content-center align-items-center">
      <!--头像-->
      <img
        class="rounded-pill img-fluid border-4 border-success border-opacity-50 border"
        height="100"
        width="100"
        src="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDggNTEyIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIDYuNi4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjQgRm9udGljb25zLCBJbmMuLS0+PHBhdGggZmlsbD0iI2M0YzZkMSIgZD0iTTIyNCAxNmMtNi43IDAtMTAuOC0yLjgtMTUuNS02LjFDMjAxLjkgNS40IDE5NCAwIDE3NiAwYy0zMC41IDAtNTIgNDMuNy02NiA4OS40QzYyLjcgOTguMSAzMiAxMTIuMiAzMiAxMjhjMCAxNC4zIDI1IDI3LjEgNjQuNiAzNS45Yy0uNCA0LS42IDgtLjYgMTIuMWMwIDE3IDMuMyAzMy4yIDkuMyA0OGwtNTkuOSAwQzM4IDIyNCAzMiAyMzAgMzIgMjM3LjRjMCAxLjcgLjMgMy40IDEgNWwzOC44IDk2LjlDMjguMiAzNzEuOCAwIDQyMy44IDAgNDgyLjNDMCA0OTguNyAxMy4zIDUxMiAyOS43IDUxMmwzODguNiAwYzE2LjQgMCAyOS43LTEzLjMgMjkuNy0yOS43YzAtNTguNS0yOC4yLTExMC40LTcxLjctMTQzTDQxNSAyNDIuNGMuNi0xLjYgMS0zLjMgMS01YzAtNy40LTYtMTMuNC0xMy40LTEzLjRsLTU5LjkgMGM2LTE0LjggOS4zLTMxIDkuMy00OGMwLTQuMS0uMi04LjEtLjYtMTIuMUMzOTEgMTU1LjEgNDE2IDE0Mi4zIDQxNiAxMjhjMC0xNS44LTMwLjctMjkuOS03OC0zOC42QzMyNCA0My43IDMwMi41IDAgMjcyIDBjLTE4IDAtMjUuOSA1LjQtMzIuNSA5LjljLTQuOCAzLjMtOC44IDYuMS0xNS41IDYuMXptNTYgMjA4bC0xMi40IDBjLTE2LjUgMC0zMS4xLTEwLjYtMzYuMy0yNi4yYy0yLjMtNy0xMi4yLTctMTQuNSAwYy01LjIgMTUuNi0xOS45IDI2LjItMzYuMyAyNi4yTDE2OCAyMjRjLTIyLjEgMC00MC0xNy45LTQwLTQwbDAtMTQuNGMyOC4yIDQuMSA2MSA2LjQgOTYgNi40czY3LjgtMi4zIDk2LTYuNGwwIDE0LjRjMCAyMi4xLTE3LjkgNDAtNDAgNDB6bS04OCA5NmwxNiAzMkwxNzYgNDgwIDEyOCAyODhsNjQgMzJ6bTEyOC0zMkwyNzIgNDgwIDI0MCAzNTJsMTYtMzIgNjQtMzJ6Ii8+PC9zdmc+"
      />
      <!--昵称-->
      <span class="name mt-2 fw-bold fs-1">Eleanor Pena</span>
      <!--最佳名次-->
      <div class="d-inline mt-3">
        <span
          class="fs-3 fw-semibold animate__animated animate__repeat-3 animate__heartBeat gradient-text"
          >10 <span class="fs-6 fw-lighter text-secondary">最佳名次</span></span
        >
      </div>
      <!--参加次数-->
      <div class="d-inline mt-3">
        <span
          class="fs-3 fw-semibold animate__animated animate__repeat-3 animate__heartBeat gradient-text"
          >10 <span class="fs-6 fw-lighter text-secondary">最佳名次</span></span
        >
      </div>
      <!--编辑按钮-->
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal">
        编辑信息
      </button>
      <div class="mt-2">
        <span class="text-break fs-6 text-secondary"
          >aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </span>
      </div>
      <!--QQ链接-->
      <div class="d-flex align-items-end mt-1">
        <img src="/qq.webp" width="24" height="28" />
        <a
          target="_blank"
          href="https://bing.com"
          class="ps-2"
          data-bs-toggle="tooltip"
          data-bs-title="3010116916"
          data-bs-placement="right"
          id="qqLink"
        >
          <font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" />
        </a>
      </div>

      <!--加入时间-->
      <span class="badge text-bg-secondary mt-2" style="cursor: default">加入于 May,2021</span>
    </div>
  </div>

  <hr />

  <p>用户列表</p>
  <cropper
    :stencil-component="CircleStencil"
    class="cropper"
    :src="img"
    :auto-zoom="true"
    @change="onImgChange"
    :debounce="false"
    image-restriction="stencil"
  />
  <preview
    :width="120"
    :height="120"
    :image="imgResult.image"
    :coordinates="imgResult.coordinates"
    class="rounded-circle"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
//开始image-crop相关
import { Cropper, CircleStencil, Preview } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
const img =
  'https://images.unsplash.com/photo-1600984575359-310ae7b6bdf2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80'
const imgResult = ref({
  //用于显示预览
  coordinates: undefined,
  image: undefined
})
function onImgChange({ coordinates, image }) {
  //用于显示预览
  imgResult.value = {
    coordinates,
    image
  }
}
//上传相关

import Parse from 'parse/dist/parse.min.js'
Parse.initialize('cityrun')
Parse.serverURL = 'https://parse.hijeremy.cn/parse'
//enable qq的tooltip
import { Tooltip } from 'bootstrap'
onMounted(() => {
  new Tooltip(document.getElementById('qqLink'))
})
</script>

<style scoped>
.gradient-text {
  background: rgb(63, 94, 251);
  background: radial-gradient(circle, #ff1744 0%, #8e24aa 50%, #2979ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}
.cropper {
  height: 600px;
  width: 600px;
  background: #ddd;
}
</style>
