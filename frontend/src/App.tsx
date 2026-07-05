import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import itIT from 'antd/locale/it_IT';
import { router } from '@/router';
import 'antd/dist/reset.css';

function App() {
  return (
    <ConfigProvider locale={itIT}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
