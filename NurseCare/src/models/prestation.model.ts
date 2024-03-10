export interface Prestation {
  id_prestation: number,
  id_intervention: number,
  Catalogue: {
    CategorieCatalogue: any;
    id_catalogue: number;
    libelle: string;
    prix: number;
  };
}
