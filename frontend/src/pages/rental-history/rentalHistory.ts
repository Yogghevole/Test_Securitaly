import dayjs from 'dayjs';
import type { Cliente } from '@/types';

export const getCustomerFullName = (customer?: Cliente) => {
  if (!customer) {
    return 'Cliente non disponibile';
  }

  return `${customer.nome} ${customer.cognome}`;
};

export const formatRentalDate = (value: string | null) => {
  if (!value) {
    return '—';
  }

  return dayjs(value).format('DD/MM/YYYY');
};

export const formatDelay = (delayDays: number | null) => {
  if (!delayDays) {
    return '—';
  }

  return `+${delayDays} ${delayDays === 1 ? 'giorno' : 'giorni'}`;
};

export const getDelayToneClassName = (delayDays: number | null) => {
  return delayDays
    ? 'rental-history-page__delay rental-history-page__delay--late'
    : '';
};