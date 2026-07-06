import { Layout as AntLayout } from 'antd';
import {
  AppHeader,
  AppSidebar,
  ContentWrapper,
} from '@/components/layout';
import '@/styles/layout.css';

export const MainLayout = () => {
  return (
    <AntLayout className="layout-root">
      <AppSidebar />
      <AntLayout className="layout-shell">
        <AppHeader />
        <ContentWrapper />
      </AntLayout>
    </AntLayout>
  );
};
