import { Input } from '@nextui-org/react';
import React from 'react';
import Form, { FormItem, FormValidations } from 'reactivity-hook-form';
import Swal from 'sweetalert2';

interface PaymentFormProps {
  children?: React.ReactNode;
  onSubmit: (formData: FormValues) => void;
}

export type FormValues = {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  postal: string;
  address: string;
  phone: string;
  city: string;
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
  postal: {
    required: 'El código postal es requerido',
  },
  address: {
    required: 'La dirección es requerida',
  },
  phone: {
    required: 'El número de teléfono es requerido',
  },
  city: {
    required: 'La ciudad es requerida',
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

export const PaymentForm: React.FC<PaymentFormProps> = ({
  children,
  onSubmit
}) => {
  const handleSubmit = (data: FormValues) => {
    Swal.fire({
      title: '¡Muchas Gracias!',
      text: 'Tu pedido va en camino',
      icon: 'success',
      confirmButtonText: "Ok"
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/principal'; 
      }
    });
    console.log('Payment Information:', data);
    onSubmit(data);  // Pasar datos del formulario a la función onSubmit
  };

  return (
    <Form
      onSubmit={handleSubmit}
      validations={validations}
      className="p-6 rounded-lg w-full max-w-md shadow-lg"
      style={{ backgroundColor: 'rgb(255, 255, 255)' }}
    >
      <div className="mb-2">
        <h2 className="text-xl font-bold text-black">Información de pago</h2>
        <FormItem name="cardNumber">
          <Input
            type="text"
            label="Número de Tarjeta"
            className="w-full p-2 rounded text-black"
            required
            variant="bordered"
            radius="sm"
          />
        </FormItem>
        <div className="flex space-x-4">
          <FormItem name="expiryDate" className="w-1/2">
            <Input
              type="text"
              label="Fecha de Expiración"
              placeholder="MM/AA"
              className="w-full p-2 rounded text-black"
              required
              variant="bordered"
              radius="sm"
            />
          </FormItem>
          <FormItem name="cvv" className="w-1/2">
            <Input
              type="text"
              label="CVV"
              className="w-full p-2 rounded text-black"
              required
              variant="bordered"
              radius="sm"
            />
          </FormItem>
        </div>
      </div>
      <div className="mb-2">
        <h2 className="text-xl font-bold text-black">
          Información de contacto
        </h2>
        <FormItem name="address">
          <Input
            type="text"
            label="Dirección"
            placeholder="Carr. longitudinal del Nte. Km 73.5"
            className="w-full p-2 rounded text-black"
            required
            variant="bordered"
            radius="sm"
          />
        </FormItem>
        <FormItem name="city">
          <Input
            type="text"
            label="Ciudad"
            placeholder="San Salvador"
            className="w-full p-2 rounded text-black"
            required
            variant="bordered"
            radius="sm"
          />
        </FormItem>
        <div className="flex space-x-4">
          <FormItem name="postal" className="w-1/2">
            <Input
              type="text"
              label="Código postal"
              placeholder="06007"
              className="w-full p-2 rounded text-black"
              required
              variant="bordered"
              radius="sm"
            />
          </FormItem>
          <FormItem name="phone" className="w-1/2">
            <Input
              type="text"
              label="Teléfono"
              placeholder="+503 2525-2525"
              className="w-full p-2 rounded text-black"
              required
              variant="bordered"
              radius="sm"
            />
          </FormItem>
        </div>
      </div>
      {children}
    </Form>
  );
};
