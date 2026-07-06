import dayjs from 'dayjs';
import 'dayjs/locale/it';
import { useNavigate } from 'react-router-dom';
import { AppPageHeader, PageContainer } from '@/components/common';
import { ROUTES } from '@/constants/routes';
import { DashboardNeedAttention } from './components/DashboardNeedAttention';
import { DashboardTodayReturns } from './components/DashboardTodayReturns';
import { useDashboard } from './hooks/useDashboard';
import './DashboardPage.css';

const getTodayLabel = () => {
  const formattedDate = dayjs().locale('it').format('dddd D MMMM YYYY');

  return `${formattedDate.charAt(0).toUpperCase()}${formattedDate.slice(1)}`;
};

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { hasError, isLoading, needAttention, todayReturns } = useDashboard();

  const handleOpenTodayReturns = () => {
    navigate(`${ROUTES.STORICO_NOLEGGI}?status=returns_today`);
  };

  const handleOpenCustomer = (customerId: number) => {
    navigate(`${ROUTES.CLIENTI}?customerId=${customerId}`);
  };

  return (
    <PageContainer>
      <div className="dashboard-page__container-shell">
        <AppPageHeader
          description="Ecco cosa richiede la tua attenzione oggi."
          metric={getTodayLabel()}
        />
      </div>

      <div className="dashboard-page__container-shell">
        <div className="dashboard-page__grid">
          <DashboardTodayReturns
            hasError={hasError}
            isLoading={isLoading}
            onNavigate={handleOpenTodayReturns}
            rentals={todayReturns}
          />

          <DashboardNeedAttention
            hasError={hasError}
            isLoading={isLoading}
            items={needAttention}
            onCustomerClick={handleOpenCustomer}
          />
        </div>
      </div>
    </PageContainer>
  );
};
