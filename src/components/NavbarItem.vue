<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import logoSrc from '@/assets/img/logos/mute-logo.webp';
import { Collapse } from 'bootstrap';

const navItems = ref([
    { name: 'INICIO', path: '/' },
    { name: 'SOBRE NOSOTROS', path: '/#sobre-nosotros' },
    { name: 'NUESTRO TRABAJO', path: '/#nuestro-trabajo' },
    { name: 'BLOG', path: '/blog' },
    { name: 'SOLICITAR ACOMPAÑAMIENTO', path: '/#acompanamiento' },
    { name: 'CONTACTO', path: '/#contacto' },
    { name: 'HAZ TU APORTE', isButton: true, path: 'https://pay.virtualpos.cl/fundacion-mute' }
]);

const route = useRoute();

function isLinkActive(item) {
    if (item.path && !item.path.includes('#') && route.path === item.path) return true;
    if (item.path === '/') return route.path === '/';
    return false;
}

// --- Lógica para el menú colapsable ---
const collapseElementRef = ref(null);
const togglerButtonRef = ref(null);
let bsCollapseInstance = null; // Mantenemos nuestra instancia manual

onMounted(() => {
  if (collapseElementRef.value) {
    bsCollapseInstance = new Collapse(collapseElementRef.value, {
      // MUY IMPORTANTE: toggle: false para que no se abra solo al inicio
      toggle: false
    });
  }
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  if (bsCollapseInstance) {
    bsCollapseInstance.dispose();
  }
});

// Función para cerrar (usa nuestra instancia) - Sin cambios
function closeNavbarCollapse() {
  if (bsCollapseInstance && collapseElementRef.value && collapseElementRef.value.classList.contains('show')) {
    bsCollapseInstance.hide();
  }
}

// Función para clics afuera (usa closeNavbarCollapse) - Sin cambios
function handleClickOutside(event) {
  const isTogglerClick = togglerButtonRef.value && (togglerButtonRef.value === event.target || togglerButtonRef.value.contains(event.target));
  const isMenuOpen = collapseElementRef.value && collapseElementRef.value.classList.contains('show');

  if (isMenuOpen && !isTogglerClick && !collapseElementRef.value.contains(event.target)) {
    closeNavbarCollapse();
  }
}

// Función para el clic EN el botón: Ahora SOLO usa toggle()
function handleTogglerClick() {
  if (bsCollapseInstance) {
    // Le decimos a nuestra instancia que haga toggle (abrir/cerrar)
    bsCollapseInstance.toggle();
  } else {
    console.warn("Instancia de Collapse no encontrada para hacer toggle.");
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
                ref="togglerButtonRef"
                class="navbar-toggler"
                type="button"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"  aria-label="Toggle navigation"
                @click="handleTogglerClick"> <span class="navbar-toggler-icon"></span>
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
                        <a v-else
                          :href="item.path"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="btn-donar text-light"
                          role="button"
                          @click="closeNavbarCollapse"> {{ item.name }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
/* Tus estilos SIN CAMBIOS */
:deep(.nav-link.active) {
    font-weight: bold;
    color: #1d1d1d !important;
}
/* ... (resto de tus estilos igual) ... */
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
    }
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