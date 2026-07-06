import type { Dvd } from '@/types';
import type { StatusChipVariant } from '@/components/common/status';

interface AvailabilityStatus {
  label: string;
  variant: StatusChipVariant;
}

export const getAvailabilityStatus = (dvd: Dvd): AvailabilityStatus => {
  const available = dvd.copie_disponibili;
  const total = dvd.quantita;
  const ratio = total > 0 ? available / total : 0;

  if (available === 0) {
    return {
      label: `0 / ${total} disponibili`,
      variant: 'danger',
    };
  }

  if (ratio <= 0.5) {
    return {
      label: `${available} / ${total} disponibili`,
      variant: 'warning',
    };
  }

  return {
    label: `${available} / ${total} disponibili`,
    variant: 'success',
  };
};
