<template>
  <q-page padding>
    <p>Espace administratif</p>
    <p> Consultation des intervention et les passer comme traités </p>
    <p> Création, modification et suppression de rendez-vous </p>
    <q-btn class="mr-left" @click="isCreationPatient = true" round dense color="primary" size="20px" icon="add" />
          <span class="text-right mr-left">Ajouter un patient (DIRECTEUR)</span>
          <br>
          <div>
            <q-dialog v-model="isCreationPatient">
              <AjouterPatientComponent :isDisabled="false"  />
            </q-dialog>
          </div>

          <ListePrestationComponent></ListePrestationComponent>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { patients, loadPatients } from '../services/patientService'
import AjouterPatientComponent from '../components/AjouterPatientComponent.vue'
import ListePrestationComponent from '../components/ListeInterventionComponent.vue'

export default defineComponent({
  name: 'GererPatients',
  components: { AjouterPatientComponent, ListePrestationComponent },
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
