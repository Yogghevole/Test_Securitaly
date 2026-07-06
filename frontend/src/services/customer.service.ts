import apiClient from '@/lib/axios';
import type {
  Cliente,
  CreateCustomerPayload,
  CustomerDetailResponse,
  UpdateCustomerPayload,
} from '@/types';

const CUSTOMERS_ENDPOINT = '/clienti';

interface CustomerFilters {
  search?: string;
}

const getAll = async (params?: CustomerFilters): Promise<Cliente[]> => {
  const { data } = await apiClient.get<Cliente[]>(CUSTOMERS_ENDPOINT, { params });

  return data;
};

const getById = async (id: number): Promise<CustomerDetailResponse> => {
  const { data } = await apiClient.get<CustomerDetailResponse>(
    `${CUSTOMERS_ENDPOINT}/${id}`,
  );

  return data;
};

const create = async (payload: CreateCustomerPayload): Promise<Cliente> => {
  const { data } = await apiClient.post<Cliente>(CUSTOMERS_ENDPOINT, payload);

  return data;
};

const update = async (
  id: number,
  payload: UpdateCustomerPayload,
): Promise<Cliente> => {
  const { data } = await apiClient.put<Cliente>(
    `${CUSTOMERS_ENDPOINT}/${id}`,
    payload,
  );

  return data;
};

export const customerService = {
  getAll,
  getById,
  create,
  update,
};
