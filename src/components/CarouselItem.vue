<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

// 1. Array con la información de los slides
const slides = ref([
  {
    imgName: 'carousel_1.webp',
    alt: 'Ojos adulto mayor con expresión esperanzadora',
    titleHtml: '<span class="mute-text-carousel">MUTE</span> ES UN COMPROMISO CON LA INTEGRIDAD E INCLUSIÓN DE LOS ADULTOS MAYORES EN LA REGIÓN DEL BÍO-BÍO.',
    buttonText: 'CONOCER MÁS',
    link: '/#sobre-nosotros'
  },
  {
    imgName: 'carousel_2.webp',
    alt: 'Adulta mayor con mirada pensativa',
    titleHtml: 'LOS ADULTOS MAYORES TIENEN VOZ Y MERECEN SER ESCUCHADOS, <br/><span class="mute-text-carousel3">VIVIR CON DIGNIDAD, SIN TEMOR A LA SOLEDAD, A LA POBREZA O LA EXCLUSIÓN.</span>',
    buttonText: 'LEER MÁS',
    link: '/blog'
  },
  {
    imgName: 'carousel_3.webp',
    alt: 'Adulto mayor dando la espalda caminando hacia el horizonte',
    titleHtml: 'LA ADULTEZ MAYOR MERECE RESPETO Y LA POSIBILIDAD DE VIVIR UNA VEJEZ SALUDABLE.<br><br><span class="mute-text-carousel2">TU APORTE NOS PERMITE SEGUIR AYUDANDO.</span>',
    buttonText: 'CONOCER MÁS',
    link: '/#nuestro-trabajo'
  },
  {
    imgName: 'carousel_4.webp',
    alt: 'Adulta mayor con mirando por la ventana hacia afuera',
    titleHtml: 'CERCA DEL <span class="mute-text-carousel">32% DE ADULTOS MAYORES (≈840.000)</span> <br>NO ALCANZAN A CUBRIR SUS NECESIDADES BÁSICAS DEBIDO A PENSIONES INSUFICIENTES.',
    buttonText: 'LEER MÁS',
    link: '/blog'
  },
  {
    imgName: 'carousel_5.webp',
    alt: 'Adulto mayor sosteniendo su cara con sus manos',
    titleHtml: '<span class="mute-text-carousel2">¡BASTA DE SILENCIAR A LOS ADULTOS MAYORES!</span> ES HORA DE ESCUCHAR SU VOZ, SUS HISTORIAS, NECESIDADES Y SUEÑOS.',
    buttonText: 'CÓMO AYUDAR',
    link: '/#contacto'
  }
]);

function getImageUrl(name) {
  // Asume que las imágenes están en /src/assets/img/views/
  return new URL(`../assets/img/views/${name}`, import.meta.url).href;
}

</script>

<template>
    <section id="inicio">
        <div id="mainCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="10000"> 
            
            <div class="carousel-indicators">
                <button 
                    v-for="(slide, index) in slides"
                    :key="index"
                    type="button" 
                    data-bs-target="#mainCarousel" 
                    :data-bs-slide-to="index"
                    :class="{ active: index === 0 }"
                    :aria-current="index === 0 ? 'true' : 'false'"
                    :aria-label="`Diapositiva ${index + 1}`">
                </button>
            </div>

            <div class="carousel-inner">
                <div 
                    v-for="(slide, index) in slides"
                    :key="slide.alt"
                    class="carousel-item" 
                    :class="{ active: index === 0 }">
                    
                    <img :src="getImageUrl(slide.imgName)" class="d-block w-100" :alt="slide.alt">
                    
                    <div class="carousel-caption caption-bottom-left text-start">
                        <hr>
                        <h1 class="carousel-title" v-html="slide.titleHtml"></h1>
                        <hr>
                        <RouterLink :to="slide.link">
                            <button class="button-carousel">{{ slide.buttonText }}</button>
                        </RouterLink>
                    </div>
                </div>
            </div>

            <button class="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Anterior</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Siguiente</span>
            </button>
        </div>
    </section> 
</template>

<style scoped>
/*--VELOCIDAD TRANSICIÓN CARRUSEL--*/
:global(#mainCarousel .carousel-item) {
    transition: transform 0.6s ease-in-out;
}
/*FIX PARA QUE BOTÓN QUEDE POR ENCIMA DEL CAROUSEL */
.button-carousel {
    position: relative;
    z-index: 10;
}

/* ---- ESTILOS GENERALES DEL CARRUSEL ---- */
.carousel-item {
    height: 86vh; /* Altura del carrusel: 86% de la altura de la pantalla default */
    min-height: 350px;
    background-color: #f8f9fa; /* Color de fondo mientras carga la imagen */
    transition: transform 0.3s ease-in-out;
    font-family: 'Oswald', sans-serif;
}
.carousel-item img {
    object-fit: cover; /* Hace que la imagen cubra el contenedor sin deformarse */
    width: 100%;
    height: 100%;
}

.button-carousel{
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
.button-carousel:hover {
    background-color: #9CADFC;
}

/* ---- TITULOS (CSS RESPONSIVO) ---- */
/* 1. Estilo base (Mobile First) */
.carousel-title {
    font-size: 1.7rem;
}

/* 2. Estilo para Tablet (Bootstrap: md) */
@media (min-width: 768px) {
    .carousel-title {
        font-size: 2.3rem;
    }
    .carousel-indicators {
        display: flex; /* Oculta indicadores en móvil, muéstralos en tablet+ */
    }
}

/* 3. Estilo para Escritorio (Bootstrap: xl) */
@media (min-width: 1200px) {
    .carousel-title {
        font-size: 2.4rem;
    }
}

/* SUBRAYADOS CON COLOR EN TITULOS CAROUSEL */
/* :deep() es necesario para aplicar estilos a v-html */
:deep(.mute-text-carousel){
    color: #AE85CE;
    font-weight: bold;
}
:deep(.mute-text-carousel2){
    color: #9CADFC;
    font-weight: bold;
}
:deep(.mute-text-carousel3){
    color: #9CADFC; /* Color de ejemplo, ajústalo */
    font-weight: bold;
}


/* ---- ESTILOS PARA EL TEXTO Y SU POSICIÓN ---- */
.carousel-caption {
    position: absolute;
    right: auto;
    bottom: auto;
    left: auto;
    top: auto;
    padding: 1rem 1.5rem;
    text-shadow: black 0.1em 0.1em 0.2em;
    border-radius: 0.5rem;
    max-width: 80%;
    animation: fadeIn 0.5s ease-in-out;
}
.caption-bottom-left {
    bottom: 12%;
    left: 7%;
}
/* (Aquí irían tus otras clases de posición si las necesitas) */


/* Animación Keyframes */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
/* ---- AJUSTES PARA PANTALLAS MEDIANAS TABLET HACIA ABAJO (RESPONSIVO) ---- */
@media (max-width: 768px) {
    .carousel-item {
        height: 70vh; /* Menor altura en pantallas pequeñas */
    }
     /* Oculta indicadores en pantallas pequeñas */
    .carousel-indicators {
        display: none;
    }
}
</style>