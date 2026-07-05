import { ClockCircleOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import { Tag } from 'antd';
import type { TableProps } from 'antd';
import { DvdCover, StatusChip } from '@/components/common';
import { AppTable } from '@/components/table';
import type { Dvd } from '@/types';
import { formatDuration } from '@/utils/formatDuration';
import { getAvailabilityStatus } from '@/utils/getAvailabilityStatus';

interface CatalogTableProps {
  dvds: Dvd[];
  hasOpenCart: boolean;
  isRentalMode: boolean;
  onSelectionChange: (selectedIds: number[]) => void;
  selectedDvdIds: number[];
}

const COVER_COLUMN_WIDTH = 88;

const getCatalogColumns = (
  hasOpenCart: boolean,
): TableProps<Dvd>['columns'] => {
  const coverColumnWidth = COVER_COLUMN_WIDTH;
  const titleColumnWidth = hasOpenCart ? 220 : 236;

  return [
    {
      title: 'Copertina',
      dataIndex: 'cover_path',
      key: 'cover',
      width: coverColumnWidth,
      align: 'center',
      render: (_: string | null, record: Dvd) => {
        return (
          <div className="catalog-table__cover-cell">
            <DvdCover coverPath={record.cover_path} title={record.titolo} />
          </div>
        );
      },
    },
    {
      title: 'Titolo',
      dataIndex: 'titolo',
      key: 'titolo',
      width: titleColumnWidth,
      ellipsis: true,
      render: (title: string) => <span className="catalog-table__title">{title}</span>,
    },
    {
      title: 'Categoria',
      dataIndex: 'categoria',
      key: 'categoria',
      width: 150,
      render: (category: string) => <Tag className="catalog-table__category-tag">{category}</Tag>,
    },
    {
      title: 'Durata',
      dataIndex: 'durata_minuti',
      key: 'durata_minuti',
      width: 120,
      render: (duration: number) => (
        <span className="catalog-table__duration"><ClockCircleOutlined /> {formatDuration(duration)}</span>
      ),
    },
    {
      title: 'Disponibilità',
      dataIndex: 'copie_disponibili',
      key: 'copie_disponibili',
      width: 164,
      render: (_: number, record: Dvd) => {
        const chip = getAvailabilityStatus(record);

        return (
          <StatusChip variant={chip.variant}>{chip.label}</StatusChip>
        );
      },
    },
  ];
};

export const CatalogTable = ({
  dvds,
  hasOpenCart,
  isRentalMode,
  onSelectionChange,
  selectedDvdIds,
}: CatalogTableProps) => {
  const columns = useMemo(() => {
    return getCatalogColumns(hasOpenCart);
  }, [hasOpenCart]);

  const rowSelection = useMemo<TableProps<Dvd>['rowSelection']>(() => {
    if (!isRentalMode) {
      return undefined;
    }

    return {
      preserveSelectedRowKeys: true,
      columnWidth: 40,
      selectedRowKeys: selectedDvdIds,
      onChange: (selectedRowKeys) => {
        onSelectionChange(selectedRowKeys.map(Number));
      },
    };
  }, [isRentalMode, onSelectionChange, selectedDvdIds]);

  return (
    <AppTable<Dvd>
      className="catalog-table"
      columns={columns}
      dataSource={dvds}
      pagination={false}
      rowKey="id"
      rowSelection={rowSelection}
      size="small"
      tableLayout="fixed"
    />
  );
};
