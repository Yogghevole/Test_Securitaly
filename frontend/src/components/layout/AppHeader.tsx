import { UserOutlined } from '@ant-design/icons';
import { Avatar, Breadcrumb, Layout, Typography } from 'antd';
import { useLocation } from 'react-router-dom';
import { getBreadcrumbItems, getPageTitle } from './navigation';

const { Header } = Layout;

export const AppHeader = () => {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  return (
    <Header className="layout-header">
      <div className="layout-header-content">
        <div className="layout-header-context">
          <Typography.Title className="layout-header-title" level={4}>
            {pageTitle}
          </Typography.Title>

          <Breadcrumb
            className="layout-header-breadcrumb"
            items={getBreadcrumbItems(location.pathname)}
            separator="/"
          />
        </div>

        <div className="layout-header-user">
          <div className="layout-header-user-text">
            <Typography.Text className="layout-header-user-name">
              Admin
            </Typography.Text>
            <Typography.Text
              className="layout-header-user-role"
              type="secondary"
            >
              Responsabile negozio
            </Typography.Text>
          </div>

          <Avatar icon={<UserOutlined />} size={40} />
        </div>
      </div>
    </Header>
  );
};
