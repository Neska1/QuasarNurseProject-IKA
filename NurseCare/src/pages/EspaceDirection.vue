<template>
  <q-page padding>
    <b><p>Espace direction</p></b>

    <div class="q-pa-md flex flex">
      <p>Prestations en attente: </p>
      <q-knob
        v-model="nbrPrestation"
        readonly
        show-value
        size="90px"
        :thickness="0.22"
        color="teal"
        track-color="grey-3"
        class="q-ma-md"
      />
      <p>Prestations en attente de paiement: </p>
      <q-knob
        v-model="nbrPrestation"
        readonly
        show-value
        size="90px"
        :thickness="0.22"
        color="teal"
        track-color="grey-3"
        class="q-ma-md"
      />

      <p>Temps moyen de réglement après intervention: </p>
      <q-knob
        v-model="nbrPrestation"
        readonly
        show-value
        size="90px"
        :thickness="0.22"
        color="teal"
        track-color="grey-3"
        class="q-ma-md"
      />
    </div>
    <br>
    <br>
    <div class="q-pa-md flex flex">
      <p>Prestations domaine 1 : </p>
      <q-knob
        v-model="nbrPrestation"
        readonly
        show-value
        size="90px"
        :thickness="0.22"
        color="teal"
        track-color="grey-3"
        class="q-ma-md"
      />
      <p>Prestations domaine 2 : </p>
      <q-knob
        v-model="nbrPrestation"
        readonly
        show-value
        size="90px"
        :thickness="0.22"
        color="teal"
        track-color="grey-3"
        class="q-ma-md"
      />
      <p>Prestations domaine 3 : </p>
      <q-knob
        v-model="nbrPrestation"
        readonly
        show-value
        size="90px"
        :thickness="0.22"
        color="teal"
        track-color="grey-3"
        class="q-ma-md"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { patients, loadPatients } from '../services/patientService'

export default defineComponent({
  name: 'GererPatients',
  setup () {
    const nbrPrestation = 5
    onMounted(loadPatients)
    return {
      patients,
      nbrPrestation
    }
  }
})
</script>
