<template>
  <q-card>
    <form @submit.prevent="submitForm">
      <q-card-section class="row">
        <q-toolbar>
          <q-avatar>
            <img src="https://img.freepik.com/vecteurs-premium/ecouter-musique-dans-foule_23-2148401311.jpg?w=1380">
          </q-avatar>
          <q-toolbar-title>
            <!-- Le titre ne fonctionne pas en édition !  -->
            <span class="text-weight-bold">{{ titreForm }}</span>
          </q-toolbar-title>
          <q-btn
            v-close-popup
            flat
            round
            dense
            icon="close"
          />
        </q-toolbar>
      </q-card-section>
      <ConsulterPatientComponent
        :patient-to-edit="patient"
        :is-disabled="false"
      />
      <q-card-actions>
        <q-btn
          v-close-popup
          flat
          label="Annuler"
          color="primary"
        />
        <q-space />
        <q-btn
          flat
          label="Valider"
          color="primary"
          type="submit"
        />
      </q-card-actions>
    </form>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch, PropType, computed } from 'vue'
import { createPatient, updatePatient } from 'src/services/patientService'
import { Patient } from 'src/models/patient.model'
import ConsulterPatientComponent from '../ConsulterPatientComponent.vue'

export default defineComponent({
  name: 'AjouterPatientComponent',
  components: { ConsulterPatientComponent },
  props: {
    patientToEdit: {
      type: Object as PropType<Patient>,
      default: null
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
emits: ['patient-added'],
  setup (props, { emit }) {
    const { patientToEdit } = toRefs(props)
    const patient = ref<Patient>(patientToEdit.value || {
      nom: '',
      prenom: '',
      date_naissance: '',
      rue: '',
      ville: '',
      code_postal: '',
      id_patient: 0,
      email: ''
    })

    watch(patientToEdit, (newPatient) => {
      if (newPatient) {
        patient.value = { ...newPatient }
        console.log(newPatient, patient.value)
      }
    }, { immediate: true })

    const titreForm = computed(() => patient.value.id_patient > 0 ? 'Éditer un patient' : 'Ajouter un patient')

    const submitForm = async () => {
      if (patient.value.id_patient) {
        console.log('Mise à jour du patient:', patient.value)
        await updatePatient(patient.value.id_patient, patient.value)
      } else {
        console.log('Création d’un nouveau patient:', patient.value)
        await createPatient(patient.value)
      }
      emit('patient-added')
    }

    return {
      patient,
      submitForm,
      titreForm
    }
  }
})
</script>
