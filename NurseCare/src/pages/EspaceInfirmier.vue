<template>
  <q-page padding>
    <p>Mes rendez-vous</p>
    <div class="q-pa-md example-row-equal-width" style="display: flex; justify-content: center;">
      <div class="col">
        <q-date v-model="date"></q-date>
      </div>
      <div class="col">
        <div class="q-pa-md">
          <q-markup-table flat bordered style="width: 800px; ">
            <thead class="bg-teal">
              <tr>
                <th colspan="5">
                  <div class="row no-wrap items-center justify-between">
                    <div style="display: flex; align-items: center;">
                      <q-img style="width: 40px" :ratio="1" class="rounded-borders" />
                      <div class="text-h6 q-ml-md text-white">(Jour sélectionné)</div>
                    </div>
                    <div><text style="color: white; margin-right: 15px;">Ajouter intervention : </text>
                      <q-btn size="13px" round color="warning" icon="add" />
                    </div>
                  </div>
                </th>
              </tr>
              <tr>
                <th class="text-left">Patient</th>
                <th class="text-right">Nombre de prestation</th>
                <th class="text-right">Heure arrivée estimé </th>
                <th class="text-right">Heure départ estimé</th>
                <th class="text-right">Gérer</th>
              </tr>
            </thead>
            <tbody :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'" v-for="hour in hours" :key="hour">
              <tr v-for="appointment in appointments.filter(a => a.hour === hour)" :key="appointment.id">
                <td class="text-left"> {{ appointment.title }}</td>
                <td class="text-right">2</td>
                <td class="text-right">{{ appointment.hour }}</td>
                <td class="text-right">{{ appointment.hour }}</td>
                <td class="text-right"> <q-btn size="10px" color="primary" label="Modifier" />
                </td>
              </tr>

            </tbody>
            <tbody :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
              <tr>
                <td class="text-left"></td>
                <td class="text-right"></td>
                <td class="text-right"></td>
                <td class="text-right">Mon trajet :</td>
                <td class="text-right"> <q-btn size="13px" round color="warning" icon="map" style="margin-right: 20px;"/>
                </td>
              </tr>

            </tbody>
          </q-markup-table>
        </div>
      </div>
    </div>
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
