import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, Typography } from 'antd';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LAYOUT } from '@/constants';
import sidebarLogo from '@/assets/logo/logo.png';
import { MENU_ITEMS, getSelectedNavigationKeys } from './navigation';

const { Sider } = Layout;
const SIDEBAR_COLLAPSED_WIDTH = 72;

export const AppSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [isCollapsedHeaderHovered, setIsCollapsedHeaderHovered] = useState(false);

  const sidebarClassName = [
    'layout-sidebar',
    collapsed ? 'layout-sidebar-collapsed' : '',
    isCollapsedHeaderHovered ? 'layout-sidebar-hovered' : '',
  ].filter(Boolean).join(' ');

  return (
    <Sider
      className={sidebarClassName}
      collapsed={collapsed}
      collapsedWidth={SIDEBAR_COLLAPSED_WIDTH}
      theme="dark"
      trigger={null}
      width={LAYOUT.SIDEBAR_WIDTH}
    >
      <div className="layout-sidebar-inner">
        <div
          className="layout-sidebar-header"
          onMouseEnter={() => setIsCollapsedHeaderHovered(true)}
          onMouseLeave={() => setIsCollapsedHeaderHovered(false)}
        >
          <div className="layout-sidebar-brand">
            <div className="layout-sidebar-brand-switcher">
              <img
                alt="Logo DVD Rental"
                className="layout-sidebar-logo"
                src={sidebarLogo}
              />

              <Button
                aria-label="Espandi sidebar"
                aria-hidden={!collapsed || !isCollapsedHeaderHovered}
                className="layout-sidebar-expand-button"
                icon={<MenuUnfoldOutlined />}
                onClick={() => setCollapsed(false)}
                tabIndex={collapsed && isCollapsedHeaderHovered ? 0 : -1}
                type="text"
              />
            </div>

            <Typography.Title className="layout-sidebar-title" level={4}>
              DVD Rental
            </Typography.Title>
          </div>

          <div className="layout-sidebar-header-actions">
            <Button
              aria-label="Comprimi sidebar"
              aria-hidden={collapsed}
              className="layout-sidebar-collapse-button"
              icon={<MenuFoldOutlined />}
              onClick={() => setCollapsed(true)}
              tabIndex={collapsed ? -1 : 0}
              type="text"
            />
          </div>
        </div>

        <div className="layout-sidebar-menu">
          <Menu
            inlineCollapsed={collapsed}
            items={MENU_ITEMS}
            mode="inline"
            onClick={({ key }) => navigate(key)}
            selectedKeys={getSelectedNavigationKeys(location.pathname)}
            theme="dark"
          />
        </div>

        <div className="layout-sidebar-footer">
          <div className="layout-sidebar-footer-content">
            <Typography.Text className="layout-sidebar-footer-stack">
              Laravel + React
            </Typography.Text>

            <Typography.Text className="layout-sidebar-footer-version">
              Version 1.0
            </Typography.Text>

            <div className="layout-sidebar-footer-status">
              <span
                aria-hidden="true"
                className="layout-sidebar-footer-status-dot"
              />

              <Typography.Text className="layout-sidebar-footer-status-text">
                Connected
              </Typography.Text>
            </div>
          </div>
        </div>
      </div>
    </Sider>
  );
};
