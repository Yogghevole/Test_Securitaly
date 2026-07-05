import apiClient from '@/lib/axios';
import type {
  CreateRentalPayload,
  Noleggio,
  RegisterReturnsPayload,
  RentalFilters,
} from '@/types';

const RENTALS_ENDPOINT = '/noleggi';

const getAll = async (params?: RentalFilters): Promise<Noleggio[]> => {
  const { data } = await apiClient.get<Noleggio[]>(RENTALS_ENDPOINT, { params });

  return data;
};

const getByCustomerId = async (clienteId: number): Promise<Noleggio[]> => {
  return getAll({ cliente_id: clienteId });
};

const getByDvdTitle = async (titoloDvd: string): Promise<Noleggio[]> => {
  return getAll({ titolo_dvd: titoloDvd });
};

const createRental = async (
  payload: CreateRentalPayload,
): Promise<Noleggio[]> => {
  const { data } = await apiClient.post<Noleggio[]>(RENTALS_ENDPOINT, payload);

  return data;
};

const registerReturn = async (id: number): Promise<Noleggio> => {
  const { data } = await apiClient.put<Noleggio>(
    `${RENTALS_ENDPOINT}/${id}/restituisci`,
  );

  return data;
};

const registerReturns = async (
  payload: RegisterReturnsPayload,
): Promise<Noleggio[]> => {
  const { data } = await apiClient.post<Noleggio[]>(
    `${RENTALS_ENDPOINT}/restituzioni`,
    payload,
  );

  return data;
};

export const rentalService = {
  getAll,
  getByCustomerId,
  getByDvdTitle,
  createRental,
  registerReturn,
  registerReturns,
};
