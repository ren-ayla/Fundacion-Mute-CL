import { ref } from 'vue';

// Este ref guardará el ID de la sección que está visible en la pantalla
export const activeSection = ref('');

// Una función para actualizar la sección activa
export function setActiveSection(id) {
    activeSection.value = id;
}