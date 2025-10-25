<script setup>
import { ref } from 'vue'
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const getImageUrl = (name) => {
    return new URL(`../assets/img/instagram/${name}`, import.meta.url).href
}

const slides = ref([
  // Slide 1
    [
    // Añadido 'link' a cada objeto
    { src: getImageUrl('post1.webp'), alt: 'Con tu ayuda podemos salvar vidas, visita el post aquí.', link: 'https://www.instagram.com/p/DLOwx42NAX5/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
    { src: getImageUrl('post2.webp'), alt: 'Fundación MUTE, ¡Síguenos en Instagram!', link: 'https://www.instagram.com/fundacion_mute/' },
    { src: getImageUrl('post3.webp'), alt: 'Adultos mayores en situación de vulnerabilidad, click aquí para ver el post.', link: 'https://www.instagram.com/p/DLOwtkQNuLX/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
    ],
  // Slide 2
    [
    { src: getImageUrl('post4.webp'), alt: 'Con tu ayuda podemos dar calidad de vida, visita nuestro Instagram para saber más.', link: 'https://www.instagram.com/p/DLOwphUN-0D/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
    { src: getImageUrl('post5.webp'), alt: 'Fundación MUTE, ¡Seguirnos en Instagram es la forma más fácil de ayudarnos!', link: 'https://www.instagram.com/fundacion_mute/' },
    { src: getImageUrl('post6.webp'), alt: 'Visita el post aquí.', link: 'https://www.instagram.com/p/DLOwramtZ7Z/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
    ],
  // Slide 3
    [
    { src: getImageUrl('post7.webp'), alt: 'Basta de silenciar a nuestros adultos mayores, visita nuestro post aquí.', link: 'https://www.instagram.com/p/DLOwi3aNNB0/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
    { src: getImageUrl('post8.webp'), alt: 'Ellos merecen una vida digna, lee más aqui.', link: 'https://www.instagram.com/p/DLOwgz6tSGg/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
    { src: getImageUrl('post9.webp'), alt: 'Circunstancias que impactan la salud mental del adulto mayor, click aquí para leer el post.', link: 'https://www.instagram.com/fundacion_mute/' },
    ],
])
</script>

<template>
    <div class="carousel-wrapper">
    <Carousel :items-to-show="1" :wrap-around="true" :autoplay="10000">
        
    <Slide v-for="(posts, index) in slides" :key="index">
        <div class="slide-content">

        <div class="post" v-for="post in posts" :key="post.src">
            <a :href="post.link" target="_blank" rel="noopener noreferrer">
                <img :src="post.src" :alt="post.alt" />
            <div class="post-overlay">
                <span class="post-text">{{ post.alt }}</span>
            </div>
            </a>
        </div>

        </div>
    </Slide>

    <template #addons>
        <Navigation />
        <Pagination />
    </template>

    </Carousel>
    </div>
</template>

<style scoped>
/* REQUISITO 1: El carrusel ocupa el 80% de la pantalla y está centrado */
.carousel-wrapper {
    width: 83%;
    margin: 0 auto;
}

/* REQUISITO 2: Cada slide contiene 3 elementos que ocupan el mismo espacio */
.slide-content {
    display: flex;
    justify-content: space-between;
    gap: 1rem; /* Espacio entre los posts */
    width: 100%;
    padding: 20px 5px; /* Espacio para que se vean bien las sombras o bordes */
}

.post {
    flex: 1; /* Esto hace que los 3 elementos ocupen el mismo espacio */
    height: 500px; /* Altura de ejemplo para tus posts */
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    position: relative; /* Importante para posicionar el overlay */
}

/* Estilo para el link dentro del post */
.post a {
    display: block; /* Para que ocupe todo el espacio del post */
    width: 100%;
    height: 100%;
    position: relative; /* Para que el overlay se posicione correctamente */
    overflow: hidden; /* Asegura que nada se desborde del link */
}

.post img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ajusta la imagen para cubrir el área sin distorsionarse */
    transition: transform 0.3s ease; /* Suaviza el zoom al pasar el ratón */
}

/* Estilo para el overlay (capa semitransparente) */
.post-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(156, 173, 252, 0); /* Empieza totalmente transparente */
    display: flex;
    align-items: flex-end; /* Alinea el texto a la parte inferior */
    justify-content: flex-start; /* Alinea el texto a la izquierda */
    padding: 1rem;
    opacity: 0; /* Oculto por defecto */
    transition: background-color 0.4s ease, opacity 0.4s ease; /* Transición suave */
    pointer-events: none; /* Permite clickear la imagen debajo si el overlay no tiene texto clickable */
}

/* Estilo para el texto dentro del overlay */
.post-text {
    color: white; /* Color del texto */
    font-size: 1.1rem;
    font-weight: bold;
    text-shadow: 1px 1px 3px rgba(0,0,0,0.7); /* Para que el texto resalte */
    transform: translateY(10px); /* Empieza un poco abajo */
    transition: transform 0.4s ease; /* Transición para el texto */
    text-align: left;
}

/* Animación al pasar el ratón (hover) */
.post a:hover .post-overlay {
    background-color: rgba(156, 173, 252, 0.6); /* Color semitransparente al hacer hover */
    opacity: 1; /* Se vuelve visible */
    pointer-events: auto; /* Permite interactuar con el overlay y su contenido si es necesario */
}

.post a:hover .post-text {
    transform: translateY(0); /* Sube el texto a su posición original */
}

.post a:hover img {
    transform: scale(1.05); /* Ligerísimo zoom a la imagen */
}


/* REQUISITO 3: Indicadores circulares y con color específico */
:deep(.carousel__pagination-button) {
    background-color: transparent;
}

:deep(.carousel__pagination-button::after) {
    width: 12px;
    height: 12px;
    border-radius: 50%; /* Esto los hace circulares */
    background-color: #e70000; /* Color para los indicadores inactivos */
}

:deep(.carousel__pagination-button--active::after) {
  background-color: #9CADFC; /* Color para el indicador activo */
}

/* Estilo opcional para las flechas de navegación */
:deep(.carousel__prev),
:deep(.carousel__next) {
    box-sizing: content-box;
    background-color: rgba(0, 0, 0, 0.5); /* Fondo semitransparente oscuro */
    border-radius: 50%;
    color: white; /* Color del icono en blanco sólido */
    width: 40px; /* Ancho del botón */
    height: 40px; /* Alto del botón */
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Ajustes para las flechas de navegación para que sean visibles */
:deep(.carousel__prev:hover),
:deep(.carousel__next:hover) {
    background-color: rgba(0, 0, 0, 0.8); /* Más oscuro al pasar el ratón */
    color: #9CADFC; /* Color de acento al pasar el ratón */
}   

/* Asegurarse de que las flechas tengan un tamaño decente */
:deep(.carousel__icon) {
  font-size: 2em; /* Tamaño del icono */
}

/* Posicionamiento de las flechas (opcional, si quieres ajustarlas) */
:deep(.carousel__prev) {
  left: 20px; /* Posicionado a 20px del borde izquierdo */
}

/* Posición de la flecha derecha (dentro del carrusel) */
:deep(.carousel__next) {
  right: 20px; /* Posicionado a 20px del borde derecho */
}

/* Media Queries para responsividad (ejemplo básico) */
@media (max-width: 1200px) {
    .slide-content {
    flex-direction: column; /* Apila los posts en pantallas pequeñas */
    gap: 0.5rem;
    }

    .post {
    height: 300px; /* Altura más pequeña para móviles */
    }

    .post-text {
    font-size: 0.9em;
    }
}
</style>