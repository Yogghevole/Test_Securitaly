import { Alert, Button, Select, Space } from 'antd';

interface ReturnModeBannerOption {
  label: string;
  value: number;
}

interface ReturnModeBannerProps {
  customerOptions: ReturnModeBannerOption[];
  isCustomersLoading: boolean;
  selectedCustomerId: number | null;
  onCancel: () => void;
  onCustomerChange: (value: number | null) => void;
}

export const ReturnModeBanner = ({
  customerOptions,
  isCustomersLoading,
  selectedCustomerId,
  onCancel,
  onCustomerChange,
}: ReturnModeBannerProps) => {
  return (
    <Alert
      action={
        <Space size={12} wrap>
          <Select
            allowClear
            className="rental-history-page__return-banner-select"
            loading={isCustomersLoading}
            onChange={(value) => onCustomerChange(value ?? null)}
            options={customerOptions}
            placeholder="Seleziona cliente"
            showSearch
            size="large"
            value={selectedCustomerId ?? undefined}
          />

          <Button onClick={onCancel}>Annulla</Button>
        </Space>
      }
      className="rental-history-page__return-banner"
      description="Seleziona il cliente per visualizzare i DVD attualmente noleggiati."
      message="Modalità rientro"
      showIcon
      type="info"
    />
  );
};
