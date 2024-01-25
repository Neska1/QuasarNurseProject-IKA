// patientService.ts

import { ref } from 'vue'
import { api } from 'boot/axios'
import type { CatalogueSoins } from '../models/catalogueSoins.model'

const catalogue = ref<CatalogueSoins[]>([])

const loadCatalogue = async () => {
  try {
    const response = await api.get('/catalogue')
    catalogue.value = response.data
  } catch (error) {
    console.error('Erreur lors de la récupération du catalogue:', error)
  }
}

const createCatalogue = async (patientData: CatalogueSoins) => {
  try {
    const response = await api.post('/catalogue', patientData)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la création du patient:', error)
  }
}

const updateCatalogue = async (patientId: number, patientData: CatalogueSoins) => {
  try {
    const response = await api.put(`/catalogue/${patientId}`, patientData)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la mise à jour du patient:', error)
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

export { catalogue, loadCatalogue, createCatalogue, updateCatalogue, deleteCatalogue, chercherElementCatalogueById }
