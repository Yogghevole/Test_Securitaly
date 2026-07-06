/* src/pages/catalogo/hooks/useRentalWorkflow.ts */

import { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { message } from 'antd';
import { customerService, rentalService } from '@/services';
import type { Cliente, Dvd } from '@/types';

interface UseRentalWorkflowParams {
  dvds: Dvd[];
  onRentalConfirmed: () => Promise<void>;
}

const DEFAULT_RENTAL_DAYS = 7;

const getDefaultRentalDate = () => dayjs();

const getDefaultReturnDate = () => dayjs().add(DEFAULT_RENTAL_DAYS, 'day');

export const useRentalWorkflow = ({
  dvds,
  onRentalConfirmed,
}: UseRentalWorkflowParams) => {
  const [customers, setCustomers] = useState<Cliente[]>([]);
  const [isRentalMode, setIsRentalMode] = useState(false);
  const [isRentalDrawerOpen, setIsRentalDrawerOpen] = useState(false);
  const [isCustomersLoading, setIsCustomersLoading] = useState(false);
  const [isSubmittingRental, setIsSubmittingRental] = useState(false);
  const [selectedDvdIds, setSelectedDvdIds] = useState<number[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    null,
  );
  const [rentalDate, setRentalDate] = useState(getDefaultRentalDate);
  const [returnDate, setReturnDate] = useState(getDefaultReturnDate);

  const selectedDvds = useMemo(() => {
    const dvdMap = new Map(dvds.map((dvd) => [dvd.id, dvd]));

    return selectedDvdIds.flatMap((dvdId) => {
      const dvd = dvdMap.get(dvdId);

      return dvd ? [dvd] : [];
    });
  }, [dvds, selectedDvdIds]);

  const hasSelectedDvds = isRentalMode && selectedDvds.length > 0;

  const resetRentalWorkflow = useCallback(() => {
    setIsRentalMode(false);
    setIsRentalDrawerOpen(false);
    setSelectedDvdIds([]);
    setSelectedCustomerId(null);
    setRentalDate(getDefaultRentalDate());
    setReturnDate(getDefaultReturnDate());
  }, []);

  const handleStartRentalMode = () => {
    setIsRentalMode(true);
  };

  const handleCancelRentalMode = () => {
    resetRentalWorkflow();
  };

  const handleSelectionChange = (selectedIds: number[]) => {
    setSelectedDvdIds(selectedIds);

    if (selectedIds.length === 0) {
      setIsRentalDrawerOpen(false);
    }
  };

  const handleRemoveSelectedDvd = (dvdId: number) => {
    const remainingSelectedDvdIds = selectedDvdIds.filter(
      (selectedId) => selectedId !== dvdId,
    );

    setSelectedDvdIds(remainingSelectedDvdIds);

    if (remainingSelectedDvdIds.length === 0) {
      setIsRentalDrawerOpen(false);
    }
  };

  const handleOpenRentalDrawer = () => {
    if (selectedDvds.length === 0) {
      return;
    }

    setIsRentalDrawerOpen(true);
  };

  const handleCloseRentalDrawer = () => {
    setIsRentalDrawerOpen(false);
  };

  const handleCustomerChange = (value: number) => {
    setSelectedCustomerId(value);
  };

  const handleRentalDateChange = (value: dayjs.Dayjs | null) => {
    if (value) {
      setRentalDate(value);
    }
  };

  const handleReturnDateChange = (value: dayjs.Dayjs | null) => {
    if (value) {
      setReturnDate(value);
    }
  };

  const handleConfirmRental = async () => {
    if (selectedCustomerId === null || selectedDvds.length === 0) {
      return;
    }

    setIsSubmittingRental(true);

    try {
      await rentalService.createRental({
        cliente_id: selectedCustomerId,
        data_noleggio: rentalDate.format('YYYY-MM-DD'),
        dvd_ids: selectedDvds.map((dvd) => dvd.id),
        restituzione_prevista: returnDate.format('YYYY-MM-DD'),
      });

      resetRentalWorkflow();
      await onRentalConfirmed();
      message.success('Noleggio confermato con successo.');
    } catch {
      message.error('Impossibile confermare il noleggio.');
    } finally {
      setIsSubmittingRental(false);
    }
  };

  useEffect(() => {
    if (!isRentalDrawerOpen || customers.length > 0) {
      return;
    }

    let isMounted = true;

    const loadCustomers = async () => {
      setIsCustomersLoading(true);

      try {
        const data = await customerService.getAll();

        if (isMounted) {
          setCustomers(data);
        }
      } catch {
        message.error('Impossibile caricare i clienti.');
      } finally {
        if (isMounted) {
          setIsCustomersLoading(false);
        }
      }
    };

    void loadCustomers();

    return () => {
      isMounted = false;
    };
  }, [customers.length, isRentalDrawerOpen]);

  return {
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
    resetRentalWorkflow,
    returnDate,
    selectedCustomerId,
    selectedDvds,
  };
};
