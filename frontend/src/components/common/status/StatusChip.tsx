import { Tag } from 'antd';
import type { ReactNode } from 'react';
import './StatusChip.css';

export type StatusChipVariant = 'success' | 'warning' | 'danger' | 'info';

interface StatusChipProps {
  children: ReactNode;
  variant: StatusChipVariant;
}

export const StatusChip = ({ children, variant }: StatusChipProps) => {
  return (
    <Tag className={`status-chip status-chip--${variant}`}>
      {children}
    </Tag>
  );
};
