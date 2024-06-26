<template>
  <q-page padding>
    <div class="q-pa-md example-row-stacked-to-horizontal">
      <div class="row">
        <div class="col-12 col-md-8">
          <h5 class="mr-left">
            Liste des patients
          </h5>
          <p class="mr-left">
            Cliquez sur un patient pour le consulter.
          </p>
          <div
            class="q-pa-md"
            style="max-width: 350px"
          >
            <q-list
              v-for="patient in patients"
              :key="patient.id_patient"
              bordered
              separator
            >
              <q-item
                v-ripple
                clickable
                @click="ouvrirConsultationPatient(patient)"
              >
                <q-item-section> {{ patient.nom }} {{ patient.prenom }}</q-item-section>
                <q-item-section side>
                  <q-icon
                    name="visibility_out"
                    size="xs"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <q-dialog v-model="isConsultationPatientOpen">
            <q-card style="min-width: 250px;">
              <q-toolbar>
                <q-toolbar-title>
                  <span
                    class="text-weight-bold"
                    style="padding-top: 15px;"
                  >Consulter un patient</span>
                </q-toolbar-title>
                <q-btn
                  v-close-popup
                  flat
                  round
                  dense
                  icon="close"
                />
              </q-toolbar>
              <ConsulterPatientComponent
                :patient-to-edit="selectedPatient"
                :is-disabled="true"
              />
              <q-card-actions>
                <q-btn
                  v-close-popup
                  flat
                  label="Fermer"
                  color="primary"
                />
                <q-btn
                  flat
                  label="Éditer"
                  color="primary"
                  @click="ouvrirEditionPatient(selectedPatient)"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <q-dialog
            v-model="isEditionPatient"
            persistent
            transition-show="scale"
            transition-hide="scale"
          >
            <q-card
              class="bg-teal text-white"
              style="width: 300px"
            >
              <AjouterPatientComponent
                :patient-to-edit="patientToEdit"
                :is-disabled="false"
                @close="isEditionPatient = false"
                @patient-added="loadPatients"
              />
            </q-card>
          </q-dialog>
        </div>
        <div
          class="col-12 col-md-4"
          style="margin-top: 90px;"
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { patients, loadPatients, updatePatient } from '../services/patientService'
import { Patient } from '../models/patient.model'
import AjouterPatientComponent from '../components/actions/AjouterPatientComponent.vue'
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
      id_patient: 0,
      email: '',
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
