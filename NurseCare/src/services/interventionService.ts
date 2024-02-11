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

const createIntervention = async (interventionData: Intervention) => {
  try {
    const dataToSend = {
      prevision: interventionData.date_heure.getDate(), // Convertir la date en timestamp si nécessaire
      id_patient: interventionData.Patient.id_patient,
      id_personnel: interventionData.Personnel?.id_personnel, // Utiliser ?. pour les champs optionnels
      id_etat: interventionData.EtatIntervention.id_etat
    }

    const response = await api.post('/intervention/intervention', dataToSend) // Assurez-vous que l'URL est correcte
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

export { intervention, loadIntervention, createIntervention, updateIntervention, deleteIntervention }
