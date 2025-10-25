<script setup>
import { articles as allArticles } from '../store/newsStore';

const getImageUrl = (name) => {
    return new URL(`../assets/img/blog/${name}`, import.meta.url).href;
};
</script>

<template>
    <div class="container py-5 col-11">

    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><router-link to="/">Inicio</router-link></li>
            <li class="breadcrumb-item active" aria-current="page">Blog</li>
        </ol>
    </nav>
    
    <h1 class="mb-4 bloglist-title">Nuestro Blog</h1>
    
    <div class="row">
        <div v-for="article in allArticles" :key="article.id" class="col-md-6 col-lg-4 mb-4">

        <div class="card h-100 shadow-sm border-0">
        <img :src="getImageUrl(article.image)" class="card-img-top" :alt="article.title">
            <div class="card-body d-flex flex-column">
                <p class="card-text text-muted small">{{ article.date }}</p>
                <h5 class="card-title fw-bold">{{ article.title }}</h5>
                <p class="card-text flex-grow-1">{{ article.description }}</p>
                <router-link :to="{ name: 'BlogPost', params: { slug: article.slug } }" class="btn btn-primary mt-auto align-self-start">
                Leer Más
                </router-link>
            </div>
        </div>

        </div>
    </div>

    </div>
</template>


<style scoped>
.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    --bs-border-radius: 0; /* Tarjetas cuadradas */
}
.card:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12) !important;
}

/* Estilos para la Imagen de la Tarjeta */
.card-img-top {
    height: 250px; /* Misma altura que en el carrusel */
    object-fit: cover;
    width: 100%;
}

/* Estilos para el Botón "Leer Más" */
.btn-primary {
    background-color: #9CADFC;
    border-color: #9CADFC;
    font-weight: 600;
    border-radius: 0; /* Botón cuadrado */
}

.btn-primary:hover {
    background-color: #AE85CE;
    border-color: #AE85CE;
}

.bloglist-title{
    font-weight: bold;
    font-size: 2.6rem;
    margin-bottom: 0.5rem;
    font-family: 'Oswald', sans-serif;
}
</style>