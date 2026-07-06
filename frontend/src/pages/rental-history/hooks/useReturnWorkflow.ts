import { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { message } from 'antd';
import { customerService, rentalService } from '@/services';
import type { Cliente, Noleggio } from '@/types';

interface UseReturnWorkflowParams {
  onReturnsRegistered: () => Promise<void>;
  rentals: Noleggio[];
}

export const useReturnWorkflow = ({
  onReturnsRegistered,
  rentals,
}: UseReturnWorkflowParams) => {
  // Customer loading
  const [customers, setCustomers] = useState<Cliente[]>([]);
  const [isCustomersLoading, setIsCustomersLoading] = useState(false);

  // Return mode
  const [isReturnMode, setIsReturnMode] = useState(false);

  // Customer selection
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    null,
  );

  // Selected rentals
  const [selectedReturnRentalIds, setSelectedReturnRentalIds] = useState<number[]>(
    [],
  );

  // Drawer
  const [isReturnDrawerOpen, setIsReturnDrawerOpen] = useState(false);
  const [returnDate, setReturnDate] = useState(dayjs());

  // Return confirmation
  const [isSubmittingReturn, setIsSubmittingReturn] = useState(false);

  const loadCustomers = useCallback(async () => {
    setIsCustomersLoading(true);

    try {
      const data = await customerService.getAll();
      setCustomers(data);
    } catch {
      setCustomers([]);
      message.error('Impossibile caricare i clienti.');
    } finally {
      setIsCustomersLoading(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(loadCustomers);
  }, [loadCustomers]);

  // Customer selection
  const returnEligibleCustomers = useMemo(() => {
    return customers
      .filter((customer) => (customer.active_rentals ?? 0) > 0)
      .map((customer) => ({
        label: `${customer.nome} ${customer.cognome} (${customer.active_rentals ?? 0})`,
        value: customer.id,
      }));
  }, [customers]);

  const selectedCustomer = useMemo(() => {
    if (selectedCustomerId === null) {
      return null;
    }

    return customers.find((customer) => customer.id === selectedCustomerId) ?? null;
  }, [customers, selectedCustomerId]);

  // Selected rentals
  const activeCustomerRentals = useMemo(() => {
    if (selectedCustomerId === null) {
      return [];
    }

    return rentals.filter((rental) => {
      return rental.cliente_id === selectedCustomerId && rental.is_attivo;
    });
  }, [rentals, selectedCustomerId]);

  const selectedReturnRentals = useMemo(() => {
    const rentalMap = new Map(
      activeCustomerRentals.map((rental) => [rental.id, rental]),
    );

    return selectedReturnRentalIds.flatMap((rentalId) => {
      const rental = rentalMap.get(rentalId);

      return rental ? [rental] : [];
    });
  }, [activeCustomerRentals, selectedReturnRentalIds]);

  const hasSelectedReturnRentals =
    isReturnMode && selectedReturnRentals.length > 0;

  // Reset workflow
  const resetReturnWorkflow = useCallback(() => {
    setIsReturnMode(false);
    setSelectedCustomerId(null);
    setSelectedReturnRentalIds([]);
    setIsReturnDrawerOpen(false);
    setReturnDate(dayjs());
  }, []);

  const handleStartReturnMode = () => {
    setIsReturnMode(true);
  };

  const handleCancelReturnMode = () => {
    resetReturnWorkflow();
  };

  const handleReturnCustomerChange = (value: number | null) => {
    setSelectedCustomerId(value);
    setSelectedReturnRentalIds([]);
    setIsReturnDrawerOpen(false);
  };

  const handleSelectionChange = (selectedIds: number[]) => {
    setSelectedReturnRentalIds(selectedIds);

    if (selectedIds.length === 0) {
      setIsReturnDrawerOpen(false);
    }
  };

  const handleRemoveSelectedRental = (rentalId: number) => {
    const remainingIds = selectedReturnRentalIds.filter((id) => id !== rentalId);

    setSelectedReturnRentalIds(remainingIds);

    if (remainingIds.length === 0) {
      setIsReturnDrawerOpen(false);
    }
  };

  // Drawer
  const handleOpenReturnDrawer = () => {
    if (selectedReturnRentals.length === 0) {
      return;
    }

    setIsReturnDrawerOpen(true);
  };

  const handleCloseReturnDrawer = () => {
    setIsReturnDrawerOpen(false);
  };

  const handleReturnDateChange = (value: dayjs.Dayjs | null) => {
    if (value) {
      setReturnDate(value);
    }
  };

  // Return confirmation
  const handleConfirmReturn = async () => {
    if (selectedReturnRentals.length === 0) {
      return;
    }

    setIsSubmittingReturn(true);

    try {
      await rentalService.registerReturns({
        data_restituzione: returnDate.format('YYYY-MM-DD'),
        noleggio_ids: selectedReturnRentals.map((rental) => rental.id),
      });

      await Promise.all([onReturnsRegistered(), loadCustomers()]);
      resetReturnWorkflow();
      message.success('Rientro registrato con successo.');
    } catch {
      message.error('Impossibile registrare il rientro.');
    } finally {
      setIsSubmittingReturn(false);
    }
  };

  return {
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
  };
};