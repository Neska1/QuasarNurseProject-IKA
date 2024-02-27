<template>
  <q-card>
    <form>
      <q-card-section class="row" />
      <q-card-section class="q-pt-none">
        <q-input
          v-model="patient.nom"
          stack-label
          outlined
          label="Nom"
          :disabled="isDisabled"
        />
        <q-input
          v-model="patient.prenom"
          stack-label
          outlined
          label="Prénom"
          :disabled="isDisabled"
        />
        <q-input
          stack-label
          outlined
          label="Date de naissance"
          :model-value="patient.date_naissance"
          :disabled="isDisabled"
          readonly
          @click="showDatePicker = true"
        >
          <template #append>
            <q-icon
              name="event"
              class="cursor-pointer"
              @click="showDatePicker = true"
            />
          </template>
        </q-input>
        <q-dialog v-model="showDatePicker">
          <q-date
            v-model="patient.date_naissance"
            mask="YYYY-MM-DD"
            @ok="showDatePicker = false"
            @cancel="showDatePicker = false"
          />
        </q-dialog>
        <q-input
          v-model="patient.rue"
          stack-label
          outlined
          label="Rue"
          :disabled="isDisabled"
        />
        <q-input
          v-model="patient.code_postal"
          stack-label
          outlined
          label="Code postal"
          :disabled="isDisabled"
        />
        <q-input
          v-model="patient.ville"
          stack-label
          outlined
          label="Ville"
          :disabled="isDisabled"
        />
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
