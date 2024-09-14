<template>
    <form id="form" novalidate @submit.prevent>
        <p class="form-label mt-3">请输入新密码:</p>
        <input v-model="newPassword" type="password" class="form-control" required />
        <div class="mt-1 d-flex align-items-center justify-content-center">
            <FontAwesomeIcon
                role="button"
                icon="fa-solid fa-arrow-right"
                class="text-info"
                size="2xl"
                @click.stop.prevent="handleReset" />
            <div v-if="isLoading" class="spinner-border text-success ms-2" role="status"></div>
        </div>
    </form>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { account } from '@/helper'
import { useToast } from 'vue-toastification'
const route = useRoute()
const router = useRouter()
const toast = useToast()

const newPassword = ref('')

const isLoading = ref(false)

function handleReset() {
    const form = document.getElementById('form')
    // 前端先检查有效性
    form.classList.add('was-validated')
    if (form.checkValidity()) {
        isLoading.value = true
        account
            .updateRecovery(route.query.userId, route.query.secret, newPassword.value)
            .then(() => {
                toast.success('成功重置密码')
                router.push({ name: 'Login' })
            })
            .catch((error) => {
                isLoading.value = false
                toast.error(error.message, { timeout: false })
            })
    }
}
</script>
