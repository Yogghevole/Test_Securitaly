import type { Dvd } from '@/types';

const normalizeValue = (value: string) => {
  return value.trim().toLowerCase();
};

export const filterDvds = (
  dvds: Dvd[],
  search: string,
  category: string,
): Dvd[] => {
  const normalizedSearch = normalizeValue(search);
  const normalizedCategory = normalizeValue(category);

  return dvds.filter((dvd) => {
    const matchesSearch =
      normalizedSearch === '' ||
      normalizeValue(dvd.titolo).includes(normalizedSearch);

    const matchesCategory =
      normalizedCategory === '' ||
      normalizedCategory === 'all' ||
      normalizeValue(dvd.categoria) === normalizedCategory;

    return matchesSearch && matchesCategory;
  });
};