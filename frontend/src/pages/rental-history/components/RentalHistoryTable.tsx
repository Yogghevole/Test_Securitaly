import { useMemo } from 'react';
import { Skeleton } from 'antd';
import type { TableProps } from 'antd';
import { DvdCover, EmptyState } from '@/components/common';
import { RentalStatusChip, getRentalDelayDays } from '@/components/rentals';
import { AppTable } from '@/components/table';
import type { Noleggio } from '@/types';
import {
  formatDelay,
  formatRentalDate,
  getCustomerFullName,
  getDelayToneClassName,
} from '../rentalHistory';

interface RentalHistoryTableProps {
  emptyDescription: string;
  errorDescription?: string;
  hasError?: boolean;
  isLoading?: boolean;
  mode: 'history' | 'return';
  rentals: Noleggio[];
  onRowClick?: (rental: Noleggio) => void;
  onSelectionChange?: (selectedIds: number[]) => void;
  selectedRentalIds?: number[];
}

/* Helpers */

const getHistoryColumns = (): TableProps<Noleggio>['columns'] => {
  return [
    {
      title: 'Copertina',
      dataIndex: 'dvd',
      key: 'cover',
      width: 88,
      align: 'center',
      render: (_: Noleggio['dvd'], record: Noleggio) => (
        <div className="catalog-table__cover-cell">
          <DvdCover
            coverPath={record.dvd?.cover_path ?? null}
            title={record.dvd?.titolo ?? 'DVD'}
          />
        </div>
      ),
    },
    {
      title: 'Titolo',
      dataIndex: ['dvd', 'titolo'],
      key: 'titolo',
      width: 220,
      ellipsis: true,
      render: (_: string | undefined, record: Noleggio) => (
        <span className="catalog-table__title">
          {record.dvd?.titolo ?? 'Titolo non disponibile'}
        </span>
      ),
    },
    {
      title: 'Cliente',
      dataIndex: 'cliente',
      key: 'cliente',
      width: 180,
      ellipsis: true,
      render: (_: Noleggio['cliente'], record: Noleggio) => (
        <span>{getCustomerFullName(record.cliente)}</span>
      ),
    },
    {
      title: 'Noleggiato il',
      dataIndex: 'data_noleggio',
      key: 'data_noleggio',
      width: 122,
      render: (value: string) => formatRentalDate(value),
    },
    {
      title: 'Scadenza',
      dataIndex: 'restituzione_prevista',
      key: 'restituzione_prevista',
      width: 122,
      render: (value: string) => formatRentalDate(value),
    },
    {
      title: 'Restituito il',
      dataIndex: 'restituzione_effettiva',
      key: 'restituzione_effettiva',
      width: 122,
      render: (value: string | null) => formatRentalDate(value),
    },
    {
      title: 'Ritardo',
      dataIndex: 'id',
      key: 'ritardo',
      width: 120,
      render: (_: number, record: Noleggio) => {
        const delayDays = getRentalDelayDays(record);

        return (
          <span className={getDelayToneClassName(delayDays)}>
            {formatDelay(delayDays)}
          </span>
        );
      },
    },
    {
      title: 'Stato',
      dataIndex: 'id',
      key: 'stato',
      width: 180,
      render: (_: number, record: Noleggio) => <RentalStatusChip rental={record} />,
    },
  ];
};

const getReturnColumns = (): TableProps<Noleggio>['columns'] => {
  return [
    {
      title: 'Copertina',
      dataIndex: 'dvd',
      key: 'cover',
      width: 88,
      align: 'center',
      render: (_: Noleggio['dvd'], record: Noleggio) => (
        <div className="catalog-table__cover-cell">
          <DvdCover
            coverPath={record.dvd?.cover_path ?? null}
            title={record.dvd?.titolo ?? 'DVD'}
          />
        </div>
      ),
    },
    {
      title: 'Titolo',
      dataIndex: ['dvd', 'titolo'],
      key: 'titolo',
      width: 260,
      ellipsis: true,
      render: (_: string | undefined, record: Noleggio) => (
        <span className="catalog-table__title">
          {record.dvd?.titolo ?? 'Titolo non disponibile'}
        </span>
      ),
    },
    {
      title: 'Noleggiato il',
      dataIndex: 'data_noleggio',
      key: 'data_noleggio',
      width: 122,
      render: (value: string) => formatRentalDate(value),
    },
    {
      title: 'Scadenza',
      dataIndex: 'restituzione_prevista',
      key: 'restituzione_prevista',
      width: 122,
      render: (value: string) => formatRentalDate(value),
    },
    {
      title: 'Ritardo',
      dataIndex: 'id',
      key: 'ritardo',
      width: 120,
      render: (_: number, record: Noleggio) => {
        const delayDays = getRentalDelayDays(record);

        return (
          <span className={getDelayToneClassName(delayDays)}>
            {formatDelay(delayDays)}
          </span>
        );
      },
    },
    {
      title: 'Stato',
      dataIndex: 'id',
      key: 'stato',
      width: 160,
      render: (_: number, record: Noleggio) => <RentalStatusChip rental={record} />,
    },
  ];
};

/* Component */
export const RentalHistoryTable = ({
  emptyDescription,
  errorDescription,
  hasError = false,
  isLoading = false,
  mode,
  rentals,
  onRowClick,
  onSelectionChange,
  selectedRentalIds = [],
}: RentalHistoryTableProps) => {
  const columns = useMemo(() => {
    return mode === 'history' ? getHistoryColumns() : getReturnColumns();
  }, [mode]);

  const rowSelection = useMemo<TableProps<Noleggio>['rowSelection']>(() => {
    if (mode !== 'return' || !onSelectionChange) {
      return undefined;
    }

    return {
      columnWidth: 40,
      preserveSelectedRowKeys: true,
      selectedRowKeys: selectedRentalIds,
      onChange: (selectedRowKeys) => {
        onSelectionChange(selectedRowKeys.map(Number));
      },
    };
  }, [mode, onSelectionChange, selectedRentalIds]);

  if (isLoading) {
    return <Skeleton active paragraph={{ rows: 6 }} title={false} />;
  }

  if (hasError && errorDescription) {
    return <EmptyState description={errorDescription} />;
  }

  if (rentals.length === 0) {
    return <EmptyState description={emptyDescription} />;
  }

  return (
    <AppTable<Noleggio>
      className={[
        'rental-history-page__table',
        mode === 'return' ? 'rental-history-page__table--return-mode' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      columns={columns}
      dataSource={rentals}
      onRow={
        mode === 'history' && onRowClick
          ? (record) => ({
              className: 'rental-history-page__table-row',
              onClick: () => onRowClick(record),
            })
          : undefined
      }
      pagination={mode === 'history' ? { pageSize: 10 } : false}
      rowKey="id"
      rowSelection={rowSelection}
      tableLayout="fixed"
    />
  );
};