<template>
  <q-page padding>
    <h5>Catalogue des soins</h5>
    <div class="q-pa-md">
      <q-table
        flat
        bordered
        :rows="catalogue"
        :columns="columns"
        row-key="id_catalogue"
        rows-per-page-label="Nombre d'éléments par page : "
      >
        <template #body-cell-libelle="props">
          <q-td :props="props">
            {{ props.row.libelle }}
          </q-td>
        </template>

        <template #body-cell-prix="props">
          <q-td :props="props">
            {{ props.row.prix }} €
          </q-td>
        </template>

        <template #body-cell-id_catalogue="props">
          <q-td :props="props">
            {{ props.row.id_catalogue }}
          </q-td>
        </template>
      </q-table>
    </div>
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
      { name: 'id_categorie', label: 'Catégorie', field: row => row.CategorieCatalogue ? row.CategorieCatalogue.libelle : 'Non catégorisé', sortable: true, align: 'left' }
    ]

    return {
      catalogue,
      columns
    }
  }
})
</script>
