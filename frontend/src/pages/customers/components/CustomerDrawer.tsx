import { EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import type { FormInstance } from 'antd';
import { Button, Drawer, Skeleton, Typography } from 'antd';
import {
  DvdCover,
  EmptyState,
  MediaListItem,
  StatCard,
  StatusChip,
} from '@/components/common';
import { DrawerFooter } from '@/components/form';
import type { CustomerDetailResponse, CreateCustomerPayload, Noleggio } from '@/types';
import { CustomerForm } from './CustomerForm';
import type { CustomerDrawerMode } from '../hooks/useCustomerDrawer';

interface CustomerDrawerProps {
  detail: CustomerDetailResponse | null;
  form: FormInstance<CreateCustomerPayload>;
  isLoadingDetail: boolean;
  isOpen: boolean;
  isSubmitting: boolean;
  mode: CustomerDrawerMode;
  onClose: () => void;
  onEdit: () => void;
  onFormCancel: () => void;
  onFormSubmit: (values: CreateCustomerPayload) => void | Promise<void>;
}

const getInitials = (fullName: string) => {
  return fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((value) => value.charAt(0))
    .join('')
    .toUpperCase();
};

const formatDate = (value: string | null) => {
  if (!value) {
    return '-';
  }

  return dayjs(value).format('DD/MM/YYYY');
};

const getActiveRentalStatus = (rental: Noleggio) => {
  const daysToDeadline = dayjs(rental.restituzione_prevista)
    .startOf('day')
    .diff(dayjs().startOf('day'), 'day');

  if (daysToDeadline < 0) {
    return {
      label: 'In ritardo',
      variant: 'danger' as const,
    };
  }

  if (daysToDeadline <= 3) {
    return {
      label: 'In scadenza',
      variant: 'warning' as const,
    };
  }

  return {
    label: 'In corso',
    variant: 'success' as const,
  };
};

const getHistoryRentalStatus = (rental: Noleggio) => {
  const expectedReturn = dayjs(rental.restituzione_prevista).startOf('day');
  const actualReturn = dayjs(rental.restituzione_effettiva).startOf('day');

  if (actualReturn.isAfter(expectedReturn)) {
    return {
      label: 'Restituito in ritardo',
      variant: 'danger' as const,
    };
  }

  return {
    label: 'Restituito in tempo',
    variant: 'success' as const,
  };
};

export const CustomerDrawer = ({
  detail,
  form,
  isLoadingDetail,
  isOpen,
  isSubmitting,
  mode,
  onClose,
  onEdit,
  onFormCancel,
  onFormSubmit,
}: CustomerDrawerProps) => {
  const isFormMode = mode === 'create' || mode === 'edit';
  const title =
    mode === 'create'
      ? 'Nuovo Cliente'
      : mode === 'edit'
        ? 'Modifica Cliente'
        : 'Dettagli Cliente';

  return (
    <Drawer
      className="customers-page__drawer"
      footer={
        isFormMode ? (
          <DrawerFooter
            cancelText="Annulla"
            confirmText={mode === 'create' ? 'Salva Cliente' : 'Salva Modifiche'}
            loading={isSubmitting}
            onCancel={onFormCancel}
            onConfirm={() => form.submit()}
          />
        ) : undefined
      }
      onClose={onClose}
      open={isOpen}
      title={title}
      width={560}
    >
      {isFormMode ? (
        <CustomerForm
          form={form}
          isSubmitting={isSubmitting}
          onFinish={onFormSubmit}
        />
      ) : isLoadingDetail ? (
        <Skeleton active paragraph={{ rows: 8 }} title={false} />
      ) : !detail ? (
        <EmptyState description="Impossibile caricare i dettagli del cliente." />
      ) : (
        <div className="customers-page__drawer-content">
          <div className="customers-page__drawer-header">
            <div className="customers-page__drawer-avatar">
              {getInitials(`${detail.cliente.nome} ${detail.cliente.cognome}`)}
            </div>

            <div className="customers-page__drawer-customer">
              <div className="customers-page__drawer-name-row">
                <Typography.Title
                  className="customers-page__drawer-name"
                  level={4}
                >
                  {detail.cliente.nome} {detail.cliente.cognome}
                </Typography.Title>

                <Button
                  aria-label="Modifica cliente"
                  icon={<EditOutlined />}
                  onClick={onEdit}
                  type="text"
                />
              </div>

              <Typography.Text type="secondary">
                {detail.cliente.email}
              </Typography.Text>
            </div>
          </div>

          <div className="customers-page__stats-grid">
            <StatCard
              title="Noleggi attivi"
              value={detail.active_rentals.length}
              valueColor="#1677ff"
            />
            <StatCard
              title="Noleggi completati"
              value={detail.rental_history.length}
              valueColor="#52c41a"
            />
          </div>

          <div className="customers-page__section">
            <Typography.Title className="customers-page__section-title" level={5}>
              Lista Noleggi Attivi
            </Typography.Title>

            {detail.active_rentals.length === 0 ? (
              <EmptyState description="Nessun noleggio attivo per questo cliente." />
            ) : (
              <div className="customers-page__rental-list">
                {detail.active_rentals.map((rental) => {
                  const status = getActiveRentalStatus(rental);

                  return (
                    <div className="customers-page__rental-card" key={rental.id}>
                      <MediaListItem
                        cover={
                          <DvdCover
                            coverPath={rental.dvd?.cover_path ?? null}
                            title={rental.dvd?.titolo ?? 'DVD'}
                          />
                        }
                        right={<StatusChip variant={status.variant}>{status.label}</StatusChip>}
                        subtitle={
                          <Typography.Text type="secondary">
                            Restituzione prevista: {formatDate(rental.restituzione_prevista)}
                          </Typography.Text>
                        }
                        title={
                          <Typography.Text className="customers-page__rental-title">
                            {rental.dvd?.titolo ?? 'Titolo non disponibile'}
                          </Typography.Text>
                        }
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="customers-page__section">
            <Typography.Title className="customers-page__section-title" level={5}>
              Storico Cliente
            </Typography.Title>

            {detail.rental_history.length === 0 ? (
              <EmptyState description="Nessun noleggio completato per questo cliente." />
            ) : (
              <div className="customers-page__rental-list">
                {detail.rental_history.map((rental) => {
                  const status = getHistoryRentalStatus(rental);

                  return (
                    <div className="customers-page__rental-card" key={rental.id}>
                      <MediaListItem
                        cover={
                          <DvdCover
                            coverPath={rental.dvd?.cover_path ?? null}
                            title={rental.dvd?.titolo ?? 'DVD'}
                          />
                        }
                        right={<StatusChip variant={status.variant}>{status.label}</StatusChip>}
                        subtitle={
                          <Typography.Text type="secondary">
                            Data restituzione: {formatDate(rental.restituzione_effettiva)}
                          </Typography.Text>
                        }
                        title={
                          <Typography.Text className="customers-page__rental-title">
                            {rental.dvd?.titolo ?? 'Titolo non disponibile'}
                          </Typography.Text>
                        }
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </Drawer>
  );
};
