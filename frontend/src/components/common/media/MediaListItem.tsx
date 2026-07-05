import type { KeyboardEvent, ReactNode } from 'react';
import './MediaListItem.css';

interface MediaListItemProps {
  cover: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
  right?: ReactNode;
  onClick?: () => void;
  children?: ReactNode;
}

export const MediaListItem = ({
  cover,
  title,
  subtitle,
  right,
  onClick,
  children,
}: MediaListItemProps) => {
  const isInteractive = typeof onClick === 'function';

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isInteractive) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={[
        'media-list-item',
        isInteractive ? 'media-list-item--interactive' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
    >
      <div className="media-list-item__cover">{cover}</div>

      <div className="media-list-item__content">
        <div className="media-list-item__header">
          <div className="media-list-item__text">
            <div className="media-list-item__title">{title}</div>
            <div className="media-list-item__subtitle">{subtitle}</div>
          </div>

          {right ? <div className="media-list-item__right">{right}</div> : null}
        </div>

        {children ? <div className="media-list-item__extra">{children}</div> : null}
      </div>
    </div>
  );
};
