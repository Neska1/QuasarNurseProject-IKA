<template>
  <q-page class="row justify-center">
    <div
      class="column items-center q-pa-md"
      style="max-width: 900px; width: 100%;"
    >
      <p class="text-h6 text-weight-light">
        Espace Infirmier
      </p>
      <div
        class="q-pa-md"
        style="width: 100%; max-width: 300px;"
      >
        <DateNavigueOneComponent
          :date-selected-prop="dateSelected"
          @update:date-selected="(val: string) => dateSelected = val"
          @date-changed="chargerInterventionsDuJour"
        />
      </div>
      <div
        class="q-pa-md"
        style="width: 100%;"
      >
        <ConsulterRendezVousComponent
          :interventions="interventionsDuJour"
          :prestations-par-intervention="prestationsParIntervention"
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, watch, provide, computed } from 'vue'
import ConsulterRendezVousComponent from '../components/ConsulterRendezVousComponent.vue'
import { getInterventionsByDateAndPatient } from 'src/services/interventionService'
import { Intervention } from 'src/models/intervention.model'
import { DateTimeOptions } from 'vue-i18n'
import { premiereLettreUpperCase } from 'src/helpers/formatHelper'
import DateNavigueOneComponent from 'src/components/utils/DateNavigueOneComponent.vue'
import { recupererPrestationsDuneIntervention } from 'src/services/prestationService'
import { Prestation } from 'src/models/prestation.model'

export default defineComponent({
  name: 'ConsultationInfirmier',
  components: {
    ConsulterRendezVousComponent,
    DateNavigueOneComponent
  },
  setup () {
    const dateSelected = ref(new Date().toISOString().split('T')[0])
    const interventionsDuJour = ref([] as Intervention[])
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const prestationsParIntervention = ref({} as { [key: number]: Prestation[] })

    const dateDuJour = computed(() => {
      const dateDuJourToString = new Date(dateSelected.value).toLocaleDateString('fr-FR', options as DateTimeOptions)
      return premiereLettreUpperCase(dateDuJourToString)
    })

    provide('dateDuJourSelected', dateSelected)

    const chargerInterventionsDuJour = async () => {
      if (dateSelected.value) {
        const personnelId = 1 // A CHANGER POUR ROLE
        const response = await getInterventionsByDateAndPatient(dateSelected.value, personnelId)
        interventionsDuJour.value = response as Intervention[]

        // Réinitialisation
        for (const key in prestationsParIntervention.value) {
          if (Object.prototype.hasOwnProperty.call(prestationsParIntervention.value, key)) {
            delete prestationsParIntervention.value[key]
          }
        }

        // Charger les presta
        await Promise.all(interventionsDuJour.value.map(async (intervention) => {
              try {
                const response = await recupererPrestationsDuneIntervention(intervention.id_intervention);
                const prestations = response as Prestation[]
                prestationsParIntervention.value[intervention.id_intervention] = prestations;
                console.log('prestationsParIntervention', prestationsParIntervention.value);
              } catch (error) {
                console.error('Error fetching prestations for intervention:', error);
              }
            }))
      }
    }

    provide('interventionsDuJourSelected', interventionsDuJour)

    watch(dateSelected, chargerInterventionsDuJour, { immediate: true })
    watch(interventionsDuJour, () => console.log('interventionsDuJour:', interventionsDuJour.value))

    return {
      dateSelected,
      interventionsDuJour,
      dateDuJour,
      chargerInterventionsDuJour,
      prestationsParIntervention
    }
  }
})
</script>
