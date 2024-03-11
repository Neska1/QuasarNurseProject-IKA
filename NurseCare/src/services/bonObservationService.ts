// patientService.ts

import { ref } from 'vue'
import { api } from 'boot/axios'
import type { BonObservation } from '../models/bonObservation.model'

const bonObservations = ref<BonObservation[]>([])

const loadBonObservation = async () => {
  try {
    const response = await api.get('/bon')
    bonObservations.value = response.data
  } catch (error) {
    console.error('Erreur lors de la récupération du BonObservation:', error)
  }
}

const createBonObservation = async (bonData: BonObservation) => {
  try {
    console.log(bonData)
    const response = await api.post<BonObservation>('/bon-observation/bon-observation', bonData)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la création du BonObservation:', error)
  }
}

const getBonObservationsByPrestationId = async (idPrestation: number) => {
  try {
    const response = await api.get(`/prestation/${idPrestation}/bon-observation`)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des bons d\'observations:', error)
  }
}

const updateCatalogue = async (patientId: number, patientData: BonObservation) => {
  try {
    const response = await api.put(`/bon-observation/${patientId}`, patientData)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la mise à jour du BonObservation:', error)
  }
}

const deleteCatalogue = async (patientId: number) => {
  try {
    const response = await api.delete(`/catalogue/${patientId}`)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la suppression du patient:', error)
  }
}

const chercherElementCatalogueById = async (patientId: number) => {
  try {
    const response = await api.get(`/catalogue/${patientId}`)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération du patient:', error)
  }
}

export { bonObservations, updateCatalogue, deleteCatalogue, chercherElementCatalogueById, createBonObservation, loadBonObservation, getBonObservationsByPrestationId}
