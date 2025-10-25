<script setup>
    import { ref } from 'vue';
    import { activeSection } from '../store/navigationStore';
    import { RouterLink, useRoute } from 'vue-router'; // Importante para que <RouterLink> funcione
    import logoSrc from '@/assets/img/logos/mute-logo.webp';
    // Este array define toda la estructura de nuestro menú.
    const navItems = ref([
    { name: 'INICIO', path: '/#inicio' },
    { name: 'SOBRE NOSOTROS', path: '/#sobre-nosotros' },
    { name: 'NUESTRO TRABAJO', path: '/#nuestro-trabajo' },
    { name: 'BLOG', path: '/blog' },
    { name: 'SOLICITAR ACOMPAÑAMIENTO', path: '/#acompanamiento' },
    { name: 'CONTACTO', path: '/#contacto' },
    // Este es un objeto especial para el botón de Donar.
    // Le añadimos una bandera `isButton` para identificarlo.
    { name: 'HAZ TU APORTE', isButton: true }
    ]);
    // Creamos una función para manejar la acción del botón "DONAR".
    function handleDonation() {
    console.log('Iniciando proceso de donación...');
    alert('¡Gracias por tu interés en aportar! Serás redirigido a la página de donaciones.');
    }
    // Aquí podrías redirigir a una página externa o abrir un modal. ESTO DESACTIVADO X AHORA
    const route = useRoute(); // Para acceder a la ruta actual
    //FUNCION PARA DETERMINAR EL ENLACE ACTIVO
    function isLinkActive(item) {
    // Extraemos el nombre base del enlace para comparar con la ruta
    // ej: de '/#blog' extraemos 'blog', de '/contacto' extraemos 'contacto'
    const baseName = item.path.replace(/^\/|\/#/g, '');
    // Caso 1: La ruta actual coincide o empieza con el nombre base del enlace
    // Esto cubre /blog, /blog/mi-noticia, /contacto, etc.
    if (baseName && route.path.startsWith(`/${baseName}`)) {
        return true;
    }
    // Caso 2: Estamos en la página de inicio y la sección de scroll coincide
    if (item.path.includes('#')) {
        return route.path === '/' && activeSection.value === baseName;
    }
    // Caso 3: Coincidencia exacta para la página de inicio
    if (item.path === '/#inicio' || item.path === '/') {
        return route.path === '/';
    }

    return false;
}

</script>

<template>
    <nav class="navbar navbar-expand-xxl" id="navbar">
        <div class="container-fluid">
            <RouterLink class="navbar-brand py-2" to="/">
                <img :src="logoSrc" alt="Logo Fundación Mute" width="220" height="75.20">
            </RouterLink>
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav justify-content-around w-100">
                <li v-for="item in navItems" :key="item.name" class="nav-item">
                    <RouterLink 
                        v-if="!item.isButton" 
                        class="nav-link py-1" 
                        :to="item.path"
                        :class="{ active: isLinkActive(item) }" exact-active-class="">
                            {{ item.name }}
                    </RouterLink>
                    <button v-else class="btn-donar text-light" type="button" @click="handleDonation">
                        {{ item.name }}
                    </button>
                </li>
            </ul>
        </div>

        </div>
    </nav>
</template>

<style scoped>
:deep(.nav-link.active) {
    font-weight: bold;
    color: #1d1d1d !important; 
}

#navbar{
    background-color: #f6f1f4;
    font-family: "Roboto", sans-serif;
    font-size: 1.1rem;
    font-weight: 400;
    color: #333333;
}

:deep(.nav-link:hover){
    transform: scale(1.1);
    cursor: pointer;
    transition: transform 0.3s ease;
}

.btn-donar{
        background-color: #AE85CE;
    border: none;
    color: white;
    padding: 17px 50px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1.1rem;
    border-radius: 0px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.251);
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn-donar:hover {
    background-color: #9CADFC;
}
</style>
