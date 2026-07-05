export interface Cliente {
  id: number;
  nome: string;
  cognome: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCustomerPayload {
  nome: string;
  cognome: string;
  email: string;
}
