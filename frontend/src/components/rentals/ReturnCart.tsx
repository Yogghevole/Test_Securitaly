import { CloseOutlined } from '@ant-design/icons';
import { Badge, Button, Divider, Typography } from 'antd';
import { DvdCover, MediaListItem } from '@/components/common';
import type { Noleggio } from '@/types';
import { getRentalDelayDays } from './rentalStatus';

interface ReturnCartProps {
  rentals: Noleggio[];
  onContinue: () => void;
  onRemove: (rentalId: number) => void;
}

const getSubtitle = (rental: Noleggio) => {
  const delayDays = getRentalDelayDays(rental);

  if (delayDays) {
    return `${delayDays} ${delayDays === 1 ? 'giorno' : 'giorni'} di ritardo`;
  }

  return 'In orario';
};

export const ReturnCart = ({
  rentals,
  onContinue,
  onRemove,
}: ReturnCartProps) => {
  const selectedCount = rentals.length;

  return (
    <aside aria-label="Carrello rientro" className="rental-cart">
      <div className="rental-cart__header">
        <div className="rental-cart__heading">
          <Typography.Title className="rental-cart__title" level={5}>
            Carrello Rientro
          </Typography.Title>

          <Badge className="rental-cart__badge" count={selectedCount} />
        </div>
      </div>

      <Divider className="rental-cart__divider" />

      <div className="rental-cart__list">
        {rentals.map((rental) => {
          const dvd = rental.dvd;

          return (
            <MediaListItem
              cover={
                <DvdCover
                  coverPath={dvd?.cover_path ?? null}
                  title={dvd?.titolo ?? 'DVD'}
                />
              }
              key={rental.id}
              right={
                <Button
                  aria-label={`Rimuovi ${dvd?.titolo ?? 'DVD'} dal carrello rientro`}
                  className="rental-cart__item-remove"
                  icon={<CloseOutlined />}
                  onClick={() => onRemove(rental.id)}
                  type="text"
                />
              }
              subtitle={
                <Typography.Text
                  className="rental-history-page__return-cart-subtitle"
                  type={getRentalDelayDays(rental) ? undefined : 'secondary'}
                >
                  {getSubtitle(rental)}
                </Typography.Text>
              }
              title={
                <Typography.Text className="rental-cart__item-title">
                  {dvd?.titolo ?? 'Titolo non disponibile'}
                </Typography.Text>
              }
            />
          );
        })}
      </div>

      <div className="rental-cart__footer">
        <div className="rental-cart__summary">
          <Typography.Text className="rental-cart__summary-label" type="secondary">
            DVD selezionati
          </Typography.Text>

          <Typography.Text className="rental-cart__summary-value">
            {selectedCount}
          </Typography.Text>
        </div>

        <Button
          block
          disabled={selectedCount === 0}
          onClick={onContinue}
          type="primary"
        >
          {`Continua (${selectedCount})`}
        </Button>
      </div>
    </aside>
  );
};
