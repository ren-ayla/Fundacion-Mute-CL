<script setup>
import { ref } from 'vue';

const quickLinks = ref([
    { text: 'Inicio', to: '/' },
    { text: 'Sobre Nosotros', to: '/#sobre-nosotros' },
    { text: 'Nuestro trabajo', to: '/#nuestro-trabajo' },
    { text: 'Noticias', to: '/blog' },
    { text: 'Solicita Acompañamiento', to: '/#acompanamiento' },
]);

const contactInfo = ref([
    //{ icon: 'bi bi-telephone', text: '+5692431293', href: 'tel:+5692431293' },
    { icon: 'bi bi-envelope', text: 'contacto@fundacionmute.cl', href: 'mailto:contacto@fundacionmute.cl' },
    { icon: 'bi bi-instagram', text: 'Fundacion_Mute', href: 'https://www.instagram.com/fundacion_mute', target: '_blank' },
    //{ icon: 'bi bi-linkedin', text: 'Fundacion_Mute', href: '#', target: '_blank' }, // Reemplaza '#' con tu link de LinkedIn
]);

// Buena práctica: Usar una función para manejar las rutas de las imágenes locales.
const getImageUrl = (name) => {
    return new URL(`../assets/img/logos/${name}`, import.meta.url).href;
};
</script>

<template>
<footer class="bg-dark text-white pt-5 pb-4 page-section" id="contacto">
    <div class="container text-center text-md-start">

    <div class="text-center mb-5">
        <h5 class="text-uppercase fw-bold">Encuéntranos en nuestros canales digitales</h5>
        <a :href="contactInfo.find(c => c.icon.includes('instagram')).href" target="_blank" class="instagram-icon-link">
            <i class="bi bi-instagram social-icon"></i>
        </a>
    </div>

    <div class="row">
        <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mb-5">
            <router-link to="/">
                <img :src="getImageUrl('mute-logo.webp')" alt="Hazte Socio - Fundación Mute" class="img-fluid">
            </router-link>
        </div>

        <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 mt-2">
            <h6 class="text-uppercase fw-bold">Enlaces rápidos</h6>
            <ul class="list-unstyled">
                <li v-for="link in quickLinks" :key="link.text" class="mb-1">
                    <router-link :to="link.to" class="footer-link">{{ link.text }}</router-link>
                </li>
            </ul>
        </div>

        <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4 mt-2">
            <h6 class="text-uppercase fw-bold">Contacto</h6>
            <ul class="list-unstyled">
                <li v-for="contact in contactInfo" :key="contact.text" class="mb-2">
                    <a :href="contact.href" :target="contact.target" class="footer-link d-flex align-items-center justify-content-center justify-content-md-start">
                        <i :class="contact.icon" class="me-2"></i>
                        <span>{{ contact.text }}</span>
                    </a>
                </li>
            </ul>
        </div>

        <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 text-center text-md-end">
            <h6 class="text-uppercase fw-bold invisible d-none d-md-block">Navegación</h6>
            <a class="footer-link" href="#inicio"><u>Volver hacia arriba</u></a>
        </div>
    </div>

    <div class="text-center p-3 border-top border-secondary mt-4">
        © 2025 Fundación Mute - Todos los derechos reservados.
    </div>

    </div>
</footer>
</template>

<style scoped>
h6{
    color: #9CADFC;
}

.footer-link {
    color: #a0a0a0;
    text-decoration: none;
    transition: color 0.3s ease;
}

.footer-link:hover, .footer-link:focus {
    color: #ffffff;
    text-decoration: underline;
}

.social-icon {
    font-size: 3rem; /* Tamaño del ícono de Instagram */
    margin-top: 1rem;
}

.instagram-icon-link {
    color: white;
    transition: color 0.3s ease, transform 0.3s ease;
    display: inline-block;
}

.instagram-icon-link:hover {
    color: #AE85CE; /* Color de tu marca */
    transform: scale(1.1);
}

/* Alineación del texto en la columna de contacto en móviles */
@media (max-width: 767px) {
    .justify-content-md-start {
    justify-content: center !important;
    }
}
</style>