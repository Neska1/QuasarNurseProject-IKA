<template>
  <q-page padding>
    <p>Mes rendez-vous</p>
    <div class="q-pa-md example-row-equal-width" style="display: flex; justify-content: center;">
      <div class="col">
        <q-date v-model="dateDuJour"></q-date>
      </div>

      <div class="col">
        <div class="q-pa-md">
          <GestionJourInfirmierComponent :appointments="interventionsDuJour" :date="dateDuJour" />
        </div>
      </div>
    </div>
  </q-page>
</template>
<script lang="ts">
import { defineComponent, ref, watch, provide } from 'vue'
import GestionJourInfirmierComponent from 'src/components/GestionJourInfirmierComponent.vue'
import { getInterventionsByDateAndPatient } from 'src/services/interventionService'
import { Intervention } from 'src/models/intervention.model'

export default defineComponent({
  name: 'RendezVous',
  components: {
    GestionJourInfirmierComponent
  },
  setup () {
    const interventionsDuJour = ref([] as Intervention[])
    const dateDuJour = ref('')

    provide('dateDuJourSelected', dateDuJour)

    const chargerInterventionsDuJour = async () => {
      if (dateDuJour.value) {
        const personnelId = 1
        const response = await getInterventionsByDateAndPatient(dateDuJour.value, personnelId)
        console.log(response)
        interventionsDuJour.value = response
      }
    }

    provide('interventionsDuJourSelected', interventionsDuJour)

    watch(dateDuJour, chargerInterventionsDuJour, { immediate: true })
    watch(interventionsDuJour, () => console.log('interventionsDuJour:', interventionsDuJour.value))

    return {
      dateDuJour,
      interventionsDuJour
    }
  }
})
</script>
