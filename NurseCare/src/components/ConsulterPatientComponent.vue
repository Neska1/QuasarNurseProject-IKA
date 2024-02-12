<template>
  <q-card>
    <form>
      <q-card-section class="row"></q-card-section>
      <q-card-section class="q-pt-none">
        <q-input stack-label outlined label="Nom" v-model="patient.nom" :disabled="isDisabled" />
        <q-input stack-label outlined label="Prénom" v-model="patient.prenom" :disabled="isDisabled" />
        <q-input stack-label outlined label="Date de naissance" :modelValue="patient.date_naissance"
          :disabled="isDisabled" readonly @click="showDatePicker = true">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer" @click="showDatePicker = true"></q-icon>
          </template>
        </q-input>
        <q-dialog v-model="showDatePicker">
          <q-date v-model="patient.date_naissance" mask="YYYY-MM-DD" @ok="showDatePicker = false"
            @cancel="showDatePicker = false"></q-date>
        </q-dialog>
        <q-input stack-label outlined label="Rue" v-model="patient.rue" :disabled="isDisabled" />
        <q-input stack-label outlined label="Code postal" v-model="patient.code_postal" :disabled="isDisabled" />
        <q-input stack-label outlined label="Ville" v-model="patient.ville" :disabled="isDisabled" />
      </q-card-section>
    </form>
  </q-card>
</template>
<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { Patient } from 'src/models/patient.model'

export default defineComponent({
  name: 'ConsulterPatientComponent',
  props: {
    patientToEdit: {
      type: Object as PropType<Patient>,
      required: true
    },
    isDisabled: Boolean
  },
  setup (props) {
    const showDatePicker = ref(false)
    const patient = ref(props.patientToEdit)

    return { showDatePicker, patient }
  }
})
</script>
