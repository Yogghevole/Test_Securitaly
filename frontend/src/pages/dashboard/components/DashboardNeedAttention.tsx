import { WarningOutlined } from '@ant-design/icons';
import { Skeleton, Typography } from 'antd';
import { EmptyState, MediaListItem, StatusChip } from '@/components/common';
import type { DashboardNeedAttentionItem } from '@/types';

interface DashboardNeedAttentionProps {
  hasError: boolean;
  isLoading: boolean;
  items: DashboardNeedAttentionItem[];
  onCustomerClick: (customerId: number) => void;
}

const getInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

export const DashboardNeedAttention = ({
  hasError,
  isLoading,
  items,
  onCustomerClick,
}: DashboardNeedAttentionProps) => {
  return (
    <section className="dashboard-page__card">
      <div className="dashboard-page__card-header">
        <div className="dashboard-page__card-title-group">
          <div className="dashboard-page__card-icon dashboard-page__card-icon--warning">
            <WarningOutlined />
          </div>

          <Typography.Title className="dashboard-page__card-title" level={5}>
            Richiede attenzione
          </Typography.Title>
        </div>
      </div>

      <div className="dashboard-page__card-body">
        {isLoading ? (
          <Skeleton active paragraph={{ rows: 5 }} title={false} />
        ) : hasError ? (
          <EmptyState description="Impossibile caricare i clienti che richiedono attenzione." />
        ) : items.length === 0 ? (
          <EmptyState description="Nessun cliente richiede attenzione oggi." />
        ) : (
          <div className="dashboard-page__list">
            {items.map((item) => (
              <div className="dashboard-page__list-card" key={item.customer.id}>
                <MediaListItem
                  cover={
                    <div className="dashboard-page__customer-avatar">
                      {getInitials(item.customer.nome, item.customer.cognome)}
                    </div>
                  }
                  onClick={() => onCustomerClick(item.customer.id)}
                  right={
                    <StatusChip variant="danger">
                      {item.max_delay_days}{' '}
                      {item.max_delay_days === 1 ? 'giorno' : 'giorni'}
                    </StatusChip>
                  }
                  subtitle={
                    <Typography.Text type="secondary">
                      {item.overdue_rentals_count}{' '}
                      {item.overdue_rentals_count === 1
                        ? 'noleggio in ritardo'
                        : 'noleggi in ritardo'}
                    </Typography.Text>
                  }
                  title={
                    <Typography.Text className="dashboard-page__item-title">
                      {item.customer.nome} {item.customer.cognome}
                    </Typography.Text>
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
