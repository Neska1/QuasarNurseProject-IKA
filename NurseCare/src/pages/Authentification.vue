<template>
  <q-page padding>
    <h5 :align="'center'">
      NurseCare, votre portail santé.
    </h5>

    <q-card class="auth-tabs">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab
          name="connexion"
          label="Connexion"
        />
        <q-tab
          name="aide"
          label="Aide"
        />
      </q-tabs>

      <q-separator />

      <q-tab-panels
        v-model="tab"
        animated
      >
        <q-tab-panel name="connexion">
          <ConnexionComponent />
        </q-tab-panel>

        <q-tab-panel name="aide">
          <div class="text-h6">
            Première connexion
          </div><br>
          <p>Changez impérativement votre mot de passe après vous être authentifié.</p><br>
          <div class="text-h6">
            Vous n'avez pas d'identifiants?
          </div><br>
          <p>Contactez le service de la direction pour obtenir vos identifiants.</p>
          <br>
          <br>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ConnexionComponent from 'components/Auth/ConnexionComponent.vue'

export default defineComponent({
  name: 'PageAuthentification',
  components: {
    ConnexionComponent
  },
  setup () {
    const tab = ref('connexion')
    return {
      tab
    }
  }
})

</script>

<style>
.auth-tabs {
  max-width: 700px;
  margin: 0 auto;
}
</style>
