<!-- SelectSoinComponent.vue -->
<template>
  <div class="row">
    <div class="col" style="margin-right: 15px;">
      <q-select stack-label outlined label="Ajouter un soin" v-model="selectedSoin" :options="catalogue"
        option-value="id_catalogue" option-label="libelle" @input="emitSoin" />
    </div>
    <div class="col-1" style="display: flex; justify-content: center; align-items: center; width: 40px;">
      <q-btn size="10px" round color="primary" icon="delete" @click="emitSupprimerSoin" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { CatalogueSoins } from 'src/models/catalogueSoins.model'

export default defineComponent({
  props: {
    catalogue: {
      type: Array as PropType<CatalogueSoins[]>,
      required: true
    }
  },
  setup (props, { emit }) {
    const selectedSoin = ref<number | null>(null)

    const emitSoin = () => {
      emit('soinSelected', selectedSoin.value)
      selectedSoin.value = null
    }

    const emitSupprimerSoin = () => {
      emit('supprimerSoin', selectedSoin.value)
    }

    return { selectedSoin, emitSoin, emitSupprimerSoin }
  }
})
</script>
