import type { CSSProperties } from 'react';
import './StatCard.css';

interface StatCardProps {
  title: string;
  value: number | string;
  valueColor?: string;
}

export const StatCard = ({ title, value, valueColor }: StatCardProps) => {
  return (
    <div
      className="stat-card"
      style={
        valueColor
          ? ({ '--stat-card-value-color': valueColor } as CSSProperties)
          : undefined
      }
    >
      <div className="stat-card__value">{value}</div>
      <div className="stat-card__title">{title}</div>
    </div>
  );
};
