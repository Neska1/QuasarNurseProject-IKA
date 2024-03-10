<template>
  <q-card style="min-width: 900px; padding: 20px;">
    <form @submit.prevent="submitForm">
      <q-toolbar-title>
        <p style="padding:-10px;">
          Ajouter une intervention
        </p>
      </q-toolbar-title>
      <q-card-section class="row">
        <q-input
          stack-label
          outlined
          label="Date"
          :model-value="formattedDate"
          :disabled="isDisabled"
          readonly
          @click="showDatePicker = true"
        >
          <template #append>
            <q-icon
              name="event"
              class="cursor-pointer"
              @click="showDatePicker = true"
            />
          </template>
        </q-input>
        <q-dialog v-model="showDatePicker">
          <q-date
            v-model="intervention.date_heure"
            mask="YYYY-MM-DD"
            @ok="showDatePicker = false"
            @cancel="showDatePicker = false"
          />
        </q-dialog>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-select
          v-model="intervention.Patient"
          stack-label
          outlined
          label="Patient"
          :options="patients"
          :disabled="isDisabled"
        />
        <q-select
          v-model="intervention.Personnel"
          stack-label
          outlined
          label="Soignant"
          :options="personnels"
          :disabled="isDisabled"
        />
        <q-select
          v-model="intervention.EtatIntervention"
          stack-label
          outlined
          label="Statut"
          :options="etats"
          :disabled="isDisabled"
        />
        <q-card-section>
          <p class="text-subtitle1">
            Prestations
          </p>
          <div
            v-for="(idCatalogueSoin, index) in soinsSelectionnes"
            :key="index"
          >
            <div
              class="row"
              style="margin-bottom: 5px;"
            >
              <div class="col">
                <q-select
                  v-model="soinsSelectionnes[index]"
                  filled
                  :options="optionsCatalogue"
                  label="Choisir un soin"
                  emit-value
                  map-options
                />
              </div>
              <q-btn
                flat
                icon="delete"
                @click="supprimerSoin(index)"
              />
            </div>
          </div>
          <q-btn
            flat
            label="Ajouter un autre soin"
            icon="add"
            @click="ajouterSoin"
          />
        </q-card-section>
      </q-card-section>
      <q-card-actions>
        <q-btn
          v-close-popup
          flat
          label="Annuler"
          color="primary"
        />
        <q-space />
        <q-btn
          flat
          label="Valider"
          color="primary"
          type="submit"
        />
      </q-card-actions>
    </form>
  </q-card>
</template>
<script lang="ts">
// Models
import { Intervention } from 'src/models/intervention.model'
import { Patient } from 'src/models/patient.model'
import { EtatIntervention } from 'src/models/etatIntervention.model'
import { Personnel } from 'src/models/personnel.model'
import { Prestation } from 'src/models/prestation.model'
import { CatalogueSoins } from 'src/models/catalogueSoins.model'
// Services
import { defineComponent, ref, watch, PropType, onMounted, computed  } from 'vue'
import createService from 'src/services/baseService'
import { PERSONNEL_ENDPOINT, ETAT_INTERVENTION_ENDPOINT, PATIENT_ENDPOINT, CATALOGUE_ENDPOINT } from 'src/services/endpoints'
import { createIntervention, getInterventionById, updateIntervention } from 'src/services/interventionService'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { premiereLettreUpperCase } from 'src/helpers/formatHelper'

