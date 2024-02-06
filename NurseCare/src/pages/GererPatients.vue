<template>
  <q-page padding>
    <div class="q-pa-md example-row-stacked-to-horizontal">
      <div class="row">
        <div class="col-12 col-md-8">
          <h5 class="mr-left">Liste des patients</h5>
          <p class="mr-left">Cliquez sur un patient pour le consulter.</p>
          <div class="q-pa-md" style="max-width: 350px">
            <q-list bordered separator v-for="patient in patients" :key="patient.id_patient">
              <q-item clickable v-ripple @click="ouvrirConsultationPatient(patient)">
                <q-item-section> {{ patient.nom }} {{ patient.prenom }}</q-item-section>
                <q-item-section side>
                  <q-icon name="visibility_out" size="xs" />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <q-dialog v-model="isConsultationPatientOpen">
            <q-card style="min-width: 250px;">
              <q-toolbar>
                <q-toolbar-title>
                  <span class="text-weight-bold" style=":padding-top: 15px;">Consulter un patient</span>
                </q-toolbar-title>
                <q-btn flat round dense icon="close" v-close-popup />
              </q-toolbar>
              <ConsulterPatientComponent :patientToEdit="selectedPatient" :isDisabled="true" />
              <q-card-actions>
                <q-btn flat label="Fermer" color="primary" v-close-popup />
                <q-btn flat label="Éditer" color="primary" @click="ouvrirEditionPatient(selectedPatient)" />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <q-dialog v-model="isEditionPatient" persistent transition-show="scale" transition-hide="scale">
            <q-card class="bg-teal text-white" style="width: 300px">
              <AjouterPatientComponent :patientToEdit="patientToEdit" @close="isEditionPatient = false"
                @patient-added="loadPatients" :isDisabled="false" />
            </q-card>
          </q-dialog>
        </div>
        <div class="col-12 col-md-4" style="margin-top: 90px;">

        </div>
      </div>

    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { patients, loadPatients, updatePatient } from '../services/patientService'
import { Patient } from '../models/patient.model'
import AjouterPatientComponent from '../components/AjouterPatientComponent.vue'
import { calculerAge } from '../helpers/patientHelper'
import ConsulterPatientComponent from '../components/ConsulterPatientComponent.vue'

export default defineComponent({
  name: 'GererPatients',
  components: { AjouterPatientComponent, ConsulterPatientComponent },
  setup () {
    onMounted(loadPatients)
    const selectedPatient = ref<Patient>({
      nom: '',
      prenom: '',
      date_naissance: '',
      rue: '',
      ville: '',
      code_postal: '',
      id_patient: 0
    })
    const isConsultationPatientOpen = ref(false)
    const isEditionPatient = ref(false)
    const patientToEdit = ref<Patient>({
      nom: '',
      prenom: '',
      date_naissance: '',
      rue: '',
      ville: '',
      code_postal: '',
      id_patient: 0
    })

    const ouvrirConsultationPatient = (patient: Patient) => {
      selectedPatient.value = patient
      isConsultationPatientOpen.value = true
    }

    const handleUpdatePatient = async () => {
      if (selectedPatient.value) {
        await updatePatient(selectedPatient.value.id_patient, selectedPatient.value)
        isConsultationPatientOpen.value = false
      }
    }

    const ouvrirEditionPatient = (patient: Patient) => {
      patientToEdit.value = patient
      isEditionPatient.value = true
      isConsultationPatientOpen.value = false
    }

    return {
      patients,
      selectedPatient,
      isConsultationPatientOpen,
      ouvrirConsultationPatient,
      ouvrirEditionPatient,
      handleUpdatePatient,
      calculerAge,
      patientToEdit,
      isEditionPatient,
      loadPatients
    }
  }
})
</script>

<style lang="scss">
.mr-left {
  margin-left: 20px;
}
</style>
