import type { Cliente } from './Cliente';
import type { Dvd } from './Dvd';

export interface Noleggio {
  id: number;
  cliente_id: number;
  dvd_id: number;
  data_noleggio: string;
  restituzione_prevista: string;
  restituzione_effettiva: string | null;
  created_at: string;
  updated_at: string;
  cliente?: Cliente;
  dvd?: Dvd;
  is_attivo: boolean;
}

export interface CreateRentalPayload {
  cliente_id: number;
  dvd_ids: number[];
  data_noleggio: string;
  restituzione_prevista: string;
}

export interface RegisterReturnsPayload {
  noleggio_ids: number[];
  data_restituzione: string;
}

export interface RentalFilters {
  cliente_id?: number;
  titolo_dvd?: string;
}
