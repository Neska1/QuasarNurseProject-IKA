<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Interventions"
      :rows="interventions"
      :columns="state.columns"
      row-key="id_intervention"
    >
      <template #header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template #body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              size="sm"
              color="accent"
              round
              dense
              :icon="props.expand ? 'remove' : 'visibility'"
              @click="props.expand = !props.expand"
            />
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td>
        </q-tr>
        <q-tr
          v-show="props.expand"
          :props="props"
        >
          <q-td colspan="100%">
            <!-- <div class="text-left">
              Détails de l'intervention pour : {{ props.row.Patient.nom }} {{
                props.row.Patient.prenom }}.
            </div> -->
            <div v-if="props.row.id_intervention">
              <p>Prestations :</p>
              <ul>
                <li
                  v-for="prestation in prestationsParIntervention[props.row.id_intervention]"
                  :key="prestation.id_prestation"
                >
                  {{ prestation.Catalogue.libelle }} - {{ prestation.Catalogue.prix }} € - {{ prestation.Catalogue.CategorieCatalogue.libelle }}
                </li>
              </ul>
            </div>
          </q-td>
          <q-btn
            size="sm"
            color="accent"
            style="margin-top: 10px;"
            round
            dense
            icon="edit"
            @click="ouvrirDialogueEdition(props.row)"
          />
          <q-dialog v-model="isEditionIntervention">
            <AjouterInterventionComponent
              :id-intervention="idInterventionAEditer"
              :is-disabled="false"
            />
          </q-dialog>
          <q-btn
            size="sm"
            color="accent"
            round
            style="margin-left: 5px; margin-top: 10px;"
            dense
            icon="delete"
            @click="supprimerIntervention(props.row)"
          />
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, ref } from 'vue'
import { extraireHeureFromISOString } from 'src/helpers/formatHelper'
import { recupererPrestationsDuneIntervention } from 'src/services/prestationService'
import { Prestation } from 'src/models/prestation.model'
import { Intervention } from 'src/models/intervention.model'
import AjouterInterventionComponent from 'src/components/actions/AjouterInterventionComponent.vue'
import { deleteIntervention } from 'src/services/interventionService'

export default defineComponent({
  name: 'ConsulterRendezVousComponent',
  components: { AjouterInterventionComponent },
  props: {
    interventions: {
      type: Array as () => Intervention[],
      default: () => []
    },

  },
  emits: ['interventionSupprimee'],

  setup(props, { emit }) {
    const catalogue = ref([]);
    const isEditionIntervention = ref(false);

  const idInterventionAEditer = ref(0);

    const state = reactive({
      prestationsParIntervention: {} as { [key: number]: Prestation[] },
      columns: [
        { name: 'date_heure', required: true, label: 'Heure', align: 'left', field: (row: Intervention) => extraireHeureFromISOString(row.date_heure) },
        { name: 'Patient', required: true, label: 'Patient', align: 'left', field: (row: Intervention) => `${row.Patient.nom} ${row.Patient.prenom}` },
        { name: 'EtatIntervention', required: true, label: 'Etat de l\'intervention', align: 'left', field: row => `${row.EtatIntervention.libelle}` }
      ] as any[]
    });

    watch(() => props.interventions, async (newInterventions) => {
      for (const intervention of newInterventions) {
        const response = await recupererPrestationsDuneIntervention((intervention as Intervention).id_intervention as number);
        const prestations = response;
        state.prestationsParIntervention[(intervention as Intervention).id_intervention] = prestations;
      }
    });

    function ouvrirDialogueEdition(intervention: Intervention) {
      idInterventionAEditer.value = intervention.id_intervention;
      console.log('interventionAEditer n° : ', idInterventionAEditer.value);
      isEditionIntervention.value = true;
    }

async function supprimerIntervention(intervention: Intervention) {
  try {
    const response = await deleteIntervention(intervention.id_intervention);
    console.log('Intervention supprimée:', response);
    emit('interventionSupprimee');
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'intervention:', error);
  }
}
    return { state, isEditionIntervention, prestationsParIntervention: state.prestationsParIntervention, supprimerIntervention, ouvrirDialogueEdition, idInterventionAEditer };
  }
})
</script>
