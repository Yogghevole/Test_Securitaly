/* src/pages/catalogo/components/RentalDrawer.tsx */

import { ClockCircleOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import { DatePicker, Drawer, Select, Typography } from 'antd';
import { DvdCover, MediaListItem } from '@/components/common';
import { DrawerFooter } from '@/components/form';
import type { Cliente, Dvd } from '@/types';
import { formatDuration } from '@/utils/formatDuration';

interface RentalDrawerProps {
  customers: Cliente[];
  isCustomersLoading: boolean;
  isOpen: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCustomerChange: (value: number) => void;
  onRentalDateChange: (value: Dayjs | null) => void;
  onReturnDateChange: (value: Dayjs | null) => void;
  rentalDate: Dayjs;
  returnDate: Dayjs;
  selectedCustomerId: number | null;
  selectedDvds: Dvd[];
}

const getCustomerLabel = (customer: Cliente) => {
  return `${customer.nome} ${customer.cognome}`;
};

export const RentalDrawer = ({
  customers,
  isCustomersLoading,
  isOpen,
  isSubmitting,
  onClose,
  onConfirm,
  onCustomerChange,
  onRentalDateChange,
  onReturnDateChange,
  rentalDate,
  returnDate,
  selectedCustomerId,
  selectedDvds,
}: RentalDrawerProps) => {
  const customerOptions = customers.map((customer) => ({
    label: getCustomerLabel(customer),
    value: customer.id,
  }));

  const isConfirmDisabled = selectedCustomerId === null || selectedDvds.length === 0;

  return (
    <Drawer
      className="rental-drawer"
      footer={
        <DrawerFooter
          cancelText="Annulla"
          confirmButtonProps={{ disabled: isConfirmDisabled }}
          confirmText="Conferma Noleggio"
          loading={isSubmitting}
          onCancel={onClose}
          onConfirm={onConfirm}
        />
      }
      onClose={onClose}
      open={isOpen}
      title="Nuovo Noleggio"
      width={520}
    >
      <div className="rental-drawer__content">

        <div className="rental-drawer__section">
          <Typography.Title className="rental-drawer__section-title" level={5}>
            Cliente
          </Typography.Title>

          <Select
            className="rental-drawer__field"
            loading={isCustomersLoading}
            onChange={onCustomerChange}
            optionFilterProp="label"
            options={customerOptions}
            placeholder="Seleziona un cliente"
            showSearch
            value={selectedCustomerId ?? undefined}
          />
        </div>

        <div className="rental-drawer__section">
          <div className="rental-drawer__date-grid">
            <div className="rental-drawer__date-field">
              <Typography.Text type="secondary">Data noleggio</Typography.Text>
              <DatePicker
                className="rental-drawer__field"
                format="DD/MM/YYYY"
                onChange={onRentalDateChange}
                value={rentalDate}
              />
            </div>

            <div className="rental-drawer__date-field">
              <Typography.Text type="secondary">
                Data restituzione prevista
              </Typography.Text>
              <DatePicker
                className="rental-drawer__field"
                format="DD/MM/YYYY"
                onChange={onReturnDateChange}
                value={returnDate}
              />
            </div>
          </div>
        </div>

        <div className="rental-drawer__section">
          <Typography.Title className="rental-drawer__section-title" level={5}>
            DVD selezionati
          </Typography.Title>

          <div className="rental-drawer__selected-list">
            {selectedDvds.map((dvd) => (
              <div className="rental-drawer__selected-item-card" key={dvd.id}>
                <MediaListItem
                  cover={<DvdCover coverPath={dvd.cover_path} title={dvd.titolo} />}
                  subtitle={
                    <Typography.Text
                      className="rental-drawer__selected-item-meta"
                      type="secondary"
                    >
                      {dvd.categoria}
                    </Typography.Text>
                  }
                  title={
                    <Typography.Text className="rental-drawer__selected-item-title">
                      {dvd.titolo}
                    </Typography.Text>
                  }
                >
                  <Typography.Text
                    className="rental-drawer__selected-item-meta rental-drawer__selected-item-duration"
                    type="secondary"
                  >
                    <ClockCircleOutlined /> {formatDuration(dvd.durata_minuti)}
                  </Typography.Text>
                </MediaListItem>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Drawer>
  );
};
