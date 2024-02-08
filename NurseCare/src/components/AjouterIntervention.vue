<template>
  <q-card >
    <form @submit.prevent="submitForm">
      <q-toolbar-title>
            <h5 class="text-weight-bold">Ajouter une intervention</h5>
          </q-toolbar-title>
      <q-card-section class="row">
        <q-input stack-label outlined label="Date" :modelValue="intervention.date_heure" :disabled="isDisabled" readonly
          @click="showDatePicker = true">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer" @click="showDatePicker = true"></q-icon>
          </template>
        </q-input>
        <q-dialog v-model="showDatePicker">
          <q-date v-model="intervention.date_heure" mask="YYYY-MM-DD" @ok="showDatePicker = false"
            @cancel="showDatePicker = false"></q-date>
        </q-dialog>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-select stack-label outlined label="Patient" v-model="intervention.Patient" :options="patients"
          :disabled="isDisabled" />
        <q-select stack-label outlined label="Intervention" v-model="intervention.Personnel" :options="personnels"
          :disabled="isDisabled" />
      </q-card-section>
      <q-card-actions >
            <q-btn flat label="Annuler" color="primary" v-close-popup />
            <q-space></q-space>
            <q-btn flat label="Valider" color="primary" type="submit" />
          </q-card-actions>
    </form>
  </q-card>
</template>
<script lang="ts">
import { defineComponent, ref, watch, PropType, onMounted } from 'vue'
import { Intervention } from 'src/models/intervention.model'
import { Patient } from 'src/models/patient.model'
import { EtatIntervention } from 'src/models/etatIntervention.model'
import createService from 'src/services/baseService'
import { PERSONNEL_ENDPOINT, ETAT_INTERVENTION_ENDPOINT, PATIENT_ENDPOINT } from 'src/services/endpoints'
import { Personnel } from 'src/models/personnel.model'

export default defineComponent({
  name: 'AjouterIntervention',
  props: {
    patientToEdit: {
      type: Object as PropType<Intervention>,
      default: () => ({
        nom: '',
        prenom: '',
        date_naissance: '',
        rue: '',
        ville: '',
        code_postal: '',
        id_patient: 0
      })
    },
    isDisabled: Boolean
  },
  setup (props) {
    const intervention = ref<Intervention>({ ...props.patientToEdit })
    const showDatePicker = ref(false)
    const personnels = ref<Personnel[]>([])
    const etats = ref<EtatIntervention[]>([])
    const patients = ref<Patient[]>([])

    watch(() => props.patientToEdit, (newVal) => {
      intervention.value = { ...newVal }
    })

    onMounted(async () => {
      const personnelsService = createService(PERSONNEL_ENDPOINT)
      const patientsService = createService(PATIENT_ENDPOINT)

      try {
        const personnelData = await personnelsService.getAllNomPrenom()
        personnels.value = personnelData.map((p: Personnel) => ({ label: `${p.nom} ${p.prenom}`, value: `${p.nom} ${p.prenom}` }))
        console.log(personnels.value)
        // etats.value = await etatsService.getAll() as { id_etat: number; libelle: string; }[] || []

        const patientData = await patientsService.getAllNomPrenom()
        patients.value = patientData.map((p: Patient) => ({ label: `${p.nom} ${p.prenom}`, value: `${p.nom} ${p.prenom}` }))
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error)
      }
    })

    const submitForm = async () => {
      console.log('Ajout de l\'intervention:', intervention.value)
    }

    return { intervention, showDatePicker, personnels, patients }
  }
})
</script>
