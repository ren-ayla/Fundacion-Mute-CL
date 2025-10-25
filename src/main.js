// Importar los estilos de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// Importar el JavaScript de Bootstrap (que incluye Popper.js)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// Importando los estilos de Bootstrap Icons
import "bootstrap-icons/font/bootstrap-icons.css"; 

import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
