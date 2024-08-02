import { useEffect, useState } from 'react';
import { useQuery, gql, useApolloClient } from '@apollo/client';
import { useParams } from 'react-router-dom';
import React from 'react';
import { Button } from '@nextui-org/button';
import Logo from '../components/SideBar';
import { ReservationForm, FormValues } from '../forms/ReservationForm';
import Swal from 'sweetalert2';
import { UPDATE_BOOK_STOCK_MUTATION } from '../graphql/mutation/queries'

const GET_SUCURSAL = gql`
query Sucursals {
  sucursals {
    id
  }
}

`;

const GET_BOOK_DETAILS = gql`
  query Books($id: ID!) {
    books(where: { id: { equals: $id } }) {
      id
      title
      author {
        name
      }
      image {
        url
      }
      price
      quantity
    }
  }
`;

const CREATE_RESERVATION_MUTATION = gql`
  mutation Reservation($data: ReservationCreateInput!) {
    createReservation(data: $data) {
      id
      book {
        id
      }
      user {
        id
      }
      reservationDate
      sucursal {
        id
      }
    }
  }
`;

interface BookDetails {
  id: string;
  title: string;
  author: { name: string };
  image: { url: string };
  price: number;
  quantity: number;
}

interface ReservationPageProps {
  userId: string;
}

interface Sucursals {
  id: string;
}

export const ReservationPage: React.FC<ReservationPageProps> = () => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery<{ books: BookDetails[] }>(GET_BOOK_DETAILS, {
    variables: { id },
  });
  const { loading: loadingSucursal, error: errorSucursal, data: dataSucursal } = useQuery<{ sucursals: Sucursals[] }>(GET_SUCURSAL);
  const client = useApolloClient();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const selectedBook = localStorage.getItem('selectedBook');
    if (selectedBook) {
      const parsedSelectedBook = JSON.parse(selectedBook);
      setSelectedQuantity(parsedSelectedBook.quantity);
    }
  }, []);

  useEffect(() => {
    if (data && data.books.length > 0) {
      const totalPrice = data.books[0].price * selectedQuantity;
      setTotal(totalPrice);
    }
  }, [selectedQuantity, data]);

  const handleSubmit = async (formData: FormValues) => {

    try {
      if (!userId) throw new Error('User ID is required'); // Verifica que el userId esté disponible

      const { data } = await client.mutate({
        mutation: CREATE_RESERVATION_MUTATION,
        variables: {
          data: {
            book: { connect: { id: book.id } },
            user: { connect: { id: userId } },
            reservationDate: formData.reservationDate,
            sucursal: { connect: { id: formData.sucursal } },
          },
        },
      });

      await client.mutate({
        mutation: UPDATE_BOOK_STOCK_MUTATION,
        variables: {
          id: book.id,
          quantity: book.quantity - selectedQuantity, // Restar la cantidad seleccionada
        },
      });

      console.log('Reservation created:', data);

      Swal.fire({
        title: 'Reservación realizada!',
        text: 'Tu reservación ha sido registrada exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/principal';
        }
      });
    } catch (error) {
      console.error('Error creating reservation:', error);

      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al registrar tu reservación. Por favor, intenta de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (loadingSucursal) return <p>Loading sucursal...</p>;
  if (errorSucursal) return <p>Error: {errorSucursal.message}</p>;

  if (!data || data.books.length === 0) {
    return <p>No se encontraron detalles del libro.</p>;
  }
  const book = data.books[0];

  if (!dataSucursal || dataSucursal.sucursals.length === 0) {
    return <p>No se encontraron sucursales.</p>;
  }
  const sucursal = dataSucursal.sucursals[0];
  console.log(userId)

  return (
    <>
      <Logo />
      <div className="min-h-screen flex flex-col items-center justify-center  ">
        <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
        <ReservationForm onSubmit={handleSubmit}>
          <div className="flex items-start space-x-1">
            <p className="text-lg mb-2 font-bold text-black">
              Total de unidades:
            </p>
            <p className="text-lg mb-2 font-semibold text-black">
              {selectedQuantity}
            </p>
          </div>
          <Button
            type="submit"
            radius="sm"
            className="w-full  bg-gradient-to-tr from-blue-500 to-cyan-400 text-white shadow-lg"
            style={{ height: '50px' }}
          >
            Reservar ${total.toFixed(2)}
          </Button>
        </ReservationForm>
      </div>
    </>
  );
};
