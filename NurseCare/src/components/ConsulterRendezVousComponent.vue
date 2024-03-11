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
          <q-td
            colspan="100%"
            style="background-color: #f8f9fa;"
          >
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
                        <div
                          v-for="bon in bonsByPrestation[prestation.id_prestation]"
                          :key="bon.id_bon"
                        >
                          <p style="margin-top: 20px;">
                            <strong>   Bon d'observation :</strong>
                          </p>
                          {{ console.log(bon) }}
                          <u>Stagiaire :</u>&nbsp;&nbsp;{{ bon.stagiaire }}&nbsp; - <u>Note :</u>&nbsp;&nbsp;{{ bon.note }}/5 - <u>Commentaire:</u>&nbsp;&nbsp;{{ bon.commentaire }}
                        </div>
                      </div>

                      <p style="margin-right: -20px;">
                        Ajouter un bon :
                      </p>
                      <div
                        class="col-12 col-md-2"
                        style="margin-bottom: -20px; padding-left: 35px;"
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

              <q-separator
                color="#6c757d"
                style="margin-bottom: 20px;"
              />
              <div
                class="col"
              >
                <div
                  class="row justify-center"
                >
                  <p style="margin-right: -20px;">
                    Gerer l'intervention :
                  </p>
                  <div
                    class="col"
                    style="margin-left: 40px;"
                  >
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
                  </div>
                  <div
                    class="row justify-center"
                  >
                    <p>
                      Facturation :
                    </p>
                    <div
                      class="col items-center"
                      style="margin-left: 20px;"
                    >
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
                </div>
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
import {createBonObservation, getBonObservationsByPrestationId } from 'src/services/bonObservationService'

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
    const googleMapsPath = "ypciG}wyGOGc@@aCiEc@l@Sb@AFsD|DcDfDMD}@t@kAlA[d@u@p@IXqDrDw@`A_B|C_@rAS`Aa@tCqArKYnBO`BGJM@e@X{FnAgFlA}E~@{@FYDj@vEB`@^dCLbA`@jBp@pBfAtBrA`Cx@bBfArCfAjDz@dD`AlGxBjPJdAKLeAPD|@~Cd^@bAV`E@~@Ep@QXe@VWDaA?g@A]JSNU^Kn@A\\Df@Ld@X`@\\V`C`AdAv@b@d@VDhBzC`ArB~AlEzSvm@d@fAlClH?`@xA|DATd@dBBVGl@M^QRc@R[Fg@E]WYYGGCWMOQBKP@V@Ds@tBq@~AiAvDsDrKMEUFMTCPwDFe@FK@IF?PJVCHYTGNCZ@V@hAh@ORs@Hi@Dw@@o@nDIN@@NNRDBBCDDNA?EF?HK?ElDjCFLF^GZ@\\LVRLXARWb@Eb@@hDhCZPZh@Fp@IZKl@QRYHOCUQQe@Go@Bm@XsB?c@^{Bv@kEv@gFNa@b@mCRk@^i@f@_@b@Kn@?h@Nj@`@~@`Ab@XnAbAhBvA`DpBpClAnC~@lB`@lCZ~CNpCCrAKrDe@`Ck@bEqAfNaFnFuB~DcBfEuBbGeDTDtDaBf@E`@D^TXb@l@xBJp@IlAAd@D^X|@Z`@fAX\\?VUVo@?q@Gi@Bg@JMFEpBDzGl@lCX^N\\X\\f@Vf@Jl@Fj@GtEI`AMBEPFNJBHK^v@Ph@]aAS_@?SKIKDEP@Bs@b@aBjAo@HsEyCs@u@_AsAY[uAiCOk@AaA?q@Gi@Oe@a@i@ES{@}@a@s@YgAKw@?e@Jo@N]X[~DwCd@WFWlKaG\\MhGmDhIwE`T{KfN_IpDkCpDyCfAqA~AeC`AwBv@gCz@eD`@wBb@wDP_DDyCC{DSgDa@gDi@yDCg@wB_Ny@uF_@oEgB_Z{@cOUsB[}As@yBy@cBqAqB_AoAmK}OyDcGi@mAe@_BYcBMuBA}ALqBViBr@yCpNuh@n@wC`@aC\\}DPgFv@sc@?yBKyBWyCe@aCaAqC_AmBuB{Ds@mB]}Ae@gCKkBAuBFuBRoB\\iBn@qB|@uBbSca@dAmBtHcOhCyEpCqEtCeEfIsKZEbBqB|GsIrAsA`Aq@jAk@rAe@RMtG}B|IkCrAa@~Bc@pCUj@Or@_@h@g@d@u@b@eATuAHmACqAMiA]sBIkAAy@J_BToAXw@d@}@l@q@t@g@z@YfDm@ZQh@OxFoBt@[~Ay@HQxC_C|DqDZe@Jk@?WEYiEgJ@U?ALS?GzDiEl@m@Ws@S[EMDoBCOKMM_@UMLa@DCdAPeAQEBM`@TLL^JNBLEnBDLRZVr@{B|BmBxBWHOCMJCVFPPDB?tChGVbA?^K^KPeCfCeDnDsBfBqAl@qEvAeBb@eAJaBBiFQeABmB^sCx@s@^WFuGzE{@h@oCnA_Cr@kCf@wCTiQj@SJ{HJ{GEgFSoFc@mDk@qBe@uE}AyDeBgFsCmI}EeCmAeC{@iCk@oC[gCImCDkCTmCf@mF~A}^`MoHvBcGnAsEt@{Fn@mNjAaCZgCn@oBv@}BdA}B~AyBlBkBvBcB~BsBrD_CjEuAvBoB`CsBlBeCdBeD~AoBp@gCf@qBTmCHgLAoENeDV_Dd@_NrCom@xMwGfBcSbGsEfA{Ev@yFl@cVzAoHp@wFdA}Ct@wDpAsCrAsCxAcDzBgCxBwCxCkCbDkC~DyB`EaClFgB~E}AnF}@tDaAhFs@fFm@lG_@tGWdIOfM?xKJ~STbV?~IM~GSpFGjAKNo@fIUpBe@xBkBpGStACl@{@NIF}@H_HjAuBZ_AJYAMBMOK_@GOLOXE[FKLFNAb@IRBXFFPAFKBKVIJG~@KxF}@pDm@f@EJ@`CK|E]tBUzJHtGNF@fD?bNQzJ?TClBLTZBNBVJJNAHG`ADlF|B~@Lf@C|@[`CmAz@KhQrClLbB~ARzHh@BYxAcJxD_WxDf@hB`@jCp@pC`AzH~B\\DwDrL_AnGIh@K~AuENt@hL~IwD~LuCp@S|Co@bCk@zCi@n@S^WtIgBxG{ApAYt@BLJPAHSAWIMPmEpAsK`@uCj@eCL[`B{Cn@w@pDsDRCBCfBoBvA{AV]BIbIoIRUPEPQvBlDGd@@ZNb@Zd@TNX?VKHIL]@g@CWMa@a@e@"

    const idInterventionAEditer = ref(0);
    const bonsByPrestation = {} as { [key: number]: BonObservation[] };

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
        for (const prestation of prestations) {
        const bons = await getBonObservationsByPrestationId(prestation.id_prestation) as BonObservation[];
        bonsByPrestation[prestation.id_prestation] = bons || [];
      }
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
    total = (total * 1) + (prestation.Catalogue.prix* 1) ;
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

    return { state, submitBon, googleMapsPath, openBonObservationDialog, isGenererFacture, isEditionIntervention, prestationsParIntervention: state.prestationsParIntervention,
      supprimerIntervention, currentPrestationIdPourBon, ouvrirDialogueEdition, idInterventionAEditer, generatePdf, envoyerEmail, isCreationBonObservation, newBonObservation, organismesOptions, bonsByPrestation };
  }
})
</script>
