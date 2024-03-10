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
            <div
              class="column"
            >
              <div class="col">
                <div v-if="props.row.id_intervention">
                  <p>Prestations :</p>
                  <ul>
                    <div
                      v-for="prestation in prestationsParIntervention[props.row.id_intervention]"
                      :key="prestation.id_prestation"
                      class="row"
                      style="margin-bottom: 20px;"
                    >
                      <div class="col">
                        <li>
                          {{ prestation.Catalogue.libelle }} - {{ prestation.Catalogue.prix }} € - {{ prestation.Catalogue.CategorieCatalogue.libelle }}
                        </li>
                      </div>
                      <div
                        class="col-12 col-md-2"
                        style="margin-bottom: -20px;"
                      >
                        <q-btn
                          color="primary"
                          size="xs"
                          round
                          glossy
                          style="margin-left: 0px;"
                          icon="add"
                          @click="openBonObservationDialog(prestation.id_prestation)"
                        >
                          <q-tooltip
                            anchor="top left"
                            :offset="[0, 10]"
                          >
                            Ajouter un bon d'observation
                          </q-tooltip>
                        </q-btn>
                        <q-dialog v-model="isCreationBonObservation">
                          <q-card>
                            <q-card-section>
                              <div class="text-h6">
                                Ajouter un bon d'observation
                              </div>
                            </q-card-section>

                            <q-card-section>
                              <q-form @submit="submitBon(prestation.id_prestation)">
                                <q-input
                                  v-model="newBonObservation.stagiaire"
                                  label="Stagiaire"
                                />
                                <q-input
                                  v-model="newBonObservation.note"
                                  label="Note"
                                />
                                <q-input
                                  v-model="newBonObservation.commentaire"
                                  label="Commentaire"
                                />

                                <q-select
                                  v-model="newBonObservation.OrganismeFormation.id_OrganismeFormation"
                                  :options="organismesOptions"
                                  stack-label
                                  outlined
                                  label="Organisme de Formation"
                                  emit-value
                                  map-options
                                  option-label="nom"
                                  option-value="id_OrganismeFormation"
                                />

                                <div>
                                  <q-btn
                                    label="Annuler"
                                    type="reset"
                                    color="primary"
                                    @click="isCreationBonObservation = false"
                                  />
                                  <q-btn
                                    label="Soumettre"
                                    type="submit"
                                    color="primary"
                                  />
                                </div>
                              </q-form>
                            </q-card-section>
                          </q-card>
                        </q-dialog>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
              <div class="col">
                <q-btn
                  size="sm"
                  color="accent"
                  style="margin-top: 10px;"
                  round
                  dense
                  icon="edit"
                  @click="ouvrirDialogueEdition(props.row)"
                >
                  <q-tooltip
                    anchor="top left"
                    :offset="[0, 10]"
                  >
                    Editer l'intervention
                  </q-tooltip>
                </q-btn>
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
                >
                  <q-tooltip
                    anchor="top left"
                    :offset="[0, 10]"
                  >
                    Supprimer l'intervention
                  </q-tooltip>
                </q-btn>
                <q-btn
                  id="btn-generate-pdf"
                  color="primary"
                  size="sm"
                  round
                  glossy
                  style="margin-left: 5px; margin-top: 10px;"
                  icon="euro"
                  @click="generatePdf(props.row)"
                >
                  <q-tooltip
                    anchor="top left"
                    :offset="[0, 10]"
                  >
                    Générer la facture
                  </q-tooltip>
                </q-btn>

                <q-btn
                  color="primary"
                  size="sm"
                  round
                  glossy
                  style="margin-left: 5px; margin-top: 10px;"
                  icon="send"
                  @click="envoyerEmail(props.row)"
                >
                  <q-tooltip
                    anchor="top left"
                    :offset="[0, 10]"
                  >
                    Envoyer la facture par mail
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, ref, onMounted } from 'vue'
import { extraireHeureFromISOString } from 'src/helpers/formatHelper'
import { recupererPrestationsDuneIntervention } from 'src/services/prestationService'
import { Prestation } from 'src/models/prestation.model'
import { Intervention } from 'src/models/intervention.model'
import AjouterInterventionComponent from 'src/components/actions/AjouterInterventionComponent.vue'
import { deleteIntervention } from 'src/services/interventionService'
import { jsPDF } from "jspdf";
import { BonObservation } from 'src/models/bonObservation.model'
import  createService from 'src/services/baseService'
import { OrganismeFormation } from 'src/models/organismeformation.model'
import {createBonObservation} from 'src/services/bonObservationService'

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
    const isGenererFacture = ref(false);
    const isCreationBonObservation = ref(false);
    const newBonObservation = ref<BonObservation>({
      id_bon: 0,
      note: '',
      commentaire: '',
      id_prestation: 0,
      stagiaire: '',
      OrganismeFormation: {
        id_OrganismeFormation: 0,
        nom: ''
      }
    });
    const organismesOptions = ref<BonObservation[]>([]);
    const currentPrestationIdPourBon = ref(0);

  const idInterventionAEditer = ref(0);

    const state = reactive({
      prestationsParIntervention: {} as { [key: number]: Prestation[] },
      columns: [
        { name: 'date_heure', required: true, label: 'Heure', align: 'left', field: (row: Intervention) => extraireHeureFromISOString(row.date_heure) },
        { name: 'Patient', required: true, label: 'Patient', align: 'left', field: (row: Intervention) => `${row.Patient.nom} ${row.Patient.prenom}` },
        { name: 'EtatIntervention', required: true, label: 'Etat de l\'intervention', align: 'left', field: (row: Intervention) => `${row.EtatIntervention.libelle}` }
      ] as any[]
    });

    watch(() => props.interventions, async (newInterventions) => {
      for (const intervention of newInterventions) {
        const response = await recupererPrestationsDuneIntervention((intervention as Intervention).id_intervention as number);
        const prestations = response;
        state.prestationsParIntervention[(intervention as Intervention).id_intervention] = prestations;
      }
    });

    function openBonObservationDialog(id_prestation: number) {
  currentPrestationIdPourBon.value = id_prestation;
  isCreationBonObservation.value = true;
}

    onMounted(async () => {
  try {
    const objservationOptionData = await createService("/organisme-formation/").getAll() as OrganismeFormation[];
    organismesOptions.value = objservationOptionData.map((organisme) => ({
      id_OrganismeFormation: organisme.id_OrganismeFormation,
      nom: organisme.nom,
      value: organisme.id_OrganismeFormation,
    }));
  } catch (error) {
    console.error(error);
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

const submitBon = async(id_prestation: number) => {
  try {
    console.log('newBonObservation', newBonObservation)
    const newBonObservationData = {
      id_bon: 0,
      note: newBonObservation.value.note,
      commentaire: newBonObservation.value.commentaire,
      id_prestation: id_prestation,
      stagiaire: newBonObservation.value.stagiaire,
      id_OrganismeFormation: newBonObservation.value.OrganismeFormation.id_OrganismeFormation,
      OrganismeFormation: newBonObservation.value.OrganismeFormation

    } as BonObservation;
    console.log('newBonObservationData', newBonObservationData);
    const response = await createBonObservation(newBonObservationData);
    console.log('Bon d\'observation ajouté:', response);
  } catch (error) {
    console.error('Erreur lors de l\'ajout du bon d\'observation:', error);
  }
}

 async function generatePdf(intervention : Intervention) {
  const prestations = state.prestationsParIntervention[intervention.id_intervention];

  const doc = new jsPDF();
  doc.text(`Facture pour l'intervention du : ${new Date(intervention.date_heure).toLocaleDateString()}`, 10, 10);

  let currentY = 20;

  doc.text(`Patient : ${intervention.Patient.nom} ${intervention.Patient.prenom}`, 10, currentY);
  currentY += 10;

if (prestations && prestations.length > 0) {
  let total = 0;
  prestations.forEach((prestation) => {
    doc.text(`${prestation.Catalogue.libelle} - ${prestation.Catalogue.prix} €`, 10, currentY);
    currentY += 10;
    total = total + prestation.Catalogue.prix;
  });
console.log(total, 'total')
  doc.text(`Total : ${total} €`, 10, currentY);
} else {
  doc.text("Aucune prestation enregistrée", 10, currentY);
}
  doc.save("facture.pdf");
}

    function envoyerEmail(intervention: Intervention) {
      const subject = encodeURIComponent("Sujet du mail");
      const body = encodeURIComponent("Corps du mail");
      console.log('envoyerEmail', intervention);
      window.open(`mailto:${intervention.Patient.email}?subject=${subject}&body=${body}`);
    }

    return { state, submitBon, openBonObservationDialog, isGenererFacture, isEditionIntervention, prestationsParIntervention: state.prestationsParIntervention,
      supprimerIntervention, currentPrestationIdPourBon, ouvrirDialogueEdition, idInterventionAEditer, generatePdf, envoyerEmail, isCreationBonObservation, newBonObservation, organismesOptions };
  }
    // methods: {
    //                             async onSubmit(id_prestation: number) {
    //                               console.log('id_prestation', id_prestation);
    //                               try {
    //                                 console.log('newBonObservation', this.newBonObservation)
    //                                 const newBonObservationData = {
    //                                   id_bon: 0,
    //                                   note: this.newBonObservation.note,
    //                                   commentaire: this.newBonObservation.commentaire,
    //                                   id_prestation: id_prestation,
    //                                   stagiaire: this.newBonObservation.stagiaire,
    //                                  id_organismeFormation: this.newBonObservation.OrganismeFormation.id_OrganismeFormation
    //                                 };
    //                                  const response = await createService("/bon-observation/bon-observation").createData(newBonObservationData);
    //                                 console.log('Bon d\'observation ajouté:', response);
    //                               } catch (error) {
    //                                 console.error('Erreur lors de l\'ajout du bon d\'observation:', error);
    //                             }

    //                           }
    //                         }
})
</script>
