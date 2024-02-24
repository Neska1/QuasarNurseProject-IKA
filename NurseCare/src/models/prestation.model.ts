export interface Prestation {
  id_prestation: number,
  id_intervention: number,
  Catalogue: {
    id_catalogue: number;
    libelle: string;
    prix: number;
  };
}
