import type { ReactNode } from 'react';
import { Flex } from 'antd';

interface PageContainerProps {
  children: ReactNode;
}

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <Flex gap={24} vertical>
      {children}
    </Flex>
  );
};
