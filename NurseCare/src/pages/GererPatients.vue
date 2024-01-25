<template>
  <q-page padding>
    <h5 style="margin-left: 20px;" >Liste des patients</h5>
    <p style="margin-left: 20px;" >Cliquez sur un patient pour le consulter.</p>
    <div class="q-pa-md" style="max-width: 350px">
      <q-list bordered separator v-for="patient in patients" :key="patient.p_id">
        <q-item clickable v-ripple @click="openPatientDialog(patient)">
          <q-item-section> {{ patient.nom }} {{ patient.prenom }}</q-item-section>
          <q-item-section side>
            <q-icon name="visibility_out" size="xs" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <q-dialog v-model="isDialogOpen" >
      <q-card style="min-width: 250px;" >
        <q-card-section >
          <div class="text-h6"> {{ selectedPatient?.nom }} {{ selectedPatient?.prenom }}</div>
          <br>
          <div class="text"> Age </div>
          <div class="text"> Adresse </div>
          <div class="text"> Soins associés </div>
          <!-- Ajoutez d'autres informations du patient ici -->
        </q-card-section>
        <q-card-actions>
          <q-btn flat label="Fermer" color="primary" v-close-popup />
          <q-btn flat label="Éditer" color="primary" @click="handleUpdatePatient" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { patients, loadPatients, updatePatient } from '../services/patientService'
import { Patient } from '../models/patient.model'

export default defineComponent({
  name: 'GererPatients',
  setup () {
    onMounted(loadPatients)

    const selectedPatient = ref<Patient | null>(null)
    const isDialogOpen = ref(false)

    const openPatientDialog = (patient: Patient) => {
      selectedPatient.value = patient
      isDialogOpen.value = true
    }

    const handleUpdatePatient = async () => {
      if (selectedPatient.value) {
        await updatePatient(selectedPatient.value.p_id, selectedPatient.value)
        // Vous pouvez ajouter une logique pour fermer le dialogue ou afficher un message
        isDialogOpen.value = false
      }
    }

    return {
      patients,
      selectedPatient,
      isDialogOpen,
      openPatientDialog,
      handleUpdatePatient
    }
  }
})
</script>
