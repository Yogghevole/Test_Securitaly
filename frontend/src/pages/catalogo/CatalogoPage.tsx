import { useCallback, useEffect, useMemo, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Alert, Button, Divider, Skeleton } from 'antd';
import { useSearchParams } from 'react-router-dom';
import {
  AppPageHeader,
  EmptyState,
  PageContainer,
} from '@/components/common';
import { dvdService } from '@/services';
import type { Dvd } from '@/types';
import { filterDvds } from '@/utils/filterDvds';
import {
  CatalogTable,
  CatalogToolbar,
  RentalCart,
  RentalDrawer,
} from './components';
import { useRentalWorkflow } from './hooks/useRentalWorkflow';

import './CatalogoPage.css';

const CATEGORY_OPTIONS = [
  { label: 'Tutte', value: 'all' },
  { label: 'Azione', value: 'azione' },
  { label: 'Animazione', value: 'animazione' },
  { label: 'Commedia', value: 'commedia' },
  { label: 'Drammatico', value: 'drammatico' },
  { label: 'Fantascienza', value: 'fantascienza' },
];

const AVAILABILITY_OPTIONS = [
  { label: 'Tutte le disponibilità', value: 'all' },
  { label: 'Disponibili', value: 'available' },
  { label: 'Esauriti', value: 'sold-out' },
];

const getCategoryValue = (value: string | null) => {
  return CATEGORY_OPTIONS.some((option) => option.value === value)
    ? (value ?? 'all')
    : 'all';
};

export const CatalogoPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dvds, setDvds] = useState<Dvd[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const searchValue = searchParams.get('search') ?? '';
  const categoryValue = getCategoryValue(searchParams.get('category'));

  const reloadCatalog = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const data = await dvdService.getAll();

      setDvds(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const {
    customers,
    handleCancelRentalMode,
    handleCloseRentalDrawer,
    handleConfirmRental,
    handleCustomerChange,
    handleOpenRentalDrawer,
    handleRemoveSelectedDvd,
    handleRentalDateChange,
    handleReturnDateChange,
    handleSelectionChange,
    handleStartRentalMode,
    hasSelectedDvds,
    isCustomersLoading,
    isRentalDrawerOpen,
    isRentalMode,
    isSubmittingRental,
    rentalDate,
    returnDate,
    selectedCustomerId,
    selectedDvds,
  } = useRentalWorkflow({
    dvds,
    onRentalConfirmed: reloadCatalog,
  });

  useEffect(() => {
    let isMounted = true;

    const loadInitialCatalog = async () => {
      try {
        const data = await dvdService.getAll();

        if (isMounted) {
          setDvds(data);
          setHasError(false);
        }
      } catch {
        if (isMounted) {
          setHasError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadInitialCatalog();

    return () => {
      isMounted = false;
    };
  }, []);

  const updateSearchParams = (nextSearch: string, nextCategory: string) => {
    const nextParams = new URLSearchParams();
    const normalizedSearch = nextSearch.trim();

    if (normalizedSearch) {
      nextParams.set('search', normalizedSearch);
    }

    if (nextCategory !== 'all') {
      nextParams.set('category', nextCategory);
    }

    setSearchParams(nextParams, { replace: true });
  };

  const handleSearchChange = (value: string) => {
    updateSearchParams(value, categoryValue);
  };

  const handleCategoryChange = (value: string) => {
    updateSearchParams(searchValue, value);
  };

  const filteredDvds = useMemo(() => {
    return filterDvds(dvds, searchValue, categoryValue);
  }, [categoryValue, dvds, searchValue]);

  const renderContent = () => {
    if (isLoading) {
      return <Skeleton active paragraph={{ rows: 6 }} title={false} />;
    }

    if (hasError) {
      return <EmptyState description="Impossibile caricare il catalogo DVD." />;
    }

    if (dvds.length === 0) {
      return <EmptyState description="Nessun DVD presente nel catalogo." />;
    }

    if (filteredDvds.length === 0) {
      return (
        <EmptyState description="Nessun DVD trovato con i filtri selezionati." />
      );
    }

    return (
      <CatalogTable
        dvds={filteredDvds}
        hasOpenCart={hasSelectedDvds}
        isRentalMode={isRentalMode}
        onSelectionChange={handleSelectionChange}
        selectedDvdIds={selectedDvds.map((dvd) => dvd.id)}
      />
    );
  };

  return (
    <PageContainer>
      {!isRentalMode ? (
        <div className="catalogo-page__container-shell">
          <AppPageHeader
            actions={
              <Button
                icon={<PlusOutlined />}
                onClick={handleStartRentalMode}
                size="large"
                type="primary"
              >
                Nuovo Noleggio
              </Button>
            }
            description="Consulta e gestisci i noleggi."
            metric={`${dvds.length} titoli nel catalogo`}
          />
        </div>
      ) : null}

      {isRentalMode ? (
        <div
          className={[
            'catalogo-page__container-shell',
            'catalogo-page__banner-shell',
            hasSelectedDvds ? 'catalogo-page__banner-shell--with-cart' : '',
          ].filter(Boolean).join(' ')}
        >
          <Alert
            action={<Button onClick={handleCancelRentalMode}>Annulla</Button>}
            className="catalogo-page__rental-banner"
            description="Seleziona uno o più DVD da noleggiare."
            message="Modalità Noleggio"
            showIcon
            type="info"
          />
        </div>
      ) : null}

      <div
        className={[
          'catalogo-page__content',
          hasSelectedDvds ? 'catalogo-page__content--with-cart' : '',
        ].filter(Boolean).join(' ')}
      >
        <div className="catalogo-page__container-shell catalogo-page__main">
          <div className="catalogo-page__surface">
            <CatalogToolbar
              availabilityOptions={AVAILABILITY_OPTIONS}
              availabilityValue="all"
              categoryOptions={CATEGORY_OPTIONS}
              categoryValue={categoryValue}
              onCategoryChange={handleCategoryChange}
              onSearchChange={handleSearchChange}
              searchValue={searchValue}
            />

            <Divider className="catalogo-page__divider" />

            <div className="catalogo-page__surface-content">{renderContent()}</div>
          </div>
        </div>

        {hasSelectedDvds ? (
          <div className="catalogo-page__cart">
            <RentalCart
              dvds={selectedDvds}
              onContinue={handleOpenRentalDrawer}
              onRemove={handleRemoveSelectedDvd}
            />
          </div>
        ) : null}
      </div>

      <RentalDrawer
        customers={customers}
        isCustomersLoading={isCustomersLoading}
        isOpen={isRentalDrawerOpen}
        isSubmitting={isSubmittingRental}
        onClose={handleCloseRentalDrawer}
        onConfirm={handleConfirmRental}
        onCustomerChange={handleCustomerChange}
        onRentalDateChange={handleRentalDateChange}
        onReturnDateChange={handleReturnDateChange}
        rentalDate={rentalDate}
        returnDate={returnDate}
        selectedCustomerId={selectedCustomerId}
        selectedDvds={selectedDvds}
      />
    </PageContainer>
  );
};