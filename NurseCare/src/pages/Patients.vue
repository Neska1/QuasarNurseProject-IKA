<template>
  <q-page padding>
    <p>Patients</p>

    <div>
      <ul>
        <li v-for="patient in patients" :key="patient.p_id">
          {{ patient.nom }} {{ patient.prenom }}
        </li>
      </ul>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import type { Patient } from '../models/patient.model'

export default defineComponent({
  name: 'GererPatients',
  setup () {
    const patients = ref<Patient[]>([])

    const loadPatients = async () => {
      try {
        const response = await api.get('/patients')
        patients.value = response.data
      } catch (error) {
        console.error('Erreur lors de la récupération des patients:', error)
      }
    }
    onMounted(loadPatients)
    return {
      patients
    }
  }
})
</script>
