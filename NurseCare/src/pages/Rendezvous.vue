<template>
  <q-page padding>
    <p>Mes rendez-vous</p>
    <q-date v-model="date"></q-date>

    <!-- Colonne pour les cartes des rendez-vous -->
    <q-col cols="9">
      <div v-for="hour in hours" :key="hour">
        <q-card v-for="appointment in appointments.filter(a => a.hour === hour)" :key="appointment.id"
          class="my-card bg-secondary text-white" >

          <q-card-section class="appointment">
            {{ appointment.title }}
            <q-btn color="grey" round flat dense :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              @click="expanded = !expanded"></q-btn>
          </q-card-section>

          <q-slide-transition>
            <div v-show="expanded">
              <q-separator />
              <q-card-section class="text-subtitle2">
                Salut salut
              </q-card-section>
            </div>
          </q-slide-transition>

          <q-separator dark inset></q-separator>

          <q-card-actions>
            <q-btn flat>Modifier</q-btn>
            <q-btn flat>Supprimer</q-btn>
          </q-card-actions>
        </q-card>
        <!-- Affichez un espace vide si aucun rendez-vous n'est prévu pour l'heure en cours -->
        <div v-if="!appointments.some(a => a.hour === hour)" class="empty-appointment"></div>
      </div>
    </q-col>
  </q-page>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'RendezVous',

  setup () {
    // Simulated data - replace with your own data fetching logic
    const appointments = ref([
      { id: 1, title: 'Rendez-vous avec Dr. Smith', hour: '09:00' },
      { id: 2, title: 'Conférence sur la santé', hour: '11:00' }
      // Add more appointments here
    ])

    const hours = [
      '08:00', '09:00', '10:00', '11:00', '12:00',
      '13:00', '14:00', '15:00', '16:00', '17:00',
      '18:00', '19:00', '20:00'
    ]

    return {
      rdvs: [{
        id: 1,
        name: 'Avec madame x',
        date: ref('2019/02/01'),
        adresse: 'Toulouse'

      }],
      date: ref('2019/02/01'),
      appointments,
      hours,
      expanded: ref(false)
    }
  }
})
</script>
