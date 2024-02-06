import { ref } from 'vue'
import { api } from 'boot/axios'
import type { Intervention } from '../models/intervention.model'

const intervention = ref<Intervention[]>([])

const loadIntervention = async () => {
  try {
    const response = await api.get('/intervention')
    intervention.value = response.data
  } catch (error) {
    console.error('Erreur lors de la récupération du intervention:', error)
  }
}

const createIntervention = async (patientData: Intervention) => {
  try {
    const response = await api.post('/intervention', patientData)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la création du patient:', error)
  }
}

const updateIntervention = async (patientId: number, patientData: Intervention) => {
  try {
    const response = await api.put(`/intervention/${patientId}`, patientData)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la mise à jour du patient:', error)
  }
}

const deleteIntervention = async (patientId: number) => {
  try {
    const response = await api.delete(`/intervention/${patientId}`)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la suppression du patient:', error)
  }
}

export { intervention, loadIntervention, createIntervention, updateIntervention, deleteIntervention }
