<template>
  <q-page padding>
    <p>Espace direction</p>

  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { patients, loadPatients } from '../services/patientService'

export default defineComponent({
  name: 'GererPatients',
  setup () {
    onMounted(loadPatients)
    return {
      patients
    }
  }
})
</script>
