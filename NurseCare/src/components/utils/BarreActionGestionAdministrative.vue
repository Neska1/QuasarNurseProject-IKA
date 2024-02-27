<template>
  <q-btn-group rounded>
    <q-btn
      color="primary"
      rounded
      glossy
      icon="timeline"
      label="Ajouter un soin"
      @click="isCreationSoin = true"
    />
    <q-dialog v-model="isCreationSoin">
      <p>Futur formulaire de création de soin</p>
    </q-dialog>
    <q-btn
      color="primary"
      rounded
      glossy
      icon="visibility"
    />
    <q-btn
      color="primary"
      rounded
      glossy
      icon-right="update"
      label="Ajouter une intervention"
      @click="isCreationIntervention = true"
    />
    <q-dialog v-model="isCreationIntervention">
      <AjouterInterventionComponent :is-disabled="false" />
    </q-dialog>
    <q-btn
      color="amber"
      rounded
      glossy
      icon-right="add"
      label="Ajouter un patient"
      @click="isCreationPatient = true"
    />
    <q-dialog v-model="isCreationPatient">
      <AjouterPatientComponent :is-disabled="false" />
    </q-dialog>
  </q-btn-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AjouterPatientComponent from 'src/components/actions/AjouterPatientComponent.vue'
import AjouterInterventionComponent from 'src/components/actions/AjouterInterventionComponent.vue'

export default defineComponent({
  name: 'BarreActionGestionAdministrative',
  components: { AjouterPatientComponent, AjouterInterventionComponent },
  setup () {
    const isCreationPatient = ref(false)
    const isCreationIntervention = ref(false)
    const isCreationSoin = ref(false)
    return {
      isCreationPatient,
      isCreationIntervention,
      isCreationSoin
    }
  }
})
</script>
