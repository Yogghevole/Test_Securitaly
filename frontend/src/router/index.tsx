import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { CatalogoPage } from '@/pages/CatalogoPage';
import { ClientiPage } from '@/pages/ClientiPage';
import { RentalHistoryPage } from '@/pages/RentalHistoryPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ROUTES } from '@/constants/routes';

export const router = createBrowserRouter([
  {
    path: ROUTES.DASHBOARD,
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: ROUTES.CATALOGO,
        element: <CatalogoPage />,
      },
      {
        path: ROUTES.CLIENTI,
        element: <ClientiPage />,
      },
      {
        path: ROUTES.STORICO_NOLEGGI,
        element: <RentalHistoryPage />,
      },
    ],
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFoundPage />,
  },
]);
