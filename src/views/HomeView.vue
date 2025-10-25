<script setup>
import { onMounted, onUnmounted } from 'vue'; // Importa onMounted y onUnmounted
import { setActiveSection } from '../store/navigationStore'; // Importa la función del store
import CarouselNewsItem from '@/components/CarouselNewsItem.vue';
import CarouselInstagramItem from '../components/CarouselInstagramItem.vue';
import CarouselItem from '@/components/CarouselItem.vue';

let observer;

// onMounted se ejecuta cuando el componente está listo en la página
onMounted(() => {
  // Opciones para el observador. El 'rootMargin' hace que la sección se active un poco antes de llegar al borde superior,
  // lo que da una sensación más natural.
    const options = {
    rootMargin: "-30% 0px -70% 0px",
    };

  // El observador se crea con una función "callback" que se ejecuta cada vez que una sección entra o sale del área visible.
    observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
        // Si la sección está visible, actualizamos el store con su ID.
        setActiveSection(entry.target.id);
        }
    });
    }, options);

  // Le decimos al observador qué elementos debe vigilar.
  // En este caso, todas las secciones que tengan un ID.
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));
});

// onUnmounted se ejecuta antes de que el componente se destruya. Es una buena práctica "limpiar" el observador.
onUnmounted(() => {
    if (observer) {
    observer.disconnect();
    }
    setActiveSection(''); // Limpia la sección activa al salir de la página
});
</script>

<template>
    <main> 

    <CarouselItem/>    
    
    <section id="sobre-nosotros">
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

    <section class="carousel-instagram-section" id="nuestro-trabajo">
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