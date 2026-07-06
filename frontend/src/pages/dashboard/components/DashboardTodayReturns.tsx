import { ArrowRightOutlined, CalendarOutlined } from '@ant-design/icons';
import { Button, Skeleton, Typography } from 'antd';
import { DvdCover, EmptyState, MediaListItem } from '@/components/common';
import type { Noleggio } from '@/types';

interface DashboardTodayReturnsProps {
  hasError: boolean;
  isLoading: boolean;
  onNavigate: () => void;
  rentals: Noleggio[];
}

export const DashboardTodayReturns = ({
  hasError,
  isLoading,
  onNavigate,
  rentals,
}: DashboardTodayReturnsProps) => {
  return (
    <section className="dashboard-page__card">
      <div className="dashboard-page__card-header">
        <div className="dashboard-page__card-title-group">
          <div className="dashboard-page__card-icon dashboard-page__card-icon--primary">
            <CalendarOutlined />
          </div>

          <button
            className="dashboard-page__card-title-button"
            onClick={onNavigate}
            type="button"
          >
            Rientri previsti oggi
          </button>
        </div>

        <div className="dashboard-page__card-actions">
          <button
            className="dashboard-page__card-count-button"
            onClick={onNavigate}
            type="button"
          >
            {rentals.length}
          </button>

          <Button
            aria-label="Apri lo storico noleggi filtrato sui rientri di oggi"
            className="dashboard-page__card-arrow"
            icon={<ArrowRightOutlined />}
            onClick={onNavigate}
            type="text"
          />
        </div>
      </div>

      <div className="dashboard-page__card-body">
        {isLoading ? (
          <Skeleton active paragraph={{ rows: 5 }} title={false} />
        ) : hasError ? (
          <EmptyState description="Impossibile caricare i rientri previsti per oggi." />
        ) : rentals.length === 0 ? (
          <EmptyState description="Nessun rientro previsto per oggi." />
        ) : (
          <div className="dashboard-page__list">
            {rentals.map((rental) => (
              <div className="dashboard-page__list-card" key={rental.id}>
                <MediaListItem
                  cover={
                    <DvdCover
                      coverPath={rental.dvd?.cover_path ?? null}
                      title={rental.dvd?.titolo ?? 'DVD'}
                    />
                  }
                  subtitle={
                    <Typography.Text type="secondary">
                      {rental.cliente
                        ? `${rental.cliente.nome} ${rental.cliente.cognome}`
                        : 'Cliente non disponibile'}
                    </Typography.Text>
                  }
                  title={
                    <Typography.Text className="dashboard-page__item-title">
                      {rental.dvd?.titolo ?? 'Titolo non disponibile'}
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
