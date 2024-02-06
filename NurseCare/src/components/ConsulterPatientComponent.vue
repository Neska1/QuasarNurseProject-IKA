<template>
  <q-card>
    <form>
      <q-card-section class="row">
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
    </form>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch, PropType } from 'vue'
import { Patient } from 'src/models/patient.model'

export default defineComponent({
  name: 'ConsulterPatientComponent',
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
  setup (props) {
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

    return {
      patient
    }
  }
})
</script>
