import { ref } from 'vue'
import { api } from 'boot/axios'
import type { Intervention } from '../models/intervention.model'
import type { Prestation } from '../models/prestation.model'

const intervention = ref<Intervention[]>([])
const prestationsByIntervention = ref<{ [key: number]: Prestation[] }>({});

type ServerResponse = {
  interventions: Intervention[];
  prestationsByIntervention: { [key: number]: Prestation[] };
};

const loadIntervention = async () => {
  try {
    const response = await api.get<ServerResponse>('/intervention');
    console.log('response:', response);
    intervention.value = response.data.interventions;
    prestationsByIntervention.value = response.data.prestationsByIntervention;
  } catch (error) {
    console.error('Erreur lors de la récupération des interventions:', error);
  }
};

const getInterventionsByDateAndPersonnel = async (date: string, personnelId: number) => {
  try {
    const isoDate = new Date(date).toISOString()
    console.log('isoDate:', isoDate)
    const response = await api.get<Intervention[]>(`/intervention/intervention/${isoDate}/${personnelId}`)
    console.log('response:', response)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des interventions par date et patient:', error)
  }
}

const getInterventionById = async (interventionId: number) => {
  try {
    const response = await api.get<Intervention>(`/intervention/intervention/${interventionId}`)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération de l intervention :', interventionId, error)
  }
}

const createIntervention = async (interventionData: Intervention, soinsSelectionnes: number[]) => {
  try {
    const dataToSend = {
      intervention: {
        date_heure: interventionData.date_heure,
        id_patient: interventionData.Patient.id_patient,
        id_personnel: interventionData.Personnel?.id_personnel,
        id_etat: interventionData.EtatIntervention.id_etat
      },
      soinsSelectionnes
    }

    const response = await api.post<Intervention>('/intervention/intervention', dataToSend)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la création de l\'intervention:', error)
  }
}

const updateIntervention = async (interventionId: number, interventionData: Intervention) => {
  try {
    const response = await api.put<Intervention>(`/intervention/intervention/${interventionId}`, interventionData)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la mise à jour du patient:', error)
  }
}

const deleteIntervention = async (interventionId: number) => {
  try {
    const response = await api.delete<Intervention>(`/intervention/intervention/${interventionId}`)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la suppression du patient:', error)
  }
}

const getTrajetOrdonne = async (date: string, personnelId: number, startingPoint: string) => {
  try {
    const formattedDate = date.split('/').join('-');
    const encodedStartingPoint = encodeURIComponent(startingPoint);
    console.log('date srv:', formattedDate, 'personnelId sev:', personnelId, 'startingPoint sev:', encodedStartingPoint);
    const response = await api.get(`/intervention/trajet/${formattedDate}/${personnelId}/${encodedStartingPoint}`);
    console.log(response.data, 'response.data');
    return response.data;
  } catch (error) {
    console.error('Erreur lors du calcul du trajet:', error);
  }
}

export { intervention, getTrajetOrdonne, loadIntervention, createIntervention, getInterventionById, updateIntervention, deleteIntervention, getInterventionsByDateAndPersonnel as getInterventionsByDateAndPatient, prestationsByIntervention }
