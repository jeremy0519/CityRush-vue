<template>
    <!--编辑信息的modal-->
    <div
        id="modal"
        class="modal fade"
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
                <div class="modal-body bg-success-subtle">
                    <form @submit.prevent>
                        <div class="mb-3">
                            <label class="form-label">昵称</label>
                            <input v-model.trim="newUsername" type="text" class="form-control" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">邮箱</label>
                            <input v-model.trim="newEmail" type="email" class="form-control" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">密码</label>
                            <input
                                v-model.trim="newPassword"
                                type="password"
                                class="form-control" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">QQ</label>
                            <input v-model.trim="newQQ" type="text" class="form-control" />
                        </div>
                        <div class="form-check form-check-inline">
                            <input
                                v-model="newGender"
                                class="form-check-input"
                                type="radio"
                                name="RadioOptions" />
                            <label class="form-check-label"> 男 </label>
                        </div>
                        <div class="form-check form-check-inline mb-3">
                            <input
                                v-model="newGender"
                                class="form-check-input"
                                type="radio"
                                name="RadioOptions" />
                            <label class="form-check-label"> 女 </label>
                        </div>
                        <div class="mb-3 form-check">
                            <input v-model="newIsFDFZ" type="checkbox" class="form-check-input" />
                            <label class="form-check-label">是否为FDFZ在校学生?</label>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">(如果是)8位学号</label>
                            <input v-model="newStuNumber" type="number" class="form-control" />
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <div class="text-warning flex-grow-1">不更改请留空</div>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        取消
                    </button>
                    <button type="button" class="btn btn-primary" @click="updateProfile">
                        保存
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!--个人信息展示卡-->
    <div class="mx-auto border border-0" style="width: 350px">
        <div class="image d-flex flex-column justify-content-center align-items-center">
            <!--昵称-->
            <span class="name mt-5 fw-bold fs-1">Eleanor Pena</span>

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
                    <FontAwesomeIcon
                        id="copyButton"
                        icon="fa-solid fa-copy"
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
            <div class="d-inline mt-4">
                <button
                    type="button"
                    class="btn btn-outline-primary me-1"
                    data-bs-toggle="modal"
                    data-bs-target="#modal">
                    编辑信息
                </button>

                <button type="button" class="btn btn-outline-warning ms-1" @click="logout">
                    退出登录
                </button>
            </div>
        </div>
    </div>

    <hr />

    <p>用户列表</p>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { useToast } from 'vue-toastification'
const toast = useToast()
import { Tooltip } from 'bootstrap'
import ClipboardJS from 'clipboard'
import { delay } from '@/helper'
import { account } from '@/helper'

async function displayCopySuccess() {
    const tooltip = Tooltip.getInstance('#copyButton')
    tooltip.show()
    await delay(2000)
    tooltip.hide()
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
})

//----------------上传更改到服务器-----------------
//const isLoading = ref(false)
function updateProfile() {}
function logout() {
    account.deleteSession('current').then(() => {
        toast.success('成功退出登录')
        router.push({ name: 'Home' })
    })
}
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
</style>
