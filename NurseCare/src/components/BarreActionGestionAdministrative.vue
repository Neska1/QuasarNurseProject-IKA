<template>
  <q-btn-group rounded>
    <q-btn color="primary" rounded glossy icon="timeline" label="Ajouter un soin"/>
    <q-btn color="primary" rounded glossy icon="visibility" />
    <q-btn color="primary" rounded glossy icon-right="update" @click="isCreationIntervention = true" label="Ajouter une intervention" />
    <q-dialog v-model="isCreationIntervention">
      <AjouterIntervention :isDisabled="false" />
    </q-dialog>
    <q-btn color="amber" rounded glossy icon-right="add" @click="isCreationPatient = true" label="Ajouter un patient" />
    <q-dialog v-model="isCreationPatient">
      <AjouterPatientComponent :isDisabled="false" />
    </q-dialog>
  </q-btn-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AjouterPatientComponent from '../components/AjouterPatientComponent.vue'
import AjouterIntervention from '../components/AjouterIntervention.vue'

export default defineComponent({
  name: 'BarreActionGestionAdministrative',
  components: { AjouterPatientComponent, AjouterIntervention },
  setup () {
    const isCreationPatient = ref(false)
    const isCreationIntervention = ref(false)
    return {
      isCreationPatient,
      isCreationIntervention
    }
  }
})
</script>
