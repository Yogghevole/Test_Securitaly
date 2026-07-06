import apiClient from '@/lib/axios';
import type { Dvd } from '@/types';

const DVD_ENDPOINT = '/dvds';

const getAll = async (): Promise<Dvd[]> => {
  const { data } = await apiClient.get<Dvd[]>(DVD_ENDPOINT);

  return data;
};

const getAvailable = async (): Promise<Dvd[]> => {
  const dvds = await getAll();

  return dvds.filter((dvd) => dvd.copie_disponibili > 0);
};

const getById = async (id: number): Promise<Dvd | null> => {
  const dvds = await getAll();

  return dvds.find((dvd) => dvd.id === id) ?? null;
};

export const dvdService = {
  getAll,
  getAvailable,
  getById,
};
