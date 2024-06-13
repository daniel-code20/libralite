import { Link } from 'react-router-dom';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
} from '@nextui-org/react';
import Form, { FormItem, FormValidations } from 'reactivity-hook-form';
import React from 'react';

type FormValues = {
  postal: string;
  address: string;
  phone: string;
  city: string;
};

const validations: FormValidations<FormValues> = {
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
};

interface BuyModalProps {
  book: { id: string };
}

const BuyModal: React.FC<BuyModalProps> = ({ book }) => {
  const handleSubmit = (data: FormValues) => {
    console.log('Reservation Information:', data);
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        color="primary"
        variant="shadow"
        radius="sm"
        onPress={onOpen}
        style={{ marginBottom: '20px', marginRight:'20px' }}
      >
        Comprar
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Datos de compra
              </ModalHeader>
              <ModalBody>
                <Form<FormValues>
                  onSubmit={handleSubmit}
                  validations={validations}
                >
                  <FormItem<FormValues> name="postal">
                    <Input
                      type="text"
                      label="Código postal"
                      placeholder="06007"
                      className="w-full p-2 rounded"
                      required
                      variant="bordered"
                    />
                  </FormItem>
                  <FormItem<FormValues> name="address">
                    <Input
                      type="text"
                      label="Dirección"
                      placeholder="Carr. longitudinal del Nte. Km 73.5"
                      className="w-full p-2 rounded"
                      required
                      variant="bordered"
                    />
                  </FormItem>
                  <FormItem<FormValues> name="city">
                    <Input
                      type="text"
                      label="Ciudad"
                      placeholder="San Salvador"
                      className="w-full p-2 rounded"
                      required
                      variant="bordered"
                    />
                  </FormItem>
                  <FormItem<FormValues> name="phone">
                    <Input
                      type="text"
                      label="Teléfono"
                      placeholder="+503 2525-2525"
                      className="w-full p-2 rounded"
                      required
                      variant="bordered"
                    />
                  </FormItem>
                </Form>
              </ModalBody>
              <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose} radius='sm'>
                    Cancelar
                  </Button>
                <Button
                  color="primary"
                  radius="sm"
                  variant="shadow"
                  onPress={onClose}
                >
                  <Link
                    to={`/buy/${book.id}`}
                    key={`buy-${book.id}`}
                    style={{ color: 'white', textDecoration: 'none' }}
                  >
                    Confirmar
                  </Link>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default BuyModal;
