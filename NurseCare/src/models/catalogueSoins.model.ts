export interface CatalogueSoins {
  id_catalogue: number;
  libelle: string;
  prix: number;
  Categorie: {
    id_categorie: number;
    libelle: string;
  };
}
