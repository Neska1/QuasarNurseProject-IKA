<template>
  <q-page padding>
    <b><p>Espace direction</p></b>

    <div class="q-pa-md flex flex">
      <p>Prestations en attente de réalisation des soins: </p>
      <q-knob
        v-model="nbrInterventionEnAttente"
        readonly
        show-value
        size="90px"
        :thickness="0.22"
        color="teal"
        track-color="grey-3"
        class="q-ma-md"
      />
      <p>Facture en attente d'intégration: </p>
      <q-knob
        v-model="nbrInterventionsFacturees"
        readonly
        show-value
        size="90px"
        :thickness="0.22"
        color="teal"
        track-color="grey-3"
        class="q-ma-md"
      />

      <p>Nombre total de prestations terminées : </p>
      <q-knob
        v-model="nbrInterventionsTerminees"
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
      <p>Nombre d'acte de soin : </p>
      <q-knob
        v-model="nbrActeDeSoins"
        readonly
        show-value
        size="90px"
        :thickness="0.22"
        color="teal"
        track-color="grey-3"
        class="q-ma-md"
      />
      <p>Nombre d'acte d'analyses : </p>
      <q-knob
        v-model="nbrActeAnalyse"
        readonly
        show-value
        size="90px"
        :thickness="0.22"
        color="teal"
        track-color="grey-3"
        class="q-ma-md"
      />
      <p>Nombre d'acte préventifs : </p>
      <q-knob
        v-model="nbrActesPreventifs"
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
  <q-page padding>
    <div class="q-pa-md">
      <q-table
        title="Bons d'observation"
        :rows="bonObservations.data"
        row-key="id_bon"
        :columns="[
          { name: 'id_bon', align: 'left', label: 'ID', field: 'id_bon' },
          { name: 'commentaire', align: 'left', label: 'Commentaire', field: 'commentaire' },
          { name: 'note', align: 'left', label: 'Note', field: 'note' },
          { name: 'stagiaire', align: 'left', label: 'Stagiaire', field: 'stagiaire' },
          { name: 'date', align: 'left', label: 'Date', field: 'date' },
        ]"
        flat
        bordered
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { patients, loadPatients } from '../services/patientService'
import { getInterventionsByEtat } from 'src/services/interventionService'
import { Intervention } from 'src/models/intervention.model'
import { rechercherPrestationsParCatalogue } from 'src/services/prestationService'
import { bonObservations, loadBonObservation } from 'src/services/bonObservationService'
import { BonObservation } from 'src/models/bonObservation.model'

export default defineComponent({
  name: 'GererPatients',
  setup () {
    let nbrInterventionEnAttente = ref(0);
    let nbrInterventionsFacturees = ref(0);
    let nbrInterventionsTerminees = ref(0);

    let nbrActeDeSoins = ref(0);
    let nbrActeAnalyse = ref(0);
    let nbrActesPreventifs = ref(0);

    onMounted(async () => {
      loadPatients()
      loadBonObservation()
      const interventionsEnAttente = await getInterventionsByEtat(4) as Intervention[];
      const interventionsFacturees = await getInterventionsByEtat(6) as Intervention[];
      const interventionsTerminees = await getInterventionsByEtat(2) as Intervention[];

          nbrInterventionEnAttente.value = interventionsEnAttente.length;
      nbrInterventionsFacturees.value = interventionsFacturees.length;
      nbrInterventionsTerminees.value = interventionsTerminees.length;

      const ateDeSoins = await rechercherPrestationsParCatalogue(1);
      const acteAnalyse = await rechercherPrestationsParCatalogue(2);
      const actesPreventifs = await rechercherPrestationsParCatalogue(3);

      nbrActeDeSoins.value = ateDeSoins.length;
      nbrActeAnalyse.value = acteAnalyse.length;
      nbrActesPreventifs.value = actesPreventifs.length;
      console.log(bonObservations)
    }
    )
    return {
      patients,
      nbrInterventionEnAttente,
      nbrInterventionsFacturees,
      nbrInterventionsTerminees,
      nbrActeDeSoins,
      nbrActeAnalyse,
      nbrActesPreventifs,
      bonObservations
    }
  }
})
</script>
