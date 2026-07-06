import { useCallback, useEffect, useMemo, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { ChangeEvent } from 'react';
import { Button, Divider, Form, message } from 'antd';
import { useSearchParams } from 'react-router-dom';
import {
  AppPageHeader,
  EmptyState,
  PageContainer,
  SearchBar,
} from '@/components/common';
import { customerService } from '@/services';
import type { Cliente, CreateCustomerPayload, CustomerDetailResponse } from '@/types';
import { CustomerDrawer } from './components/CustomerDrawer';
import { CustomerTable } from './components/CustomerTable';
import { useCustomerDrawer } from './hooks/useCustomerDrawer';
import './CustomersPage.css';

export const CustomersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [customers, setCustomers] = useState<Cliente[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [detail, setDetail] = useState<CustomerDetailResponse | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm<CreateCustomerPayload>();
  const {
    closeDrawer,
    completeEditMode,
    isOpen,
    mode,
    openCreateDrawer,
    openDetailDrawer,
    selectedCustomerId,
    startEditMode,
  } = useCustomerDrawer();

  const loadCustomers = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const data = await customerService.getAll();

      setCustomers(data);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadCustomerDetail = useCallback(async (customerId: number) => {
    setIsLoadingDetail(true);

    try {
      const data = await customerService.getById(customerId);
      setDetail(data);
    } catch {
      setDetail(null);
      message.error('Impossibile caricare i dettagli del cliente.');
    } finally {
      setIsLoadingDetail(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(loadCustomers);
  }, [loadCustomers]);

  const customerIdParam = searchParams.get('customerId');

  useEffect(() => {
    if (!customerIdParam) {
      return;
    }

    const customerId = Number(customerIdParam);

    if (!Number.isInteger(customerId) || customerId <= 0) {
      return;
    }

    void Promise.resolve().then(() => {
      openDetailDrawer(customerId);
      return loadCustomerDetail(customerId);
    });
  }, [customerIdParam, loadCustomerDetail, openDetailDrawer]);

  const filteredCustomers = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    if (!normalizedSearch) {
      return customers;
    }

    return customers.filter((customer) => {
      const fullName = `${customer.nome} ${customer.cognome}`.toLowerCase();

      return (
        fullName.includes(normalizedSearch) ||
        customer.email.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [customers, searchValue]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleOpenCreateDrawer = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('customerId');
    setSearchParams(nextParams, { replace: true });
    form.resetFields();
    setDetail(null);
    openCreateDrawer();
  };

  const handleOpenDetailDrawer = (customerId: number) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('customerId', String(customerId));
    setSearchParams(nextParams, { replace: true });
    openDetailDrawer(customerId);
    void loadCustomerDetail(customerId);
  };

  const handleCloseDrawer = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('customerId');
    setSearchParams(nextParams, { replace: true });
    form.resetFields();
    setDetail(null);
    closeDrawer();
  };

  const handleEdit = () => {
    if (!detail) {
      return;
    }

    form.setFieldsValue({
      nome: detail.cliente.nome,
      cognome: detail.cliente.cognome,
      email: detail.cliente.email,
    });

    startEditMode();
  };

  const handleFormCancel = () => {
    if (mode === 'edit') {
      form.resetFields();
      completeEditMode();
      return;
    }

    handleCloseDrawer();
  };

  const handleFormSubmit = async (values: CreateCustomerPayload) => {
    setIsSubmitting(true);

    try {
      if (mode === 'create') {
        await customerService.create(values);
        message.success('Cliente creato con successo.');
        await loadCustomers();
        handleCloseDrawer();
        return;
      }

      if (mode === 'edit' && selectedCustomerId !== null) {
        await customerService.update(selectedCustomerId, values);
        message.success('Cliente aggiornato con successo.');
        await Promise.all([
          loadCustomers(),
          loadCustomerDetail(selectedCustomerId),
        ]);
        form.resetFields();
        completeEditMode();
      }
    } catch {
      message.error(
        mode === 'create'
          ? 'Impossibile creare il cliente.'
          : 'Impossibile aggiornare il cliente.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContent = () => {
    if (hasError) {
      return <EmptyState description="Impossibile caricare la lista clienti." />;
    }

    if (!isLoading && filteredCustomers.length === 0) {
      return (
        <EmptyState
          description={
            searchValue.trim()
              ? 'Nessun cliente trovato con i filtri selezionati.'
              : 'Nessun cliente registrato.'
          }
        />
      );
    }

    return (
      <CustomerTable
        customers={filteredCustomers}
        isLoading={isLoading}
        onRowClick={handleOpenDetailDrawer}
      />
    );
  };

  return (
    <PageContainer>
      <div className="customers-page__container-shell">
        <AppPageHeader
          actions={
            <Button
              icon={<PlusOutlined />}
              onClick={handleOpenCreateDrawer}
              size="large"
              type="primary"
            >
              Nuovo Cliente
            </Button>
          }
          metric={`${customers.length} clienti registrati`}
        />
      </div>

      <div className="customers-page__container-shell">
        <div className="customers-page__surface">
          <div className="customers-page__toolbar">
            <SearchBar
              className="customers-page__search"
              onChange={handleSearchChange}
              placeholder="Ricerca per nome o email"
              size="large"
              value={searchValue}
            />
          </div>

          <Divider className="customers-page__divider" />

          <div className="customers-page__surface-content">{renderContent()}</div>
        </div>
      </div>
      <CustomerDrawer
        detail={detail}
        form={form}
        isLoadingDetail={isLoadingDetail}
        isOpen={isOpen}
        isSubmitting={isSubmitting}
        mode={mode}
        onClose={handleCloseDrawer}
        onEdit={handleEdit}
        onFormCancel={handleFormCancel}
        onFormSubmit={handleFormSubmit}
      />
    </PageContainer>
  );
};
