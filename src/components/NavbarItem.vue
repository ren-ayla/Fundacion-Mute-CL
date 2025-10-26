<script setup>
import { ref, onMounted } from 'vue';
// import { activeSection } from '../store/navigationStore'; // <--- Eliminado
import { RouterLink, useRoute } from 'vue-router';
import logoSrc from '@/assets/img/logos/mute-logo.webp';
import { Collapse } from 'bootstrap'; // <--- Importa Collapse

const navItems = ref([
    { name: 'INICIO', path: '/' }, // <--- Cambiado a '/' simple
    { name: 'SOBRE NOSOTROS', path: '/#sobre-nosotros' },
    { name: 'NUESTRO TRABAJO', path: '/#nuestro-trabajo' },
    { name: 'BLOG', path: '/blog' },
    { name: 'SOLICITAR ACOMPAÑAMIENTO', path: '/#acompanamiento' },
    { name: 'CONTACTO', path: '/#contacto' },
    { name: 'HAZ TU APORTE', isButton: true }
]);

function handleDonation() {
    // console.log('Iniciando proceso de donación...'); // <--- Eliminado
    alert('¡Muchas gracias por tu interés en ayudar! Serás redirigido a la página de donaciones.');
}

const route = useRoute();

// FUNCION SIMPLIFICADA PARA DETERMINAR EL ENLACE ACTIVO
function isLinkActive(item) {
    // console.log(...); // <--- Eliminado

    // Caso 1: Rutas de página exactas (ej: /blog)
    // Usamos route.path === item.path para una coincidencia exacta.
    if (item.path && !item.path.includes('#') && route.path === item.path) {
        return true;
    }
    
    // Caso 2: Lógica específica para el link "INICIO" (path: '/')
    // Se activa solo si estamos exactamente en la página de inicio.
    if (item.path === '/') {
        return route.path === '/';
    }
    
    // Para los links con hash (#), ya no se activarán por scroll,
    // solo por la lógica del router (que ya tienes configurada).
    return false;
}

// Colapsar menu hamburguesa
const collapseElementRef = ref(null);
let bsCollapseInstance = null; // Guardará la instancia de Bootstrap

// [NUEVO] Inicializa la instancia de Bootstrap cuando el componente se monta
onMounted(() => {
  if (collapseElementRef.value) {
    bsCollapseInstance = new Collapse(collapseElementRef.value, {
      toggle: false // Importante: no queremos que se abra/cierre al inicializar
    });
  }
});

// Función para cerrar el menú si está abierto
function closeNavbarCollapse() {
  // Verifica si la instancia existe y si el menú está visible (tiene la clase 'show')
  if (bsCollapseInstance && collapseElementRef.value.classList.contains('show')) {
    bsCollapseInstance.hide();
  }
}

</script>

<template>
    <nav class="navbar navbar-expand-xxl sticky-top" id="navbar">
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

            <div class="collapse navbar-collapse" id="navbarSupportedContent" ref="collapseElementRef">
                <ul class="navbar-nav justify-content-around w-100 align-items-center">
                    <li v-for="item in navItems" :key="item.name" class="nav-item">
                        <RouterLink 
                            v-if="!item.isButton" 
                            class="nav-link py-1" 
                            :to="item.path"
                            :class="{ active: isLinkActive(item) }" 
                            exact-active-class=""
                            @click="closeNavbarCollapse"> {{ item.name }}
                        </RouterLink>
                        <button v-else class="btn-donar text-light" type="button" @click="handleDonation(); closeNavbarCollapse()">
                            {{ item.name }}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
/* Tus estilos están perfectos, no necesitan cambios */
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
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.09);
}

:deep(.nav-link:hover){
    transform: scale(1.1);
    cursor: pointer;
    transition: transform 0.3s ease;
}

@media (max-width: 1399.98px) {
    :deep(#navbarSupportedContent .nav-item) {

    margin: 0.25rem 0 0.25rem 0;

    /* Opcional: Centrar el texto si se desalinea en móvil */
    /* text-align: center; */
    }

  /* Opcional: Eliminar el margen del último item para que no quede espacio extra abajo */
    :deep(#navbarSupportedContent .nav-item:last-child) {
    margin: 0.5rem 0 0.9rem 0;
    }
}

.btn-donar{
    background: linear-gradient(to right, #9CADFC, #AE85CE);
    border: none;
    color: white;
    padding: 0.8rem 1.2rem;
    text-align: center;
    text-decoration: none;  
    display: inline-block;
    font-size: 1.1rem;
    border-radius: 1.5rem;
    font-weight: 600;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.251);
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-donar:hover {
    background: linear-gradient(to right, #B999DE, #ADC4FF); 
    box-shadow: 0 0 10px rgba(174, 133, 206, 0.6); 
    transform: translateY(-2px);
}
</style>