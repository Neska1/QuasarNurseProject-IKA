<template>
  <q-card flat bordered class="q-ma-md">
    <q-card-section>
      <div v-for="(soin, index) in soinsSelectionnes" :key="index">
        <div class="row">
          <div class="col" style="margin-right: 15px;">
            <SelectionnerSoinComponent :catalogue="catalogue" @soinSelected="ajouterSoin" />
          </div>
          <div class="col-1" style="display: flex; justify-content: center; align-items: center;">
            <q-btn size="10px" round color="primary" icon="edit" style="margin-right: 13px" />
            <q-btn size="10px" round color="primary" icon="delete" />
          </div>
        </div>
      </div>
      <q-btn flat label="Ajouter un autre soin" icon="add" @click="ajouterSoinSelector" />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { Prestation } from 'src/models/prestation.model'
import SelectionnerSoinComponent from './SelectionnerSoinComponent.vue'

import createService from 'src/services/baseService'
import { CATALOGUE_ENDPOINT, PRESTATION_ENDPOINT } from 'src/services/endpoints'
import { CatalogueSoins } from 'src/models/catalogueSoins.model'

export default defineComponent({
  name: 'AjouterPrestationComponent',
  components: {
    SelectionnerSoinComponent
  },
  emits: ['update:prestations'],
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
    const soinsSelectionnes = ref<number[]>([])

    onMounted(async () => {
      try {
        const catalogueService = createService(CATALOGUE_ENDPOINT)
        // Assurez-vous que le type de retour de getAll() est correctement typé ou casté en CatalogueItem[]
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

    const ajouterPrestation = async () => {
      try {
        const prestationService = createService(PRESTATION_ENDPOINT)
        const result = await prestationService.createData(prestation.value)
        console.log('Prestation ajoutée avec succès:', result)

        emit('update:prestations', prestation.value)

        // Réinitialiser le formulaire ou gérer comme souhaité
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la prestation:', error)
      }
    }

    const annuler = () => {
      // Logique pour annuler l'ajout de la prestation
    }

    const ajouterSoin = (idSoin: number) => {
      if (idSoin) soinsSelectionnes.value.push(idSoin)
    }

    const ajouterSoinSelector = () => {
      soinsSelectionnes.value.push(soinsSelectionnes.value.length + 1)
    }

    return { prestation, ajouterPrestation, annuler, catalogue, soinsSelectionnes, ajouterSoin, ajouterSoinSelector }
  }
})
</script>
