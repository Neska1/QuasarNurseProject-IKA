<template>
  <q-page padding>
    <h5>Catalogue des soins</h5>
    <div class="q-pa-md">

    <q-table flat bordered :rows="catalogue" :columns="columns" row-key="cat_id"
    rows-per-page-label="Nombre d'éléments par page : ">
      <template v-slot:body-cell-libelle="props">
        <q-td :props="props">
          {{ props.row.libelle }}
        </q-td>
      </template>

      <template v-slot:body-cell-prix="props">
        <q-td :props="props">
          {{ props.row.prix }} €
        </q-td>
      </template>

      <template v-slot:body-cell-cat_id="props">
        <q-td :props="props">
          {{ props.row.lib_cat_id }}
        </q-td>
      </template>
    </q-table></div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { catalogue, loadCatalogue } from '../services/catalogueService'
import { QTableColumn } from 'quasar'

export default defineComponent({
  name: 'GererPatients',
  setup () {
    onMounted(loadCatalogue)

    const columns: QTableColumn[] = [
      { name: 'libelle', label: 'Libellé des soins', field: 'libelle', sortable: true, align: 'left' },
      { name: 'prix', label: 'Prix', field: 'prix', sortable: true, align: 'left' },
      { name: 'cat_id', label: 'Catégorie', field: 'cat_id', sortable: true, align: 'left' }
    ]

    return {
      catalogue,
      columns
    }
  }
})
</script>
