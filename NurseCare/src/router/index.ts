import { route } from 'quasar/wrappers'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteLocationNormalized,
  NavigationGuardNext
} from 'vue-router'

import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  return Router
})

export function checkAuthentication (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const userToken = localStorage.getItem('userToken')

  // Vérifiez si l'utilisateur a un token JWT valide dans le localStorage
  if (userToken) {
    // Si l'utilisateur a un token JWT valide, il est authentifié
    // Vous pouvez ajouter d'autres vérifications de sécurité ici si nécessaire
    next()
  } else {
    // Si l'utilisateur n'a pas de token JWT valide, redirigez-le vers la page de connexion
    next('/se-connecter')
  }
}
