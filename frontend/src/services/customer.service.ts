import apiClient from '@/lib/axios';
import type { Cliente, CreateCustomerPayload } from '@/types';

const CUSTOMERS_ENDPOINT = '/clienti';

const getAll = async (): Promise<Cliente[]> => {
  const { data } = await apiClient.get<Cliente[]>(CUSTOMERS_ENDPOINT);

  return data;
};

const getById = async (id: number): Promise<Cliente | null> => {
  const customers = await getAll();

  return customers.find((customer) => customer.id === id) ?? null;
};

const create = async (payload: CreateCustomerPayload): Promise<Cliente> => {
  const { data } = await apiClient.post<Cliente>(CUSTOMERS_ENDPOINT, payload);

  return data;
};

export const customerService = {
  getAll,
  getById,
  create,
};
