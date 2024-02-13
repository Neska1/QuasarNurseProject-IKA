import { ref } from 'vue'
import { api } from 'boot/axios'
import type { Intervention } from '../models/intervention.model'

const intervention = ref<Intervention[]>([])

const loadIntervention = async () => {
  try {
    const response = await api.get('/intervention')
    intervention.value = response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des interventions:', error)
  }
}

const getInterventionsByDateAndPersonnel = async (date: string, personnelId: number) => {
  try {
    const isoDate = new Date(date).toISOString()
    console.log('isoDate:', isoDate)
    const response = await api.get(`/intervention/intervention/${isoDate}/${personnelId}`)
    console.log('response:', response)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des interventions par date et patient:', error)
  }
}

const createIntervention = async (interventionData: Intervention) => {
  try {
    const dataToSend = {
      prevision: interventionData.date_heure,
      id_patient: interventionData.Patient.id_patient,
      id_personnel: interventionData.Personnel?.id_personnel,
      id_etat: interventionData.EtatIntervention.id_etat
    }

    const response = await api.post('/intervention/intervention', dataToSend)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la création de l\'intervention:', error)
  }
}

const updateIntervention = async (interventionId: number, interventionData: Intervention) => {
  try {
    const response = await api.put(`/intervention/${interventionId}`, interventionData)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la mise à jour du patient:', error)
  }
}

const deleteIntervention = async (interventionId: number) => {
  try {
    const response = await api.delete(`/intervention/${interventionId}`)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la suppression du patient:', error)
  }
}

export { intervention, loadIntervention, createIntervention, updateIntervention, deleteIntervention, getInterventionsByDateAndPersonnel as getInterventionsByDateAndPatient }
