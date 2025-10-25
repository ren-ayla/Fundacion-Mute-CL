<script setup>
// Importamos los componentes de Vue Router
import NavbarItem from './components/NavbarItem.vue';
import FooterItem from './components/FooterItem.vue';
import FormItem from './components/FormItem.vue';
import { RouterView } from 'vue-router'
</script>

<template>
  <header id="inicio">
    <NavbarItem></NavbarItem>
  </header>

  <RouterView />

  <FormItem></FormItem>

  <FooterItem></FooterItem>
</template>

<style>
/*ACTIVAMOS SCROLL SUAVE A PAGINA GLOBAL*/
html {
  scroll-behavior: smooth;
}
* {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    list-style: none;
}

.nav-item {
    list-style: none;
}
#navbar {
    background-color: #f6f1f4;
    font-family: "Roboto", sans-serif;
    font-size: 1.1rem;
    font-weight: 400;
    color: #333333;
}
.nav-link:hover {
    transform: scale(1.1);
    cursor: pointer;
    transition: transform 0.3s ease;
}
a{
    text-decoration: none;
}

.breadcrumb a {
  color: #212529; /* Color de texto oscuro estándar, en lugar del azul */
  text-decoration: none; /* Quitamos el subrayado por defecto */
}

/* Opcional: añade un subrayado al pasar el ratón para indicar que es un enlace */
.breadcrumb a:hover {
  text-decoration: underline;
}

/* Estilo para el elemento activo (la página actual) */
.breadcrumb .active {
    color: #6c757d; /* Un color gris para indicar que no es un enlace */
}
</style>