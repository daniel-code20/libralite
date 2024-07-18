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
    price: '',
    gender: '',// Guardamos el ID del género seleccionado
  });
  const client = useApolloClient();
  const formRef = useRef<HTMLFormElement>(null);

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
            price: parseFloat(bookData.price),
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
        price: '',
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
                      onChange={(e) => setBookData((prevData) => ({ ...prevData, title: e.target.value }))}
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
                      onChange={(e) => setBookData((prevData) => ({ ...prevData, description: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label>Edición</label>
                    <Input
                      type="number"
                      className="w-full p-2 rounded"
                      name="edition"
                      value={bookData.edition}
                      onChange={(e) => setBookData((prevData) => ({ ...prevData, edition: e.target.value }))}
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
                      onChange={(e) => setBookData((prevData) => ({ ...prevData, author: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label>Cantidad</label>
                    <Input
                      type="number"
                      className="w-full p-2 rounded"
                      name="quantity"
                      value={bookData.quantity}
                      onChange={(e) => setBookData((prevData) => ({ ...prevData, quantity: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label>Precio</label>
                    <Input
                      type="number"
                      className="w-full p-2 rounded"
                      name="price"
                      value={bookData.price}
                      onChange={(e) => setBookData((prevData) => ({ ...prevData, price: e.target.value }))}
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
