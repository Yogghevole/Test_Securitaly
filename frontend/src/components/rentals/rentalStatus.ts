import dayjs from 'dayjs';
import type { StatusChipVariant } from '@/components/common';
import type { Noleggio } from '@/types';

export type RentalStatusKey =
  | 'returns_today'
  | 'on_time'
  | 'due_soon'
  | 'overdue'
  | 'returned_on_time'
  | 'returned_late';

export interface RentalStatus {
  key: RentalStatusKey;
  label: string;
  variant: StatusChipVariant;
}

const getExpectedReturnDate = (rental: Noleggio) => {
  return dayjs(rental.restituzione_prevista).startOf('day');
};

const getActualReturnDate = (rental: Noleggio) => {
  if (!rental.restituzione_effettiva) {
    return null;
  }

  return dayjs(rental.restituzione_effettiva).startOf('day');
};

export const getRentalDelayDays = (
  rental: Noleggio,
  referenceDate = dayjs(),
): number | null => {
  const expectedReturn = getExpectedReturnDate(rental);
  const actualReturn = getActualReturnDate(rental);

  if (actualReturn) {
    const delay = actualReturn.diff(expectedReturn, 'day');

    return delay > 0 ? delay : null;
  }

  const delay = referenceDate.startOf('day').diff(expectedReturn, 'day');

  return delay > 0 ? delay : null;
};

export const getRentalStatus = (
  rental: Noleggio,
  referenceDate = dayjs(),
): RentalStatus => {
  const today = referenceDate.startOf('day');
  const expectedReturn = getExpectedReturnDate(rental);
  const actualReturn = getActualReturnDate(rental);

  if (actualReturn) {
    if (actualReturn.isAfter(expectedReturn)) {
      return {
        key: 'returned_late',
        label: 'Restituito in ritardo',
        variant: 'danger',
      };
    }

    return {
      key: 'returned_on_time',
      label: 'Restituito in tempo',
      variant: 'success',
    };
  }

  const diffDays = expectedReturn.diff(today, 'day');

  if (diffDays < 0) {
    return {
      key: 'overdue',
      label: 'In ritardo',
      variant: 'danger',
    };
  }

  if (diffDays === 0) {
    return {
      key: 'returns_today',
      label: 'Rientra oggi',
      variant: 'info',
    };
  }

  if (diffDays <= 3) {
    return {
      key: 'due_soon',
      label: 'In scadenza',
      variant: 'warning',
    };
  }

  return {
    key: 'on_time',
    label: 'In orario',
    variant: 'success',
  };
};
