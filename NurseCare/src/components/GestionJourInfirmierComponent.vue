<template>
  <q-page>
    <q-markup-table flat bordered style="width: 800px;">
      <thead class="bg-teal">
        <tr>
          <th colspan="6">
            <div class="row no-wrap items-center justify-between">
              <div style="display: flex; align-items: center;">
                <q-img style="width: 40px" :ratio="1" class="rounded-borders" />
                <div class="text-h6 q-ml-md text-white">{{ dateJour }}</div>
              </div>
              <div><text style="color: white; margin-right: 16px;">Ajouter intervention au planning : </text>
                <q-btn size="13px" round color="warning" icon="add" @click="isAjoutIntervention = true" />
                <q-dialog v-model="isAjoutIntervention">
                  <AjouterInterventionAuPlanningComponent :isDisabled="false" />
                </q-dialog>
              </div>
            </div>
          </th>
        </tr>
        <tr>
          <th class="text-left">Patient</th>
          <th class="text-right">Nombre de prestation</th>
          <th class="text-right">Heure arrivée estimé </th>
          <th class="text-right">Heure départ estimé</th>
          <th class="text-right">Gérer</th>
          <th class="text-right">Gérer</th>
        </tr>
      </thead>
      <tbody :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'" v-for="(intervention, index) in interventionsDuJour"
        :key="index">
        <tr>
          <td class="text-left"> {{ intervention.Patient.id_personnel }}</td>
          <td class="text-right">{{ intervention.date_heure }}</td>
          <td class="text-right">{{ intervention.Patient.id_patient }}</td>
          <td class="text-right">{{ intervention.Patient.id_patient }}</td>
          <td class="text-right">{{ intervention.Patient.id_patient }}</td>
          <td class="text-right"> <q-btn size="10px" color="primary" label="Modifier" />
          </td>
        </tr>
      </tbody>
      <tbody :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
        <tr>
          <td class="text-left"></td>
          <td class="text-right"></td>
          <td class="text-right"></td>
          <td class="text-right"></td>
          <td class="text-right">Mon trajet :</td>
          <td class="text-right" style="padding: 10px"> <q-btn size="14px" round color="warning" icon="map"
              style="margin-right: 20px; " />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </q-page>
</template>
<aaqQ></aaqQ>
<script>
import { defineComponent, inject, ref } from 'vue'
import AjouterInterventionAuPlanningComponent from './AjouterInterventionAuPlanningComponent.vue'

export default defineComponent({
  name: 'GestionJourInfirmierComponent',
  components: { AjouterInterventionAuPlanningComponent },
  props: {
    dateDuJour: String,
    interventions: []
  },
  setup () {
    const dateJour = inject('dateDuJourSelected')
    const interventionsDuJour = inject('interventionsDuJourSelected')
    const isAjoutIntervention = ref(false)
    console.log('dateJour:', dateJour.value)
    console.log('interventionsDuJour:', interventionsDuJour.value)
    return {
      dateJour,
      interventionsDuJour,
      isAjoutIntervention
    }
  }
})
</script>
