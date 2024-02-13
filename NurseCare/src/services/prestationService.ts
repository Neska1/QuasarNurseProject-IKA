import creerService from './baseService'
import { api } from 'boot/axios'
import { INTERVENTION_ENDPOINT } from './endpoints'

const prestationService = creerService('prestation')

async function recupererPrestationsDuneIntervention (idIntervention: number) {
  try {
    const prestations = await api.get(`/${INTERVENTION_ENDPOINT}/${INTERVENTION_ENDPOINT}/${idIntervention}`)
    return prestations
  } catch (error) {
    console.error('Error fetching prestations:', error)
    throw error
  }
}

export { prestationService, recupererPrestationsDuneIntervention }
