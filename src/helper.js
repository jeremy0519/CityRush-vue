import Swal from 'sweetalert2'
export function delay(millis) {
    return new Promise((resolve) => {
        setTimeout(resolve, millis)
    })
}
export const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer
        toast.onmouseleave = Swal.resumeTimer
    }
})

import { Client, Account, Databases } from 'appwrite'

const project_id = '66daf470002a69b6c75a'
export const database_id = '66db140e00346f44da95'
export const users_collection_id = '66dc2256002852607043'
export const base_url = 'https://124.221.115.60/v1'
export const reset_password_url = 'http://localhost:5173/resetpassword'

const client = new Client()
client.setEndpoint(base_url).setProject(project_id)
export const databases = new Databases(client)
export const account = new Account(client)
