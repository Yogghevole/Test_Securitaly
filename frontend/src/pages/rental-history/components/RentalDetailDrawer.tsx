import { Drawer, Typography } from 'antd';
import { DvdCover } from '@/components/common';
import { RentalStatusChip, getRentalDelayDays, getRentalStatus } from '@/components/rentals';
import type { Noleggio } from '@/types';
import { formatDuration } from '@/utils/formatDuration';
import {
  formatRentalDate,
  getCustomerFullName,
  getDelayToneClassName,
} from '../rentalHistory';

interface RentalDetailDrawerProps {
  open: boolean;
  rental: Noleggio | null;
  onClose: () => void;
}

export const RentalDetailDrawer = ({
  open,
  rental,
  onClose,
}: RentalDetailDrawerProps) => {
  const selectedRentalDelayDays = rental ? getRentalDelayDays(rental) : null;

  return (
    <Drawer
      className="rental-history-page__detail-drawer"
      onClose={onClose}
      open={open}
      title="Dettaglio noleggio"
      width={560}
    >
      {rental ? (
        <div className="rental-history-page__detail-content">
          <div className="rental-history-page__detail-header">
            <DvdCover
              coverPath={rental.dvd?.cover_path ?? null}
              title={rental.dvd?.titolo ?? 'DVD'}
            />

            <div className="rental-history-page__detail-summary">
              <Typography.Title
                className="rental-history-page__detail-title"
                level={4}
              >
                {rental.dvd?.titolo ?? 'Titolo non disponibile'}
              </Typography.Title>

              <Typography.Text type="secondary">
                {rental.dvd?.categoria ?? 'Categoria non disponibile'}
              </Typography.Text>

              <Typography.Text type="secondary">
                {rental.dvd ? formatDuration(rental.dvd.durata_minuti) : '-'}
              </Typography.Text>

              <RentalStatusChip rental={rental} />
            </div>
          </div>

          <div className="rental-history-page__detail-grid">
            <div className="rental-history-page__detail-item">
              <Typography.Text type="secondary">Cliente</Typography.Text>
              <Typography.Text>
                {getCustomerFullName(rental.cliente)}
              </Typography.Text>
            </div>

            <div className="rental-history-page__detail-item">
              <Typography.Text type="secondary">Data noleggio</Typography.Text>
              <Typography.Text>{formatRentalDate(rental.data_noleggio)}</Typography.Text>
            </div>

            <div className="rental-history-page__detail-item">
              <Typography.Text type="secondary">Scadenza</Typography.Text>
              <Typography.Text>
                {formatRentalDate(rental.restituzione_prevista)}
              </Typography.Text>
            </div>

            <div className="rental-history-page__detail-item">
              <Typography.Text type="secondary">Data restituzione</Typography.Text>
              <Typography.Text>
                {formatRentalDate(rental.restituzione_effettiva)}
              </Typography.Text>
            </div>

            <div className="rental-history-page__detail-item">
              <Typography.Text type="secondary">
                Numero giorni di ritardo
              </Typography.Text>
              <Typography.Text className={getDelayToneClassName(selectedRentalDelayDays)}>
                {selectedRentalDelayDays ?? '—'}
              </Typography.Text>
            </div>

            <div className="rental-history-page__detail-item">
              <Typography.Text type="secondary">Stato</Typography.Text>
              <Typography.Text>{getRentalStatus(rental).label}</Typography.Text>
            </div>
          </div>
        </div>
      ) : null}
    </Drawer>
  );
};