<template>
  <q-card flat bordered class="q-ma-md">
    <q-card-section>
      <p class="text-subtitle1">Prestations</p>
      <div v-for="(soin, index) in soinsSelectionnes" :key="index">
        <div class="row">
          <div class="col">
            <SelectionnerSoinComponent :catalogue="catalogue" @soinSelected="ajouterSoin" style="margin-bottom: 10px;"
            @supprimerSoin="$emit('removeSoin', index)" />
          </div>
        </div>
      </div>
      <q-btn flat label="Ajouter un autre soin" class="text-weight-light" style="margin-top: 10px; margin-bottom: -5px;"
        icon="add" @click="$emit('addSoin')" />
    </q-card-section>
  </q-card>
</template>
d
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { Prestation } from 'src/models/prestation.model'
import SelectionnerSoinComponent from './SelectionnerSoinComponent.vue'

import createService from 'src/services/baseService'
import { CATALOGUE_ENDPOINT } from 'src/services/endpoints'
import { CatalogueSoins } from 'src/models/catalogueSoins.model'

export default defineComponent({
  name: 'AjouterPrestationComponent',
  components: {
    SelectionnerSoinComponent
  },
  props: {
    idIntervention: { type: Number, required: true },
    soinsSelectionnes: { type: Array, required: true }
  },
  emits: ['addSoin', 'removeSoin'],
  setup (props, { emit }) {
    const prestation = ref<Prestation>({
      id_prestation: 0 as number,
      id_intervention: 0 as number,
      Catalogue: {
        id_catalogue: 0 as number,
        libelle: '' as string,
        prix: 0 as number
      }
    })
    const catalogue = ref<CatalogueSoins[]>([])

    onMounted(async () => {
      try {
        const catalogueService = createService(CATALOGUE_ENDPOINT)
        const catalogueData = await catalogueService.getAll() as CatalogueSoins[]

        catalogue.value = (catalogueData).map(c => ({
          id_catalogue: c.id_catalogue,
          libelle: c.libelle,
          prix: c.prix,
          Categorie: {
            id_categorie: 0 as number,
            libelle: '' as string
          }
        }))
      } catch (error) {
        console.error('Erreur lors du chargement du catalogue:', error)
      }
    })

    const ajouterSoin = () => {
      emit('addSoin', prestation.value.Catalogue.id_catalogue)
    }

    const supprimerSoin = (index: number) => {
      console.log(index)
      emit('removeSoin', index)
    }

    return { prestation, catalogue, ajouterSoin, supprimerSoin }
  }
})
</script>
