<script setup>
import { ref, computed } from 'vue';
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
import { recentArticles } from '../store/newsStore'; // Importa las noticias recientes
import 'vue3-carousel/dist/carousel.css';

const getImageUrl = (name) => {
  // Si 'name' ya es una URL completa (empieza con http), la devolvemos tal cual.
    if (name && (name.startsWith('http') || name.startsWith('https'))) {
    return name;
    }
  // Si no, asumimos que es un archivo local y construimos la ruta.
    return new URL(`../assets/img/blog/${name}`, import.meta.url).href;
};

// Mostramos las 5 noticias más recientes y el boton ver más.
const articlesForCarousel = computed(() => {
    return [
    ...recentArticles.value,
    { id: 'more-button', 
    type: 'more-button', 
    title: 'Explorar más noticias', 
    hoverText: 'Ver más noticias del blog', 
    link: '/blog' }
    ];
});

const settings = ref({
    itemsToShow: 1,
    snapAlign: 'center',    
    autoplay: 3000,
});

const breakpoints = ref({
    768: {
        itemsToShow: 3,
        snapAlign: 'start',
    },
});

console.log('Artículos para mostrar en el carrusel:', articlesForCarousel.value);
</script>

<template>

<section class="news-section bg-light mt-2">
    <div class="carousel-wrapper">

    <Carousel v-bind="settings" :breakpoints="breakpoints" :wrap-around="true">
        <Slide v-for="article in articlesForCarousel" :key="article.id">
            <div class="carousel__item">
                <div v-if="article.type === 'more-button'" class="h-100 d-flex align-items-center justify-content-center">
                    <router-link :to="article.link" class="more-news-button" :title="article.hoverText">
                        <span class="button-text">{{ article.title }}</span>
                        <span class="hover-text">{{ article.hoverText }}</span>
                        <i class="bi bi-arrow-right"></i>
                    </router-link>
                </div>
                
                <div v-else class="card h-100 shadow-sm border-0 text-start overflow-hidden">
                <router-link :to="{ name: 'BlogPost', params: { slug: article.slug } }"> <!-- Router Link para hacer click en Imagen y va al Blog seleccionado-->
                    <img 
                    :src="getImageUrl(article.image)" 
                    class="card-img-top" 
                    :alt="article.title">
                </router-link>
                <div class="card-body d-flex flex-column">
                    <p class="card-text text-muted small mb-2">{{ article.date }}</p>
                    <h5 class="card-title fw-bold">{{ article.title }}</h5>
                    <p class="card-text flex-grow-1">
                        {{ article.description }}
                    </p>
                    <router-link :to="{ name: 'BlogPost', params: { slug: article.slug } }" class="btn btn-primary mt-auto align-self-start">
                    Leer Más
                    </router-link>
                </div>
                </div>
            </div>
        </Slide>

        <template #addons>
            <Navigation />
            <Pagination />
        </template>
    </Carousel>

    </div>
</section>

</template>

<style scoped>
/* Tus estilos existentes */
.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    --bs-border-radius: 0; /* Eliminamos bordes redondeados horribles */
}
.card:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12) !important;
}
.card-img-top {
    height: 300px;
    object-fit: cover;
    width: 100%;
}
.carousel-wrapper {   
    width: 75%;
    margin: 0 auto;
}
@media (max-width: 992px) {
    .carousel-wrapper { width: 83%; }
}
@media (max-width: 768px) {
    .carousel-wrapper { width: 80%; }
}
.carousel__item {
    width: 100%;
    padding: 0 10px;
}
.btn-primary {
    background-color: #9CADFC;
    border-color: #9CADFC;
    font-weight: 600;
    border-radius: 0;
}
.btn-primary:hover {
    background-color: #AE85CE;
    border-color: #AE85CE;
}
:deep(.carousel__pagination-button::after) {
    width: 12px; height: 12px; border-radius: 50%; background-color: #ffffff; opacity: 0.4;
}
:deep(.carousel__pagination-button--active::after) {
    opacity: 1;
}
:deep(.carousel__pagination) {
    position: absolute;
    bottom: -1px !important; /* ✅ Añadimos !important para forzar la posición */
    left: 50%;
    right: 50%;
    margin: 0; /* El margen ya es 0 por defecto, así que no necesita !important */
}

:deep(.carousel__prev),
:deep(.carousel__next) {
    box-sizing: content-box; background-color: #343434aa; color: #ffffff; border-radius: 50%; box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
:deep(.carousel__prev:hover),
:deep(.carousel__next:hover) {
    color: #9CADFC; background-color: #000000d4;
}

/* --- ✅ ESTILOS AJUSTADOS PARA EL BOTÓN CIRCULAR --- */
.more-news-button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

  /* Hacemos que sea un círculo perfecto y adaptable */
    width: 90%; /* Ocupa el 90% del ancho de su contenedor */
    max-width: 300px; /* Un tamaño máximo para que no sea gigante en pantallas grandes */
    aspect-ratio: 1 / 1; /* Esto fuerza a que el alto sea igual al ancho */
    border-radius: 80%; /* Lo convierte en un círculo */

    background-color: #9CADFC;
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size: 1.5rem;
    overflow: hidden;
    position: relative;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    transition: all 0.4s ease;
    cursor: pointer;
    text-align: center;
}

.more-news-button .button-text,
.more-news-button .hover-text {
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.more-news-button .button-text {
    opacity: 1;
    transform: translateY(0);
}

.more-news-button .hover-text {
    position: absolute;
    opacity: 0;
    transform: translateY(20px);
    font-size: 1.1rem;
    padding: 0 1rem;
}

.more-news-button i {
    font-size: 3.5rem;
    transition: transform 0.3s ease, opacity 0.3s ease;
}

/* Efecto al pasar el mouse */
.more-news-button:hover {
    background-color: #AE85CE;
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}

.more-news-button:hover .button-text {
    opacity: 0;
    transform: translateY(-20px);
}

.more-news-button:hover .hover-text {
    opacity: 1;
    transform: translateY(0);
}

.more-news-button:hover i {
    opacity: 0;
    transform: scale(0.8);
}

</style>