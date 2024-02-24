<!-- DateNavigueOneComponent.vue -->
<template>
  <div>
    <h4 style="white-space: nowrap; margin-left: -20px;" class="text-weight-light">{{ dateDuJour }}</h4>
    <div class="row" style="margin-top: -20px;">
      <div class="col">
        <q-btn style="margin-top: 9px" flat round dense icon="chevron_left" @click="changerDateParNaviguation(-1)" />
      </div>
      <div class="col" style="min-width: 150px;">
        <q-input filled v-model="dateSelected" mask="date" :rules="['date']">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="dateSelected">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col">
        <q-btn flat round dense icon="chevron_right" style="margin-left: 20px; margin-top: 9px"
          @click="changerDateParNaviguation(1)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { DateTimeOptions } from 'vue-i18n'
import { premiereLettreUpperCase } from 'src/helpers/formatHelper'
import { addDays, format } from 'date-fns'

export default defineComponent({
  name: 'DateNavigueOneComponent',
  props: ['dateSelectedProp'],
  emits: ['update:dateSelected', 'dateChanged'],
  setup (props, { emit }) {
    const dateSelected = ref(props.dateSelectedProp)

    watch(dateSelected, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        emit('update:dateSelected', newValue)
        emit('dateChanged')
      }
    })

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

    const dateDuJour = computed(() => {
      const dateDuJourToString = new Date(dateSelected.value).toLocaleDateString('fr-FR', options as DateTimeOptions)
      return premiereLettreUpperCase(dateDuJourToString)
    })

    const changerDateParNaviguation = (delta: number) => {
      const currentDate = new Date(dateSelected.value)
      const newDate = addDays(currentDate, delta)
      dateSelected.value = format(newDate, 'yyyy-MM-dd')
    }

    return {
      dateDuJour,
      dateSelected,
      changerDateParNaviguation
    }
  }
})
</script>
