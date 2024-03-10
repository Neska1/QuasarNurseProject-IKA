<template>
  <q-page padding>
    <!-- <h5>Liste des interventions</h5> -->
    <div class="q-pa-md">
      <q-table
        class="my-table"
        flat
        bordered
        title="Liste des interventions"
        :rows="intervention"
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
                :icon="props.expand ? 'remove' : 'add'"
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
                This is expand slot for row above: {{ props.row.Patient.nom }}.
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { intervention, loadIntervention } from 'src/services/interventionService'
import { QTableColumn } from 'quasar'

export default defineComponent({
  name: 'ListeInterventionComponent',
  setup () {
    onMounted(loadIntervention)

    const columns: QTableColumn[] = [
      { name: 'date', label: 'Date',   field: row => new Date(row.date_heure).toLocaleDateString(), sortable: true, align: 'left' },
      { name: 'heure', label: 'Heure',   field: row => new Date(row.date_heure).toLocaleTimeString(), sortable: true, align: 'left' },
      { name: 'id_patient', label: 'Patient', field: row => row.Patient ? (row.Patient.nom + ' ' + row.Patient.prenom) : 'Non catégorisé', sortable: true, align: 'left' },
      { name: 'id_etat', label: 'Etat', field: row => row.EtatIntervention ? row.EtatIntervention.libelle : 'Non catégorisé', sortable: true, align: 'left' },
      { name: 'id_infirmier', label: 'Infirmier', field: row => row.Personnel ? (row.Personnel.nom + ' ' + row.Personnel.prenom) : 'Non catégorisé', sortable: true, align: 'left' }
    ]

    return {
      intervention,
      columns
    }
  }
})
</script>

<style scoped>
.my-table {
  min-width: 1050px;
}
</style>
