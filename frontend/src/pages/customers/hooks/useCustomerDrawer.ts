import { useState } from 'react';

export type CustomerDrawerMode = 'create' | 'detail' | 'edit';

export const useCustomerDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<CustomerDrawerMode>('create');
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    null,
  );

  const openCreateDrawer = () => {
    setSelectedCustomerId(null);
    setMode('create');
    setIsOpen(true);
  };

  const openDetailDrawer = (customerId: number) => {
    setSelectedCustomerId(customerId);
    setMode('detail');
    setIsOpen(true);
  };

  const startEditMode = () => {
    setMode('edit');
  };

  const completeEditMode = () => {
    setMode('detail');
  };

  const closeDrawer = () => {
    setIsOpen(false);
    setMode('create');
    setSelectedCustomerId(null);
  };

  return {
    closeDrawer,
    completeEditMode,
    isOpen,
    mode,
    openCreateDrawer,
    openDetailDrawer,
    selectedCustomerId,
    startEditMode,
  };
};
