import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
//Import BLOG
import BlogList from '../views/BlogList.vue';
import BlogPost from '../views/BlogPost.vue';
import AdminPanel from '../views/AdminPanel.vue';
import AdminEdit from '../views/AdminEdit.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, },
    { path: '/blog', name: 'Blog de noticias', component: BlogList, },
    { path: '/blog/:slug', name: 'BlogPost', component: BlogPost, props: true }, // Ruta dinámica
    { path: '/7*!@mAzH782K0zSq413mA-67=zXm(sI', name: 'AdminPanel', component: AdminPanel },
    {
      path: '/7*!@mAzH782K0zSq413mA-67=zXm(sI/edit/:id', 
      name: 'AdminEdit',
      component: AdminEdit,
      props: true 
    }
  ],
    scrollBehavior(to, from, savedPosition) {
    // Si el usuario usa los botones de atrás/adelante del navegador, vuelve a la posición guardada
      if (savedPosition) {
      return savedPosition;
    }

    // Si la ruta tiene un "hash" (ej: /#sobre-nosotros), desplázate a ese elemento
    if (to.hash) {
      return {
        el: to.hash,      // El selector del elemento (ej: '#sobre-nosotros')
        behavior: 'smooth', // Habilita el scroll suave y animado
        top: 80,          // Opcional: un offset para que el navbar no tape el título
      };
    }

    // Si no, simplemente vuelve al inicio de la página
      return { top: 0, behavior: 'smooth' };
  },
})

export default router
