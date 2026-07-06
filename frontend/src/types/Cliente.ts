import type { Noleggio } from './Noleggio';

export interface Cliente {
  id: number;
  nome: string;
  cognome: string;
  email: string;
  active_rentals?: number;
  created_at: string;
  updated_at: string;
}

export interface CreateCustomerPayload {
  nome: string;
  cognome: string;
  email: string;
}

export type UpdateCustomerPayload = CreateCustomerPayload;

export interface CustomerDetailResponse {
  cliente: Cliente;
  active_rentals: Noleggio[];
  rental_history: Noleggio[];
}
