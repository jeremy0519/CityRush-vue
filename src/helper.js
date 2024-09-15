export function delay(millis) {
    return new Promise((resolve) => {
        setTimeout(resolve, millis)
    })
}
import { Client, Account, Databases } from 'appwrite'

const project_id = 'cityrun'
export const database_id = 'database'
export const users_collection_id = 'users_collection'
export const base_url = 'https://124.221.115.60/v1'
export const reset_password_url = 'http://localhost:5173/resetpassword'

const client = new Client()
client.setEndpoint(base_url).setProject(project_id)
export const databases = new Databases(client)
export const account = new Account(client)
