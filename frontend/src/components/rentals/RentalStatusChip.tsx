import { StatusChip } from '@/components/common';
import type { Noleggio } from '@/types';
import { getRentalStatus } from './rentalStatus';

interface RentalStatusChipProps {
  rental: Noleggio;
  referenceDate?: Parameters<typeof getRentalStatus>[1];
}

export const RentalStatusChip = ({
  rental,
  referenceDate,
}: RentalStatusChipProps) => {
  const status = getRentalStatus(rental, referenceDate);

  return <StatusChip variant={status.variant}>{status.label}</StatusChip>;
};
