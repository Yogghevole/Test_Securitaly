import { Typography } from 'antd';

interface PagePlaceholderProps {
  title: string;
}

export const PagePlaceholder = ({ title }: PagePlaceholderProps) => {
  return <Typography.Title level={2}>{title}</Typography.Title>;
};
