import { Table } from 'antd';
import type { TableProps } from 'antd';

export type AppTableProps<T extends object> = TableProps<T>;

const getPaginationConfig = <T extends object>(
  pagination: TableProps<T>['pagination'],
): TableProps<T>['pagination'] => {
  if (pagination === false) {
    return false;
  }

  return {
    hideOnSinglePage: true,
    showSizeChanger: false,
    ...pagination,
  };
};

export const AppTable = <T extends object>(props: AppTableProps<T>) => {
  const { pagination, size = 'middle', ...restProps } = props;

  return (
    <Table<T>
      pagination={getPaginationConfig(pagination)}
      size={size}
      {...restProps}
    />
  );
};
