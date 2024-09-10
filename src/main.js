// Import our custom CSS
import './scss/styles.scss'
import 'animate.css'
// Import all of Bootstrap's JS
//import * as bootstrap from 'bootstrap'
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
    faHashtag,
    faMars,
    faVenus,
    faCopy
} from '@fortawesome/free-solid-svg-icons'
import { faQq } from '@fortawesome/free-brands-svg-icons'
/* add icons to the library */
library.add(faUser, faLock, faArrowRight, faQq, faEnvelope, faHashtag, faMars, faVenus, faCopy)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.mount('#app')
