<template>
  <q-page class="flex flex-center q-pa-md">
    <div class="center text-center">
      <h5>Espace administratif</h5>
      <BarreActionGestionAdministrative padding />
      <ListePrestationComponent />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { patients, loadPatients } from '../services/patientService'
import ListePrestationComponent from '../components/ListeInterventionComponent.vue'
import BarreActionGestionAdministrative from '../components/BarreActionGestionAdministrative.vue'

export default defineComponent({
  name: 'GererPatients',
  components: { ListePrestationComponent, BarreActionGestionAdministrative },
  setup () {
    onMounted(loadPatients)
    const isCreationPatient = ref(false)
    return {
      patients,
      isCreationPatient
    }
  }
})
</script>
