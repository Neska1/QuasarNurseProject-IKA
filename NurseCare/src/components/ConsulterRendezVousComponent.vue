<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Interventions"
      :rows="interventions"
      :columns="columns"
      row-key="id_intervention"
    >
      <template #header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template #body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              size="sm"
              color="accent"
              round
              dense
              :icon="props.expand ? 'remove' : 'visibility'"
              @click="props.expand = !props.expand"
            />
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td>
        </q-tr>
        <q-tr
          v-show="props.expand"
          :props="props"
        >
          <q-td colspan="100%">
            <div class="text-left">
              Détails de l'intervention pour : {{ props.row.Patient.nom }} {{
                props.row.Patient.prenom }}.
            </div>
            <div v-if="props.row.id_intervention">
              <p>Prestations :</p>
              <ul>
                <li
                  v-for="prestation in prestationsParIntervention[props.row.id_intervention]"
                  :key="prestation.id_categorie"
                >
                  {{ prestation.id_categorie }}
                </li>
              </ul>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { defineComponent, reactive, watch } from 'vue'
import { extraireHeureFromISOString } from 'src/helpers/formatHelper'
import { recupererPrestationsDuneIntervention } from 'src/services/prestationService'

export default defineComponent({
  name: 'GestionJourInfirmierComponent',
  props: {
    interventions: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const state = reactive({
      prestationsParIntervention: {},
      columns: [
        { name: 'date_heure', required: true, label: 'Heure', align: 'left', field: row => extraireHeureFromISOString(row.date_heure) },
        { name: 'Patient', required: true, label: 'Patient', align: 'left', field: row => `${row.Patient.nom} ${row.Patient.prenom}` },
        { name: 'EtatIntervention', required: true, label: 'Etat de l\'intervention', align: 'left', field: row => `${row.EtatIntervention.libelle}` }
      ]
    });

    watch(() => props.interventions, async (newInterventions) => {
  for (const intervention of newInterventions) {
    const response = await recupererPrestationsDuneIntervention(intervention.id_intervention);
    const prestations = response.data;
    state.prestationsParIntervention[intervention.id_intervention] = prestations;
  }
});

    return state;
  }
})
</script>
