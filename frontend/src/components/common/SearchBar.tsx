import { Input } from 'antd';

type SearchBarProps = React.ComponentProps<typeof Input.Search>;

export const SearchBar = (props: SearchBarProps) => {
  return <Input.Search allowClear placeholder="Cerca..." {...props} />;
};
