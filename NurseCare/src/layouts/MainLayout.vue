<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar>
        <!-- <q-btn class="btn-menu" flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen"/> -->
        <q-toolbar-title>
          NurseCare
        </q-toolbar-title>

        <div> Aide </div>
      </q-toolbar>
    </q-header>

    <q-drawer class="desktop-drawer" v-model="leftDrawerOpen" :breakpoint="767" show-if-above bordered :width="230">
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
        <q-route-tab v-for="nav in navs" :key="nav.label" clickable :to="nav.to" exact :icon="nav.icon" :label="nav.label"></q-route-tab>
      </q-tabs> </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      navs: [
        {
          label: 'Rendez-vous',
          icon: 'event',
          to: '/'
        },
        {
          label: 'Patients',
          icon: 'list',
          to: '/patients'
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
.q-footer{
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
