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
                            <label class="form-label">新密码</label>
                            <input
                                v-model.trim="newPassword"
                                type="password"
                                class="form-control" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">旧密码（更改邮箱或密码要填）</label>
                            <input
                                v-model.trim="oldPassword"
                                type="password"
                                class="form-control" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">QQ</label>
                            <input v-model.trim="newQQ" type="text" class="form-control" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">微信</label>
                            <input v-model.trim="newWechat" type="text" class="form-control" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">个人简介</label>
                            <textarea
                                v-model.trim="newIntro"
                                type="text"
                                class="form-control"></textarea>
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
            <span class="name mt-5 fw-bold fs-1">{{ username }}</span>

            <!--最佳名次-->
            <span
                class="fs-3 fw-semibold mt-3 animate__animated animate__repeat-3 animate__heartBeat"
                >{{ bestRank }} <span class="fs-6 fw-lighter text-danger">最佳名次</span></span
            >

            <!--参加次数-->
            <span class="fs-3 fw-semibold"
                ><span class="fs-6 fw-lighter text-secondary">参与次数</span>
                {{ totalEventEnrolledTimes }}</span
            >

            <!--个人简介-->
            <div class="mt-2 mb-3">
                <span class="text-break fs-6">{{ intro }} </span>
            </div>

            <div class="d-flex align-items-end mt-1">
                <!--学号-->
                <div class="me-2">{{ stuNumber }}</div>
                <!--性别-->
                <div v-if="retrieveDataComplete" class="me-4">
                    <FontAwesomeIcon :icon="genderIcon" :class="genderClass" size="xl" />
                </div>

                <!--QQ链接-->
                <img id="showQQ" src="/qq.webp" width="24" height="28" />
                <div class="ms-2" style="cursor: pointer" @click="copyQQ">
                    <FontAwesomeIcon icon="fa-solid fa-copy" class="text-secondary" />
                </div>

                <!--微信链接-->
                <img id="showWechat" class="ms-2" src="/wechat.webp" width="28" height="28" />
                <div class="ms-2" style="cursor: pointer" @click="copyWechat">
                    <FontAwesomeIcon icon="fa-solid fa-copy" class="text-secondary" />
                </div>
            </div>

            <!--加入时间-->
            <span class="badge text-bg-secondary mt-2" style="cursor: default"
                >加入于 {{ registerTime }}</span
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
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { useToast } from 'vue-toastification'
const toast = useToast()
import { Tooltip } from 'bootstrap'
import { account, databases, database_id, users_collection_id } from '@/helper'
import { store } from '@/store/store'

const username = ref('')
const qq = ref('')
const wechat = ref('')
const genderIcon = ref('')
const genderClass = ref('')
const bestRank = ref()
const totalEventEnrolledTimes = ref()
const intro = ref()
const stuNumber = ref()
const registerTime = ref()
const retrieveDataComplete = ref(false)

const newEmail = ref('')
const newIntro = ref('')
const oldPassword = ref('')
const newPassword = ref('')
const newQQ = ref('')
const newWechat = ref('')
const newUsername = ref('')

//---------------获取展示用户信息-------------------
//获取当前用户id
account
    .get()
    .then((response) => {
        registerTime.value = new Date(response.$createdAt).toLocaleDateString()
        return databases.getDocument(database_id, users_collection_id, response.$id)
    })
    .then((response) => {
        retrieveDataComplete.value = true
        username.value = response.username
        qq.value = response.QQ
        wechat.value = response.wechat
        bestRank.value = response.bestRank
        totalEventEnrolledTimes.value = response.totalEventEnrolledTimes
        intro.value = response.intro
        stuNumber.value = response.stuNumber
        genderIcon.value = response.gender == 'male' ? 'fa-solid fa-mars' : 'fa-solid fa-venus'
        genderClass.value = response.gender == 'male' ? 'text-primary' : 'text-danger'
    })
    .catch((error) => {
        toast.error(error.message)
    })

//--------复制函数-------------
function copyQQ() {
    navigator.clipboard
        .writeText(qq.value)
        .then(() => {
            toast.success('成功复制QQ号')
        })
        .catch(() => {
            toast.error('复制QQ号失败')
        })
}
function copyWechat() {
    navigator.clipboard
        .writeText(wechat.value)
        .then(() => {
            toast.success('成功复制微信号')
        })
        .catch(() => {
            toast.error('复制微信号失败')
        })
}
onMounted(() => {
    //激活QQ号显示和复制的tooltip
    watch(
        retrieveDataComplete,
        (result) => {
            if (result) {
                new Tooltip(document.getElementById('showQQ'), {
                    placement: 'top',
                    title: qq.value
                })
                new Tooltip(document.getElementById('showWechat'), {
                    placement: 'top',
                    title: wechat.value
                })
            }
        },
        { once: true }
    )
})

//----------------上传更改到服务器-----------------
function updateProfile() {
    if (newUsername.value || newIntro.value || newQQ.value || newWechat.value) {
        simplyUpdateProfile()
    }
    if (newEmail.value && !newPassword.value) {
        updateEmail()
    }
    if (newPassword.value && !newEmail.value) {
        updatePassword()
    }
    if (newPassword.value && newEmail.value) {
        updatePasswordAndEmail()
    }
    if (
        !newEmail.value &&
        !newIntro.value &&
        !newUsername.value &&
        !newPassword.value &&
        !newQQ.value &&
        !newWechat.value
    ) {
        toast.warning('没有需要更新的')
    }
}
function simplyUpdateProfile() {
    account
        .get()
        .then((response) => {
            return databases.updateDocument(database_id, users_collection_id, response.$id, {
                username: newUsername.value ? newUsername.value : undefined,
                QQ: newQQ.value ? newQQ.value : undefined,
                wechat: newWechat.value ? newWechat.value : undefined,
                intro: newIntro.value ? newIntro.value : undefined
            })
        })
        .then(() => {
            toast.success('更新个人信息成功')
        })
        .catch((error) => {
            toast.error(error.message)
        })
}
function updateEmail() {
    account
        .updateEmail(newEmail.value, oldPassword.value)
        .then(() => {
            toast.success('更新邮箱成功')
        })
        .catch((error) => {
            toast.error(error.message)
        })
}
function updatePassword() {
    account
        .updatePassword(newPassword.value, oldPassword.value)
        .then(() => {
            toast.success('更新密码成功')
        })
        .catch((error) => {
            toast.error(error.message)
        })
}
function updatePasswordAndEmail() {
    account
        .updateEmail(newEmail.value, oldPassword.value)
        .then(() => {
            toast.success('更新邮箱成功')
            return account.updatePassword(newPassword.value, oldPassword.value)
        })
        .then(() => {
            toast.success('更新密码成功')
        })
        .catch((error) => {
            toast.error(error.message)
        })
}
function logout() {
    account
        .deleteSession('current')
        .then(() => {
            store.value.logout()
            toast.success('成功退出登录')
            router.push({ name: 'Home' })
        })
        .catch((error) => {
            toast.error(error.message)
        })
}
</script>
