/* src/utils/getCoverUrl.ts */

import { API_URL } from '@/config/env';

export const getCoverUrl = (coverPath: string | null) => {
  if (!coverPath) {
    return null;
  }

  const backendBaseUrl = API_URL.replace(/\/api\/?$/, '');

  return new URL(`covers/${coverPath}`, `${backendBaseUrl}/`).toString();
};
