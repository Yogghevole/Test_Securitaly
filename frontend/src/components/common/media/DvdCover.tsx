import { useState } from 'react';
import { getCoverUrl } from '@/utils/getCoverUrl';
import './DvdCover.css';

interface DvdCoverProps {
  coverPath: string | null;
  title: string;
}

export const DvdCover = ({ coverPath, title }: DvdCoverProps) => {
  const [hasError, setHasError] = useState(false);
  const coverUrl = getCoverUrl(coverPath);

  if (!coverUrl || hasError) {
    return (
      <div
        aria-label={`Placeholder copertina di ${title}`}
        className="dvd-cover dvd-cover--placeholder"
      >
        DVD
      </div>
    );
  }

  return (
    <div className="dvd-cover">
      <img
        alt={`Copertina di ${title}`}
        className="dvd-cover__image"
        onError={() => setHasError(true)}
        src={coverUrl}
      />
    </div>
  );
};
