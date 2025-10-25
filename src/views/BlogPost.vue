<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { articles } from '../store/newsStore';

const route = useRoute();
const article = computed(() => {
    return articles.value.find(a => a.slug === route.params.slug);
});

// Un computed para reemplazar saltos de línea (\n) por <br>
const formattedContent = computed(() => {
    if (article.value && article.value.content) {
    return article.value.content.replace(/\n/g, '<br>');
    }
    return '';
});

const getImageUrl = (name) => {
    // Si la imagen es una URL completa, se usa directamente.
    // Si no, construimos la ruta local.
    if (name.startsWith('http')) {
        return name;
    }
    return new URL(`../assets/img/blog/${name}`, import.meta.url).href;
};
</script>

<template>
    <div class="container py-5 article" v-if="article">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/">Inicio</router-link></li>
                <li class="breadcrumb-item"><router-link to="/blog">Blog</router-link></li>
                <li class="breadcrumb-item active" aria-current="page">{{ article.title }}</li>
            </ol>
        </nav>

    <div class="row my-4">
        <div class="col-11 mx-auto"> 
            <article>
                <h1 class="article-title">{{ article.title }}</h1>
                <p class="text-muted">Publicado el: {{ article.date }}</p>
                <div class="article-content">
                    <p v-html="formattedContent"></p>
                </div>
                <img :src="getImageUrl(article.image)" class="img-fluid my-3 rounded" :alt="article.title">
            </article>
        </div>
    </div>

    </div>

    <div v-else>
        <h1 class="text-center my-5 blog-404">¡Ups! Noticia no encontrada.</h1>
    </div>
</template>

<style scoped>
.article-content {
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.8;
    font-size: 1.2rem;
    overflow-wrap: break-word;
}

.article-title {
    font-weight: bold;
    font-size: 2.6rem;
    margin-bottom: 0.5rem;
    font-family: 'Oswald', sans-serif;
}

.text-muted {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1rem;
}

.blog-404 {
    font-family: 'Oswald', sans-serif;
    font-size: 2.6rem;
    color: #AE85CE;
}

/* Para tablets y dispositivos medianos (hasta 992px) */
@media (max-width: 992px) {
    .article-title {
        font-size: 2.2rem; /* Reducimos un poco el título */
    }

    .article-content {
        font-size: 1.1rem; /* Reducimos un poco el texto del cuerpo */
    }
}

/* Para móviles (hasta 768px) */
@media (max-width: 768px) {
    .article-title {
        font-size: 1.8rem; /* Un título más pequeño para móviles */
        line-height: 1.3; /* Mejoramos el interlineado del título */
    }

    .article-content {
        font-size: 1rem; /* Tamaño de texto estándar para móviles */
        line-height: 1.7;
    }

    /* Reducimos el espaciado vertical general en la vista de artículo */
    .article {
        padding-top: 2rem !important;
        padding-bottom: 2rem !important;
    }
}
</style>