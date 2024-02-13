<template>
  <q-page padding>
    <!-- <h5>Liste des interventions</h5> -->
    <div class="q-pa-md">
      <q-table flat bordered title="Liste des interventions" :rows="intervention" :columns="columns" row-key="id_intervention">

        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th auto-width />
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-btn size="sm" color="accent" round dense @click="props.expand = !props.expand"
                :icon="props.expand ? 'remove' : 'add'" />
            </q-td>
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
          </q-tr>
          <q-tr v-show="props.expand" :props="props">
            <q-td colspan="100%">
              <div class="text-left">This is expand slot for row above: {{ props.row.Patient.nom }}.</div>
            </q-td>
          </q-tr>
        </template>

      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { intervention, loadIntervention } from '../services/interventionService'
import { QTableColumn } from 'quasar'

export default defineComponent({
  name: 'ListeInterventionComponent',
  setup () {
    onMounted(loadIntervention)

    const columns: QTableColumn[] = [
      { name: 'prevision', label: 'Prévision', field: 'date_heure', sortable: true, align: 'left' },
      { name: 'id_patient', label: 'Patient', field: row => row.Patient ? (row.Patient.nom + ' ' + row.Patient.prenom) : 'Non catégorisé', sortable: true, align: 'left' },
      { name: 'id_etat', label: 'Etat', field: row => row.EtatIntervention ? row.EtatIntervention.libelle : 'Non catégorisé', sortable: true, align: 'left' }
    ]

    return {
      intervention,
      columns
    }
  }
})
</script>
