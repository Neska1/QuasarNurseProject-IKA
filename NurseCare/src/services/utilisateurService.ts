// patientService.ts

import { ref } from 'vue'
import { api } from 'boot/axios'
import type { Utilisateur } from '../models/utilisateur.model'
import type { Personnel } from 'src/models/personnel.model'
import type { Role } from '../models/role.model'
import { Intervention } from 'src/models/intervention.model'

const intervention = ref<Intervention[]>([])

const loadUtilisateur = async () => {
  try {
    const response = await api.get('/utilisateur')
    intervention.value = response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des patients:', error)
  }
}

const createUtilisateur = async (patientData: Utilisateur) => {
  try {
    const response = await api.post('/utilisateur/utilisateur', patientData)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la création du patient:', error)
  }
}

const updateUtilisateur = async (patientId: number, patientData: Utilisateur) => {
  try {
    const response = await api.put(`/utilisateur/${patientId}`, patientData)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la mise à jour du patient:', error)
  }
}

const deleteUtilisateur = async (patientId: number) => {
  try {
    const response = await api.delete(`/utilisateur/${patientId}`)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la suppression du patient:', error)
  }
}

const chercherUtilisateurById = async (patientId: number) => {
  try {
    const response = await api.get(`/utilisateur/${patientId}`)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération du patient:', error)
  }
}

const personnelInfo = ref<Personnel | null>(null)

const fetchPersonnelInfo = async (idPersonnel: number) => {
  try {
    const response = await api.get(`/personnel/personnel/${idPersonnel}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`
      }
    })
    personnelInfo.value = response.data
    localStorage.setItem('personnelInfo', JSON.stringify(response.data))
  } catch (error) {
    console.error('Failed to fetch personnel info:', error)
  }
}

const fetchPersonnelInfoEmail = async (email: string): Promise<Personnel | null> => {
  try {
    const response = await api.get(`/personnel/by-email/${email}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userEmail')}`
      }
    })
    return response.data as Personnel
  } catch (error) {
    console.error('Failed to fetch personnel info:', error)
    return null
  }
}

const fetchRoleById = async (roleId: number): Promise<Role | null> => {
  try {
    const response = await api.get(`/roles/${roleId}`)
    return response.data as Role
  } catch (error) {
    console.error('Failed to fetch role:', error)
    return null
  }
}

export { intervention, loadUtilisateur, fetchRoleById, fetchPersonnelInfoEmail, createUtilisateur, updateUtilisateur, deleteUtilisateur, chercherUtilisateurById, fetchPersonnelInfo, personnelInfo }
