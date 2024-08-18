// Import our custom CSS
import './scss/styles.scss'
import 'animate.css'
// Import all of Bootstrap's JS
// eslint-disable-next-line no-unused-vars
import * as bootstrap from 'bootstrap'
import { createApp } from 'vue'
import App from './App.vue'
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
    faSpinner,
    faCheck,
    faXmark,
    faHashtag,
    faMars,
    faVenus,
    faCopy,
    faCircleXmark
} from '@fortawesome/free-solid-svg-icons'
import { faQq } from '@fortawesome/free-brands-svg-icons'
/* add icons to the library */
library.add(
    faUser,
    faLock,
    faArrowRight,
    faQq,
    faEnvelope,
    faSpinner,
    faCheck,
    faXmark,
    faHashtag,
    faMars,
    faVenus,
    faCopy,
    faCircleXmark
)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.mount('#app')
