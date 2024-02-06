<template>
  <q-card>
    <form @submit.prevent="submitForm">
      <q-card-section class="row">
        <q-toolbar>
          <q-avatar>
            <img src="https://img.freepik.com/vecteurs-premium/ecouter-musique-dans-foule_23-2148401311.jpg?w=1380">
          </q-avatar>

          <q-toolbar-title>
            <span class="text-weight-bold">{{ titreForm }}</span> un patient
          </q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-space />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input stack-label outlined label="Nom" v-model="patient.nom" ref="nomInput" :disabled="isDisabled" />
        <q-input stack-label outlined label="Prénom" v-model="patient.prenom" ref="prenomInput" :disabled="isDisabled"  />
        <q-input stack-label outlined label="Date de naissance" v-model="patient.date_naissance" :disabled="isDisabled"
          ref="dateNaissanceInput" />
        <q-input stack-label outlined label="Rue" v-model="patient.rue" ref="rueInput" :disabled="isDisabled"  />
        <q-input stack-label outlined label="Code postal" v-model="patient.code_postal" ref="codePostalInput" :disabled="isDisabled"  />
        <q-input stack-label outlined label="Ville" v-model="patient.ville" ref="villeInput" :disabled="isDisabled" />
      </q-card-section>
<consulter-patient-component></consulter-patient-component>
      <q-card-actions>
        <q-btn flat label="Annuler" color="primary" v-close-popup />
        <q-space />
        <q-btn flat label="Valider" color="primary" type="submit" />
      </q-card-actions>
    </form>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch, PropType, computed } from 'vue'
import { createPatient, updatePatient } from 'src/services/patientService'
import { Patient } from 'src/models/patient.model'
import ConsulterPatientComponent from './ConsulterPatientComponent.vue'

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
  setup (props, { emit }) {
    const { patientToEdit } = toRefs(props)
    const patient = ref<Patient>(patientToEdit.value || {
      nom: '',
      prenom: '',
      date_naissance: '',
      rue: '',
      ville: '',
      code_postal: '',
      id_patient: 0
    })

    watch(patientToEdit, (newPatient) => {
      if (newPatient) {
        patient.value = { ...newPatient }
      } else {
        // Réinitialiser pour le mode ajout
        patient.value = {
          nom: '',
          prenom: '',
          date_naissance: '',
          rue: '',
          ville: '',
          code_postal: '',
          id_patient: 0
        }
      }
    }, { immediate: true })

    // Propriété calculée pour le titre
    const titreForm = computed(() => patient.value.id_patient > 0 ? 'Édition' : 'Ajouter')

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
