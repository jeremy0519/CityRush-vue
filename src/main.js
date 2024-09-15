import './scss/styles.scss'
import 'animate.css'
//import * as bootstrap from 'bootstrap'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import router from './router'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import {
    faUser,
    faLock,
    faArrowRight,
    faEnvelope,
    faHashtag,
    faMars,
    faVenus,
    faCopy,
    faBars
} from '@fortawesome/free-solid-svg-icons'
import { faQq, faWeixin } from '@fortawesome/free-brands-svg-icons'
/* add icons to the library */
library.add(
    faUser,
    faLock,
    faArrowRight,
    faQq,
    faEnvelope,
    faHashtag,
    faMars,
    faVenus,
    faCopy,
    faBars,
    faWeixin
)

const pinia = createPinia()
const app = createApp(App)
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.use(router)
app.use(pinia)
app.use(Toast)
app.mount('#app')
