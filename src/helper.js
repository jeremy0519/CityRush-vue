export default function delay(millis) {
    return new Promise((resolve) => {
        setTimeout(resolve, millis)
    })
}
import { Client, Account } from 'appwrite'

export const client = new Client()
client.setEndpoint('https://124.221.115.60:8443/v1').setProject('66daf470002a69b6c75a')
export const account = new Account(client)
export { ID } from 'appwrite'
