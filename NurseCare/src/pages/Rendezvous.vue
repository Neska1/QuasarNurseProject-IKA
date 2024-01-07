<template>
  <q-page padding >
    <p>Mes rendez-vous</p>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RendezVous',

  setup () {
    return {
      tasks: [{
        id: 1,
        name: ''
      }]
    }
  }
})
</script>
