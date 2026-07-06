import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

export const ContentWrapper = () => {
  return (
    <Content className="layout-content">
      <Outlet />
    </Content>
  );
};
