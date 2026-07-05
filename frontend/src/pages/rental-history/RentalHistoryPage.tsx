import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { ChangeEvent } from 'react';
import { Button, Divider } from 'antd';
import { AppPageHeader, PageContainer } from '@/components/common';
import {
  ReturnCart,
  ReturnDrawer,
  ReturnModeBanner,
} from '@/components/rentals';
import type { Noleggio } from '@/types';
import { RentalDetailDrawer } from './components/RentalDetailDrawer';
import { RentalHistoryTable } from './components/RentalHistoryTable';
import { RentalHistoryToolbar } from './components/RentalHistoryToolbar';
import { useRentalHistory } from './hooks/useRentalHistory';
import { useReturnWorkflow } from './hooks/useReturnWorkflow';
import './RentalHistoryPage.css';

export const RentalHistoryPage = () => {
  const [selectedRental, setSelectedRental] = useState<Noleggio | null>(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const {
    filteredRentals,
    hasError,
    isLoading,
    refreshRentals,
    rentals,
    searchValue,
    setSearchValue,
    statusOptions,
    statusValue,
    setStatusValue,
  } = useRentalHistory();
  const {
    activeCustomerRentals,
    handleCancelReturnMode,
    handleCloseReturnDrawer,
    handleConfirmReturn,
    handleOpenReturnDrawer,
    handleRemoveSelectedRental,
    handleReturnCustomerChange,
    handleReturnDateChange,
    handleSelectionChange,
    handleStartReturnMode,
    hasSelectedReturnRentals,
    isCustomersLoading,
    isReturnDrawerOpen,
    isReturnMode,
    isSubmittingReturn,
    returnDate,
    returnEligibleCustomers,
    selectedCustomer,
    selectedCustomerId,
    selectedReturnRentalIds,
    selectedReturnRentals,
  } = useReturnWorkflow({
    onReturnsRegistered: refreshRentals,
    rentals,
  });

  const handleOpenDetailDrawer = (rental: Noleggio) => {
    setSelectedRental(rental);
    setIsDetailDrawerOpen(true);
  };

  const handleCloseDetailDrawer = () => {
    setIsDetailDrawerOpen(false);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleStatusChange = (value: string) => {
    setStatusValue(value as (typeof statusOptions)[number]['value']);
  };

  const returnEmptyDescription =
    selectedCustomerId === null
      ? 'Seleziona un cliente per visualizzare i DVD attualmente noleggiati.'
      : 'Nessun DVD attualmente noleggiato per il cliente selezionato.';

  return (
    <PageContainer>
      {!isReturnMode ? (
        <div className="rental-history-page__container-shell">
          <AppPageHeader
            actions={
              <Button
                icon={<PlusOutlined />}
                onClick={handleStartReturnMode}
                size="large"
                type="primary"
              >
                Registra rientro
              </Button>
            }
            description="Consulta tutti i noleggi effettuati e registra i rientri."
            metric={`${rentals.length} record nello storico noleggi`}
          />
        </div>
      ) : null}

      {isReturnMode ? (
        <div
          className={[
            'rental-history-page__container-shell',
            'rental-history-page__banner-shell',
            hasSelectedReturnRentals
              ? 'rental-history-page__banner-shell--with-cart'
              : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <ReturnModeBanner
            customerOptions={returnEligibleCustomers}
            isCustomersLoading={isCustomersLoading}
            onCancel={handleCancelReturnMode}
            onCustomerChange={handleReturnCustomerChange}
            selectedCustomerId={selectedCustomerId}
          />
        </div>
      ) : null}

      {!isReturnMode ? (
        <div className="rental-history-page__container-shell">
          <div className="rental-history-page__surface">
            <RentalHistoryToolbar
              onSearchChange={handleSearchChange}
              onStatusChange={handleStatusChange}
              searchValue={searchValue}
              statusOptions={statusOptions}
              statusValue={statusValue}
            />

            <Divider className="rental-history-page__divider" />

            <div className="rental-history-page__surface-content">
              <RentalHistoryTable
                emptyDescription={
                  rentals.length === 0
                    ? 'Nessun noleggio presente nello storico.'
                    : 'Nessun noleggio trovato con i filtri selezionati.'
                }
                errorDescription="Impossibile caricare lo storico noleggi."
                hasError={hasError}
                isLoading={isLoading}
                mode="history"
                onRowClick={handleOpenDetailDrawer}
                rentals={filteredRentals}
              />
            </div>
          </div>
        </div>
      ) : (
        <div
          className={[
            'rental-history-page__content',
            hasSelectedReturnRentals
              ? 'rental-history-page__content--with-cart'
              : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <div className="rental-history-page__container-shell rental-history-page__main">
            <div className="rental-history-page__surface">
              <div className="rental-history-page__surface-content">
                <RentalHistoryTable
                  emptyDescription={returnEmptyDescription}
                  mode="return"
                  onSelectionChange={handleSelectionChange}
                  rentals={activeCustomerRentals}
                  selectedRentalIds={selectedReturnRentalIds}
                />
              </div>
            </div>
          </div>

          {hasSelectedReturnRentals ? (
            <div className="rental-history-page__cart">
              <ReturnCart
                onContinue={handleOpenReturnDrawer}
                onRemove={handleRemoveSelectedRental}
                rentals={selectedReturnRentals}
              />
            </div>
          ) : null}
        </div>
      )}

      <RentalDetailDrawer
        onClose={handleCloseDetailDrawer}
        open={isDetailDrawerOpen}
        rental={selectedRental}
      />

      <ReturnDrawer
        customer={selectedCustomer}
        isOpen={isReturnDrawerOpen}
        isSubmitting={isSubmittingReturn}
        onClose={handleCloseReturnDrawer}
        onConfirm={handleConfirmReturn}
        onReturnDateChange={handleReturnDateChange}
        returnDate={returnDate}
        selectedRentals={selectedReturnRentals}
      />
    </PageContainer>
  );
};