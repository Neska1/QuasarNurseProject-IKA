<!-- SelectSoinComponent.vue -->
<template>
  <q-select stack-label outlined label="Ajouter un soin" v-model="selectedSoin" :options="catalogue"
    option-value="id_catalogue" option-label="libelle" @input="emitSoin" />
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

    return { selectedSoin, emitSoin }
  }
})
</script>
