import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/usuario',
    name: 'Usuario',
    component: () => import('../views/Usuario.vue')
  },
  {
    path: '/prestamo',
    name: 'Prestamo',
    component: () => import('../views/Prestamo.vue')
  },
  {
    path: '/libro',
    name: 'Libro',
    component: () => import('../views/Libro.vue')
  }
]


const router = new VueRouter({
  routes
})

export default router
