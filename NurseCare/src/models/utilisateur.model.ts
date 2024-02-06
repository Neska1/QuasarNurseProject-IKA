export interface Utilisateur {
  email: string;
  PasswordHash: string;
  Personnel: {
    id_personnel: number;
    nom: string;
    prenom: string;
    Role: {
      id_role: number;
      libelle: string;
    }
  };
}
