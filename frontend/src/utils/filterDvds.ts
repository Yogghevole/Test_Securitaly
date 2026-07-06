import type { Dvd } from '@/types';

const normalizeValue = (value: string) => {
  return value.trim().toLowerCase();
};

export const filterDvds = (
  dvds: Dvd[],
  search: string,
  category: string,
  availability: string,
): Dvd[] => {
  const normalizedSearch = normalizeValue(search);
  const normalizedCategory = normalizeValue(category);
  const normalizedAvailability = normalizeValue(availability);

  return dvds.filter((dvd) => {
    const matchesSearch =
      normalizedSearch === '' ||
      normalizeValue(dvd.titolo).includes(normalizedSearch);

    const matchesCategory =
      normalizedCategory === '' ||
      normalizedCategory === 'all' ||
      normalizeValue(dvd.categoria) === normalizedCategory;

    const matchesAvailability =
      normalizedAvailability === '' ||
      normalizedAvailability === 'all' ||
      (normalizedAvailability === 'available' && dvd.copie_disponibili > 0) ||
      (normalizedAvailability === 'sold-out' && dvd.copie_disponibili === 0);

    return matchesSearch && matchesCategory && matchesAvailability;
  });
};