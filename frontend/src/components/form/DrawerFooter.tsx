import type { ButtonProps } from 'antd';
import { Button, Flex } from 'antd';

interface DrawerFooterProps {
  cancelText?: string;
  confirmText?: string;
  loading?: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
  cancelButtonProps?: ButtonProps;
  confirmButtonProps?: ButtonProps;
}

export const DrawerFooter = ({
  cancelText = 'Annulla',
  confirmText = 'Conferma',
  loading = false,
  onCancel,
  onConfirm,
  cancelButtonProps,
  confirmButtonProps,
}: DrawerFooterProps) => {
  return (
    <Flex gap={12} justify="flex-end">
      <Button onClick={onCancel} {...cancelButtonProps}>
        {cancelText}
      </Button>

      <Button
        onClick={onConfirm}
        type="primary"
        {...confirmButtonProps}
        loading={loading}
      >
        {confirmText}
      </Button>
    </Flex>
  );
};
