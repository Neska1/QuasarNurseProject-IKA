import creerService from './baseService'
import { api } from 'boot/axios'
import { INTERVENTION_ENDPOINT, PRESTATION_ENDPOINT } from './endpoints'
import { Prestation } from 'src/models/prestation.model'

const prestationService = creerService('prestation')

async function recupererPrestationsDuneIntervention (idIntervention: number) {
  try {
    const prestations = await api.get<Prestation[]>(`${PRESTATION_ENDPOINT}${INTERVENTION_ENDPOINT}/${idIntervention}`)
    return prestations.data;
  } catch (error) {
    console.error('Error fetching prestations:', error)
    throw error
  }
}



export { prestationService, recupererPrestationsDuneIntervention }
