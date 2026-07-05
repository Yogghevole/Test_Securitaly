import { Empty } from 'antd';

type EmptyStateProps = React.ComponentProps<typeof Empty>;

export const EmptyState = (props: EmptyStateProps) => {
  return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} {...props} />;
};
