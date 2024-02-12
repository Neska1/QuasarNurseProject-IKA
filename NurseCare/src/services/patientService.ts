// patientService.ts

import { ref } from 'vue'
import { api } from 'boot/axios'
import type { Patient } from '../models/patient.model'

const patients = ref<Patient[]>([])

const loadPatients = async () => {
  try {
    const response = await api.get('/patients')
    patients.value = response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des patients:', error)
  }
}

const createPatient = async (patientData: Patient) => {
  try {
    const response = await api.post('/patients/patient', patientData)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la création du patient:', error)
  }
}

const updatePatient = async (patientId: number, patientData: Patient) => {
  try {
    const response = await api.put(`/patients/patient/${patientId}`, patientData)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la mise à jour du patient:', error)
  }
}

const deletePatient = async (patientId: number) => {
  try {
    const response = await api.delete(`/patient/${patientId}`)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la suppression du patient:', error)
  }
}

const chercherPatientById = async (patientId: number) => {
  try {
    const response = await api.get(`/patient/${patientId}`)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération du patient:', error)
  }
}

export { patients, loadPatients, createPatient, updatePatient, deletePatient, chercherPatientById }
