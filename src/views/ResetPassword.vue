<template>
    <form id="form" novalidate>
        <p class="form-label mt-3">请输入新密码:</p>
        <input type="text" class="form-control" required v-model="newPassword" />
        <div class="mt-1 d-flex align-items-center justify-content-center">
            <font-awesome-icon
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
import { Toast } from '@/helper'
import Swal from 'sweetalert2'
const route = useRoute()
const router = useRouter()

const resetProcessStatus = ref(0)
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
            .then((response) => {
                resetProcessStatus.value = 2
                console.log(response)
                delay(600).then(() => router.push({ name: 'Home' }))
            })
            .catch((error) => {
                resetProcessStatus.value = 3
                alert(error.message)
            })
    }
}
</script>
