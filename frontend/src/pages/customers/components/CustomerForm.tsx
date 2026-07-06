import type { FormInstance } from 'antd';
import { Form, Input } from 'antd';
import type { CreateCustomerPayload } from '@/types';

interface CustomerFormProps {
  form: FormInstance<CreateCustomerPayload>;
  isSubmitting: boolean;
  onFinish: (values: CreateCustomerPayload) => void | Promise<void>;
}

export const CustomerForm = ({
  form,
  isSubmitting,
  onFinish,
}: CustomerFormProps) => {
  return (
    <Form<CreateCustomerPayload>
      className="customers-page__form"
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        label="Nome"
        name="nome"
        rules={[{ required: true, message: 'Inserisci il nome.' }]}
      >
        <Input disabled={isSubmitting} size="large" />
      </Form.Item>

      <Form.Item
        label="Cognome"
        name="cognome"
        rules={[{ required: true, message: 'Inserisci il cognome.' }]}
      >
        <Input disabled={isSubmitting} size="large" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Inserisci l'email." },
          { type: 'email', message: 'Inserisci un indirizzo email valido.' },
        ]}
      >
        <Input disabled={isSubmitting} size="large" />
      </Form.Item>
    </Form>
  );
};
