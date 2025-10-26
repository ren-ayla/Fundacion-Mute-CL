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
  if (savedPosition) {
    return savedPosition;
  }

  if (to.hash) {
    const screenWidth = window.innerWidth;
    
    // Define tus breakpoints (puedes usar los de Bootstrap)
    const mobileBreakpoint = 768; // Fin de 'sm' (inicio de 'md')
    const tabletBreakpoint = 1400; // Fin de 'md' (inicio de 'lg') 
    
    // Elige el offset según el tamaño
    let offset;
    if (screenWidth < mobileBreakpoint) {
      // Móvil
      offset = 450; // <-- Ajusta para móvil
    } else if (screenWidth < tabletBreakpoint) {
      // Tablet (entre 768px y 1400px)
      offset = 455; // <-- Ajusta para tablet
    } else {
      // Escritorio (992px o más)
      offset = 120; // <-- Tu valor para escritorio
    }

    return {
      el: to.hash,
      behavior: 'smooth',
      top: offset, // <-- Usa el offset calculado
    };
  }

  return { top: 0, behavior: 'instant' };
},
})

export default router
