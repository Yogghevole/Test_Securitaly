/* src/pages/catalogo/components/RentalCart.tsx */

import { ClockCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Badge, Button, Divider, Typography } from 'antd';
import type { Dvd } from '@/types';
import { formatDuration } from '@/utils/formatDuration';
import { DvdCover } from './DvdCover';
import './RentalCart.css';

interface RentalCartProps {
  dvds: Dvd[];
  onContinue: () => void;
  onRemove: (dvdId: number) => void;
}

export const RentalCart = ({ dvds, onContinue, onRemove }: RentalCartProps) => {
  const selectedCount = dvds.length;

  return (
    <aside aria-label="Carrello noleggio" className="rental-cart">
      <div className="rental-cart__header">
        <div className="rental-cart__heading">
          <Typography.Title className="rental-cart__title" level={5}>
            Carrello Noleggio
          </Typography.Title>

          <Badge className="rental-cart__badge" count={selectedCount} />
        </div>
      </div>

      <Divider className="rental-cart__divider" />

      <div className="rental-cart__list">
        {dvds.map((dvd) => (
          <div className="rental-cart__item" key={dvd.id}>
            <DvdCover coverPath={dvd.cover_path} title={dvd.titolo} />

            <div className="rental-cart__item-content">
              <Typography.Text className="rental-cart__item-title">
                {dvd.titolo}
              </Typography.Text>

              <Typography.Text
                className="rental-cart__item-category"
                type="secondary"
              >
                {dvd.categoria}
              </Typography.Text>

              <Typography.Text
                className="rental-cart__item-duration"
                type="secondary"
              >
                <ClockCircleOutlined /> {formatDuration(dvd.durata_minuti)}
              </Typography.Text>
            </div>

            <Button
              aria-label={`Rimuovi ${dvd.titolo} dal carrello`}
              className="rental-cart__item-remove"
              icon={<CloseOutlined />}
              onClick={() => onRemove(dvd.id)}
              type="text"
            />
          </div>
        ))}
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