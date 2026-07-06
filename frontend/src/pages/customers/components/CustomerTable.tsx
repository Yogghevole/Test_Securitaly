import { useMemo } from 'react';
import type { TableProps } from 'antd';
import { AppTable } from '@/components/table';
import type { Cliente } from '@/types';

interface CustomerTableProps {
  customers: Cliente[];
  isLoading: boolean;
  onRowClick: (customerId: number) => void;
}

const getInitials = (customer: Cliente) => {
  return `${customer.nome.charAt(0)}${customer.cognome.charAt(0)}`.toUpperCase();
};

export const CustomerTable = ({
  customers,
  isLoading,
  onRowClick,
}: CustomerTableProps) => {
  const columns = useMemo<TableProps<Cliente>['columns']>(() => {
    return [
      {
        title: '',
        dataIndex: 'id',
        key: 'avatar',
        width: 72,
        align: 'center',
        render: (_: number, record: Cliente) => (
          <div className="customers-page__avatar">{getInitials(record)}</div>
        ),
      },
      {
        title: 'Nome',
        dataIndex: 'nome',
        key: 'nome',
      },
      {
        title: 'Cognome',
        dataIndex: 'cognome',
        key: 'cognome',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Noleggi attivi',
        dataIndex: 'active_rentals',
        key: 'active_rentals',
        width: 140,
        render: (value: number | undefined) => value ?? 0,
      },
    ];
  }, []);

  return (
    <AppTable<Cliente>
      className="customers-page__table"
      columns={columns}
      dataSource={customers}
      loading={isLoading}
      onRow={(record) => ({
        className: 'customers-page__table-row',
        onClick: () => onRowClick(record.id),
      })}
      pagination={false}
      rowKey="id"
      tableLayout="fixed"
    />
  );
};
