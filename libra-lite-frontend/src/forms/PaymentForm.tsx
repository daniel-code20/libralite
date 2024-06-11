import { Button, Input } from '@nextui-org/react';
import Form, { FormItem, FormValidations } from 'reactivity-hook-form';

type FormValues = {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
};

const validations: FormValidations<FormValues> = {
  cardNumber: {
    required: 'El número de tarjeta es requerido',
  },
  cardName: {
    required: 'El nombre en la tarjeta es requerido',
  },
  expiryDate: {
    required: 'La fecha de expiración es requerida',
  },
  cvv: {
    required: 'El CVV es requerido',
    validate(value) {
      if (value.length !== 3) {
        return 'El CVV debe tener 3 caracteres';
      }
    },
  },
};

export const PaymentForm = () => {
  const handleSubmit = (data: FormValues) => {
    console.log('Payment Information:', data);
  };

  return (
    <Form<FormValues>
      onSubmit={handleSubmit}
      validations={validations}
      className="p-6 rounded-lg w-full max-w-md"
      style={{ backgroundColor: 'rgb(19, 19, 19)' }}
    >
      <FormItem<FormValues> name="cardNumber">
        <Input
          type="text"
          label="Número de Tarjeta"
          className="w-full p-2 rounded text-white input-color"
          required
          variant="bordered"
        />
      </FormItem>
      <FormItem<FormValues> name="cardName">
        <Input
          type="text"
          label="Nombre en la Tarjeta"
          className="w-full p-2 rounded text-white input-color"
          required
          variant="bordered"
        />
      </FormItem>
      <FormItem<FormValues> name="expiryDate">
        <Input
          type="text"
          label="Fecha de Expiración"
          placeholder="MM/AA"
          className="w-full p-2 rounded text-white input-color"
          required
          variant="bordered"
        />
      </FormItem>
      <FormItem<FormValues> name="cvv">
        <Input
          type="text"
          label="CVV"
          className="w-full p-2 rounded text-white input-color"
          required
          variant="bordered"
        />
      </FormItem>
      <Button
        radius="sm"
        className="w-full p-2 bg-gradient-to-tr from-blue-500 to-cyan-400 text-white shadow-lg"
        type="submit"
        style={{ height: '50px' }}
      >
        Pagar
      </Button>
    </Form>
  );
};
