<template>
    <!--编辑信息的modal-->
    <div
        class="modal fade"
        id="modal"
        tabindex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg modal-fullscreen-sm-down">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">编辑个人信息</h1>
                    <div class="text-warning ps-2">不更改请留空</div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body bg-info-subtle">
                    <preview
                        v-show="imgSrc"
                        :width="150"
                        :height="150"
                        :image="imgResult.image"
                        :coordinates="imgResult.coordinates"
                        class="rounded-circle mx-auto bg-white" />
                    <form>
                        <label class="form-label">上传头像</label>
                        <div class="mb-3 input-group align-items-center">
                            <input
                                class="form-control"
                                type="file"
                                id="avatarUpload"
                                @change="handleFileUpload"
                                accept="image/*" />
                            <font-awesome-icon
                                class="ps-1"
                                style="cursor: pointer"
                                @click="resetImage"
                                size="lg"
                                icon="fa-solid fa-circle-xmark" />
                        </div>
                        <div class="mb-3">
                            <cropper
                                v-show="imgSrc"
                                ref="cropperInstance"
                                :stencil-component="CircleStencil"
                                :src="imgSrc"
                                :auto-zoom="true"
                                @change="onImgChange"
                                :debounce="false"
                                image-restriction="stencil"
                                backgroundClass="bg-white"
                                class="cropper mx-auto" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">昵称</label>
                            <input type="text" class="form-control" />
                            <div class="form-text">“名”不惊人死不休</div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">邮箱</label>
                            <input type="email" class="form-control" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">密码</label>
                            <input type="password" class="form-control" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">QQ</label>
                            <input type="text" class="form-control" />
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="RadioOptions" />
                            <label class="form-check-label"> 男 </label>
                        </div>
                        <div class="form-check form-check-inline mb-3">
                            <input class="form-check-input" type="radio" name="RadioOptions" />
                            <label class="form-check-label"> 女 </label>
                        </div>
                        <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" />
                            <label class="form-check-label">是否为FDFZ在校学生?</label>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">(如果是)8位学号</label>
                            <input type="number" class="form-control" />
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <div class="text-warning flex-grow-1">不更改请留空</div>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        取消
                    </button>
                    <button type="button" class="btn btn-primary" @click="getbase64">保存</button>
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
                height="150"
                width="150"
                src="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDggNTEyIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIDYuNi4wIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjQgRm9udGljb25zLCBJbmMuLS0+PHBhdGggZmlsbD0iI2M0YzZkMSIgZD0iTTIyNCAxNmMtNi43IDAtMTAuOC0yLjgtMTUuNS02LjFDMjAxLjkgNS40IDE5NCAwIDE3NiAwYy0zMC41IDAtNTIgNDMuNy02NiA4OS40QzYyLjcgOTguMSAzMiAxMTIuMiAzMiAxMjhjMCAxNC4zIDI1IDI3LjEgNjQuNiAzNS45Yy0uNCA0LS42IDgtLjYgMTIuMWMwIDE3IDMuMyAzMy4yIDkuMyA0OGwtNTkuOSAwQzM4IDIyNCAzMiAyMzAgMzIgMjM3LjRjMCAxLjcgLjMgMy40IDEgNWwzOC44IDk2LjlDMjguMiAzNzEuOCAwIDQyMy44IDAgNDgyLjNDMCA0OTguNyAxMy4zIDUxMiAyOS43IDUxMmwzODguNiAwYzE2LjQgMCAyOS43LTEzLjMgMjkuNy0yOS43YzAtNTguNS0yOC4yLTExMC40LTcxLjctMTQzTDQxNSAyNDIuNGMuNi0xLjYgMS0zLjMgMS01YzAtNy40LTYtMTMuNC0xMy40LTEzLjRsLTU5LjkgMGM2LTE0LjggOS4zLTMxIDkuMy00OGMwLTQuMS0uMi04LjEtLjYtMTIuMUMzOTEgMTU1LjEgNDE2IDE0Mi4zIDQxNiAxMjhjMC0xNS44LTMwLjctMjkuOS03OC0zOC42QzMyNCA0My43IDMwMi41IDAgMjcyIDBjLTE4IDAtMjUuOSA1LjQtMzIuNSA5LjljLTQuOCAzLjMtOC44IDYuMS0xNS41IDYuMXptNTYgMjA4bC0xMi40IDBjLTE2LjUgMC0zMS4xLTEwLjYtMzYuMy0yNi4yYy0yLjMtNy0xMi4yLTctMTQuNSAwYy01LjIgMTUuNi0xOS45IDI2LjItMzYuMyAyNi4yTDE2OCAyMjRjLTIyLjEgMC00MC0xNy45LTQwLTQwbDAtMTQuNGMyOC4yIDQuMSA2MSA2LjQgOTYgNi40czY3LjgtMi4zIDk2LTYuNGwwIDE0LjRjMCAyMi4xLTE3LjkgNDAtNDAgNDB6bS04OCA5NmwxNiAzMkwxNzYgNDgwIDEyOCAyODhsNjQgMzJ6bTEyOC0zMkwyNzIgNDgwIDI0MCAzNTJsMTYtMzIgNjQtMzJ6Ii8+PC9zdmc+" />

            <!--昵称-->
            <span class="name mt-2 fw-bold fs-1">Eleanor Pena</span>

            <!--最佳名次-->
            <span
                class="fs-3 fw-semibold gradient-text mt-3 animate__animated animate__repeat-3 animate__heartBeat"
                >10 <span class="fs-6 fw-lighter text-secondary">最佳名次</span></span
            >

            <!--参加次数-->
            <span class="fs-3 fw-semibold"
                ><span class="fs-6 fw-lighter text-secondary">参与次数</span> 2</span
            >

            <!--个人简介-->
            <div class="mt-2">
                <span class="text-break fs-6 text-secondary"
                    >aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                </span>
            </div>

            <!--QQ链接-->
            <div class="d-flex align-items-end mt-1">
                <img
                    src="/qq.webp"
                    width="24"
                    height="28"
                    data-bs-toggle="tooltip"
                    data-bs-title="3010116916"
                    data-bs-placement="left" />
                <a class="ps-2" style="cursor: pointer">
                    <font-awesome-icon
                        icon="fa-solid fa-copy"
                        id="copyButton"
                        class="text-secondary"
                        data-clipboard-text="Just because you can doesn't mean you should — clipboard.js"
                        data-bs-title="已复制"
                        data-bs-placement="right" />
                </a>
            </div>

            <!--加入时间-->
            <span class="badge text-bg-secondary mt-2" style="cursor: default"
                >加入于 May,2021</span
            >

            <!--编辑按钮-->
            <button
                type="button"
                class="btn btn-outline-primary mt-4"
                data-bs-toggle="modal"
                data-bs-target="#modal">
                编辑信息
            </button>
        </div>
    </div>

    <hr />

    <p>用户列表</p>
