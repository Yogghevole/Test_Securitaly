import apiClient from '@/lib/axios';
import type { DashboardResponse } from '@/types';

const DASHBOARD_ENDPOINT = '/dashboard';

const getSummary = async (): Promise<DashboardResponse> => {
  const { data } = await apiClient.get<DashboardResponse>(DASHBOARD_ENDPOINT);

  return data;
};

export const dashboardService = {
  getSummary,
};
