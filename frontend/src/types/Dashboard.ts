import type { Cliente } from './Cliente';
import type { Noleggio } from './Noleggio';

export interface DashboardNeedAttentionItem {
  customer: Cliente;
  max_delay_days: number;
  overdue_rentals_count: number;
}

export interface DashboardResponse {
  need_attention: DashboardNeedAttentionItem[];
  today_returns: Noleggio[];
}
