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
  
  type FormValues = {
    title: string;
    description: string;
    edition: number;
    author: string;
    quantity: number;
    price: number;
    image: string;
    publisher: string;
  };
  
  const validations: FormValidations<FormValues> = {
    title: {
      required: 'El titulo es requerido',
    },
    description: {
      required: 'La descripción es requerida',
    },
    edition: {
        required: 'La edición es requerida',
      },
      author: {
        required: 'El autor es requerido',
      },
      quantity: {
        required: 'La cantidad es requerida',
      },
      price: {
        required: 'El precio es requerido',
      },
      image: {
        required: 'La imagen es requerida',
      },
      publisher: {
        required: 'La editora es requerida',
      },
  };
  
  const AdminBookModal = () => {
    const handleSubmit = (data: FormValues) => {
      console.log('Reservation Information:', data);
    };
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
    return (
      <>
        <Button
          color="primary"
          variant="shadow"
          radius="full"
          onPress={onOpen}
          style={{ marginBottom: '20px' }}
        >
          Agregar Libro
        </Button>
  
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Crear Libro
                </ModalHeader>
                <ModalBody>
                  <Form<FormValues>
                    onSubmit={handleSubmit}
                    validations={validations}
                  >
                    <FormItem<FormValues> name="title">
                      <Input
                        type="text"
                        label="Titulo"
                        className="w-full p-2 rounded"
                        required
                        variant="bordered"
                      />
                    </FormItem>
                    <FormItem<FormValues> name="description">
                      <Input
                        type="text"
                        label="Descripción"
                        className="w-full p-2 rounded"
                        required
                        variant="bordered"
                      />
                    </FormItem>
                    <FormItem<FormValues> name="edition">
                      <Input
                        type="number"
                        label="Edición"
                        className="w-full p-2 rounded"
                        required
                        variant="bordered"
                      />
                    </FormItem>
                    <FormItem<FormValues> name="author">
                      <Input
                        type="text"
                        label="Autor"
                        className="w-full p-2 rounded"
                        required
                        variant="bordered"
                      />
                    </FormItem>
                    <FormItem<FormValues> name="quantity">
                      <Input
                        type="number"
                        label="Cantidad"
                        className="w-full p-2 rounded"
                        required
                        variant="bordered"
                      />
                    </FormItem>
                    <FormItem<FormValues> name="price">
                      <Input
                        type="number"
                        label="Precio"
                        className="w-full p-2 rounded"
                        required
                        variant="bordered"
                      />
                    </FormItem>

  
                    <FormItem<FormValues> name="image">
                      <Input
                        type="text"
                        label="Imagen"
                        className="w-full p-2 rounded"
                        required
                        variant="bordered"
                      />
                    </FormItem>
                  </Form>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button
                    color="primary"
                    radius="md"
                    variant="shadow"
                    onPress={onClose}
                  >
                    Agregar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default AdminBookModal;
  