</template>

<script setup>
import { ref, onMounted } from 'vue'

//---------------Image-Crop-----------------
import { Cropper, CircleStencil, Preview } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
const imgSrc = ref('')
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

//本地上传图片
function handleFileUpload(event) {
    const file = event.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = () => {
            imgSrc.value = reader.result
        }
        reader.readAsDataURL(file)
    }
}

//上传到服务器
function getbase64() {
    console.log(cropperInstance.value.getResult().image)
}

import Parse from 'parse/dist/parse.min.js'
Parse.initialize('cityrun')
Parse.serverURL = 'https://parse.hijeremy.cn/parse'

//激活组件准备工作
import { Tooltip } from 'bootstrap'
import ClipboardJS from 'clipboard'
import delay from '@/helper'
async function displayCopySuccess() {
    const tooltip = Tooltip.getInstance('#copyButton')
    tooltip.show()
    await delay(2000)
    tooltip.hide()
}

//激活cropper实例
const cropperInstance = ref(null)

function resetImage() {
    document.getElementById('avatarUpload').value = ''
    imgResult.value = { coordinates: undefined, image: undefined }
    imgSrc.value = ''
}

onMounted(() => {
    //激活各组件
    //激活QQ号显示和复制的tooltip
    new Tooltip(document.querySelectorAll('[data-bs-toggle="tooltip"]')[0])
    new Tooltip(document.getElementById('copyButton'), {
        placement: 'right',
        title: '已复制',
        trigger: 'manual'
    })
    //激活复制的功能
    var clipboard = new ClipboardJS('#copyButton', {
        text: function (trigger) {
            return trigger.getAttribute('data-clipboard-text')
        }
    })
    clipboard.on('success', async function (e) {
        displayCopySuccess().then(() => {
            e.clearSelection()
        })
    })

    //激活编辑modal
    document.getElementById('modal').addEventListener('shown.bs.modal', () => {
        cropperInstance.value.refresh()
    })
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
    width: 300px;
    height: 300px;
}
</style>
