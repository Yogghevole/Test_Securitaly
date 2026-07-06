import { useCallback, useEffect, useState } from 'react';
import { dashboardService } from '@/services';
import type { DashboardNeedAttentionItem, Noleggio } from '@/types';

export const useDashboard = () => {
  const [todayReturns, setTodayReturns] = useState<Noleggio[]>([]);
  const [needAttention, setNeedAttention] = useState<DashboardNeedAttentionItem[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadDashboard = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const data = await dashboardService.getSummary();

      setTodayReturns(data.today_returns);
      setNeedAttention(data.need_attention);
    } catch {
      setTodayReturns([]);
      setNeedAttention([]);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(loadDashboard);
  }, [loadDashboard]);

  return {
    hasError,
    isLoading,
    needAttention,
    todayReturns,
  };
};
