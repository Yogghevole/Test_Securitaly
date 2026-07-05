import { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { rentalService } from '@/services';
import { getRentalStatus } from '@/components/rentals';
import type { Noleggio } from '@/types';
import { getCustomerFullName } from '../rentalHistory';

const STATUS_OPTIONS = [
  { label: 'Tutti', value: 'all' },
  { label: 'Rientrano oggi', value: 'returns_today' },
  { label: 'In orario', value: 'on_time' },
  { label: 'In scadenza', value: 'due_soon' },
  { label: 'In ritardo', value: 'overdue' },
  { label: 'Restituito in tempo', value: 'returned_on_time' },
  { label: 'Restituito in ritardo', value: 'returned_late' },
] as const;

type StatusFilterValue = (typeof STATUS_OPTIONS)[number]['value'];

export const useRentalHistory = () => {
  const [rentals, setRentals] = useState<Noleggio[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [statusValue, setStatusValue] = useState<StatusFilterValue>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const refreshRentals = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const data = await rentalService.getAll();
      setRentals(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(refreshRentals);
  }, [refreshRentals]);

  const sortedRentals = useMemo(() => {
    return [...rentals].sort((left, right) => {
      return (
        dayjs(right.data_noleggio).valueOf() -
        dayjs(left.data_noleggio).valueOf()
      );
    });
  }, [rentals]);

  const filteredRentals = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    return sortedRentals.filter((rental) => {
      const fullName = getCustomerFullName(rental.cliente).toLowerCase();
      const movieTitle = rental.dvd?.titolo?.toLowerCase() ?? '';
      const matchesSearch =
        !normalizedSearch ||
        fullName.includes(normalizedSearch) ||
        movieTitle.includes(normalizedSearch);
      const matchesStatus =
        statusValue === 'all' || getRentalStatus(rental).key === statusValue;

      return matchesSearch && matchesStatus;
    });
  }, [searchValue, sortedRentals, statusValue]);

  return {
    filteredRentals,
    hasError,
    isLoading,
    refreshRentals,
    rentals: sortedRentals,
    searchValue,
    setSearchValue,
    statusOptions: STATUS_OPTIONS,
    statusValue,
    setStatusValue,
  };
};