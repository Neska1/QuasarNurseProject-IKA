<template>
  <q-page
    class="center justify-evenly"
    padding
  >
    <p>Mon espace</p>
    <q-card
      class="my-card"
      flat
      bordered
      style="max-width: 600px;"
    >
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <q-icon
              name="account_circle"
              color="primary"
            />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ utilisateur?.nom }} {{ utilisateur?.prenom }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />

      <q-card-section horizontal>
        <q-card-section>
          <q-item-label :props="utilisateur">
            Rôle : {{ utilisateur?.Role.libelle }}
          </q-item-label>
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-4">
          <q-item-label>Email : {{ userEmail }}</q-item-label>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { Personnel } from '../models/personnel.model'

export default defineComponent({
  name: 'MonEspace',
  setup () {
    const utilisateur = ref<Personnel | null>(null)
    const userEmail = localStorage.getItem('userEmail')

    onMounted(async () => {
      const personnelInfo = localStorage.getItem('personnelInfo')
      if (personnelInfo) {
        utilisateur.value = JSON.parse(personnelInfo)
      }
    })

    return {
      utilisateur,
      userEmail
    }
  }
})
</script>
