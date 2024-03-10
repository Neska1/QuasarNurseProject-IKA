export interface Intervention {
  id_intervention: number;
  date_heure: Date;
  id_facture?: number;
  date_facturation?: Date;
  date_paiement?: Date;
  prevision?: Date;
  Patient: {
    id_patient: number;
    nom: string;
    prenom: string;
    email: string;
  }
  Personnel?: {
    id_personnel: number;
    nom: string;
    prenom: string;
  }
  EtatIntervention: {
    id_etat: number;
    libelle: string;
  };
}
