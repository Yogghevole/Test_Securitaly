import type { ChangeEvent } from 'react';
import { Select } from 'antd';
import { SearchBar } from '@/components/common';

interface RentalHistoryToolbarProps {
  searchValue: string;
  statusOptions: ReadonlyArray<{ label: string; value: string }>;
  statusValue: string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onStatusChange: (value: string) => void;
}

export const RentalHistoryToolbar = ({
  searchValue,
  statusOptions,
  statusValue,
  onSearchChange,
  onStatusChange,
}: RentalHistoryToolbarProps) => {
  return (
    <div className="rental-history-page__filters">
      <SearchBar
        className="rental-history-page__search"
        onChange={onSearchChange}
        placeholder="Ricerca per titolo o cliente"
        size="large"
        value={searchValue}
      />

      <Select
        className="rental-history-page__status-filter"
        onChange={onStatusChange}
        options={statusOptions.map((option) => ({
          label: option.label,
          value: option.value,
        }))}
        size="large"
        value={statusValue}
      />
    </div>
  );
};
