<template>
    <div class="container py-5">
    <h1>Editar Noticia</h1>
    
    <form @submit.prevent="submitUpdate" class="mt-4" v-if="articleToEdit">
        <div class="mb-3">
            <label for="title" class="form-label">Título</label>
            <input type="text" v-model="articleToEdit.title" class="form-control" required>
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">Descripción Corta</label>
            <textarea v-model="articleToEdit.description" class="form-control" rows="3" required></textarea>
        </div>
        <div class="mb-3">
            <label for="content" class="form-label">Contenido Completo</label>
            <textarea v-model="articleToEdit.content" class="form-control" rows="10" required></textarea>
        </div>

        <button type="submit" class="btn btn-primary">Guardar Cambios</button>
        <router-link to="/7*!@mAzH782K0zSq413mA-67=zXm(sI" class="btn btn-secondary ms-2">Cancelar</router-link>
    </form>
    
    <div v-if="submitted" class="alert alert-success mt-4">
        ¡Noticia actualizada con éxito!
    </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { articles, updateArticle } from '../store/newsStore';

// Recibimos el 'id' de la URL gracias a 'props: true' en el router
const props = defineProps({
    id: String
});

const router = useRouter();
const articleToEdit = ref(null);
const submitted = ref(false);

// Cuando el componente se carga, buscamos la noticia a editar
onMounted(() => {
    const articleId = parseInt(props.id);
    const foundArticle = articles.value.find(a => a.id === articleId);
  // Clonamos el objeto para no modificar el original hasta que se guarde
    if (foundArticle) {
    articleToEdit.value = { ...foundArticle };
    }
});

function submitUpdate() {
    updateArticle(articleToEdit.value.id, articleToEdit.value);
    submitted.value = true;
    // Después de 1.5 segundos, volvemos al panel de administrador
    setTimeout(() => {
    router.push('/7*!@mAzH782K0zSq413mA-67=zXm(sI');
    }, 1500);
}
</script>