export interface Dvd {
  id: number;
  titolo: string;
  data_di_uscita: string;
  categoria: string;
  durata_minuti: number;
  quantita: number;
  cover_path: string | null;
  copie_disponibili: number;
  created_at: string;
  updated_at: string;
}
