import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  useDisclosure,
} from '@nextui-org/react';
import { useState, useRef } from 'react';
import React from 'react';
import { gql, useApolloClient } from '@apollo/client';
import Swal from 'sweetalert2';

const CREATE_BOOK_MUTATION = gql`
  mutation CreateBook($data: BookCreateInput!) {
    createBook(data: $data) {
      id
      title
      description
      edition
      author {
        name
      }
      quantity
      price
      image {
        url
      }
      gender {
        id
        name
      }
    }
  }
`;

interface AdminBookModalProps {
  selectedGenre: string;
}

const AdminBookModal: React.FC<AdminBookModalProps> = ({ selectedGenre }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<FileList | null>(null);
  const [bookData, setBookData] = useState({
    title: '',
    description: '',
    edition: '',
    author: '',
    quantity: '',
    price: '0.00', // Inicializa con un valor flotante válido
    gender: '', // Guardamos el ID del género seleccionado
  });
  const client = useApolloClient();
  const formRef = useRef<HTMLFormElement>(null);

  const formatPrice = (priceInCents: number) => (priceInCents / 100).toFixed(2);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files);
      console.log('Imagen seleccionada:', e.target.files);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedImage || selectedImage.length === 0) {
      alert('Por favor selecciona una imagen');
      return;
    }

    const file = selectedImage[0]; // Asumimos que solo se sube una imagen

    // Convertir el precio a entero (por ejemplo, centavos)
    const priceInCents = Math.round(parseFloat(bookData.price) * 100);

    try {
      const { data } = await client.mutate({
        mutation: CREATE_BOOK_MUTATION,
        context: {
          headers: {
            'content-type': 'multipart/form-data',
            'x-apollo-operation-name': 'CreateBookMutation',
            'apollo-require-preflight': true,
          },
        },
        variables: {
          data: {
            title: bookData.title,
            description: bookData.description,
            edition: parseInt(bookData.edition, 10),
            quantity: parseInt(bookData.quantity, 10),
            price: priceInCents, // Enviar el precio como entero en centavos
            gender: { connect: { id: selectedGenre } }, // ID como string
            image: { upload: file },
          },
        },
      });

      Swal.fire({
        title: '¡Excelente!',
        text: 'Libro creado exitosamente',
        icon: 'success',
        confirmButtonText: 'Ok',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });

      setBookData({
        title: '',
        description: '',
        edition: '',
        author: '',
        quantity: '',
        price: '0.00', // Reinicia el precio a un valor flotante válido
        gender: selectedGenre, // Limpiar el estado del libro después de crearlo
      });
      setSelectedImage(null);
      formRef.current?.reset();
    } catch (error) {
      console.error('Error al crear el libro:', error);
      Swal.fire({
        title: 'Error',
        text: 'Error al crear el libro',
        icon: 'error',
      });
    }
  };

  return (
    <>
      <Button
        color="success"
        radius="sm"
        variant="shadow"
        onClick={onOpen}
        style={{ marginBottom: '20px' }}
      >
        Agregar Libro
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Agregar Libro</ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit} ref={formRef}>
                  <div>
                    <label>Título</label>
                    <Input
                      type="text"
                      className="w-full p-2 rounded"
                      name="title"
                      value={bookData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Descripción</label>
                    <Input
                      type="text"
                      className="w-full p-2 rounded"
                      name="description"
                      value={bookData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Edición</label>
                    <Input
                      type="number"
                      min="0" // No permite números negativos
                      className="w-full p-2 rounded"
                      name="edition"
                      value={bookData.edition}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Autor</label>
                    <Input
                      type="text"
                      className="w-full p-2 rounded"
                      name="author"
                      value={bookData.author}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Cantidad</label>
                    <Input
                      type="number"
                      min="0" // No permite números negativos
                      className="w-full p-2 rounded"
                      name="quantity"
                      value={bookData.quantity}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Precio</label>
                    <Input
                      type="number"
                      min="0" // No permite números negativos
                      step="0.01" // Permite valores flotantes
                      className="w-full p-2 rounded"
                      name="price"
                      value={bookData.price}
                      onChange={handleInputChange}
                      required
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

                  <Button
                    type="submit"
                    color="primary"
                    radius="sm"
                    variant="shadow"
                    className="mr-4 mt-4 mb-4"
                  >
                    Agregar
                  </Button>
                  <Button color="danger" variant="flat" radius="sm" onClick={onClose}>
                    Cancelar
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AdminBookModal;
