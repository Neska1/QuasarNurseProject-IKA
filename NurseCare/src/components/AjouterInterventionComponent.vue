<template>
  <q-card style="min-width: 900px; padding: 20px;">
    <form @submit.prevent="submitForm">
      <q-toolbar-title>
        <p style="padding:-10px;">Ajouter une intervention</p>
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
        <q-select stack-label outlined label="Soignant" v-model="intervention.Personnel" :options="personnels"
          :disabled="isDisabled" />
        <q-select stack-label outlined label="Statut" v-model="intervention.EtatIntervention" :options="etats"
          :disabled="isDisabled" />
      </q-card-section>
      <q-card-actions>
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
import { createIntervention } from 'src/services/interventionService'

export default defineComponent({
  name: 'AjouterIntervention',
  props: {
    newIntervention: {
      type: Object as PropType<Intervention>,
      default: () => ({
        id_etat: 0,
        id_patient: 0,
        id_personnel: 0,
        date_heure: new Date()
      })
    },
    isDisabled: Boolean
  },
  setup (props, { emit }) {
    const intervention = ref<Intervention>({ ...props.newIntervention })
    const showDatePicker = ref(false)
    const personnels = ref<Personnel[]>([])
    const etats = ref<EtatIntervention[]>([])
    const patients = ref<Patient[]>([])
    const etatsService = createService(ETAT_INTERVENTION_ENDPOINT)

    watch(() => props.newIntervention, (newVal) => {
      intervention.value = { ...newVal }
    })

    onMounted(async () => {
      const personnelsService = createService(PERSONNEL_ENDPOINT)
      const patientsService = createService(PATIENT_ENDPOINT)

      try {
        const personnelData = await personnelsService.getAll() as Personnel[]
        personnels.value = personnelData.map((p: Personnel) => ({
          id_personnel: p.id_personnel,
          nom: p.nom,
          prenom: p.prenom,
          label: `${p.nom} ${p.prenom}`
        }))
        console.log(personnels.value)

        const etatsData = await etatsService.getAll() as EtatIntervention[]
        etats.value = etatsData.map(e => ({ id_etat: e.id_etat, libelle: e.libelle, label: e.libelle }))
        console.log(etats.value)

        const patientData = await patientsService.getAll() as Patient[]
        patients.value = patientData.map((p: Patient) => ({
          id_patient: p.id_patient,
          nom: p.nom,
          prenom: p.prenom,
          label: `${p.nom} ${p.prenom}`
        }))
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error)
      }
    })

    const submitForm = async () => {
      try {
        const interventionData: Intervention = {
          id_intervention: intervention.value.id_intervention,
          date_heure: intervention.value.date_heure,
          Patient: intervention.value.Patient,
          Personnel: intervention.value.Personnel,
          EtatIntervention: intervention.value.EtatIntervention
        }
        console.log('Ajout de l\'intervention:', interventionData)
        const result = await createIntervention(interventionData)
        console.log('Intervention ajoutée avec succès:', result)
        emit('intervention-added')
      } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'intervention:', error)
      }
    }

    return { intervention, showDatePicker, personnels, patients, etats, submitForm }
  }
})
</script>
