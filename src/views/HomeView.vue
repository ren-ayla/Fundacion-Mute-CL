<script setup>
import CarouselNewsItem from '@/components/CarouselNewsItem.vue';
import CarouselInstagramItem from '../components/CarouselInstagramItem.vue';
import CarouselItem from '@/components/CarouselItem.vue';
</script>

<template>
    <main> 

    <CarouselItem/>    
    
    <section id="sobre-nosotros" class="page-section">
        <div class="container text-center mt-5 mb-4">
            <div class="row">
                <div class="col-1">
                    <!--Espacio-->
                </div>
                <div class="col">
                    <h1 id="main-title">
                        Sobre Nosotr@s
                    </h1>
                </div>
                <div class="col-1">
                    <!--Espacio-->
                </div>  
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-1">
                    <!--Espacio-->
                </div>
                <div class="col">
                    <h1 id="main-title-text">
                        Somos una organización sin fines de lucro dedicada a brindar apoyo integral a personas adultas mayores. 
                        Nuestro propósito es promover el bienestar, el buen vivir y el acceso a una vejez saludable, a través de 
                        asistencia material, acompañamiento psicosocial, talleres culturales e integrativos, y programas orientados a 
                        fortalecer la autoestima así como fomentar una vida social activa durante la adultez mayor.
                    </h1>
                </div>
                <div class="col-1">
                    <!--Espacio-->
                </div>  
            </div>
        </div>
    </section>

    <div class="container">
        <br>
        <hr>
    </div>

    <section class="carousel-blog-section" id="blog">
        <div>
            <h1 id="main-title" class="text-center pb-2 pt-4">Nuestro Blog</h1>
        </div>
        <CarouselNewsItem/>
    </section>

    <section class="carousel-instagram-section page-section" id="nuestro-trabajo">
        <div>
            <h1 id="main-title">Nuestro Trabajo</h1>
        </div>

        <CarouselInstagramItem/>
    </section>


    </main>
</template>

<style scoped>

/*-- AJUSTES PARA MAIN DE HOME (DESDE EL CAROUSEL HACIA ABAJO)--*/
    #main-title {
        font-size: 2rem;
        font-family: 'Oswald', sans-serif;
        color: #333333;
        letter-spacing: 0.01rem;
    }

    #main-title-text{
        font-size: 1.6rem;
        font-family: 'Oswald', sans-serif;
        color: #444444;
        font-weight: 300;
        text-align: center;
        text-wrap: pretty;
        hyphens: auto;
        letter-spacing: 0.02rem;
    }

    .main-title-text-highlight {
        color: #AE85CE;
        font-weight: bold;
    }

/* AJUSTES PARA TERCER CAROUSEL (INSTAGRAM) */
    .carousel-instagram-section {
    text-align: center;
    margin-top: 40px;
    }
</style>