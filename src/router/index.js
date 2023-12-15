import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

 const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/item',
    name: 'App',
      component: () => import('@/views/ItemIndexView.vue'),
    children: [
        {
        path: '/item/:id',
        name: 'Item Details',
        component: () => import('@/views/ItemDetailsView.vue')
      },
      {
        path: '/items/new',
        name: 'ItemNew',
        // component: () => import('@/views/ItemNewView.vue')
      }
    ]
  },
  {
    path: '/contact',
    name: 'Contact us',
    component: () => import('@/views/ContactView.vue')
  },
  {
    path: '/user/:userId',
    name: 'Profile',
    component: () => import('@/views/UserView.vue')
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/AboutView.vue')
  }
]

export const routing = routes.map(route => ({path: route.path, name: route.name}))

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
