import DropDown from '../components/DropDown';
import { Input } from '@nextui-org/react';
import React, { useState } from 'react';
import Form, { FormItem, FormValidations } from 'reactivity-hook-form';
import Swal from 'sweetalert2';

interface PaymentFormProps {
  children?: React.ReactNode;
  onSubmit: () => void;
}

type FormValues = {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  sucursal: string;
  reservationDate: string;
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
  sucursal: {
    required: 'La sucursal es requerida',
  },
  reservationDate: {
    required: 'La fecha limite para retirar el libro es requerida',
  },
};

export const ReservationForm: React.FC<PaymentFormProps> = ({
  children,
  onSubmit,
}) => {
  const [selectedSucursal, setSelectedSucursal] = useState<string>('');

  const handleSubmit = (data: FormValues) => {
    Swal.fire({
      title: '¡Excelente!',
      text: 'Reservación éxitosa',
      icon: 'success',
      confirmButtonText: 'Ok',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/principal';
      }
    });
    console.log('Payment Information:', data);
    onSubmit();
  };

  const handleSelectSucursal = (sucursal: string) => {
    setSelectedSucursal(sucursal);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      validations={validations}
      className="p-6 rounded-lg w-full max-w-md"
      style={{ backgroundColor: 'rgb(19, 19, 19)' }}
    >
      <div className="mb-2">
        <h2 className="text-xl font-bold text-white">Información de pago</h2>
        <FormItem name="cardNumber">
          <Input
            type="text"
            label="Número de Tarjeta"
            className="w-full p-2 rounded text-white"
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
              className="w-full p-2 rounded text-white"
              required
              variant="bordered"
              radius="sm"
            />
          </FormItem>
          <FormItem name="cvv" className="w-1/2">
            <Input
              type="text"
              label="CVV"
              className="w-full p-2 rounded text-white"
              required
              variant="bordered"
              radius="sm"
            />
          </FormItem>
        </div>
      </div>
      <div className="mb-2">
        <h2 className="text-xl font-bold text-white">
          Información de contacto
        </h2>

        <div className="flex space-x-4">
          <FormItem<FormValues> name="reservationDate">
            <Input
              type="date"
              label="Fecha de retiro"
              className="w-full p-2 rounded"
              radius="sm"
              required
              variant="bordered"
            />
          </FormItem>
          <FormItem name="phone" className="w-1/2">
            <Input
              type="text"
              label="Teléfono"
              placeholder="+503 2525-2525"
              className="w-full p-2 rounded text-white"
              required
              variant="bordered"
              radius="sm"
            />
          </FormItem>
        </div>
      </div>

      <DropDown onSelectSucursal={handleSelectSucursal} />

      {children}
    </Form>
  );
};
