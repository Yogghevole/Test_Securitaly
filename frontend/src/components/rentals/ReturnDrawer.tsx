import { Alert, DatePicker, Drawer, Select, Typography } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import { DvdCover, MediaListItem } from '@/components/common';
import { DrawerFooter } from '@/components/form';
import type { Cliente, Noleggio } from '@/types';
import { formatDuration } from '@/utils/formatDuration';
import { getRentalDelayDays } from './rentalStatus';

interface ReturnDrawerProps {
  customer: Cliente | null;
  isOpen: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onReturnDateChange: (value: Dayjs | null) => void;
  returnDate: Dayjs;
  selectedRentals: Noleggio[];
}

export const ReturnDrawer = ({
  customer,
  isOpen,
  isSubmitting,
  onClose,
  onConfirm,
  onReturnDateChange,
  returnDate,
  selectedRentals,
}: ReturnDrawerProps) => {
  const customerOptions = customer
    ? [
        {
          label: `${customer.nome} ${customer.cognome}`,
          value: customer.id,
        },
      ]
    : [];

  const delayedRentals = selectedRentals
    .map((rental) => ({
      delayDays: getRentalDelayDays(rental, returnDate) ?? 0,
      rental,
    }))
    .filter((entry) => entry.delayDays > 0);

  return (
    <Drawer
      className="rental-drawer"
      footer={
        <DrawerFooter
          cancelText="Annulla"
          confirmButtonProps={{ disabled: selectedRentals.length === 0 }}
          confirmText="Conferma Rientro"
          loading={isSubmitting}
          onCancel={onClose}
          onConfirm={onConfirm}
        />
      }
      onClose={onClose}
      open={isOpen}
      title="Registra rientro"
      width={520}
    >
      <div className="rental-drawer__content">
        <div className="rental-drawer__section">
          <Typography.Title className="rental-drawer__section-title" level={5}>
            Cliente
          </Typography.Title>

          <Select
            className="rental-drawer__field"
            disabled
            options={customerOptions}
            size="large"
            value={customer?.id}
          />
        </div>

        <div className="rental-drawer__section">
          <div className="rental-drawer__date-field">
            <Typography.Text type="secondary">Data restituzione</Typography.Text>
            <DatePicker
              className="rental-drawer__field"
              format="DD/MM/YYYY"
              onChange={onReturnDateChange}
              value={returnDate}
            />
          </div>
        </div>

        {delayedRentals.length > 0 ? (
          <Alert
            description={
              <div className="rental-history-page__delay-alert-list">
                {delayedRentals.map(({ delayDays, rental }) => (
                  <div
                    className="rental-history-page__delay-alert-item"
                    key={rental.id}
                  >
                    <Typography.Text strong>
                      {rental.dvd?.titolo ?? 'Titolo non disponibile'}
                    </Typography.Text>
                    <Typography.Text type="secondary">
                      {delayDays} {delayDays === 1 ? 'giorno' : 'giorni'} di ritardo
                    </Typography.Text>
                  </div>
                ))}
              </div>
            }
            message="Sono presenti DVD restituiti in ritardo"
            showIcon
            type="warning"
          />
        ) : null}

        <div className="rental-drawer__section">
          <Typography.Title className="rental-drawer__section-title" level={5}>
            Lista DVD
          </Typography.Title>

          <div className="rental-drawer__selected-list">
            {selectedRentals.map((rental) => {
              const dvd = rental.dvd;

              return (
                <div className="rental-drawer__selected-item-card" key={rental.id}>
                  <MediaListItem
                    cover={
                      <DvdCover
                        coverPath={dvd?.cover_path ?? null}
                        title={dvd?.titolo ?? 'DVD'}
                      />
                    }
                    subtitle={
                      <Typography.Text
                        className="rental-drawer__selected-item-meta"
                        type="secondary"
                      >
                        {dvd?.categoria ?? 'Categoria non disponibile'}
                      </Typography.Text>
                    }
                    title={
                      <Typography.Text className="rental-drawer__selected-item-title">
                        {dvd?.titolo ?? 'Titolo non disponibile'}
                      </Typography.Text>
                    }
                  >
                    <Typography.Text
                      className="rental-drawer__selected-item-meta rental-drawer__selected-item-duration"
                      type="secondary"
                    >
                      <ClockCircleOutlined />{' '}
                      {dvd ? formatDuration(dvd.durata_minuti) : '-'}
                    </Typography.Text>
                  </MediaListItem>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Drawer>
  );
};
