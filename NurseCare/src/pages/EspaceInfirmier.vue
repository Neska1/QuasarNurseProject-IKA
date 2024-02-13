<template>
  <q-page class="flex flex-center">
    <div class="column items-center q-pa-md" style="max-width: 900px; width: 100%;">
      <div class="text-h5 q-py-md">Planning du jour</div>
      <div class="q-pa-md" style="width: 100%; max-width: 300px;">
        <DateNavigueOneComponent :dateSelectedProp="dateDuJour" @update:dateSelected="(val: string) => dateDuJour = val" @dateChanged="chargerInterventionsDuJour" />
      </div>
      <div class="q-pa-md" style="width: 100%;">
        <GestionJourInfirmierComponent :appointments="interventionsDuJour" :date="dateDuJour" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, watch, provide } from 'vue'
import GestionJourInfirmierComponent from 'src/components/GestionJourInfirmierComponent.vue'
import { getInterventionsByDateAndPatient } from 'src/services/interventionService'
import { Intervention } from 'src/models/intervention.model'
import DateNavigueOneComponent from 'src/components/DateNavigueOneComponent.vue'

export default defineComponent({
  name: 'RendezVous',
  components: {
    GestionJourInfirmierComponent,
    DateNavigueOneComponent
  },
  setup () {
    const interventionsDuJour = ref([] as Intervention[])
    const dateDuJour = ref(new Date().toISOString().split('T')[0])

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
      interventionsDuJour,
      chargerInterventionsDuJour
    }
  }
})
</script>
