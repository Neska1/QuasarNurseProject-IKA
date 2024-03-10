export interface BonObservation {
  id_bon: number;
  note: string;
  commentaire: string;
  id_prestation: number;
  stagiaire: string,
  OrganismeFormation: {
    id_OrganismeFormation: number;
    nom: string;
  };
}
