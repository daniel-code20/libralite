import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import AdminEditBookModal from '../../Modal/AdminEditBookModal';

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

export const AdminBookDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(GET_BOOK_DETAILS, {
    variables: { id },
  });

  useEffect(() => {
    if (data && data.books.length > 0) {
      const selectedBook = {
        id: data.books[0].id,
        title: data.books[0].title,
        price: data.books[0].price,
        quantity,
      };
      localStorage.setItem('selectedBook', JSON.stringify(selectedBook));
      const totalPrice = data.books[0].price * quantity;
      setTotal(totalPrice);
    }
  }, [quantity, data]);

  useEffect(() => {
    const savedBook = localStorage.getItem('selectedBook');
    if (savedBook) {
      const parsedBook = JSON.parse(savedBook);
      setQuantity(parsedBook.quantity);
      setTotal(parsedBook.price * parsedBook.quantity);
    }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const book = data.books[0];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      {book && (
        <>
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <img
            src={book.image.url}
            alt={book.title}
            className="w-64 h-64 object-cover"
          />
          <h2 className="text-xl mb-2">by {book.author.name}</h2>
          <p className="text-lg mb-4 text-white">
            Disponibles: {book.quantity}
          </p>
          <p className="text-lg mb-4 text-white">Precio: ${total.toFixed(2)}</p>
          <AdminEditBookModal/>
          <Button variant='light' color='danger' radius='sm'>Eliminar</Button>
        </>
      )}
    </div>
  );
};
