<script setup>
import { ref } from 'vue';
import { articles as allArticles, addArticle, deleteArticle } from '../store/newsStore';

const newArticle = ref({
    title: '',
    description: '',
    content: '',
    image: '',
});
const submitted = ref(false);

function submitArticle() {
    addArticle({ ...newArticle.value });
    // Limpiar formulario
    newArticle.value = { title: '', description: '', content: '', image: '' };
    submitted.value = true;
    setTimeout(() => submitted.value = false, 3000); // El mensaje de éxito desaparece después de 3s
}

function handleDelete(articleId, articleTitle) {
  // Usamos window.confirm para pedir una confirmación antes de borrar
    if (window.confirm(`¿Estás seguro de que quieres eliminar la noticia "${articleTitle}"?`)) {
    deleteArticle(articleId);
    }
}
</script>

<template>
    <div class="container py-5">
        <h1>Panel de Admin</h1>
        <p class="text-muted">Añade, edita o elimina noticias del blog.</p>
    <form @submit.prevent="submitArticle" class="mt-4">
        <div class="mb-3">
            <label for="title" class="form-label">Título</label>
            <input type="text" v-model="newArticle.title" class="form-control" id="title" required>
        </div>

        <div class="mb-3">
            <label for="description" class="form-label">Descripción Corta (para la tarjeta)</label>
            <textarea v-model="newArticle.description" class="form-control" id="description" rows="3" required></textarea>
        </div>

        <div class="mb-3">
            <label for="content" class="form-label">Contenido Completo</label>
            <textarea v-model="newArticle.content" class="form-control" id="content" rows="10" required></textarea>
        </div>
        <div class="mb-3">
            <label for="image" class="form-label">Nombre de la Imagen (ej: blog6.webp)</label>
            <input type="text" v-model="newArticle.image" class="form-control" id="image">
            <div class="form-text">Asegúrate de subir la imagen a la carpeta `src/assets/img/blog` primero en el cPanel de la Web o 
                insertar un link que comience con "http".</div>
        </div>

        <button type="submit" class="btn btn-primary">Añadir Noticia</button>
    </form>
    
        <div v-if="submitted" class="alert alert-success mt-4">
            ¡Noticia añadida con éxito!
        </div>

        <h2 class="mt-5 pt-4 border-top">Gestionar Noticias Existentes</h2>
        <ul class="list-group">
            <li v-for="article in allArticles" :key="article.id" class="list-group-item d-flex justify-content-between align-items-center">
            <span>{{ article.title }}</span>
        
            <div>
                <router-link :to="{ name: 'AdminEdit', params: { id: article.id } }" class="btn btn-sm btn-outline-primary me-2">
                    Editar
                </router-link>
                <button @click="handleDelete(article.id, article.title)" class="btn btn-sm btn-outline-danger">
                    Eliminar
                </button>
            </div>
            </li>
        </ul>
    </div>
</template>

