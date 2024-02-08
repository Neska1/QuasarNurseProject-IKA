import { ref } from 'vue'
import { api } from 'boot/axios'

const creerService = <T>(endpoint: string) => {
  const data = ref<T[]>([])

  const getAll = async () => {
    try {
      const response = await api.get(endpoint)
      data.value = response.data
      return data.value
    } catch (error) {
      console.error(`Erreur lors de la récupération des données pour ${endpoint}:`, error)
    }
  }

  const createData = async (dataItem: T) => {
    try {
      const response = await api.post(endpoint, dataItem)
      return response.data
    } catch (error) {
      console.error(`Erreur lors de la création des données pour ${endpoint}:`, error)
    }
  }

  const updateData = async (dataItemId: number, dataItem: T) => {
    try {
      const response = await api.put(`${endpoint}/${dataItemId}`, dataItem)
      return response.data
    } catch (error) {
      console.error(`Erreur lors de la mise à jour des données pour ${endpoint}:`, error)
    }
  }

  const deleteData = async (dataItemId: number) => {
    try {
      const response = await api.delete(`${endpoint}/${dataItemId}`)
      return response.data
    } catch (error) {
      console.error(`Erreur lors de la suppression des données pour ${endpoint}:`, error)
    }
  }

  const chercherParId = async (dataId: number) => {
    try {
      const response = await api.get(`/${endpoint}/${dataId}`)
      return response.data
    } catch (error) {
      console.error('Erreur lors de la récupération du patient:', error)
    }
  }

  const getAllNomPrenom = async () => {
    try {
      const response = await api.get(`${endpoint}/noms`)
      return response.data.map((item: { nom: string; prenom: string }) => ({
        nom: item.nom,
        prenom: item.prenom
      }))
    } catch (error) {
      console.error(`Erreur lors de la récupération des données pour les noms et prénoms de ${endpoint}:`, error)
      return []
    }
  }

  return { data, getAll, createData, updateData, deleteData, chercherParId, getAllNomPrenom }
}

export default creerService
