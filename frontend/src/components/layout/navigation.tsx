import {
  DashboardOutlined,
  TeamOutlined,
  VideoCameraOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import type { BreadcrumbProps } from 'antd';
import type { MenuProps } from 'antd';
import type { ReactNode } from 'react';
import { ROUTES } from '@/constants';

interface AppNavigationItem {
  path: string;
  label: string;
  title: string;
  icon: ReactNode;
}

export const APP_NAVIGATION_ITEMS: AppNavigationItem[] = [
  {
    path: ROUTES.DASHBOARD,
    label: 'Dashboard',
    title: 'Dashboard',
    icon: <DashboardOutlined />,
  },
  {
    path: ROUTES.CATALOGO,
    label: 'Catalogo DVD',
    title: 'Catalogo DVD',
    icon: <VideoCameraOutlined />,
  },
  {
    path: ROUTES.CLIENTI,
    label: 'Clienti',
    title: 'Clienti',
    icon: <TeamOutlined />,
  },
  {
    path: ROUTES.STORICO_NOLEGGI,
    label: 'Rental History',
    title: 'Rental History',
    icon: <HistoryOutlined />,
  },
];

export const MENU_ITEMS: MenuProps['items'] = APP_NAVIGATION_ITEMS.map((item) => ({
  key: item.path,
  icon: item.icon,
  label: item.label,
}));

const isMatchingPath = (pathname: string, path: string): boolean => {
  if (path === ROUTES.DASHBOARD) {
    return pathname === path;
  }

  return pathname.startsWith(path);
};

export const getSelectedNavigationKeys = (pathname: string): string[] => {
  const activeItem = APP_NAVIGATION_ITEMS.find((item) => isMatchingPath(pathname, item.path));

  return activeItem ? [activeItem.path] : [];
};

export const getPageTitle = (pathname: string): string => {
  const activeItem = APP_NAVIGATION_ITEMS.find((item) => isMatchingPath(pathname, item.path));

  return activeItem?.title ?? 'Pagina non trovata';
};

export const getBreadcrumbItems = (
  pathname: string,
): BreadcrumbProps['items'] => {
  const pageTitle = getPageTitle(pathname);

  if (pageTitle === 'Pagina non trovata') {
    return [{ title: 'DVD Rental' }];
  }

  return [
    { title: 'DVD Rental' },
    { title: pageTitle },
  ];
};
