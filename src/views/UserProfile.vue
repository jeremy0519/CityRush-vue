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
                class="fs-3 fw-semibold mt-3 text-danger animate__animated animate__repeat-3 animate__heartBeat"
                >{{ bestRank }} <span class="fs-6 fw-lighter text-secondary">最佳名次</span></span
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

            <!--QQ链接-->
            <div class="d-flex align-items-end mt-1">
                <div class="pe-2">{{ stuNumber }}</div>
                <div class="pe-4">
                    <FontAwesomeIcon :icon="genderIcon" :class="genderClass" size="xl" />
                </div>
                <img id="showQQ" src="/qq.webp" width="24" height="28" />
                <div class="ps-2" style="cursor: pointer" @click="copyQQ">
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
import { Query } from 'appwrite'

const username = ref('')
const qq = ref('qq')
const genderIcon = ref('fa-solid fa-mars')
const genderClass = ref('text-primary')
const bestRank = ref()
const totalEventEnrolledTimes = ref()
const intro = ref()
const stuNumber = ref()
const registerTime = ref()
const retrieveDataComplete = ref(false)

const newEmail = ref('')
const newIntro = ref('')
const newPassword = ref('')
const newQQ = ref('')
const newUsername = ref('')

//---------------获取展示用户信息-------------------
//获取当前用户id
account
    .get()
    .then((response) => {
        registerTime.value = new Date(response.$createdAt).toLocaleDateString()
        return databases.listDocuments(database_id, users_collection_id, [
            Query.equal('user_id', response.$id)
        ])
    })
    .then((response) => {
        retrieveDataComplete.value = true
        username.value = response.documents[0].username
        qq.value = response.documents[0].QQ
        bestRank.value = response.documents[0].bestRank
        totalEventEnrolledTimes.value = response.documents[0].totalEventEnrolledTimes
        intro.value = response.documents[0].intro
        stuNumber.value = response.documents[0].stuNumber
        genderIcon.value =
            response.documents[0].gender == 'male' ? 'fa-solid fa-mars' : 'fa-solid fa-venus'
        genderClass.value = response.documents[0].gender == 'male' ? 'text-primary' : 'text-danger'
    })
    .catch((error) => {
        toast.error(error.message)
    })

//--------复制qq号函数-------------
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
            }
        },
        { once: true }
    )
})

//----------------上传更改到服务器-----------------
function updateProfile() {}
function logout() {
    account.deleteSession('current').then(() => {
        toast.success('成功退出登录')
        router.push({ name: 'Home' })
    })
}
</script>