export default defineComponent({
  name: 'AjouterInterventionComponent',
  props: {
    idIntervention: {
      type: Number,
      default: 0
    },
     newIntervention: {
      type: Object as PropType<Intervention>,
      default: () => ({
        id_etat: 0,
        id_patient: 0,
        id_personnel: 0,
        date_heure: new Date()
      })
    },
    isDisabled: Boolean
  },
  emits: ['update:prestations', 'intervention-added', 'removeSoin', 'intervention-updated'],
  setup(props, { emit }) {
    const optionsCatalogue = computed(() => catalogue.value.map(c => ({ label: c.libelle, value: c.id_catalogue })))
    const intervention = ref<Intervention>({ ...props.newIntervention })
    const showDatePicker = ref(false)
    const personnels = ref<Personnel[]>([])
    const etats = ref<EtatIntervention[]>([])
    const patients = ref<Patient[]>([])
    const catalogue = ref<CatalogueSoins[]>([])
    const selectedSoin = ref<CatalogueSoins | null>(null)
    const formattedDate = computed(() => {
      if (!intervention.value.date_heure) return ''
      const date = new Date(intervention.value.date_heure)
      return premiereLettreUpperCase(format(date, 'EEEE d MMMM yyyy', { locale: fr }))
    })
    const soinsSelectionnes = ref<(number | null)[]>([])
    const prestation = ref<Prestation>({
      id_prestation: 0 as number,
      id_intervention: 0 as number,
      Catalogue: {
        id_catalogue: 0 as number,
        libelle: '' as string,
        prix: 0 as number,
        CategorieCatalogue: {
          id_categorie: 0 as number,
          libelle: '' as string
        }
      }
    })

    watch(() => props.idIntervention, async (newId, oldId) => {
      if (newId > 0) {
        const interventionData = await chargerIntervention(newId) as Intervention;
        intervention.value = interventionData;
        console.log(intervention.value, 'inter');
      } else {
        function getNouvelleIntervention() {
          return {
            id_intervention: 0 as number,
            date_heure: new Date(),
            Patient: {
              id_patient: 0 as number,
              nom: '' as string,
              prenom: '' as string,
              email: '' as string
            },
            Personnel: {
              id_personnel: 0 as number,
              nom: '' as string,
              prenom: '' as string
            },
            EtatIntervention: {
              id_etat: 0 as number,
              libelle: '' as string
            }
          };
        }

        intervention.value = getNouvelleIntervention();
      }
    }, { immediate: true });

   async function chargerIntervention(id: number) {
        try{
            const interventionData = await getInterventionById(id);
            return interventionData;
          }
          catch (error){
          console.error('Erreur lors du chargement de l\'intervention:', error);
          return null;
      }

    }

    // ON MOUNTED
    onMounted(async () => {
      try {
        console.log(intervention.value);
        const [personnelData, etatsData, patientData] = await Promise.all([
          createService(PERSONNEL_ENDPOINT).getAll(),
          createService(ETAT_INTERVENTION_ENDPOINT).getAll(),
          createService(PATIENT_ENDPOINT).getAll()
        ]) as [Personnel[], EtatIntervention[], Patient[]]

        personnels.value = (personnelData).map(p => ({
          id_personnel: p.id_personnel,
          nom: p.nom,
          prenom: p.prenom,
          label: `${p.nom} ${p.prenom}`
        }))

        etats.value = etatsData.map(e => ({
          id_etat: e.id_etat,
          libelle: e.libelle,
          label: e.libelle
        }))

        patients.value = patientData.map(p => ({
          id_patient: p.id_patient,
          nom: p.nom,
          prenom: p.prenom,
          label: `${p.nom} ${p.prenom}`,
          email: p.email
        }))
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error)
      }
      try {
        const catalogueService = createService(CATALOGUE_ENDPOINT)
        const catalogueData = await catalogueService.getAll() as CatalogueSoins[]

        catalogue.value = (catalogueData).map(c => ({
          id_catalogue: c.id_catalogue,
          libelle: c.libelle,
          prix: c.prix,
          Categorie: {
            id_categorie: 0 as number,
            libelle: '' as string
          }
        }))
      } catch (error) {
        console.error('Erreur lors du chargement du catalogue:', error)
      }
    })

    const submitForm = async () => {
      try {
            const interventionData: Intervention = {
          id_intervention: intervention.value.id_intervention,
          date_heure: intervention.value.date_heure,
          Patient: intervention.value.Patient,
          Personnel: intervention.value.Personnel,
          EtatIntervention: intervention.value.EtatIntervention,
        };

        let resultat;
        if (intervention.value.id_intervention) {
          // Mise à jour de l'intervention existante
          resultat = await updateIntervention(intervention.value.id_intervention, interventionData) as Intervention;
          emit('intervention-updated', resultat.id_intervention);
        } else {
          // Création d'une nouvelle intervention
          const createdIntervention = await createIntervention(interventionData, soinsSelectionnes.value.filter(v => v !== null) as number[]) as Intervention;
          emit('intervention-added', createdIntervention.id_intervention);
        }
        console.log('Intervention ajoutée avec succès:', soinsSelectionnes.value)

      } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'intervention:', error)
      }
    }

    return { intervention, showDatePicker, personnels, patients, optionsCatalogue, etats, submitForm, catalogue, selectedSoin, formattedDate, soinsSelectionnes, prestation }
  },
  methods:
  {
    ajouterSoin() {
      this.soinsSelectionnes.push(null)
    },

    supprimerSoin(index: number) {
      if (this.soinsSelectionnes.length !== 1) {
        this.soinsSelectionnes.splice(index, 1)
      }
    },
    updateCatalogueId(idCatalogue: number) {
      this.prestation.Catalogue.id_catalogue = idCatalogue
    }
  }
})
</script>
