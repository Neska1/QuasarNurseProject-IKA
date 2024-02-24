import { RouteRecordRaw } from 'vue-router'
import { checkAuthentication } from './index'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/HomeAccueil.vue'),
        beforeEnter: checkAuthentication
      },
      {
        path: '/espace-infirmier',
        component: () => import('pages/EspaceInfirmier.vue'),
        beforeEnter: checkAuthentication
      },
      {
        path: '/patients',
        component: () => import('pages/GererPatients.vue'),
        beforeEnter: checkAuthentication
      },
      {
        path: '/mon-espace',
        component: () => import('pages/MonEspace.vue'),
        beforeEnter: checkAuthentication
      },
      {
        path: '/se-connecter',
        component: () => import('pages/Authentification.vue')
      },
      {
        path: '/gestion-administrative',
        component: () => import('pages/EspaceAdministratif.vue')
      },
      {
        path: '/catalogue',
        component: () => import('pages/CatalogueSoins.vue')
      },
      {
        path: '/espace-direction',
        component: () => import('pages/EspaceDirection.vue')
      }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
