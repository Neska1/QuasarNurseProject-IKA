<!-- <template>
  <q-card>
    <form @submit.prevent="submitForm">
      <q-card-section class="row">
        <q-toolbar>
          <q-avatar>
            <img src="https://img.freepik.com/vecteurs-premium/ecouter-musique-dans-foule_23-2148401311.jpg?w=1380">
          </q-avatar>

          <q-toolbar-title><span class="text-weight-bold">Ajouter</span> un patient</q-toolbar-title>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-space />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input stack-label outlined label="Nom" v-model="patient.nom" ref="nomInput" />
        <q-input stack-label outlined label="Prénom" v-model="patient.prenom" ref="prenomInput" />
        <q-input stack-label outlined label="Date de naissance" v-model="patient.date_naissance"
          ref="dateNaissanceInput" />
      </q-card-section>

      <q-card-actions>
        <q-btn flat label="Annuler" color="primary" v-close-popup />
        <q-space />
        <q-btn flat label="Valider la création" color="primary" type="submit" />
      </q-card-actions>
    </form>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { createPatient } from 'src/services/patientService'
import { QInput } from 'quasar'
import { Patient } from 'src/models/patient.model'

export default defineComponent({
  name: 'AjouterSoinComponent',
  setup () {
    const patient = ref<Patient>({
      nom: '',
      prenom: '',
      date_naissance: '',
      rue: '',
      ville: '',
      code_postal: '',
      id_patient: 0
    })

    const nomInput = ref<QInput>()
    const prenomInput = ref<QInput>()
    const dateNaissanceInput = ref<QInput>()
    const rueInput = ref<QInput>()
    const villeInput = ref<QInput>()
    const codePostalInput = ref<QInput>()

    const submitForm = async () => {
      console.log('Patient créé:', patient.value)
      await createPatient(patient.value)
    }

    return {
      patient,
      submitForm,
      nomInput,
      prenomInput,
      dateNaissanceInput,
      rueInput,
      villeInput,
      codePostalInput
    }
  }
})

</script> -->
