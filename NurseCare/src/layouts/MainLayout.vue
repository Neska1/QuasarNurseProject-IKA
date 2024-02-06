<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated v-if="shouldShowHeader" >
      <q-toolbar>
        <!-- <q-btn class="btn-menu" flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen"/> -->
        <router-link to="/" style="color: inherit; font-size: inherit; font-weight: inherit; text-decoration: none;">
          <q-toolbar-title>
            NurseCare
          </q-toolbar-title>
        </router-link>
        <q-btn v-if="isAuthenticated" flat icon-right="account_circle" label="" class="absolute-right" @click="logout" to="/se-connecter" />
        <!-- <div><text-h6><a text-center class="btn-connexion" href="{{ path('app_login')}}" role="button">Se connecter</a></text-h6></div> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-if="shouldShowHeader" class="desktop-drawer" elevated v-model="leftDrawerOpen" :breakpoint="767" show-if-above bordered :width="230">
      <q-list>
        <q-item-label header>
          Naviguer</q-item-label>

        <q-item v-for="nav in navs" :key="nav.label" clickable exact :to="nav.to">
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
            <!-- <q-item-label caption>quasar.dev</q-item-label> -->
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-footer> <q-tabs>
        <q-route-tab v-for="nav in navs" :key="nav.label" clickable :to="nav.to" exact :icon="nav.icon"
          :label="nav.label"></q-route-tab>
      </q-tabs> </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { logout } from '../helpers/authHelpers'

export default defineComponent({
  name: 'MainLayout',
  computed: {
    shouldShowHeader () {
      // Vérifier si l'utilisateur est authentifié et n'est pas sur la page de connexion
      return this.isAuthenticated && this.$route.path !== '/se-connecter'
    }
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const router = useRouter()
    const isAuthenticated = localStorage.getItem('userToken') !== null
    console.log(isAuthenticated + 'ici')

    if (!isAuthenticated) {
      router.push('/se-connecter')
    }

    return {
      leftDrawerOpen,
      isAuthenticated,
      logout,
      navs: [
        {
          label: 'Rendez-vous (I)',
          icon: 'event',
          to: '/gestion-rdv'
        },
        {
          label: 'Gestion (ADM)',
          icon: 'event',
          to: '/gestion-administrative'
        },
        {
          label: 'Tableau de bord (DIR)',
          icon: 'radar',
          to: '/espace-direction'
        },
        {
          label: 'Patients',
          icon: 'face',
          to: '/patients'
        },
        {
          label: 'Catalogue des soins',
          icon: 'list',
          to: '/catalogue'
        },
        {
          label: 'Mon espace',
          icon: 'settings',
          to: '/mon-espace'
        }
      ]
    }
  }
})
</script>

<style lang="scss">
@media screen and (min-width: 750.5px) {
  .q-footer {
    display: none;
  }
}

.q-drawer {
  .q-router-link--exact-active {
    color: $primary !important;
  }
}

/* .desktop-drawer {
  background-color: blue;
} */
/* @media screen and (max-width: 767px) {
  .btn-menu {
    display: none;
  }
} */
</style>
