import type { ChangeEvent } from 'react';
import { Flex, Select } from 'antd';
import { SearchBar } from '@/components/common';
import './CatalogToolbar.css';

interface FilterOption {
  label: string;
  value: string;
}

interface CatalogToolbarProps {
  availabilityOptions: FilterOption[];
  availabilityValue: string;
  categoryOptions: FilterOption[];
  categoryValue: string;
  onCategoryChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  searchValue: string;
}

export const CatalogToolbar = ({
  availabilityOptions,
  availabilityValue,
  categoryOptions,
  categoryValue,
  onCategoryChange,
  onSearchChange,
  searchValue,
}: CatalogToolbarProps) => {
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <Flex align="center" className="catalog-toolbar" gap={16} wrap="wrap">
      <Flex align="center" className="catalog-toolbar__filters" gap={12} wrap="wrap">
        <SearchBar
          className="catalog-toolbar__search"
          onChange={handleSearchChange}
          size="large"
          value={searchValue}
        />

        <Select
          className="catalog-toolbar__category"
          onChange={onCategoryChange}
          options={categoryOptions}
          size="large"
          value={categoryValue}
        />

        <Select
          className="catalog-toolbar__availability"
          disabled
          options={availabilityOptions}
          size="large"
          value={availabilityValue}
        />
      </Flex>

      </Flex>
  );
};