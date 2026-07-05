import type { ReactNode } from 'react';
import { Flex, Space, Typography } from 'antd';

interface AppPageHeaderProps {
  metric?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}

export const AppPageHeader = ({
  metric,
  description,
  actions,
}: AppPageHeaderProps) => {
  return (
    <Flex align="flex-start" gap={16} justify="space-between" wrap="wrap">
      <Space direction="vertical" size={2}>
        {metric ? <Typography.Text strong>{metric}</Typography.Text> : null}

        {description ? (
          <Typography.Text type="secondary">{description}</Typography.Text>
        ) : null}
      </Space>

      {actions ? <Flex gap={12}>{actions}</Flex> : null}
    </Flex>
  );
};
