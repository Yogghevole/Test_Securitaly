import { ClockCircleOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import { Tag } from 'antd';
import type { TableProps } from 'antd';
import { AppTable } from '@/components/table';
import type { Dvd } from '@/types';
import { formatDuration } from '@/utils/formatDuration';
import { DvdCover } from './DvdCover';
import './CatalogTable.css';

interface CatalogTableProps {
  dvds: Dvd[];
  hasOpenCart: boolean;
  isRentalMode: boolean;
  onSelectionChange: (selectedIds: number[]) => void;
  selectedDvdIds: number[];
}

const getAvailabilityTagConfig = (dvd: Dvd) => {
  const available = dvd.copie_disponibili;
  const total = dvd.quantita;
  const ratio = total > 0 ? available / total : 0;

  if (available === 0) {
    return { color: 'error' as const, label: `0 / ${total} disponibili` };
  }

  if (ratio <= 0.5) {
    return { color: 'warning' as const, label: `${available} / ${total} disponibili` };
  }

  return { color: 'success' as const, label: `${available} / ${total} disponibili` };
};

const getCatalogColumns = (
  hasOpenCart: boolean,
): TableProps<Dvd>['columns'] => {
  const coverColumnWidth = hasOpenCart ? 104 : 88;
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
        const tagConfig = getAvailabilityTagConfig(record);

        return <Tag color={tagConfig.color} className="catalog-table__availability-tag">{tagConfig.label}</Tag>;
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