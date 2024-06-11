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
import { useState, useRef } from 'react';
import React from 'react';
import { gql, useApolloClient } from '@apollo/client';

const CREATE_CATEGORY_MUTATION = gql`
  mutation CreateCategory($data: CategoryCreateInput!) {
    createCategory(data: $data) {
      id
      name
      image {
        url
      }
    }
  }
`;

const AdminCategoryModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);
  const [categoryName, setCategoryName] = useState<string>('');
  const client = useApolloClient();
  const formRef = useRef<HTMLFormElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImages(e.target.files);
      console.log('Imagen seleccionada:', e.target.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedImages || selectedImages.length === 0) {
      alert('Por favor selecciona al menos una imagen');
      return;
    }

    const file = selectedImages[0];  // Asumiendo que solo se sube una imagen

    try {
      const { data } = await client.mutate({
        mutation: CREATE_CATEGORY_MUTATION,
        context: {
          headers: {
            'content-type': 'multipart/form-data',
            'x-apollo-operation-name': 'CreateCategoryMutation',
            'apollo-require-preflight': true,
          },
        },
        variables: {
          data: {
            name: categoryName,
            image: { upload: file },
          },
        },
      });

   

      console.log('Respuesta de la mutación:', data);
      alert('Categoría creada exitosamente');
      setCategoryName('');
      setSelectedImages(null);
      formRef.current?.reset();
    } catch (error) {
      console.error('Error al realizar la mutación:', error);
      alert('Error al crear la categoría');
    }
  };

  return (
    <>
      <Button
        color="primary"
        variant="shadow"
        radius="sm"
        onClick={onOpen}
        style={{ marginBottom: '20px' }}
      >
        Crear Categoría
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Crear Categoria</ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit} ref={formRef}>
                  <div>
                    <label>Nombre</label>
                    <Input
                      type="text"
                      className="w-full p-2 rounded"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label>Imagen</label>
                    <input
                      type="file"
                      className="w-full p-2 rounded"
                      required
                      onChange={handleImageChange}
                    />
                  </div>

                  <Button type="submit" color="primary" radius="md" variant="shadow">
                    Crear
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Cancelar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AdminCategoryModal;
